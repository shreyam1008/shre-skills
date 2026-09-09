const items = [...document.querySelectorAll('.skill-grid > li')];
const search = document.querySelector('#skill-search');
const status = document.querySelector('#search-status');
const searchable = items.map((item) => ({ item, text: item.querySelector('article').textContent.toLowerCase() }));

function filterSkills() {
  const terms = search.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
  let count = 0;
  for (const { item, text } of searchable) {
    item.hidden = !terms.every((term) => text.includes(term));
    if (!item.hidden) count++;
  }
  status.textContent = `Showing ${count} of ${items.length} skills`;
  document.querySelector('#no-results').hidden = count !== 0;
}

search.addEventListener('input', filterSkills);
document.querySelector('#clear-search').addEventListener('click', () => {
  search.value = '';
  filterSkills();
  search.focus();
});
document.querySelector('.catalog-tools').hidden = false;
filterSkills();

const copyStatus = document.querySelector('#copy-status');
let copyTimer;
for (const button of document.querySelectorAll('[data-copy]')) {
  button.hidden = false;
  button.addEventListener('click', async () => {
    const code = button.parentElement.querySelector('code');
    button.disabled = true;
    try {
      await navigator.clipboard.writeText(code.textContent.trim());
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
      clearTimeout(copyTimer);
      copyTimer = setTimeout(() => { copyStatus.textContent = ''; }, 8000);
    }
  });
}
