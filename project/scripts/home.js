const featuredGrid = document.getElementById('featuredGrid');
const ratingStats = document.getElementById('ratingStats');

function getTopRated(count) {
  return getMyMovies()
    .filter((entry) => entry.watched && entry.myRating)
    .sort((a, b) => b.myRating - a.myRating)
    .slice(0, count)
    .map((entry) => ({
      ...movies.find((movie) => movie.slug === entry.slug),
      myRating: entry.myRating,
    }))
    .filter((movie) => movie.slug);
}

function renderStats() {
  const rated = getMyMovies().filter((entry) => entry.watched && entry.myRating);

  if (rated.length === 0) {
    ratingStats.textContent = '';
    return;
  }

  const total = rated.reduce((sum, entry) => sum + entry.myRating, 0);
  const average = total / rated.length;

  ratingStats.innerHTML = `I've rated <strong>${rated.length}</strong> movie${rated.length === 1 ? '' : 's'} so far, averaging <strong>${average.toFixed(1)}&#9733;</strong>.`;
}

function renderFeatured() {
  const featured = getTopRated(3);

  if (featured.length === 0) {
    featuredGrid.innerHTML = `<p class="empty-state">No rated movies yet. Head to the <a href="watchlist.html">watchlist</a> and rate something you've watched.</p>`;
    return;
  }

  featuredGrid.innerHTML = featured
    .map((movie, index) => {
      const loadingAttrs = index === 0 ? 'fetchpriority="high"' : '';

      return `
        <article class="movie-card">
          <div class="movie-card-poster">
            <img src="${getPosterUrl(movie)}" alt="${movie.title} poster" ${loadingAttrs} width="400" height="600">
          </div>
          <div class="ticket-divider" aria-hidden="true"></div>
          <div class="movie-card-body">
            <h3>${movie.title}</h3>
            <p class="movie-meta">${movie.genre} &middot; ${movie.year}</p>
            <p class="movie-rating">&#9733; ${movie.myRating.toFixed(1)} / 5 <span class="hint">(your rating)</span></p>
            <p class="movie-blurb">${movie.blurb}</p>
          </div>
        </article>
      `;
    })
    .join('');
}

renderStats();
renderFeatured();