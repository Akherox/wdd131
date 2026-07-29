document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent =
  `Last Modification: ${document.lastModified}`;

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

const params = new URLSearchParams(window.location.search);
const summaryList = document.getElementById('summaryList');

const STORAGE_KEY = 'reviewCount';
const previousCount = parseInt(localStorage.getItem(STORAGE_KEY), 10) || 0;
const isRealSubmission = params.has('product');

if (isRealSubmission) {
  const newCount = previousCount + 1;
  localStorage.setItem(STORAGE_KEY, newCount);
  document.getElementById('reviewCount').textContent = newCount;

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