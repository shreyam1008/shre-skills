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
const cards = skills.map((skill) => `        <li>
          <article class="skill-card">
            <h3><a href="https://github.com/shreyam1008/shre-skills/blob/main/${skill.relativeFile}">${escapeHtml(skill.name)}</a></h3>
            <p>${escapeHtml(skill.description)}</p>
            <code>npx skills add shreyam1008/shre-skills@${escapeHtml(skill.name)}</code>
          </article>
        </li>`).join('\n');

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
await cp(join(siteRoot, 'styles.css'), join(outputRoot, 'styles.css'));

for (const file of ['robots.txt', 'sitemap.xml']) {
  const source = await readFile(join(siteRoot, file), 'utf8');
  await writeFile(join(outputRoot, file), source.replaceAll('{{SITE_URL}}', siteUrl));
}
await writeFile(join(outputRoot, '.nojekyll'), '');

console.log(`Built ${skills.length} skill links for ${siteUrl}`);
