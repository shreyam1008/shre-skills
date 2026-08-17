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
const installSlugs = [...readme.matchAll(/shreyam1008\/shre-skills@([a-z0-9-]+)/g)].map((match) => match[1]);

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

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join('\n'));
  process.exit(1);
}

console.log(`Validated ${skills.length} skill folders and README catalog consistency.`);
