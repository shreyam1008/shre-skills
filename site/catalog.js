const items = [...document.querySelectorAll('.skill-grid > li')];
const groups = [...document.querySelectorAll('[data-group]')];
const categoryLinks = [...document.querySelectorAll('[data-filter]')];
const search = document.querySelector('#skill-search');
const status = document.querySelector('#search-status');
let activeCategory = 'all';
const searchable = items.map((item) => ({
  item, text: item.dataset.search.toLowerCase(), category: item.closest('[data-group]').dataset.group,
}));

function filterSkills() {
  const terms = search.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
  let count = 0;
  for (const { item, text, category } of searchable) {
    item.hidden = !(activeCategory === 'all' || category === activeCategory) || !terms.every((term) => text.includes(term));
    if (!item.hidden) count++;
  }
  for (const group of groups) {
    const visible = [...group.querySelectorAll('.skill-grid > li')].filter((item) => !item.hidden).length;
    group.hidden = visible === 0;
    group.querySelector('[data-group-count]').textContent = visible;
  }
  for (const link of categoryLinks) {
    if (link.dataset.filter === activeCategory) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
  }
  status.textContent = `Showing ${count} of ${items.length} skills`;
  document.querySelector('#no-results').hidden = count !== 0;
}
function categoryFromHash() {
  let hash = location.hash;
  const legacyName = hash.startsWith('#skill-') ? hash.slice(7) : '';
  const replacement = items.find((item) => JSON.parse(item.dataset.aliases || '[]').includes(legacyName));
  if (replacement) {
    hash = '#' + replacement.querySelector('article').id;
    history.replaceState(null, '', hash);
  }
  activeCategory = categoryLinks.find((link) => link.hash === hash)?.dataset.filter || 'all';
  // Direct skill anchors must stay visible after another filter was selected.
  if (hash.startsWith('#skill-')) search.value = '';
  filterSkills();
  if (replacement) replacement.querySelector('article').scrollIntoView();
}
for (const link of categoryLinks) {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    activeCategory = link.dataset.filter;
    history.replaceState(null, '', link.hash);
    filterSkills();
  });
}
window.addEventListener('hashchange', categoryFromHash);
search.addEventListener('input', filterSkills);
document.querySelector('#clear-search').addEventListener('click', () => {
  search.value = '';
  activeCategory = 'all';
  history.replaceState(null, '', '#catalog');
  filterSkills();
  search.focus();
});
document.querySelector('.catalog-tools').hidden = false;
categoryFromHash();

const runnerSwitch = document.querySelector('.runner-switch');
function updateRunner() {
  const runner = runnerSwitch.querySelector('input:checked').value;
  for (const code of document.querySelectorAll('[data-install]')) {
    const skill = code.dataset.install === '*' ? "'*'" : code.dataset.install;
    code.textContent = `${runner} skills add shreyam1008/shre-skills --skill ${skill}`;
  }
  document.querySelector('#runner-help').textContent = runner === 'bunx'
    ? 'Use bunx with Bun installed. Run in your project, then choose your coding agent. The skills CLI also uses Node.js.'
    : 'Use npx with Node.js and npm installed. Run in your project, then choose your coding agent.';
  document.querySelector('#runner-status').textContent = `${runner} selected · applies to every command below`;
  for (const button of document.querySelectorAll('[data-copy]')) button.textContent = 'Copy';
}
runnerSwitch.addEventListener('change', updateRunner);
runnerSwitch.hidden = false;
updateRunner();

const copyStatus = document.querySelector('#copy-status');
let copyTimer;
for (const button of document.querySelectorAll('[data-copy]')) {
  button.hidden = false;
  button.addEventListener('click', async () => {
    const code = button.parentElement.querySelector('code');
    button.disabled = true;
    try {
      await navigator.clipboard.writeText(code.textContent.trim());
      button.textContent = 'Copied';
      copyStatus.textContent = `Copied ${button.dataset.copy} install command.`;
    } catch {
      const range = document.createRange();
      range.selectNodeContents(code);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      copyStatus.textContent = 'Clipboard unavailable. The command is selected; use your keyboard or menu to copy it.';
    } finally {
      button.disabled = false;
      setTimeout(() => { button.textContent = 'Copy'; }, 2000);
      clearTimeout(copyTimer);
      copyTimer = setTimeout(() => { copyStatus.textContent = ''; }, 8000);
    }
  });
}
