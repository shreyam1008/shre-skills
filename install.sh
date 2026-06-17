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

mkdir -p "${DEST}"

copy_one() {
  local name="$1"
  local src="${SKILLS_SRC}/${name}"
  if [[ ! -d "${src}" ]]; then
    echo "error: skill '${name}' not found. Available skills:" >&2
    ls -1 "${SKILLS_SRC}" >&2
    exit 1
  fi
  rm -rf "${DEST:?}/${name}"
  cp -R "${src}" "${DEST}/${name}"
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

echo "Done."
