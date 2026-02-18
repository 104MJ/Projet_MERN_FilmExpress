import MovieRepository from "../repository/movie.repository.js";

class MovieService {
  static async getAllMovies() {
    return await MovieRepository.findAll();
  }
  static async getMovieById(id) {
    const movie = await MovieRepository.findById(id);
    if (!movie) {
      throw new Error("Movie not found");
    }
    return movie;
  }
  static async createMovie(movieData) {
    return await MovieRepository.create(movieData);
  }
  static async updateMovie(id, movieData) {
    return await MovieRepository.update(id, movieData);
  }
  static async deleteMovie(id) {
    return await MovieRepository.delete(id);
  }
}

export default MovieService;
