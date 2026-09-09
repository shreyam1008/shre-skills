import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { join } from 'node:path';
import { loadSkills, loadSkillMigrations, repoRoot } from './repository.mjs';

const canonicalUrl = 'https://skills.shreyam1008.com.np/';
const requestedUrl = new URL(process.env.PAGES_BASE_URL || canonicalUrl);
if (requestedUrl.protocol !== 'https:') throw new Error('Pages base URL must use HTTPS.');
requestedUrl.search = '';
requestedUrl.hash = '';
requestedUrl.pathname = `${requestedUrl.pathname.replace(/\/$/, '')}/`;
const siteUrl = requestedUrl.toString();
const repository = 'https://github.com/shreyam1008/shre-skills';
const escapeHtml = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const skills = await loadSkills();
const migrations = await loadSkillMigrations(skills);
const presentation = JSON.parse(await readFile(join(repoRoot, 'site/catalog.json'), 'utf8'));
const names = skills.map(({ name }) => name).sort();
if (JSON.stringify(Object.keys(presentation).sort()) !== JSON.stringify(names)) {
  throw new Error('site/catalog.json must describe exactly the current skills.');
}
const categories = [
  { key: 'Foundations', id: 'foundations', title: 'Web foundations', summary: 'Build a solid base: markup, styles, code, workflow, and security.' },
  { key: 'React', id: 'react', title: 'React & ecosystem', summary: 'Build components, connect data, and keep rendering efficient.' },
  { key: 'Performance', id: 'performance', title: 'Performance & offline', summary: 'Make the web faster, fresher, and more resilient.' },
  { key: 'Design', id: 'design', title: 'Interface design', summary: 'Create clear, consistent interfaces that work for more people.' },
  { key: 'Graphics', id: 'graphics', title: 'Graphics & compute', summary: 'Choose a renderer, build 3D scenes, and put the GPU to work.' },
  { key: 'Native', id: 'native', title: 'Native integration', summary: 'Connect web interfaces with the Windows desktop.' },
];
for (const name of names) {
  for (const field of ['title', 'category', 'summary']) {
    if (typeof presentation[name]?.[field] !== 'string' || !presentation[name][field].trim()) {
      throw new Error(`site/catalog.json: ${name}.${field} is required.`);
    }
  }
  if (!categories.some(({ key }) => key === presentation[name].category)) throw new Error(`Unknown category for ${name}`);
}
const records = skills.map((skill) => ({
  name: skill.name, ...presentation[skill.name],
  aliases: Object.keys(migrations).filter((previous) => migrations[previous] === skill.name),
  description: skill.description,
  url: `${siteUrl}#skill-${skill.name}`,
  sourceUrl: `${repository}/blob/main/${skill.relativeFile}`,
  markdownUrl: `${siteUrl}skills/${skill.name}/SKILL.md`,
  install: { bunx: `bunx skills add shreyam1008/shre-skills --skill ${skill.name}`, npx: `npx skills add shreyam1008/shre-skills --skill ${skill.name}` },
}));
const card = (skill) => `<li data-aliases="${escapeHtml(JSON.stringify(skill.aliases))}" data-search="${escapeHtml(`${skill.name} ${skill.aliases.join(' ')} ${skill.description} ${skill.title} ${skill.category} ${skill.summary}`)}">
  <article id="skill-${skill.name}" class="skill-card" data-category="${skill.category.toLowerCase()}">
    <div class="card-meta"><span class="category">${escapeHtml(skill.category)}</span><a class="markdown-link" href="./skills/${skill.name}/SKILL.md" aria-label="Read ${skill.name} as Markdown">Markdown <span aria-hidden="true">↗</span></a></div>
    <h4><a href="${skill.sourceUrl}">${escapeHtml(skill.title)}<span class="source-arrow" aria-hidden="true">↗</span></a></h4>
    <p>${escapeHtml(skill.summary)}</p>
    <div class="card-install"><span class="command-label">INSTALL SKILL</span><div class="command"><code data-install="${skill.name}">${skill.install.bunx}</code><button type="button" class="copy-button" data-copy="${skill.name}" hidden aria-label="Copy install command for ${skill.name}">Copy</button></div></div>
  </article>
</li>`;
const sections = categories.map((category) => {
  const entries = records.filter((skill) => skill.category === category.key);
  return `<section class="category-section" id="category-${category.id}" data-group="${category.id}" aria-labelledby="heading-${category.id}">
  <div class="group-heading"><h3 id="heading-${category.id}">${escapeHtml(category.title)} <span class="count-badge" data-group-count>${entries.length}</span></h3><p>${escapeHtml(category.summary)}</p></div>
  <ul class="skill-grid">${entries.map(card).join('\n')}</ul>
</section>`;
}).join('\n');
const categoryLinks = `<a href="#catalog" data-filter="all" aria-current="true">All skills <span>${skills.length}</span></a>` + categories.map((category) => `<a href="#category-${category.id}" data-filter="${category.id}">${escapeHtml(category.title)} <span>${records.filter((skill) => skill.category === category.key).length}</span></a>`).join('\n');
const description = `Browse ${skills.length} open-source agent skills for web development, React, performance, design, graphics, and native apps. Install all or one with bunx or npx.`;
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'WebSite', '@id': `${siteUrl}#website`, name: 'shre-skills', alternateName: 'Shre Skills', url: siteUrl },
    { '@type': 'CollectionPage', '@id': `${siteUrl}#page`, name: 'Agent skills for web development | shre-skills', description, url: siteUrl, inLanguage: 'en', isPartOf: { '@id': `${siteUrl}#website` }, mainEntity: { '@id': `${siteUrl}#skills` } },
    { '@type': 'ItemList', '@id': `${siteUrl}#skills`, numberOfItems: records.length, itemListElement: records.map((skill, index) => ({
      '@type': 'ListItem', position: index + 1, item: {
        '@type': 'CreativeWork', '@id': skill.url, name: skill.title, description: skill.summary, url: skill.url,
        genre: skill.category, inLanguage: 'en', license: `${repository}/blob/main/LICENSE`,
        encoding: { '@type': 'MediaObject', contentUrl: skill.markdownUrl, encodingFormat: 'text/markdown' },
        sameAs: skill.sourceUrl,
      },
    })) },
  ],
};
const siteRoot = join(repoRoot, 'site');
const outputRoot = join(repoRoot, '_site');
await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });
const assets = {};
for (const file of ['styles.css', 'catalog.js']) {
  const source = (await readFile(join(siteRoot, file), 'utf8')).replaceAll('\r\n', '\n');
  const hash = createHash('sha256').update(source).digest('hex').slice(0, 12);
  const [name, extension] = file.split('.');
  assets[file] = `${name}.${hash}.${extension}`;
  await writeFile(join(outputRoot, assets[file]), source);
}
const template = await readFile(join(siteRoot, 'index.template.html'), 'utf8');
const index = template
  .replaceAll('{{SITE_URL}}', escapeHtml(siteUrl))
  .replaceAll('{{SKILL_COUNT}}', String(skills.length))
  .replaceAll('{{DESCRIPTION}}', description)
  .replace('{{STYLES_URL}}', assets['styles.css'])
  .replace('{{SCRIPT_URL}}', assets['catalog.js'])
  .replace('{{STRUCTURED_DATA}}', JSON.stringify(structuredData).replaceAll('<', '\\u003c'))
  .replace('{{CATEGORY_LINKS}}', categoryLinks)
  .replace('{{SKILL_SECTIONS}}', sections);
