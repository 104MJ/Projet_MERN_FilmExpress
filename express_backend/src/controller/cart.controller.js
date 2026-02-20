import CartService from "../service/cart.service.js";
import ApiResponse from "../utils/apiResponse.js";

// Ici on gère le panier de l'utilisateur
class CartController {

  // Pour voir ce qu'on a mis dans notre panier
  static async getCartByUserId(req, res) {
    try {
      // On utilise req.user.id qui vient de notre "vigile" (middleware)
      const cart = await CartService.findByUserId(req.user.id);
      ApiResponse.success(res, "Hop, voici ton panier !", cart);
    } catch (error) {
      ApiResponse.error(res, "Impossible de récupérer ton panier...", error);
    }
  }

  // Pour ajouter un film au panier
  static async addProductToCart(req, res) {
    try {
      // On récupère le film envoyé dans la requête (req.body.movieId)
      const updatedCart = await CartService.addProductToCart(
        req.user.id,
        req.body.movieId,
      );

      ApiResponse.success(
        res,
        "Super, film ajouté au panier !",
        updatedCart,
      );
    } catch (error) {
      ApiResponse.error(res, "Mince, l'ajout au panier a échoué.", error);
    }
  }

  // Pour enlever un film précis du panier
  static async removeProductFromCart(req, res) {
    try {
      const updatedCart = await CartService.removeProductFromCart(
        req.user.id,
        req.params.movieId, // On passe l'id du film dans l'URL
      );
      ApiResponse.success(
        res,
        "C'est fait, le film est plus dans ton panier.",
        updatedCart,
      );
    } catch (error) {
      ApiResponse.error(res, "Bug lors de la suppression du film du panier.", error);
    }
  }

  // Pour tout vider (si on veut repartir de zéro)
  static async clearCart(req, res) {
    try {
      const clearedCart = await CartService.clearCart(req.user.id);
      ApiResponse.success(res, "Et voilà, panier tout propre !", clearedCart);
    } catch (error) {
      ApiResponse.error(res, "Erreur en vidant le panier...", error);
    }
  }
}

export default CartController;

