import express from "express";
import CartController from "../controller/cart.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const cart_router = express.Router();

cart_router.use(authMiddleware);

// On utilise les méthodes statiques de la classe
cart_router.get("/", CartController.getCart);
cart_router.post("/add", CartController.addMovie);
cart_router.delete("/movie/:movieId", CartController.removeMovie);
cart_router.delete("/clear", CartController.clearCart);

export default cart_router;
