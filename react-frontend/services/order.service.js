import api from "./api";

// Service pour les commandes
const orderService = {
    // Valider le panier
    async checkout() {
        const res = await api.post("/orders");
        return res.data;
    },

    // Voir ses commandes
    async getOrders() {
        const res = await api.get("/orders");
        return res.data;
    }
};

export default orderService;
