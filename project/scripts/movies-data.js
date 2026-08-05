const movies = [
  {
    slug: 'wreck-it-ralph',
    title: 'Wreck-It Ralph',
    year: 2012,
    genre: 'Comedy',
    blurb: 'A video game villain leaves his arcade cabinet, hoping to prove he can be a hero.',
  },
  {
    slug: 'httyd2',
    title: 'How to Train Your Dragon 2',
    year: 2014,
    genre: 'Adventure',
    blurb: 'Hiccup and Toothless discover a hidden world of dragons and face a growing threat to their home.',
  },
  {
    slug: 'big-hero-6',
    title: 'Big Hero 6',
    year: 2014,
    genre: 'Action',
    blurb: 'A young robotics prodigy forms a superhero team with his inflatable robot, Baymax.',
  },
  {
    slug: 'coco',
    title: 'Coco',
    year: 2017,
    genre: 'Family',
    blurb: 'A boy is transported to the Land of the Dead, where he uncovers his family\u2019s forgotten history.',
  },
  {
    slug: 'zootopia',
    title: 'Zootopia',
    year: 2016,
    genre: 'Comedy',
    blurb: 'A rookie rabbit officer and a con-artist fox uncover a conspiracy in a city of anthropomorphic animals.',
  },
  {
    slug: 'klaus',
    title: 'Klaus',
    year: 2019,
    genre: 'Family',
    blurb: 'A postman in a remote arctic town accidentally starts a Christmas tradition with a reclusive toymaker.',
  },
  {
    slug: 'spider-verse',
    title: 'Spider-Man: Into the Spider-Verse',
    year: 2018,
    genre: 'Action',
    blurb: 'Miles Morales becomes Spider-Man and meets alternate versions of the hero from other dimensions.',
  },
  {
    slug: 'moana',
    title: 'Moana',
    year: 2016,
    genre: 'Adventure',
    blurb: 'A chief\u2019s daughter sails across the Pacific with a demigod to save her island.',
  },
  {
    slug: 'iron-giant',
    title: 'The Iron Giant',
    year: 1999,
    genre: 'Family',
    blurb: 'A boy befriends a giant robot from outer space during the Cold War.',
  },
];

function getPosterUrl(movie) {
  return `images/${movie.slug}.jpg`;
}

const MY_MOVIES_KEY = 'reelkeeper-mymovies';

const DEFAULT_MY_MOVIES = [
  { slug: 'wreck-it-ralph', note: 'One of my all-time favorites.', myRating: 5 },
  { slug: 'httyd2', note: 'The dragons still get me every time.', myRating: 5 },
  { slug: 'big-hero-6', note: 'Baymax is the best.', myRating: 4.5 },
];

function getMyMovies() {
  const stored = localStorage.getItem(MY_MOVIES_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveMyMovies(list) {
  localStorage.setItem(MY_MOVIES_KEY, JSON.stringify(list));
}

function ensureSeedData() {
  if (localStorage.getItem(MY_MOVIES_KEY)) return;

  const now = new Date().toISOString();
  const seeded = DEFAULT_MY_MOVIES.map((entry, index) => ({
    id: `seed-${index}`,
    slug: entry.slug,
    note: entry.note,
    watched: true,
    myRating: entry.myRating,
    dateAdded: now,
    dateWatched: now,
  }));

  saveMyMovies(seeded);
}

function getMyRating(slug) {
  const entry = getMyMovies().find((m) => m.slug === slug && m.watched && m.myRating);
  return entry ? entry.myRating : null;
}

ensureSeedData();