import CartRepository from "../repository/cart.repository.js";

// Le service fait le lien entre le contrôleur et les données (repository)
class CartService {

  // Chercher le panier
  static async findByUserId(idUtilisateur) {
    return await CartRepository.findByUserId(idUtilisateur);
  }

  // Ajouter un film
  static async addProductToCart(idUtilisateur, idFilm) {
    return await CartRepository.addProductToCart(idUtilisateur, idFilm);
  }

  // Retirer un film
  static async removeProductFromCart(idUtilisateur, idFilm) {
    return await CartRepository.removeProductFromCart(idUtilisateur, idFilm);
  }

  // Tout effacer
  static async clearCart(idUtilisateur) {
    return await CartRepository.clearCart(idUtilisateur);
  }
}

export default CartService;
