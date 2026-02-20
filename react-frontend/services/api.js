import axios from "axios";

// On crée une instance Axios pour éviter de retaper l'URL du serveur à chaque fois
const api = axios.create({
    baseURL: "http://localhost:5000/api", // L'adresse de notre backend Express
});

// Petit intercepteur : à chaque fois qu'on envoie une requête, 
// on vérifie si on a un token (le badge) caché dans le navigateur.
// Si oui, on l'ajoute dans les headers "Authorization".
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
