import { addAlert, loadAlerts } from './firebaseConfig.js'; 

// Código para manejar la geolocalización
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        
        // Aquí puedes mostrar el mapa y añadir marcadores
        console.log(`Latitud: ${lat}, Longitud: ${lng}`);
        
        // Ejemplo de cómo añadir una alerta al hacer clic en un botón
        document.getElementById("addAlertBtn").addEventListener("click", async () => {
            const description = document.getElementById("alertDescription").value;
            await addAlert(description, lat, lng);
            loadMap(); // Función para cargar el mapa y actualizar los marcadores
        });
    });
} else {
    console.log("Geolocalización no está soportada en este navegador.");
}

// Función para cargar el mapa y los marcadores
const loadMap = async () => {
    const alerts = await loadAlerts();
    alerts.forEach(alert => {
        // Aquí deberías añadir la lógica para colocar marcadores en el mapa
        console.log(`Alerta ID: ${alert.id}, Descripción: ${alert.description}, Ubicación: (${alert.lat}, ${alert.lng})`);
        // Ejemplo: addMarker(alert.lat, alert.lng, alert.description);
    });
};

// Llama a la función de carga de alertas al iniciar la aplicación
loadMap();
