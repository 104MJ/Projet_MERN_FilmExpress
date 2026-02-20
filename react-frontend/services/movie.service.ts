import api from "./api";

// Interface pour le typage (à ajuster si un fichier models/Movie existe déjà)
interface Movie {
  _id: string;
  titre: string;
  prix: number;
  realisateur: string;
  annee: number;
  genre: string;
  description: string;
}

const MovieService = {
  async getAllMovies(): Promise<any> {
    try {
      const response = await api.get("/movies");
      return response.data;
    } catch (error) {
      throw new Error("Erreur lors de la récupération des films");
    }
  },

  async getMovieById(id: string): Promise<any> {
    try {
      const response = await api.get(`/movies/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Erreur lors de la récupération du film");
    }
  }
};

export default MovieService;
