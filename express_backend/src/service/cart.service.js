import CartRepository from "../repository/cart.repository.js";
class CartService {
  static async findByUserId(userId) {
    return await CartRepository.findByUserId(userId);
  }
  static async addProductToCart(userId, productId) {
    return await CartRepository.addProductToCart(userId, productId);
  }
  static async removeProductFromCart(userId, productId) {
    return await CartRepository.removeProductFromCart(userId, productId);
  }
  static async clearCart(userId) {
    return await CartRepository.clearCart(userId);
  }
}

export default CartService;
