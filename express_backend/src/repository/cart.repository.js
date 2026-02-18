import CartModel from "../model/cart.model.js";

class CartRepository {
  static async findByUserId(userId) {
    return await CartModel.findOne({ user: userId })
      .populate("movies", "-__v")
      .select("-__v");
  }

  static async addProductToCart(userId, movieId) {
    let cart = await CartModel.findOne({ user: userId });
    if (!cart) {
      cart = new CartModel({ user: userId, movies: [movieId] });
    } else {
      if (!cart.movies.includes(movieId)) {
        cart.movies.push(movieId);
      }
    }
    return await cart.save();
  }

  static async removeProductFromCart(userId, movieId) {
    const cart = await CartModel.findOne({ user: userId });
    if (cart) {
      cart.movies = cart.movies.filter((id) => id.toString() !== movieId);
      return await cart.save();
    }
    return null;
  }

  static async clearCart(userId) {
    const cart = await CartModel.findOne({ user: userId });
    if (cart) {
      cart.movies = [];
      return await cart.save();
    }
    return null;
  }
}

export default CartRepository;
