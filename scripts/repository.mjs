import { readdir, readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));

const parseScalar = (raw, file, field) => {
  if (raw.startsWith('"')) {
    try {
      return JSON.parse(raw);
    } catch {
      throw new Error(`${file}: ${field} must be a valid double-quoted YAML string`);
    }
  }

  if (raw.startsWith("'")) {
    if (!raw.endsWith("'")) throw new Error(`${file}: ${field} has an unterminated quoted value`);
    return raw.slice(1, -1).replaceAll("''", "'");
  }

  if (/:(?:\s|$)|(?:^|\s)#/.test(raw)) {
    throw new Error(`${file}: ${field} contains YAML syntax and must be quoted`);
  }

  return raw.trim();
};

export const parseSkill = (source, file) => {
  const lines = source.replaceAll('\r\n', '\n').split('\n');
  if (lines[0] !== '---') throw new Error(`${file}: frontmatter must start on line 1`);

  const end = lines.indexOf('---', 1);
  if (end < 2) throw new Error(`${file}: frontmatter closing delimiter is missing`);

  const metadata = {};
  for (const line of lines.slice(1, end)) {
    if (!line.trim()) continue;
    const match = line.match(/^([a-z][a-z-]*):\s+(.+)$/);
    if (!match) throw new Error(`${file}: unsupported or invalid frontmatter line: ${line}`);
    const [, key, raw] = match;
    if (!['name', 'description'].includes(key)) throw new Error(`${file}: unsupported frontmatter key ${key}`);
    if (metadata[key]) throw new Error(`${file}: duplicate frontmatter key ${key}`);
    metadata[key] = parseScalar(raw, file, key);
  }

  if (!metadata.name || !metadata.description) throw new Error(`${file}: name and description are required`);
  return metadata;
};

export const loadSkills = async () => {
  const skillsRoot = join(repoRoot, 'skills');
  const entries = (await readdir(skillsRoot, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .sort((left, right) => left.name.localeCompare(right.name));

  return Promise.all(entries.map(async ({ name: folder }) => {
    const relativeFile = `skills/${folder}/SKILL.md`;
    const source = await readFile(join(repoRoot, relativeFile), 'utf8');
    return { folder, relativeFile, ...parseSkill(source, relativeFile) };
  }));
};
