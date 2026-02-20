import MovieRepository from "../repository/movie.repository.js";

// Gestion des films via le repository
class MovieService {

  // Liste des films avec pagination
  static async getAllMovies(page, limit) {
    return await MovieRepository.findAll(page, limit);
  }

  // Chercher un film par son ID
  static async getMovieById(id) {
    const film = await MovieRepository.findById(id);
    if (!film) {
      throw new Error("Film non trouvé !");
    }
    return film;
  }

  // Créer un film
  static async createMovie(donnees) {
    return await MovieRepository.create(donnees);
  }

  // Mettre à jour un film
  static async updateMovie(id, nouvellesDonnees) {
    return await MovieRepository.update(id, nouvellesDonnees);
  }

  // Supprimer un film
  static async deleteMovie(id) {
    return await MovieRepository.delete(id);
  }
}

export default MovieService;
