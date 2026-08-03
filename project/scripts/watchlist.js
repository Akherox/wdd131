const STORAGE_KEY = 'reelkeeper-watchlist';

const watchlistForm = document.getElementById('watchlistForm');
const titleSelect = document.getElementById('watchTitle');
const noteInput = document.getElementById('watchNote');
const watchlistList = document.getElementById('watchlistList');

function loadWatchlist() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveWatchlist(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function populateTitleSelect() {
  const options = movies
    .map((movie) => `<option value="${movie.title}">${movie.title}</option>`)
    .join('');
  titleSelect.insertAdjacentHTML('beforeend', options);
}

function renderWatchlist() {
  const list = loadWatchlist();

  if (list.length === 0) {
    watchlistList.innerHTML = `<p class="empty-state">Your watchlist is empty. Add a movie above to get started.</p>`;
    return;
  }

  watchlistList.innerHTML = list
    .map((item) => {
      const watchedClass = item.watched ? ' is-watched' : '';
      const noteMarkup = item.note ? `<p class="watchlist-item-note">${item.note}</p>` : '';
      const toggleLabel = item.watched ? 'Mark as not watched' : 'Mark as watched';

      return `
        <li class="watchlist-item${watchedClass}" data-id="${item.id}">
          <div class="watchlist-item-info">
            <p class="watchlist-item-title">${item.title}</p>
            ${noteMarkup}
          </div>
          <div class="watchlist-actions">
            <button type="button" class="icon-btn toggle" data-id="${item.id}">${toggleLabel}</button>
            <button type="button" class="icon-btn remove" data-id="${item.id}">Remove</button>
          </div>
        </li>
      `;
    })
    .join('');
}

function addToWatchlist(event) {
  event.preventDefault();

  const title = titleSelect.value;
  if (!title) return;

  const list = loadWatchlist();

  const alreadyAdded = list.find((item) => item.title === title);
  if (alreadyAdded) {
    alert(`"${title}" is already on your watchlist.`);
    return;
  }

  const newItem = {
    id: Date.now().toString(),
    title,
    note: noteInput.value.trim(),
    watched: false,
  };

  list.push(newItem);
  saveWatchlist(list);
  renderWatchlist();

  watchlistForm.reset();
  titleSelect.focus();
}

function handleListClick(event) {
  const button = event.target.closest('button');
  if (!button) return;

  const id = button.dataset.id;
  let list = loadWatchlist();

  if (button.classList.contains('remove')) {
    list = list.filter((item) => item.id !== id);
  } else if (button.classList.contains('toggle')) {
    list = list.map((item) =>
      item.id === id ? { ...item, watched: !item.watched } : item
    );
  }

  saveWatchlist(list);
  renderWatchlist();
}

function pulseSelectedTitle() {
  titleSelect.classList.remove('is-selected');
  void titleSelect.offsetWidth;
  titleSelect.classList.add('is-selected');
}

populateTitleSelect();
renderWatchlist();
watchlistForm.addEventListener('submit', addToWatchlist);
watchlistList.addEventListener('click', handleListClick);
titleSelect.addEventListener('change', pulseSelectedTitle);
titleSelect.addEventListener('animationend', () => titleSelect.classList.remove('is-selected'));