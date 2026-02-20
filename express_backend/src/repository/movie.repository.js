import MovieModel from "../model/movie.model.js";

// Ici on parle directement à MongoDB pour les films
class MovieRepository {

    // Chercher les films avec pagination
    static async findAll(page = 1, limit = 20) {
        const saut = (page - 1) * limit;
        return await MovieModel.find()
            .skip(saut)
            .limit(limit)
            .select("-__v");
    }

    // Trouver un film avec son ID
    static async findById(id) {
        return await MovieModel.findById(id);
    }

    // Ajouter un nouveau film
    static async create(donnees) {
        const film = new MovieModel(donnees);
        return await film.save();
    }

    // Modifier un film existant
    static async update(id, nouvellesDonnees) {
        return await MovieModel.findByIdAndUpdate(id, nouvellesDonnees, {
            new: true,
            runValidators: true,
        }).select("-__v");
    }

    // Supprimer un film
    static async delete(id) {
        return await MovieModel.findByIdAndDelete(id);
    }
}

export default MovieRepository;
