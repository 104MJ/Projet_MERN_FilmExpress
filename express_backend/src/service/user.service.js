import UserRepository from "../repository/user.repository.js";

class UserService {
  static async getAllUsers() {
    return await UserRepository.findAll();
  }
  static async getUserById(id) {
    const user = await UserRepository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }
  static async createUser(userData) {
    return await UserRepository.create(userData);
  }
  static async updateUser(id, userData) {
    return await UserRepository.update(id, userData);
  }
  static async deleteUser(id) {
    return await UserRepository.delete(id);
  }
}

export default UserService;
