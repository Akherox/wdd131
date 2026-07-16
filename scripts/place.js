document.querySelector('#currentyear').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent = `Last Modification: ${document.lastModified}`;

const temperature = 28; // degrees Celsius
const windSpeed = 12; // km/h

function calculateWindChill(tempC, windKph) {
  return 13.12 + 0.6215 * tempC - 11.37 * Math.pow(windKph, 0.16) + 0.3965 * tempC * Math.pow(windKph, 0.16);
}

const windChillDisplay = document.querySelector('#windChill');

if (temperature <= 10 && windSpeed > 4.8) {
  windChillDisplay.textContent = `${calculateWindChill(temperature, windSpeed).toFixed(1)} \u00b0C`;
} else {
  windChillDisplay.textContent = 'N/A';
}