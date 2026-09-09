#!/usr/bin/env bash
#
# shre-skills installer
# Copies skills into a project's .agents/skills/ directory.
#
# Usage:
#   ./install.sh                      # install ALL skills into ./.agents/skills
#   ./install.sh <skill>              # install one skill into ./.agents/skills
#   ./install.sh <skill> <target>    # install one skill into <target>/.agents/skills
#   ./install.sh all <target>        # install ALL skills into <target>/.agents/skills
#
# Examples:
#   ./install.sh
#   ./install.sh webgl
#   ./install.sh react-three-fiber ~/code/my-app
#   ./install.sh all ~/code/my-app

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SKILLS_SRC="${SCRIPT_DIR}/skills"

SKILL="${1:-all}"
TARGET="${2:-$(pwd)}"
DEST="${TARGET}/.agents/skills"

if [[ ! -d "${SKILLS_SRC}" ]]; then
  echo "error: skills source not found at ${SKILLS_SRC}" >&2
  exit 1
fi

is_valid_skill_name() {
  [[ "$1" =~ ^[a-z0-9]+(-[a-z0-9]+)*$ ]]
}

if [[ "${SKILL}" != "all" ]] && ! is_valid_skill_name "${SKILL}"; then
  echo "error: invalid skill name '${SKILL}'" >&2
  exit 1
fi
while IFS=$'\t' read -r previous replacement; do
  if [[ "${SKILL}" == "${previous}" ]]; then
    echo "note: ${previous} merged into ${replacement}; installing ${replacement}." >&2
    SKILL="${replacement}"
    break
  fi
done < "${SCRIPT_DIR}/skill-migrations.tsv"
if [[ -L "${TARGET}/.agents" || -L "${DEST}" ]]; then
  echo "error: refusing symlinked skills destination" >&2
  exit 1
fi
mkdir -p "${DEST}"
DEST="$(cd "${DEST}" && pwd -P)"

copy_one() {
  local name="$1"
  local src="${SKILLS_SRC}/${name}"
  local dest staging backup
  if ! is_valid_skill_name "${name}"; then
    echo "error: invalid skill name '${name}'" >&2
    exit 1
  fi
  if [[ ! -d "${src}" || -L "${src}" || ! -f "${src}/SKILL.md" ]]; then
    echo "error: skill '${name}' not found. Available skills:" >&2
    ls -1 "${SKILLS_SRC}" >&2
    exit 1
  fi

  dest="${DEST}/${name}"
  if [[ -L "${dest}" ]]; then
    echo "error: refusing symlinked skill destination '${name}'" >&2
    exit 1
  fi
  if [[ "$(dirname "${dest}")" != "${DEST}" ]]; then
    echo "error: refusing destination outside ${DEST}" >&2
    exit 1
  fi

  staging="$(mktemp -d "${DEST}/.${name}.tmp.XXXXXX")"
  cp -R "${src}/." "${staging}/"

  if [[ -e "${dest}" ]]; then
    backup="$(mktemp -d "${DEST}/.${name}.backup.XXXXXX")"
    rmdir "${backup}"
    mv "${dest}" "${backup}"
    if ! mv "${staging}" "${dest}"; then
      mv "${backup}" "${dest}"
      echo "error: failed to replace ${name}; previous copy restored" >&2
      exit 1
    fi
    rm -rf -- "${backup}"
  else
    mv "${staging}" "${dest}"
  fi
  echo "  installed ${name}"
}

echo "Installing into ${DEST}"

if [[ "${SKILL}" == "all" ]]; then
  for dir in "${SKILLS_SRC}"/*/; do
    copy_one "$(basename "${dir}")"
  done
else
  copy_one "${SKILL}"
fi

while IFS=$'\t' read -r previous replacement; do
  if [[ -e "${DEST}/${previous}/SKILL.md" ]]; then
    echo "note: existing ${previous} is retired; after checking local edits, remove or disable it and use ${replacement}." >&2
  fi
done < "${SCRIPT_DIR}/skill-migrations.tsv"
echo "Done."
