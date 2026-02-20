import express from "express";
import MovieController from "../controller/movie.controller.js";

const movie_router = express.Router();

// Routes branchées sur la classe MovieController
movie_router.get("/", MovieController.getAllMovies);
movie_router.post("/", MovieController.createMovie);
movie_router.get("/:id", MovieController.getMovieById);
movie_router.put("/:id", MovieController.updateMovie);
movie_router.delete("/:id", MovieController.deleteMovie);

export default movie_router;
