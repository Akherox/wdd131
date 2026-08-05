const featuredGrid = document.getElementById('featuredGrid');

function renderFeatured() {
  const featured = movies.filter((movie) => movie.favorite);

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
            <p class="movie-rating">&#9733; ${movie.rating.toFixed(1)} / 5</p>
            <p class="movie-blurb">${movie.blurb}</p>
          </div>
        </article>
      `;
    })
    .join('');
}

renderFeatured();