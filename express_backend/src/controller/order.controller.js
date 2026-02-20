import OrderService from "../service/order.service.js";
import ApiResponse from "../utils/apiResponse.js";

// On gère les requêtes pour les commandes
class OrderController {

    // Passer commande
    static async createOrder(req, res) {
        try {
            const commande = await OrderService.checkout(req.user.id);
            ApiResponse.success(res, "Ta commande est validée !", commande, 201);
        } catch (err) {
            ApiResponse.error(res, "Problème au moment de commander", err, 400);
        }
    }

    // Historique
    static async getUserOrders(req, res) {
        try {
            const historique = await OrderService.getHistory(req.user.id);
            ApiResponse.success(res, "Voici tes commandes", historique);
        } catch (err) {
            ApiResponse.error(res, "Impossible de voir tes commandes", err);
        }
    }
}

export default OrderController;
