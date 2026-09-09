import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, readdir, writeFile, symlink, lstat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { runInNewContext, createContext, runInContext } from 'node:vm';
import test from 'node:test';
import { loadSkills, repoRoot } from './repository.mjs';

const bashPath = process.env.BASH_PATH || (process.platform === 'win32' ? 'C:/Program Files/Git/bin/bash.exe' : 'bash');
const slash = (path) => path.replaceAll('\\', '/');
const install = (skill, target) => {
  const result = spawnSync(bashPath, [slash(join(repoRoot, 'install.sh')), skill, slash(target)], { encoding: 'utf8' });
  if (result.error) throw result.error;
  return result;
};
// Keep fixtures in the OS temp directory, outside user projects and the published tree.
const fixture = () => mkdtemp(join(tmpdir(), 'shre-skills-test-'));

test('installer copies every skill exactly and replaces stale files without touching siblings', async () => {
  const target = await fixture();
  let result = install('all', target);
  assert.equal(result.status, 0, result.stderr);
  for (const skill of await loadSkills()) {
    assert.equal(await readFile(join(target, '.agents/skills', skill.folder, 'SKILL.md'), 'utf8'),
      await readFile(join(repoRoot, skill.relativeFile), 'utf8'));
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
