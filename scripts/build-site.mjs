import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { loadSkills, repoRoot } from './repository.mjs';

const canonicalUrl = 'https://skills.shreyam1008.com.np/';
const requestedUrl = new URL(process.env.PAGES_BASE_URL || canonicalUrl);
if (requestedUrl.protocol !== 'https:') throw new Error('Pages base URL must use HTTPS.');
requestedUrl.search = '';
requestedUrl.hash = '';
requestedUrl.pathname = `${requestedUrl.pathname.replace(/\/$/, '')}/`;
const siteUrl = requestedUrl.toString();

const escapeHtml = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;');

const skills = await loadSkills();
// Public summaries stay separate from agent-facing trigger descriptions.
const presentation = JSON.parse(await readFile(join(repoRoot, 'site/catalog.json'), 'utf8'));
const names = skills.map(({ name }) => name).sort();
if (JSON.stringify(Object.keys(presentation).sort()) !== JSON.stringify(names)) {
  throw new Error('site/catalog.json must describe exactly the current skills.');
}
for (const name of names) {
  for (const field of ['title', 'category', 'summary']) {
    if (typeof presentation[name]?.[field] !== 'string' || !presentation[name][field].trim()) {
      throw new Error(`site/catalog.json: ${name}.${field} is required.`);
    }
  }
}
const cards = skills.map((skill, index) => {
  const info = presentation[skill.name];
  return `        <li data-search="${escapeHtml(`${skill.name} ${skill.description} ${info.title} ${info.category} ${info.summary}`)}">
          <article class="skill-card" data-category="${escapeHtml(info.category.toLowerCase())}">
            <div class="card-meta"><span class="category">${escapeHtml(info.category)}</span><span class="card-number" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span></div>
            <h3><a href="https://github.com/shreyam1008/shre-skills/blob/main/${skill.relativeFile}">${escapeHtml(info.title)}<span class="source-arrow" aria-hidden="true">↗</span></a></h3>
            <p>${escapeHtml(info.summary)}</p>
            <div class="card-install"><span class="command-label">INSTALL SKILL</span><div class="command"><code>npx skills add shreyam1008/shre-skills --skill ${escapeHtml(skill.name)}</code><button type="button" class="copy-button" data-copy="${escapeHtml(skill.name)}" hidden aria-label="Copy install command for ${escapeHtml(skill.name)}">Copy</button></div></div>
          </article>
        </li>`;
}).join('\n');

const siteRoot = join(repoRoot, 'site');
const outputRoot = join(repoRoot, '_site');
const template = await readFile(join(siteRoot, 'index.template.html'), 'utf8');
const index = template
  .replaceAll('{{SITE_URL}}', siteUrl)
  .replaceAll('{{SKILL_COUNT}}', String(skills.length))
  .replace('{{SKILL_CARDS}}', cards);

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });
await writeFile(join(outputRoot, 'index.html'), index);

for (const file of ['styles.css', 'catalog.js', 'favicon.svg', '404.html']) {
  await cp(join(siteRoot, file), join(outputRoot, file));
}

for (const file of ['robots.txt', 'sitemap.xml']) {
  const source = await readFile(join(siteRoot, file), 'utf8');
  await writeFile(join(outputRoot, file), source.replaceAll('{{SITE_URL}}', siteUrl));
}
await writeFile(join(outputRoot, '.nojekyll'), '');

console.log(`Built ${skills.length} skill links for ${siteUrl}`);
