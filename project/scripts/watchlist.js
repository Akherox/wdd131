const watchlistForm = document.getElementById('watchlistForm');
const titleSelect = document.getElementById('watchTitle');
const noteInput = document.getElementById('watchNote');
const watchlistList = document.getElementById('watchlistList');

function populateTitleSelect() {
  const options = movies
    .map((movie) => `<option value="${movie.slug}">${movie.title}</option>`)
    .join('');
  titleSelect.insertAdjacentHTML('beforeend', options);
}

function renderStars(item) {
  const rating = item.myRating || 0;

  return [1, 2, 3, 4, 5]
    .map((value) => {
      const filledClass = value <= rating ? ' is-filled' : '';
      const label = `Rate ${value} star${value === 1 ? '' : 's'}`;
      return `<button type="button" class="rate-star-btn${filledClass}" data-id="${item.id}" data-value="${value}" aria-label="${label}" aria-pressed="${value <= rating}">&#9733;</button>`;
    })
    .join('');
}

function renderWatchlist() {
  const list = getMyMovies();

  if (list.length === 0) {
    watchlistList.innerHTML = `<p class="empty-state">Your list is empty. Add a movie above to get started.</p>`;
    return;
  }

  watchlistList.innerHTML = list
    .map((item) => {
      const movie = movies.find((m) => m.slug === item.slug);
      if (!movie) return '';

      const watchedClass = item.watched ? ' is-watched' : '';
      const noteMarkup = item.note ? `<p class="watchlist-item-note">${item.note}</p>` : '';
      const unwatchMarkup = item.watched
        ? `<button type="button" class="icon-btn unwatch" data-id="${item.id}">Mark as not watched</button>`
        : '';

      return `
        <li class="watchlist-item${watchedClass}" data-id="${item.id}">
          <div class="watchlist-item-info">
            <p class="watchlist-item-title">${movie.title}</p>
            ${noteMarkup}
            <div class="rate-stars" role="group" aria-label="Your rating for ${movie.title}">
              ${renderStars(item)}
            </div>
          </div>
          <div class="watchlist-actions">
            ${unwatchMarkup}
            <button type="button" class="icon-btn remove" data-id="${item.id}">Remove</button>
          </div>
        </li>
      `;
    })
    .join('');
}

function addToWatchlist(event) {
  event.preventDefault();

  const slug = titleSelect.value;
  if (!slug) return;

  const list = getMyMovies();
  const movie = movies.find((m) => m.slug === slug);

  const alreadyAdded = list.find((item) => item.slug === slug);
  if (alreadyAdded) {
    alert(`"${movie.title}" is already on your list.`);
    return;
  }

  const newItem = {
    id: Date.now().toString(),
    slug,
    note: noteInput.value.trim(),
    watched: false,
    myRating: null,
    dateAdded: new Date().toISOString(),
    dateWatched: null,
  };

  list.push(newItem);
  saveMyMovies(list);
  renderWatchlist();

  watchlistForm.reset();
  titleSelect.focus();
}

function handleListClick(event) {
  const button = event.target.closest('button');
  if (!button) return;

  const id = button.dataset.id;
  let list = getMyMovies();

  if (button.classList.contains('remove')) {
    list = list.filter((item) => item.id !== id);
  } else if (button.classList.contains('rate-star-btn')) {
    const value = Number(button.dataset.value);
    list = list.map((item) =>
      item.id === id
        ? { ...item, watched: true, myRating: value, dateWatched: new Date().toISOString() }
        : item
    );
  } else if (button.classList.contains('unwatch')) {
    list = list.map((item) =>
      item.id === id ? { ...item, watched: false, myRating: null, dateWatched: null } : item
    );
  }

  saveMyMovies(list);
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