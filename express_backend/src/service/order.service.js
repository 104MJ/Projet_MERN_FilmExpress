import OrderRepository from "../repository/order.repository.js";
import CartService from "./cart.service.js";
import MovieModel from "../model/movie.model.js";

// Logique pour passer les commandes
class OrderService {

    // On valide le panier et on crée la commande
    static async checkout(idUtilisateur) {
        // 1. On récupère le contenu du panier
        const panier = await CartService.findByUserId(idUtilisateur);

        if (!panier || panier.movies.length === 0) {
            throw new Error("Ton panier est vide !");
        }

        // 2. On récupère les prix des films en base
        const detailsFilms = await MovieModel.find({ _id: { $in: panier.movies } });

        let total = 0;
        const filmsPourCommande = detailsFilms.map(f => {
            total += f.prix;
            return {
                movieId: f._id,
                titre: f.titre,
                prix: f.prix
            };
        });

        // 3. On crée la commande
        const commande = await OrderRepository.create({
            userId: idUtilisateur,
            movies: filmsPourCommande,
            totalPrice: total,
            status: "completed"
        });

        // 4. On vide le panier de l'utilisateur
        await CartService.clearCart(idUtilisateur);

        return commande;
    }

    // Historique des commandes
    static async getHistory(idUtilisateur) {
        return await OrderRepository.findByUserId(idUtilisateur);
    }
}

export default OrderService;
