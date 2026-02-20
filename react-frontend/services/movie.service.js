import api from "./api";

// Service pour gérer les films (style objet pour respecter la structure)
const movieService = {
    // Récupérer les films avec pagination
    async getAllMovies(page = 1, limit = 20) {
        try {
            const res = await api.get(`/movies?page=${page}&limit=${limit}`);
            return res.data;
        } catch (err) {
            console.error("Erreur films:", err);
            return { data: [] };
        }
    },

    // Chercher un film par son ID
    async getMovieById(id) {
        try {
            const res = await api.get(`/movies/${id}`);
            return res.data;
        } catch (err) {
            console.error("Erreur film:", err);
            return null;
        }
    }
};

export default movieService;
