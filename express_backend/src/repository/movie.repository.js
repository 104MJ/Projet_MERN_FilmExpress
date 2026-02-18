import MovieModel from "../model/movie.model.js";

class MovieRepository {
  static async findAll() {
    return await MovieModel.find().limit(100).select("-__v");
  }
  static async findById(id) {
    return await MovieModel.findById(id);
  }
  static async create(movieData) {
    const movie = new MovieModel(movieData);
    return await movie.save();
  }
  static async update(id, movieData) {
    return await MovieModel.findByIdAndUpdate(id, movieData, {
      new: true,
      runValidators: true,
    }).select("-__v");
  }
  static async delete(id) {
    return await MovieModel.findByIdAndDelete(id);
  }
}

export default MovieRepository;