await writeFile(join(outputRoot, 'index.html'), index);
for (const file of ['favicon.svg', '404.html', '_headers']) await cp(join(siteRoot, file), join(outputRoot, file));
for (const skill of skills) {
  await cp(join(repoRoot, 'skills', skill.name), join(outputRoot, 'skills', skill.name), { recursive: true });
}
await writeFile(join(outputRoot, '_redirects'), Object.entries(migrations)
  .map(([previous, next]) => `/skills/${previous}/SKILL.md /skills/${next}/SKILL.md 301`).join('\n') + '\n');
for (const file of ['robots.txt', 'sitemap.xml']) {
  const source = await readFile(join(siteRoot, file), 'utf8');
  await writeFile(join(outputRoot, file), source.replaceAll('{{SITE_URL}}', siteUrl));
}
await writeFile(join(outputRoot, 'skills.json'), JSON.stringify({ name: 'shre-skills', url: siteUrl, repository, license: 'MIT', skills: records }, null, 2) + '\n');
await writeFile(join(outputRoot, 'llms.txt'), `# shre-skills

> ${records.length} open-source, MIT-licensed agent skills for web development and native web integration.

Each skill is readable Markdown with YAML name and description metadata. Choose only the skills relevant to your task. A SKILL.md may link to optional local references; read those only for the matching task.

## Installation

Install every skill: \`bunx skills add shreyam1008/shre-skills --skill '*'\`
npm alternative: \`npx skills add shreyam1008/shre-skills --skill '*'\`

## Catalog

- [Browse categories](${siteUrl}): Human-readable catalog with search and install commands.
- [Machine-readable catalog](${siteUrl}skills.json): Every skill's description, category, URLs, and both installation commands.
- [Source repository](${repository}): Installation options, history, credits, and license.

${categories.map((category) => `## ${category.title}\n\n${records.filter((skill) => skill.category === category.key).map((skill) => `- [${skill.name}](${skill.markdownUrl}): ${skill.summary}`).join('\n')}`).join('\n\n')}
`);
await writeFile(join(outputRoot, '.nojekyll'), '');
console.log(`Built ${skills.length} skills in ${categories.length} categories for ${siteUrl}`);
