const movieGrid = document.getElementById('movieGrid');
const filterBar = document.getElementById('filterBar');

function renderMovies(list) {
  if (list.length === 0) {
    movieGrid.innerHTML = `<p class="empty-state">No movies match that filter yet.</p>`;
    return;
  }

  movieGrid.innerHTML = list
    .map(
      (movie) => `
        <article class="movie-card">
          <div class="movie-card-poster">
            <img src="${getPosterUrl(movie)}" alt="${movie.title} poster (temporary placeholder)" loading="lazy" width="400" height="600">
          </div>
          <div class="ticket-divider" aria-hidden="true"></div>
          <div class="movie-card-body">
            <h3>${movie.title}</h3>
            <p class="movie-meta">${movie.genre} &middot; ${movie.year}</p>
            <p class="movie-rating">&#9733; ${movie.rating.toFixed(1)} / 5</p>
            <p class="movie-blurb">${movie.blurb}</p>
          </div>
        </article>
      `
    )
    .join('');
}

function buildFilterBar() {
  const genres = ['All', ...new Set(movies.map((movie) => movie.genre))];

  filterBar.innerHTML = genres
    .map(
      (genre, index) => `
        <button type="button" class="filter-btn" data-genre="${genre}" aria-pressed="${index === 0}">
          ${genre}
        </button>
      `
    )
    .join('');
}

function handleFilterClick(event) {
  const button = event.target.closest('.filter-btn');
  if (!button) return;

  filterBar.querySelectorAll('.filter-btn').forEach((btn) => {
    btn.setAttribute('aria-pressed', 'false');
  });
  button.setAttribute('aria-pressed', 'true');

  const genre = button.dataset.genre;
  const filtered = genre === 'All' ? movies : movies.filter((movie) => movie.genre === genre);
  renderMovies(filtered);
}

buildFilterBar();
renderMovies(movies);
filterBar.addEventListener('click', handleFilterClick);