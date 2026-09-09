import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdtemp, mkdir, readFile, readdir, writeFile, symlink, lstat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { runInNewContext, createContext, runInContext } from 'node:vm';
import test from 'node:test';
import { loadSkills, loadSkillMigrations, repoRoot } from './repository.mjs';

const bashPath = process.env.BASH_PATH || (process.platform === 'win32' ? 'C:/Program Files/Git/bin/bash.exe' : 'bash');
const slash = (path) => path.replaceAll('\\', '/');
const install = (skill, target) => {
  const result = spawnSync(bashPath, [slash(join(repoRoot, 'install.sh')), skill, slash(target)], { encoding: 'utf8' });
  if (result.error) throw result.error;
  return result;
};
// Keep fixtures in the OS temp directory, outside user projects and the published tree.
const fixture = () => mkdtemp(join(tmpdir(), 'shre-skills-test-'));

const compareFolder = async (source, destination) => {
  const entries = await readdir(source, { withFileTypes: true });
  assert.deepEqual((await readdir(destination)).sort(), entries.map(({ name }) => name).sort());
  for (const entry of entries) {
    const original = join(source, entry.name);
    const copy = join(destination, entry.name);
    if (entry.isDirectory()) await compareFolder(original, copy);
    else assert.deepEqual(await readFile(copy), await readFile(original));
  }
};

test('installer copies every skill exactly and replaces stale files without touching siblings', async () => {
  const target = await fixture();
  let result = install('all', target);
  assert.equal(result.status, 0, result.stderr);
  for (const skill of await loadSkills()) {
    await compareFolder(join(repoRoot, 'skills', skill.folder), join(target, '.agents/skills', skill.folder));
  }
  await writeFile(join(target, '.agents/skills/webgl/stale.txt'), 'stale');
  await mkdir(join(target, '.agents/skills/custom'));
  await writeFile(join(target, '.agents/skills/custom/keep.txt'), 'keep');
  result = install('webgl', target);
  assert.equal(result.status, 0, result.stderr);
  await assert.rejects(lstat(join(target, '.agents/skills/webgl/stale.txt')), { code: 'ENOENT' });
  assert.equal(await readFile(join(target, '.agents/skills/custom/keep.txt'), 'utf8'), 'keep');
  assert.equal((await readdir(join(target, '.agents/skills'))).some((name) => name.startsWith('.')), false);
});

test('retired install names resolve without deleting customized retired copies', async () => {
  const skills = await loadSkills();
  for (const [previous, replacement] of Object.entries(await loadSkillMigrations(skills))) {
    const target = await fixture();
    const oldFolder = join(target, '.agents/skills', previous);
    await mkdir(oldFolder, { recursive: true });
    await writeFile(join(oldFolder, 'SKILL.md'), 'local customization');
    const result = install(previous, target);
    assert.equal(result.status, 0, result.stderr);
    assert.ok(result.stderr.includes(`${previous} merged into ${replacement}`));
    assert.ok(result.stderr.includes('checking local edits'));
    assert.equal(await readFile(join(oldFolder, 'SKILL.md'), 'utf8'), 'local customization');
    await compareFolder(join(repoRoot, 'skills', replacement), join(target, '.agents/skills', replacement));
    assert.deepEqual((await readdir(join(target, '.agents/skills'))).sort(), [previous, replacement].sort());
  }
});

