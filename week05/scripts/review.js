// Footer: copyright year + last modified (same pattern used across the course)
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent =
  `Last Modification: ${document.lastModified}`;

// Same product list as form.html, used here only to translate the submitted
// product id back into a friendly name for the summary.
const products = [
  { id: 'fc-1888', name: 'flux capacitor' },
  { id: 'fc-2050', name: 'power laces' },
  { id: 'fs-1987', name: 'time circuits' },
  { id: 'ac-2000', name: 'low voltage reactor' },
  { id: 'jj-1969', name: 'warp equalizer' },
];

const featureLabels = {
  durability: 'Durability',
  'ease-of-use': 'Ease of Use',
  performance: 'Performance',
  design: 'Design',
};

// --- Submission summary ----------------------------------------------
// The form uses method="get", so the submitted fields arrive as a query string.
const params = new URLSearchParams(window.location.search);
const summaryList = document.getElementById('summaryList');

// --- Review counter -------------------------------------------------
// Increments only when this page was reached via an actual form submission
// (i.e. a query string is present), not on a plain reload of review.html.
const STORAGE_KEY = 'reviewCount';
const previousCount = parseInt(localStorage.getItem(STORAGE_KEY), 10) || 0;
const isRealSubmission = params.has('product');

if (isRealSubmission) {
  const newCount = previousCount + 1;
  localStorage.setItem(STORAGE_KEY, newCount);
  document.getElementById('reviewCount').textContent = newCount;

  // Strip the query string from the address bar. This way, an F5 on this
  // exact page reloads a "plain" review.html (no params) instead of
  // re-submitting the same data and inflating the counter again.
  history.replaceState(null, '', window.location.pathname);
} else {
  document.getElementById('reviewCount').textContent = previousCount;
}

function addSummaryRow(label, value) {
  if (!value) return;
  const row = document.createElement('div');
  const dt = document.createElement('dt');
  dt.textContent = label;
  const dd = document.createElement('dd');
  dd.textContent = value;
  row.appendChild(dt);
  row.appendChild(dd);
  summaryList.appendChild(row);
}

const productId = params.get('product');
const productName = products.find((p) => p.id === productId)?.name;
addSummaryRow('Product', productName);

const rating = params.get('rating');
addSummaryRow('Rating', rating ? `${'\u2605'.repeat(rating)} (${rating}/5)` : null);

const installDate = params.get('installDate');
addSummaryRow('Installed On', installDate);

const features = params
  .getAll('features')
  .map((value) => featureLabels[value] || value)
  .join(', ');
addSummaryRow('Useful Features', features);

const userName = params.get('userName');
addSummaryRow('Reviewer', userName);