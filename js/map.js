// Inicializar el mapa
const map = L.map('map').setView([-34.6037, -58.3816], 12); // Buenos Aires como punto de inicio

// Cargar el mapa desde OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Función para obtener la ubicación del usuario
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
        enableHighAccuracy: true
    });
} else {
    alert('La geolocalización no es compatible con este navegador.');
}

function successLocation(position) {
    const userCoords = [position.coords.latitude, position.coords.longitude];
    map.setView(userCoords, 14); // Centramos el mapa en la ubicación del usuario
    L.marker(userCoords).addTo(map).bindPopup('Tu ubicación actual').openPopup();
}

function errorLocation() {
    alert('No pudimos obtener tu ubicación. Mostramos Buenos Aires por defecto.');
}

// Añadir una alerta en el mapa
document.getElementById('submitAlert').addEventListener('click', function() {
    const description = document.getElementById('description').value;
    const center = map.getCenter();

    // Añadir un marcador para el robo reportado
    L.marker([center.lat, center.lng]).addTo(map)
        .bindPopup(`<p><strong>Robo Reportado:</strong> ${description}</p>`)
        .openPopup();

    // Limpiar el textarea
    document.getElementById('description').value = '';
});