test('published skills include linked references and redirects for retired names', async () => {
  const skills = await loadSkills();
  const redirects = await readFile(join(repoRoot, '_site/_redirects'), 'utf8');
  const catalog = JSON.parse(await readFile(join(repoRoot, '_site/skills.json'), 'utf8'));
  for (const skill of skills) {
    await compareFolder(join(repoRoot, 'skills', skill.name), join(repoRoot, '_site/skills', skill.name));
    const body = await readFile(join(repoRoot, skill.relativeFile), 'utf8');
    for (const [, reference] of body.matchAll(/\]\((references\/[^)#]+)(?:#[^)]*)?\)/g)) {
      assert.ok((await readFile(join(repoRoot, '_site/skills', skill.name, reference))).length);
    }
  }
  for (const [previous, replacement] of Object.entries(await loadSkillMigrations(skills))) {
    assert.ok(redirects.includes(`/skills/${previous}/SKILL.md /skills/${replacement}/SKILL.md 301`));
    assert.ok(!catalog.skills.some(({ name }) => name === previous));
    assert.ok(catalog.skills.find(({ name }) => name === replacement).aliases.includes(previous));
    await assert.rejects(lstat(join(repoRoot, 'skills', previous)), { code: 'ENOENT' });
  }
});

test('installer rejects traversal and missing skill names', async () => {
  const target = await fixture();
  assert.notEqual(install('../escape', target).status, 0);
  await assert.rejects(lstat(join(target, '.agents')), { code: 'ENOENT' });
  assert.notEqual(install('not-a-skill', target).status, 0);
});

test('installer refuses linked skill and parent destinations and preserves their targets', async () => {
  const outside = await fixture();
  await writeFile(join(outside, 'keep.txt'), 'keep');
  for (const linkedPart of ['.agents', '.agents/skills', '.agents/skills/webgl']) {
    const target = await fixture();
    const link = join(target, linkedPart);
    await mkdir(join(link, '..'), { recursive: true });
    await symlink(outside, link, process.platform === 'win32' ? 'junction' : 'dir');
    const result = install('webgl', target);
    assert.notEqual(result.status, 0, `accepted linked destination ${linkedPart}`);
    assert.equal(await readFile(join(outside, 'keep.txt'), 'utf8'), 'keep');
    assert.deepEqual(await readdir(outside), ['keep.txt']);
  }
});

const codeBlocks = async (skill, language) => {
  const source = await readFile(join(repoRoot, 'skills', skill, 'SKILL.md'), 'utf8');
  return [...source.matchAll(new RegExp('```' + language + '\\r?\\n([\\s\\S]*?)```', 'g'))].map((match) => match[1]);
};

test('service-worker activation preserves unrelated caches and current version', async () => {
  const blocks = await codeBlocks('service-worker', 'js');
  const handlers = {};
  const deleted = [];
  const context = createContext({
    navigator: { serviceWorker: { register() {} } },
    self: { addEventListener: (name, fn) => { handlers[name] = fn; } },
    caches: { keys: async () => ['another-app-v1', 'my-app-shell-v2', 'my-app-shell-v3'],
      delete: async (name) => { deleted.push(name); return true; } },
  });
  runInContext(blocks[0], context);
  let completion;
  handlers.activate({ waitUntil(promise) { completion = promise; } });
  await completion;
  assert.deepEqual(deleted, ['my-app-shell-v2']);
});

test('offline navigation returns a valid response even when the fallback is evicted', async () => {
  const blocks = await codeBlocks('service-worker', 'js');
  const handlers = {};
  let fallback;
  const context = createContext({
    navigator: { serviceWorker: { register() {} } },
    self: { addEventListener: (name, fn) => { handlers[name] = fn; } },
    fetch: async () => { throw new Error('offline'); }, Response,
    caches: { open: async () => ({ match: async () => fallback }) },
  });
  runInContext(blocks.join('\n'), context);
  let response;
  const event = { request: { method: 'GET', mode: 'navigate' }, respondWith(promise) { response = promise; } };
  handlers.fetch(event);
  assert.equal((await response).status, 503);
  fallback = new Response('Offline page');
  handlers.fetch(event);
  assert.equal(await (await response).text(), 'Offline page');
  response = undefined;
  handlers.fetch({ ...event, request: { method: 'POST', mode: 'navigate' } });
  assert.equal(response, undefined);
});

test('WebGL diagnostic tolerates an unavailable optional extension', async () => {
  const blocks = await codeBlocks('webgl', 'js');
  runInNewContext(blocks[1], { gl: { getExtension: () => null }, console });
});

test('built catalog contains every source link, install command, and local asset', async () => {
  const html = await readFile(join(repoRoot, '_site/index.html'), 'utf8');
  assert.ok(!html.includes('{{'));
  for (const skill of await loadSkills()) {
    assert.ok(html.includes(`https://github.com/shreyam1008/shre-skills/blob/main/${skill.relativeFile}`));
    assert.ok(html.includes(`shreyam1008/shre-skills --skill ${skill.name}`));
  }
  for (const [, path] of html.matchAll(/(?:src|href)="\.\/([^"#]+)"/g)) {
    assert.ok((await readFile(join(repoRoot, '_site', path))).length > 0);
  }
});

test('page assets use content hashes so cached styles cannot mismatch new markup', async () => {
  const html = await readFile(join(repoRoot, '_site/index.html'), 'utf8');
  for (const [name, extension] of [['styles', 'css'], ['catalog', 'js']]) {
    const match = html.match(new RegExp(name + '\\.([a-f0-9]{12})\\.' + extension));
    assert.ok(match, name + ' must have a fingerprinted URL');
    const content = await readFile(join(repoRoot, '_site', match[0]));
    assert.equal(createHash('sha256').update(content).digest('hex').slice(0, 12), match[1]);
  }
});

test('static HTML, structured data, and agent catalog describe the same complete library', async () => {
  const html = await readFile(join(repoRoot, '_site/index.html'), 'utf8');
  const catalog = JSON.parse(await readFile(join(repoRoot, '_site/skills.json'), 'utf8'));
  const llms = await readFile(join(repoRoot, '_site/llms.txt'), 'utf8');
  const schema = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  const list = schema['@graph'].find((entry) => entry['@type'] === 'ItemList');
  const skills = await loadSkills();
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.equal((html.match(/data-group="/g) || []).length, 6);
  assert.equal(catalog.skills.length, skills.length);
  assert.equal(list.numberOfItems, skills.length);
  assert.equal(list.itemListElement.length, skills.length);
  assert.match(html, /name="runner" value="bunx" checked/);
  assert.match(html, /<link rel="canonical" href="https:\/\/skills\.shreyam1008\.com\.np\/" \/>/);
  for (const { name, relativeFile } of skills) {
    const entry = catalog.skills.find((skill) => skill.name === name);
    assert.ok(entry);
    assert.equal((html.match(new RegExp('id="skill-' + name + '"', 'g')) || []).length, 1);
    assert.ok(html.includes(entry.install.bunx));
    assert.equal(entry.install.npx, entry.install.bunx.replace(/^bunx /, 'npx '));
    assert.ok(llms.includes(entry.markdownUrl));
    assert.equal(await readFile(join(repoRoot, '_site/skills', name, 'SKILL.md'), 'utf8'), await readFile(join(repoRoot, relativeFile), 'utf8'));
    assert.ok(list.itemListElement.some(({ item }) => item['@id'] === entry.url && item.encoding.contentUrl === entry.markdownUrl));
  }
});
