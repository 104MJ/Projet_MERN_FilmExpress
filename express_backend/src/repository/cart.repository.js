import CartModel from "../model/cart.model.js";

// Ici on gère les données des paniers dans la base
class CartRepository {

    // Trouver le panier d'un utilisateur
    static async findByUserId(idUtilisateur) {
        return await CartModel.findOne({ user: idUtilisateur })
            .populate("movies", "-__v")
            .select("-__v");
    }

    // Ajouter un film dans le panier
    static async addProductToCart(idUtilisateur, idFilm) {
        let monPanier = await CartModel.findOne({ user: idUtilisateur });

        // Si l'utilisateur n'a pas encore de panier, on lui en crée un
        if (!monPanier) {
            monPanier = new CartModel({ user: idUtilisateur, movies: [idFilm] });
        } else {
            // Sinon, on rajoute le film s'il n'y est pas encore
            if (!monPanier.movies.includes(idFilm)) {
                monPanier.movies.push(idFilm);
            }
        }
        return await monPanier.save();
    }

    // Enlever un film du panier
    static async removeProductFromCart(idUtilisateur, idFilm) {
        const monPanier = await CartModel.findOne({ user: idUtilisateur });
        if (monPanier) {
            // On filtre pour garder tous les films sauf celui qu'on veut supprimer
            monPanier.movies = monPanier.movies.filter((id) => id.toString() !== idFilm);
            return await monPanier.save();
        }
        return null;
    }

    // Vider tout le panier
    static async clearCart(idUtilisateur) {
        const monPanier = await CartModel.findOne({ user: idUtilisateur });
        if (monPanier) {
            monPanier.movies = [];
            return await monPanier.save();
        }
        return null;
    }
}

export default CartRepository;
