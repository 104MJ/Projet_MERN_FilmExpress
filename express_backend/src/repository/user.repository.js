import UserModel from "../model/user.model.js";

class UserRepository {
  static async findAll() {
    return await UserModel.find().select("-__v");
  }
  static async findById(id) {
    return await UserModel.findById(id);
  }
  static async create(userData) {
    const user = new UserModel(userData);
    return await user.save();
  }
  static async update(id, userData) {
    return await UserModel.findByIdAndUpdate(id, userData, {
      new: true,
      runValidators: true,
    }).select("-__v");
  }
  static async delete(id) {
    return await UserModel.findByIdAndDelete(id);
  }
}

export default UserRepository;
