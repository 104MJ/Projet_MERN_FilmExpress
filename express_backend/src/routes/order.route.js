import express from "express";
import OrderController from "../controller/order.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const order_router = express.Router();

order_router.use(authMiddleware); // Protection de toutes les routes

order_router.post("/", OrderController.createOrder);
order_router.get("/", OrderController.getUserOrders);

export default order_router;
