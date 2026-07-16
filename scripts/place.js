// Footer: current year and last modified date
document.querySelector('#currentyear').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent = `Last Modification: ${document.lastModified}`;

// Static weather inputs (metric units) matching the displayed values above.
// These will later be replaced with real-time API data in a future course.
const temperature = 28; // degrees Celsius
const windSpeed = 12; // km/h

// Returns the wind chill factor (metric formula) for a given temperature (C) and wind speed (km/h)
function calculateWindChill(tempC, windKph) {
  return 13.12 + 0.6215 * tempC - 11.37 * Math.pow(windKph, 0.16) + 0.3965 * tempC * Math.pow(windKph, 0.16);
}

// Wind chill is only meaningful when it's cold and there's enough wind to matter.
// Metric thresholds: temperature <= 10 C and wind speed > 4.8 km/h.
const windChillDisplay = document.querySelector('#windChill');

if (temperature <= 10 && windSpeed > 4.8) {
  windChillDisplay.textContent = `${calculateWindChill(temperature, windSpeed).toFixed(1)} \u00b0C`;
} else {
  windChillDisplay.textContent = 'N/A';
}