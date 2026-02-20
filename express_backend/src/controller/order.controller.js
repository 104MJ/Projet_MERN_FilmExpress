import OrderService from "../service/order.service.js"; // Le nouveau service !
import ApiResponse from "../utils/apiResponse.js";

// Le contrôleur devient beaucoup plus "maigre" et facile à lire
class OrderController {

    // Valider la commande
    static async createOrder(req, res) {
        try {
            // On demande au service de faire tout le boulot (check panier, prix, sauvegarde)
            const newOrder = await OrderService.checkout(req.user.id);
            ApiResponse.success(res, "Super ! Ta commande est validée.", newOrder, 201);
        } catch (error) {
            // Si le service lance une erreur (ex: panier vide), on l'attrape ici
            ApiResponse.error(res, error.message || "Bug au moment de commander...", error);
        }
    }

    // Voir ses commandes
    static async getUserOrders(req, res) {
        try {
            const orders = await OrderService.getHistory(req.user.id);
            ApiResponse.success(res, "Voici l'historique de tes commandes :", orders);
        } catch (error) {
            ApiResponse.error(res, "Impossible de récupérer tes commandes...", error);
        }
    }
}

export default OrderController;
