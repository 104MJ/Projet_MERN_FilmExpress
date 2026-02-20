import OrderModel from "../model/order.model.js";

// Ici on enregistre ou on récupère les commandes
class OrderRepository {

    // Créer une commande dans la base
    static async create(donneesCommande) {
        return await OrderModel.create(donneesCommande);
    }

    // Voir toutes les commandes d'une personne (de la plus récente à la plus vieille)
    static async findByUserId(idUtilisateur) {
        return await OrderModel.find({ userId: idUtilisateur }).sort({ createdAt: -1 });
    }
}

export default OrderRepository;
