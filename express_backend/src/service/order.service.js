import OrderRepository from "../repository/order.repository.js";
import CartService from "./cart.service.js";
import MovieModel from "../model/movie.model.js";

// Le Service gère la logique métier (le "comment on fait les choses")
class OrderService {

    // La grosse fonction pour passer une commande
    static async checkout(userId) {
        // 1. On récupère le panier
        const cart = await CartService.findByUserId(userId);

        if (!cart || cart.movies.length === 0) {
            throw new Error("Hé, ton panier est vide !");
        }

        // 2. On récupère les vrais prix des films pour éviter la triche
        const moviesDetails = await MovieModel.find({ _id: { $in: cart.movies } });

        let totalPrice = 0;
        const orderMovies = moviesDetails.map(movie => {
            totalPrice += movie.prix;
            return {
                movieId: movie._id,
                titre: movie.titre,
                prix: movie.prix
            };
        });

        // 3. On demande au Repository de sauvegarder ça
        const newOrder = await OrderRepository.create({
            userId,
            movies: orderMovies,
            totalPrice,
            status: "completed"
        });

        // 4. Une fois que c'est payé/validé, on vide le panier
        await CartService.clearCart(userId);

        return newOrder;
    }

    // Pour voir ses anciennes commandes
    static async getHistory(userId) {
        return await OrderRepository.findByUserId(userId);
    }
}

export default OrderService;
