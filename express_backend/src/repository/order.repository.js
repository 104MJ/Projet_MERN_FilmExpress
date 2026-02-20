import OrderModel from "../model/order.model.js";

// Le Repository s'occupe uniquement de parler à la base de données (MongoDB)
class OrderRepository {

    // Enregistrer une nouvelle commande
    static async create(orderData) {
        return await OrderModel.create(orderData);
    }

    // Chercher toutes les commandes d'un utilisateur
    static async findByUserId(userId) {
        // On trie par date : la plus récente en haut
        return await OrderModel.find({ userId }).sort({ createdAt: -1 });
    }
}

export default OrderRepository;
