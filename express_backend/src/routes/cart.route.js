import express from "express";
import CartController from "../controller/cart.controller.js";

const cart_router = express.Router();
cart_router.get("/", CartController.getCartByUserId);
cart_router.post("/add", CartController.addProductToCart);
cart_router.delete("/movie/:movieId", CartController.removeProductFromCart);
cart_router.delete("/clear", CartController.clearCart);

export default cart_router;
