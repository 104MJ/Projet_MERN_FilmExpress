import MovieService from "../service/movie.service.js";
import ApiResponse from "../utils/apiResponse.js";

// On gère les requêtes pour les films
class MovieController {

  // Récupérer les films (avec pagination)
  static async getAllMovies(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 20;

      const lesFilms = await MovieService.getAllMovies(page, limit);
      ApiResponse.success(res, "Liste des films récupérée !", lesFilms);
    } catch (err) {
      ApiResponse.error(res, "Erreur catalogue", err);
    }
  }

  // Un seul film par son ID
  static async getMovieById(req, res) {
    try {
      const leFilm = await MovieService.getMovieById(req.params.id);
      ApiResponse.success(res, "Film trouvé !", leFilm);
    } catch (err) {
      ApiResponse.error(res, "Film non trouvé", err, 404);
    }
  }

  // Ajouter un film
  static async createMovie(req, res) {
    try {
      const nouveau = await MovieService.createMovie(req.body);
      ApiResponse.success(res, "Film créé !", nouveau, 201);
    } catch (err) {
      ApiResponse.error(res, "Impossible de créer le film", err);
    }
  }

  // Modifier un film
  static async updateMovie(req, res) {
    try {
      const modifie = await MovieService.updateMovie(req.params.id, req.body);
      ApiResponse.success(res, "Film modifié !", modifie);
    } catch (err) {
      ApiResponse.error(res, "Gros soucis pendant la modif", err);
    }
  }

  // Supprimer un film
  static async deleteMovie(req, res) {
    try {
      await MovieService.deleteMovie(req.params.id);
      ApiResponse.success(res, "Film supprimé avec succès !");
    } catch (err) {
      ApiResponse.error(res, "Erreur de suppression", err);
    }
  }
}

export default MovieController;
