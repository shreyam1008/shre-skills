import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { loadSkills, repoRoot } from './repository.mjs';

const skills = await loadSkills();
const errors = [];
const folderNames = skills.map(({ folder }) => folder);

for (const skill of skills) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(skill.name)) {
    errors.push(`${skill.relativeFile}: name must be a lowercase kebab-case slug`);
  }
  if (skill.name !== skill.folder) {
    errors.push(`${skill.relativeFile}: name "${skill.name}" must match folder "${skill.folder}"`);
  }
  if (skill.description.length < 20 || skill.description.length > 1024) {
    errors.push(`${skill.relativeFile}: description must contain 20–1024 characters`);
  }
}

if (new Set(folderNames).size !== folderNames.length) errors.push('skill folder names must be unique');

const readme = await readFile(join(repoRoot, 'README.md'), 'utf8');
const catalogLinks = [...readme.matchAll(/\]\(skills\/([a-z0-9-]+)\/SKILL\.md\)/g)].map((match) => match[1]);
const installSlugs = [...readme.matchAll(/shreyam1008\/shre-skills --skill ([a-z0-9-]+)/g)].map((match) => match[1]);

const compareSet = (label, values) => {
  const unique = [...new Set(values)].sort();
  const expected = [...folderNames].sort();
  if (JSON.stringify(unique) !== JSON.stringify(expected)) {
    errors.push(`${label} must list every skill exactly from the skills/ folders`);
  }
};

compareSet('README catalog', catalogLinks);
compareSet('README install commands', installSlugs);

for (const match of readme.matchAll(/(?:skills-|all\s+)(\d+)/gi)) {
  if (Number(match[1]) !== skills.length) {
    errors.push(`README count ${match[1]} must match ${skills.length} skill folders`);
  }
}

if (catalogLinks.length !== skills.length) errors.push('README catalog must link to each skill once');

const siteTemplate = await readFile(join(repoRoot, 'site/index.template.html'), 'utf8');
const favicon = await readFile(join(repoRoot, 'site/favicon.svg'), 'utf8');
if (!/<link rel="icon" type="image\/svg\+xml" href="\.\/favicon\.svg" \/>/.test(siteTemplate)) {
  errors.push('site/index.template.html: must declare the generated SVG favicon');
}
if (!favicon.startsWith('<svg ') || !favicon.includes('xmlns="http://www.w3.org/2000/svg"') || !favicon.includes('viewBox="0 0 64 64"')) {
  errors.push('site/favicon.svg: must be a standalone 64×64 SVG');
}
if (Buffer.byteLength(favicon, 'utf8') > 2048) errors.push('site/favicon.svg: must stay below 2 KiB');

const sourceBaselineFile = 'docs/source-baselines.json';
let sourceBaselines;
try {
  sourceBaselines = JSON.parse(await readFile(join(repoRoot, sourceBaselineFile), 'utf8'));
} catch (error) {
  errors.push(`${sourceBaselineFile}: must contain valid JSON (${error.message})`);
}

if (sourceBaselines) {
  if (sourceBaselines.schemaVersion !== 1) errors.push(`${sourceBaselineFile}: schemaVersion must be 1`);
  const reviewedAt = sourceBaselines.reviewedAt || '';
  const reviewedDate = new Date(`${reviewedAt}T00:00:00Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(reviewedAt)
      || Number.isNaN(reviewedDate.valueOf())
      || reviewedDate.toISOString().slice(0, 10) !== reviewedAt) {
    errors.push(`${sourceBaselineFile}: reviewedAt must use YYYY-MM-DD`);
  }

  const sources = sourceBaselines.sources;
  if (!Array.isArray(sources) || sources.length === 0) {
    errors.push(`${sourceBaselineFile}: sources must be a non-empty array`);
  } else {
    const ids = new Set();
    const sourceSignatures = new Set();
    const coveredSkills = new Set();
    const allowedKinds = new Set(['browser-intent', 'git', 'package', 'platform-docs', 'specification']);
    const allowedHosts = new Set(['developer.mozilla.org', 'github.com', 'groups.google.com', 'react.dev', 'learn.microsoft.com', 'wasm-bindgen.github.io', 'tanstack.com', 'cheatsheetseries.owasp.org', 'r3f.docs.pmnd.rs']);
    for (const [index, source] of sources.entries()) {
      const label = `${sourceBaselineFile}: sources[${index}]`;
      if (!source || typeof source !== 'object' || Array.isArray(source)) {
        errors.push(`${label} must be an object`);
        continue;
      }
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(source.id || '')) errors.push(`${label}.id must be kebab-case`);
      if (ids.has(source.id)) errors.push(`${label}.id must be unique`);
      ids.add(source.id);
      if (typeof source.title !== 'string' || !source.title.trim()) errors.push(`${label}.title is required`);
      if (!allowedKinds.has(source.kind)) errors.push(`${label}.kind is unsupported`);
      let normalizedUrl;
      try {
        const url = new URL(source.url);
        normalizedUrl = url.toString().replace(/\/$/, '');
        if (url.protocol !== 'https:') errors.push(`${label}.url must use HTTPS`);
        if (!allowedHosts.has(url.hostname)) errors.push(`${label}.url must use an approved primary-source host`);
      } catch {
        errors.push(`${label}.url must be an absolute URL`);
      }
      if (typeof source.revision !== 'string' || !source.revision.trim()) errors.push(`${label}.revision is required`);
      if (source.kind === 'git' && !/^[a-f0-9]{40}$/.test(source.revision || '')) {
        errors.push(`${label}.revision must be a full Git commit SHA`);
      }
      if (normalizedUrl && typeof source.revision === 'string') {
        const signature = `${normalizedUrl}\0${source.revision}`;
        if (sourceSignatures.has(signature)) errors.push(`${label}.url and revision must identify a unique source baseline`);
        sourceSignatures.add(signature);
      }
      if (!Array.isArray(source.skills) || source.skills.length === 0) {
        errors.push(`${label}.skills must be a non-empty array`);
      } else {
        if (new Set(source.skills).size !== source.skills.length) errors.push(`${label}.skills must not contain duplicates`);
        for (const skill of source.skills) {
          if (!folderNames.includes(skill)) errors.push(`${label}.skills references unknown skill "${skill}"`);
          coveredSkills.add(skill);
        }
      }
    }

    for (const skill of ['html', 'css', 'javascript', 'web-performance', 'low-level-web-rendering', 'webgl', 'webgpu', 'wasm-rust']) {
      if (!coveredSkills.has(skill)) errors.push(`${sourceBaselineFile}: missing primary-source baseline for ${skill}`);
    }
  }
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join('\n'));
  process.exit(1);
}

console.log(`Validated ${skills.length} skill folders and README catalog consistency.`);
