var myMap = L.map('interactive-map').setView([55.691046, 12.599752], 13); // Replace with your coordinates

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap contributors'
}).addTo(myMap);

// Add markers or other features as needed
