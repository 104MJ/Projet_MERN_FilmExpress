import MovieService from "../service/movie.service.js";
import ApiResponse from "../utils/apiResponse.js";

class MovieController {
  static async getAllMovies(req, res) {
    try {
      const movies = await MovieService.getAllMovies();
      ApiResponse.success(res, "Movies retrieved successfully", movies);
    } catch (error) {
      ApiResponse.error(res, "Failed to retrieve movies", error);
    }
  }

  static async getMovieById(req, res) {
    try {
      const movie = await MovieService.getMovieById(req.params.id);
      ApiResponse.success(res, "Movie retrieved successfully", movie);
    } catch (error) {
      ApiResponse.error(res, "Failed to retrieve movie", error);
    }
  }

  static async createMovie(req, res) {
    try {
      const newMovie = await MovieService.createMovie(req.body);
      ApiResponse.success(res, "Movie created successfully", newMovie);
    } catch (error) {
      ApiResponse.error(res, "Failed to create movie", error);
    }
  }

  static async updateMovie(req, res) {
    try {
      const updatedMovie = await MovieService.updateMovie(
        req.params.id,
        req.body,
      );
      ApiResponse.success(res, "Movie updated successfully", updatedMovie);
    } catch (error) {
      ApiResponse.error(res, "Failed to update movie", error);
    }
  }

  static async deleteMovie(req, res) {
    try {
      await MovieService.deleteMovie(req.params.id);
      ApiResponse.success(res, "Movie deleted successfully");
    } catch (error) {
      ApiResponse.error(res, "Failed to delete movie", error);
    }
  }
}

export default MovieController;
