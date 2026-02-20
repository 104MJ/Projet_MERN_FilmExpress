import express from "express";
import CartController from "../controller/cart.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const cart_router = express.Router();

// Toutes les routes du panier nécessitent d'être connecté
cart_router.use(authMiddleware);

cart_router.get("/", CartController.getCartByUserId);
cart_router.post("/add", CartController.addProductToCart);
cart_router.delete("/movie/:movieId", CartController.removeProductFromCart);
cart_router.delete("/clear", CartController.clearCart);

export default cart_router;

