import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import ApiResponse from "./src/utils/apiResponse.js";
import connectDb from "./src/config/database.js";

// Import des Routeurs
import user_router from "./src/routes/user.route.js";
import movie_router from "./src/routes/movie.route.js";
// 1. Configuration dotenv
dotenv.config({ path: "./.env" });

const PORT = process.env.EXPRESS_PORT || 5000;
const MONGO_USER = process.env.MONGO_USER || "mongo_user";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "mongo_pass";
const MONGO_PORT = process.env.MONGO_PORT || 27017;
const MONGO_INIT_DB = process.env.MONGO_INIT_DB || "film_db";
const MONGO_HOST = process.env.MONGO_HOST || "localhost";

const MONGO_URI = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_INIT_DB}?authSource=admin`;

// 2. Création de l'app
const app = express();

// 3. Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Logger custom
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
});

// 4. Connexion à MongoDB
try {
  console.log("Tentative de connexion à MongoDB...");
  await connectDb(MONGO_URI);
  console.log("Connexion MongoDB réussie !");
} catch (error) {
  console.error("Erreur de connexion à MongoDB :", error);
  process.exit(1);
}

// 5. Déclaration des Routes
app.use("/api/users", user_router);
app.use("/api/movies", movie_router);

// Route d'accueil (Health Check)
app.get("/", (req, res) => {
  ApiResponse.success(res, "API Film Shop opérationnelle", {
    version: mongoose.version,
    endpoints: {
      users: "/api/users",
      movies: "/api/movies",
    },
  });
});

// Route 404 (doit être après toutes les routes)
app.use((req, res) => {
  ApiResponse.notFound(res, "Route non trouvée");
});

// 6. Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur lancé sur : http://localhost:${PORT}`);
});

// Gestion propre de l'arrêt
process.on("SIGINT", async () => {
  console.log("\nArrêt du serveur en cours...");
  await mongoose.connection.close();
  process.exit(0);
});
