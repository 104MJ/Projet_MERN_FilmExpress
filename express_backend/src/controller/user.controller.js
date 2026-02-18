import UserService from "../service/user.service.js";
import ApiResponse from "../utils/apiResponse.js";

class UserController {
  static async getAllUsers(req, res) {
    try {
      const users = await UserService.getAllUsers();
      ApiResponse.success(res, "Users retrieved successfully", users);
    } catch (error) {
      ApiResponse.error(res, "Failed to retrieve users", error);
    }
  }

  static async getUserById(req, res) {
    try {
      const user = await UserService.getUserById(req.params.id);
      ApiResponse.success(res, "User retrieved successfully", user);
    } catch (error) {
      ApiResponse.error(res, "Failed to retrieve user", error);
    }
  }

  static async createUser(req, res) {
    try {
      const newUser = await UserService.createUser(req.body);
      ApiResponse.success(res, "User created successfully", newUser);
    } catch (error) {
      ApiResponse.error(res, "Failed to create user", error);
    }
  }

  static async updateUser(req, res) {
    try {
      const updatedUser = await UserService.updateUser(req.params.id, req.body);
      ApiResponse.success(res, "User updated successfully", updatedUser);
    } catch (error) {
      ApiResponse.error(res, "Failed to update user", error);
    }
  }

  static async deleteUser(req, res) {
    try {
      await UserService.deleteUser(req.params.id);
      ApiResponse.success(res, "User deleted successfully");
    } catch (error) {
      ApiResponse.error(res, "Failed to delete user", error);
    }
  }
}

export default UserController;
