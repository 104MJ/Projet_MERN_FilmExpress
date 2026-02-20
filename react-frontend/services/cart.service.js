import api from "./api";

// Service pour le panier
const cartService = {
    // Voir le panier
    async getCart() {
        const res = await api.get("/cart");
        return res.data;
    },

    // Ajouter un truc
    async addToCart(movieId) {
        const res = await api.post("/cart/add", { movieId });
        return res.data;
    },

    // Retirer un truc
    async removeFromCart(movieId) {
        const res = await api.delete(`/cart/movie/${movieId}`);
        return res.data;
    },

    // Tout vider d'un coup
    async clearCart() {
        const res = await api.delete("/cart/clear");
        return res.data;
    }
};

export default cartService;
