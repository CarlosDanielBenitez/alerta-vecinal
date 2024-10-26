// Importar las funciones necesarias de Firebase
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore"; 

// Tu configuración de Firebase
const firebaseConfig = {
    apiKey: "TU_API_KEY", // Reemplaza con el valor real
    authDomain: "TU_AUTH_DOMAIN", // Reemplaza con el valor real
    projectId: "f5MCVk3eTvWyaw88FzHSwGXlX4kdwiN7JHoQ7v6F", // Puedes usar el ID del proyecto aquí
    storageBucket: "TU_STORAGE_BUCKET", // Reemplaza con el valor real
    messagingSenderId: "442136896208", // Este es tu ID de mensajería
    appId: "TU_APP_ID" // Reemplaza con el valor real
  };
  
// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Función para agregar alertas
export const addAlert = async (description, lat, lng) => {
    const date = new Date().toLocaleString();
    try {
        const docRef = await addDoc(collection(db, "alertas"), {
            description: description,
            lat: lat,
            lng: lng,
            date: date
        });
        console.log("Alerta añadida con ID: ", docRef.id);
    } catch (e) {
        console.error("Error añadiendo alerta: ", e);
    }
};

// Función para cargar alertas
export const loadAlerts = async () => {
    const querySnapshot = await getDocs(collection(db, "alertas"));
    const alerts = [];
    querySnapshot.forEach((doc) => {
        const alertData = doc.data();
        alerts.push({
            id: doc.id,
            ...alertData
        });
    });
    return alerts;
};
