import dotenv from "dotenv";
import connectDb from "./src/config/database.js";
import MovieModel from "./src/model/movie.model.js";

dotenv.config();

const fixMovies = async () => {
  try {
    const MONGO_URI = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_INIT_DB}?authSource=admin`;
    await connectDb(MONGO_URI);

    console.log("Début de la mise à jour des films...");

    const result = await MovieModel.updateMany({}, [
      {
        $set: {
          titre: { $ifNull: ["$titre", "$original_title"] },
          realisateur: { $ifNull: ["$realisateur", "Inconnu"] },
          annee: { $ifNull: ["$annee", 2024] },
          genre: { $ifNull: ["$genre", "Action"] },
          description: {
            $ifNull: ["$description", "Aucune description disponible"],
          },
          prix: { $ifNull: ["$prix", 10] },
        },
      },
    ]);

    console.log(
      `✅ Mise à jour terminée : ${result.modifiedCount} documents modifiés.`,
    );
    process.exit();
  } catch (error) {
    console.error("❌ Erreur :", error);
    process.exit(1);
  }
};

fixMovies();
