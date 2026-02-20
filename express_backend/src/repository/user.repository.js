import UserModel from "../model/user.model.js";

// Ici on s'occupe de la table des utilisateurs
class UserRepository {

    // Voir tout le monde
    static async findAll() {
        return await UserModel.find().select("-__v");
    }

    // Chercher quelqu'un par son ID
    static async findById(id) {
        return await UserModel.findById(id);
    }

    // Créer un nouvel utilisateur
    static async create(infos) {
        const nouvelUtilisateur = new UserModel(infos);
        return await nouvelUtilisateur.save();
    }

    // Modifier les infos de quelqu'un
    static async update(id, nouvellesInfos) {
        return await UserModel.findByIdAndUpdate(id, nouvellesInfos, {
            new: true,
            runValidators: true,
        }).select("-__v");
    }

    // Supprimer un compte
    static async delete(id) {
        return await UserModel.findByIdAndDelete(id);
    }
}

export default UserRepository;
