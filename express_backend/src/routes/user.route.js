import express from "express";
import UserController from "../controller/user.controller.js";

const user_router = express.Router();


user_router.get("/router", (req, res) => {
  res.send("router is working");
});
user_router.get("/:id", UserController.getUserById);
user_router.put("/:id", UserController.updateUser);
user_router.delete("/:id", UserController.deleteUser);
user_router.post("/", UserController.createUser);
user_router.get("/", UserController.getAllUsers);

export default user_router;
