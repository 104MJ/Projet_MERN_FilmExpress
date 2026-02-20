import api from "./api";

// Service pour la connexion et l'inscription
const authService = {
    // Créer un compte
    async register(lesInfos) {
        const res = await api.post("/auth/register", lesInfos);
        return res.data;
    },

    // Se connecter
    async login(identifiants) {
        const res = await api.post("/auth/login", identifiants);
        return res.data;
    }
};

export default authService;
