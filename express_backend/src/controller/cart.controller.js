import CartService from "../service/cart.service.js";
import ApiResponse from "../utils/apiResponse.js";

class CartController {
  static async getCartByUserId(req, res) {
    try {
      const cart = await CartService.findByUserId(req.params.idUser);
      ApiResponse.success(res, "Cart retrieved successfully", cart);
    } catch (error) {
      ApiResponse.error(res, "Failed to retrieve cart", error);
    }
  }

  static async addProductToCart(req, res) {
    try {
      const updatedCart = await CartService.addProductToCart(
        req.params.idUser,
        req.body.movieId,
      );
      ApiResponse.success(
        res,
        "Product added to cart successfully",
        updatedCart,
      );
    } catch (error) {
      ApiResponse.error(res, "Failed to add product to cart", error);
    }
  }

  static async removeProductFromCart(req, res) {
    try {
      const updatedCart = await CartService.removeProductFromCart(
        req.user.id,
        req.params.movieId,
      );
      ApiResponse.success(
        res,
        "Product removed from cart successfully",
        updatedCart,
      );
    } catch (error) {
      ApiResponse.error(res, "Failed to remove product from cart", error);
    }
  }

  static async clearCart(req, res) {
    try {
      const clearedCart = await CartService.clearCart(req.user.id);
      ApiResponse.success(res, "Cart cleared successfully", clearedCart);
    } catch (error) {
      ApiResponse.error(res, "Failed to clear cart", error);
    }
  }
}

export default CartController;
