document.getElementById('currentYear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent =
  `Last Modification: ${document.lastModified}`;

const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
  navigation.classList.toggle('open');
  hamButton.classList.toggle('open');
});

const temples = [
  {
    templeName: 'Aba Nigeria',
    location: 'Aba, Abia State, Nigeria',
    dedicated: '2005, August, 7',
    area: 11500,
    imageUrl:
      'https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg'
  },
  {
    templeName: 'Manti Utah',
    location: 'Manti, Utah, United States',
    dedicated: '1888, May, 17',
    area: 74792,
    imageUrl:
      'https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg'
  },
  {
    templeName: 'Payson Utah',
    location: 'Payson, Utah, United States',
    dedicated: '2015, June, 7',
    area: 96630,
    imageUrl:
      'https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg'
  },
  {
    templeName: 'Yigo Guam',
    location: 'Yigo 96929, Guam',
    dedicated: '2020, May, 22',
    area: 6861,
    imageUrl:
      'https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg'
  },
  {
    templeName: 'Washington D.C.',
    location: 'Kensington, Maryland, United States',
    dedicated: '1974, November, 19-22',
    area: 156558,
    imageUrl:
      'https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg'
  },
  {
    templeName: 'Lima Peru',
    location: 'La Molina,Lima 12, Peru',
    dedicated: '1986, January, 10-12',
    area: 9600,
    imageUrl:
      'https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg'
  },
  {
    templeName: 'Mexico City Mexico',
    location: 'Col. San Juan de Aragon, Distrito Federal, Mexico',
    dedicated: '1983, December, 2-4',
    area: 116642,
    imageUrl:
      'https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg'
  },
  {
    templeName: 'St. George Utah',
    location: 'St. George, Utah, United States',
    dedicated: '1877, April, 6-8',
    area: 143969,
    imageUrl:
      'https://churchofjesuschristtemples.org/assets/img/temples/st.-george-utah-temple/st.-george-utah-temple-40435-main.jpg'
  },
  {
    templeName: 'Salt Lake',
    location: 'Salt Lake City, Utah, United States',
    dedicated: '1893, April, 6-24',
    area: 382207,
    imageUrl:
      'https://churchofjesuschristtemples.org/assets/img/temples/salt-lake-temple/salt-lake-temple-15669-main.jpg'
  },
  {
    templeName: 'Rome Italy',
    location: 'Via di Settebagni, Rome, RM, Italy',
    dedicated: '2019, March, 10-12',
    area: 41010,
    imageUrl:
      'https://churchofjesuschristtemples.org/assets/img/temples/rome-italy-temple/rome-italy-temple-2642-main.jpg'
  }
];

const gallery = document.getElementById('temple-gallery');
const galleryHeading = document.getElementById('gallery-heading');
const navButtons = document.querySelectorAll('.navigation button');

// Pulls the dedication year out of a "YYYY, Month, Day" string
function getDedicatedYear(dedicated) {
  return parseInt(dedicated.split(',')[0], 10);
}

const filters = {
  home: () => temples,
  old: () => temples.filter((t) => getDedicatedYear(t.dedicated) < 1900),
  new: () => temples.filter((t) => getDedicatedYear(t.dedicated) > 2000),
  large: () => temples.filter((t) => t.area > 90000),
  small: () => temples.filter((t) => t.area < 10000)
};

// Clears the gallery and builds one card per temple in the filtered list
// (single-function pattern from the "Developing an Array Filter" demo)
function createTempleCard(filteredTemples) {
  gallery.innerHTML = '';

  filteredTemples.forEach((temple) => {
    const card = document.createElement('section');
    card.classList.add('temple-card');

    const name = document.createElement('h3');
    const location = document.createElement('p');
    const dedication = document.createElement('p');
    const area = document.createElement('p');
    const img = document.createElement('img');

    name.textContent = temple.templeName;
    location.innerHTML = `<span class="label">Location:</span> ${temple.location}`;
    dedication.innerHTML = `<span class="label">Dedicated:</span> ${temple.dedicated}`;
    area.innerHTML = `<span class="label">Size:</span> ${temple.area.toLocaleString()} sq ft`;
    img.setAttribute('src', temple.imageUrl);
    img.setAttribute('alt', `${temple.templeName} Temple`);
    img.setAttribute('loading', 'lazy');

    card.appendChild(name);
    card.appendChild(location);
    card.appendChild(dedication);
    card.appendChild(area);
    card.appendChild(img);

    gallery.appendChild(card);
  });
}

navButtons.forEach((button) => {
  button.addEventListener('click', () => {
    navButtons.forEach((b) => b.classList.remove('active'));
    button.classList.add('active');

    const filterKey = button.dataset.filter;
    galleryHeading.textContent = button.title;
    createTempleCard(filters[filterKey]());

    // Collapse the mobile menu after choosing a filter
    navigation.classList.remove('open');
    hamButton.classList.remove('open');
  });
});

// Initial render: show all temples on load
createTempleCard(temples);