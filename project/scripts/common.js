document.getElementById('currentYear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent =
  `Last Modification: ${document.lastModified}`;

const navToggle = document.getElementById('navToggle');
const primaryNav = document.getElementById('primaryNav');

function closeNav() {
  primaryNav.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
}

function toggleNav() {
  const isOpen = primaryNav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

navToggle.addEventListener('click', toggleNav);

primaryNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeNav);
});