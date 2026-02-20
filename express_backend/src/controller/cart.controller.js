import CartService from "../service/cart.service.js";
import ApiResponse from "../utils/apiResponse.js";

// On gère les requêtes du panier
class CartController {

  // Voir mon panier
  static async getCart(req, res) {
    try {
      const monPanier = await CartService.findByUserId(req.user.id);
      ApiResponse.success(res, "Voici ton panier !", monPanier);
    } catch (err) {
      ApiResponse.error(res, "Erreur en récupérant le panier", err);
    }
  }

  // Ajouter un film
  static async addMovie(req, res) {
    try {
      const idFilm = req.body.movieId;
      const panierAJour = await CartService.addProductToCart(req.user.id, idFilm);
      ApiResponse.success(res, "Film ajouté !", panierAJour);
    } catch (err) {
      ApiResponse.error(res, "Impossible d'ajouter le film", err);
    }
  }

  // Supprimer un film
  static async removeMovie(req, res) {
    try {
      const idFilm = req.params.movieId;
      const panierAJour = await CartService.removeProductFromCart(req.user.id, idFilm);
      ApiResponse.success(res, "Film supprimé", panierAJour);
    } catch (err) {
      ApiResponse.error(res, "Erreur lors de la suppression", err);
    }
  }

  // Vider le panier
  static async clearCart(req, res) {
    try {
      const panierVide = await CartService.clearCart(req.user.id);
      ApiResponse.success(res, "Panier vidé", panierVide);
    } catch (err) {
      ApiResponse.error(res, "Erreur en vidant le panier", err);
    }
  }
}

export default CartController;
