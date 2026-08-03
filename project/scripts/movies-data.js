const movies = [
  {
    slug: 'wreck-it-ralph',
    title: 'Wreck-It Ralph',
    year: 2012,
    genre: 'Comedy',
    rating: 4.8,
    favorite: true,
    blurb: 'Ralph is a video game villain who wants to be a hero. I love how the movie mixes different game worlds and still feels like one story.',
  },
  {
    slug: 'httyd2',
    title: 'How to Train Your Dragon 2',
    year: 2014,
    genre: 'Adventure',
    rating: 4.9,
    favorite: true,
    blurb: 'Hiccup and Toothless are older now, and the story gets bigger and more emotional. The dragons look amazing, and the ending always gets me.',
  },
  {
    slug: 'big-hero-6',
    title: 'Big Hero 6',
    year: 2014,
    genre: 'Action',
    rating: 4.7,
    favorite: true,
    blurb: 'Hiro builds a team of young heroes with his robot friend Baymax. It is funny and sad at the same time, and it has a lot of heart.',
  },
  {
    slug: 'coco',
    title: 'Coco',
    year: 2017,
    genre: 'Family',
    rating: 4.6,
    favorite: false,
    blurb: 'A boy named Miguel travels to the Land of the Dead to learn about his family. The music and colors make this movie really special.',
  },
  {
    slug: 'zootopia',
    title: 'Zootopia',
    year: 2016,
    genre: 'Comedy',
    rating: 4.4,
    favorite: false,
    blurb: 'A rabbit and a fox solve a mystery in a city full of animals. It is funny but also talks about real problems, like judging people too fast.',
  },
  {
    slug: 'klaus',
    title: 'Klaus',
    year: 2019,
    genre: 'Family',
    rating: 4.3,
    favorite: false,
    blurb: 'A postman in a cold town accidentally starts a new Santa Claus tradition. It is a simple story, but it made me smile a lot.',
  },
  {
    slug: 'spider-verse',
    title: 'Spider-Man: Into the Spider-Verse',
    year: 2018,
    genre: 'Action',
    rating: 4.7,
    favorite: false,
    blurb: 'Miles Morales becomes Spider-Man in a world with many different Spider-People. The art style is unlike any other animated movie I have seen.',
  },
  {
    slug: 'moana',
    title: 'Moana',
    year: 2016,
    genre: 'Adventure',
    rating: 4.5,
    favorite: false,
    blurb: 'Moana sails the ocean to save her island, with help from a demigod named Maui. Great music and a strong main character.',
  },
  {
    slug: 'iron-giant',
    title: 'The Iron Giant',
    year: 1999,
    genre: 'Family',
    rating: 4.2,
    favorite: false,
    blurb: 'A giant robot falls from the sky and becomes friends with a young boy. It is an older movie, but the story still feels powerful today.',
  },
];

const posterColorsByGenre = {
  Comedy: ['2a1f33', 'f13c50'],
  Adventure: ['1f2933', 'e8b923'],
  Action: ['101820', '3fa7d6'],
  Family: ['1a2a1f', 'e8b923'],
};

function getPosterUrl(movie) {
  const [bg, fg] = posterColorsByGenre[movie.genre] || ['232323', 'e8b923'];
  const label = encodeURIComponent(movie.title);
  return `https://placehold.co/400x600/${bg}/${fg}?font=oswald&text=${label}`;
}