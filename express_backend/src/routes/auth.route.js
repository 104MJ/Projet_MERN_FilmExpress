import express from "express";
import AuthController from "../controller/auth.controller.js";

const auth_router = express.Router();

auth_router.post("/register", AuthController.register);
auth_router.post("/login", AuthController.login);

export default auth_router;
