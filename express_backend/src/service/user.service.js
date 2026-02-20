import UserRepository from "../repository/user.repository.js";

// Gestion des utilisateurs
class UserService {

  static async getAllUsers() {
    return await UserRepository.findAll();
  }

  static async getUserById(id) {
    const util = await UserRepository.findById(id);
    if (!util) {
      throw new Error("Utilisateur non trouvé");
    }
    return util;
  }

  static async createUser(donnees) {
    return await UserRepository.create(donnees);
  }

  static async updateUser(id, donnees) {
    return await UserRepository.update(id, donnees);
  }

  static async deleteUser(id) {
    return await UserRepository.delete(id);
  }
}

export default UserService;
