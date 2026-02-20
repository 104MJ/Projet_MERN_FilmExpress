import fs from "fs";
import readline from "readline";
import dotenv from "dotenv";
import connectDb from "./src/config/database.js";
import MovieModel from "./src/model/movie.model.js";

dotenv.config();

const importData = async () => {
    try {
        const MONGO_URI = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_INIT_DB}?authSource=admin`;
        await connectDb(MONGO_URI);

        console.log("🚀 Début de l'importation des films...");

        const fileStream = fs.createReadStream("../mongodb/dataset/movies.json");
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });

        let chunk = [];
        let totalImported = 0;
        const CHUNK_SIZE = 1000;
        const MAX_MOVIES = 10000; // On limite à 10 000 pour la performance, c'est déjà beaucoup !

        for await (const line of rl) {
            if (totalImported >= MAX_MOVIES) break;

            try {
                const rawMovie = JSON.parse(line);

                // On mappe les champs et on ajoute les valeurs par défaut (venant de fix_movies.js)
                const mappedMovie = {
                    titre: rawMovie.original_title || "Sans titre",
                    realisateur: "Inconnu",
                    annee: 2024,
                    genre: "Action",
                    description: "Aucune description disponible",
                    prix: 10,
                    ...rawMovie // On garde les autres champs au cas où
                };

                chunk.push(mappedMovie);

                if (chunk.length >= CHUNK_SIZE) {
                    await MovieModel.insertMany(chunk);
                    totalImported += chunk.length;
                    console.log(`📦 ${totalImported} films importés...`);
                    chunk = [];
                }
            } catch (err) {
                console.error("Erreur parsing ligne:", err.message);
            }
        }

        if (chunk.length > 0) {
            await MovieModel.insertMany(chunk);
            totalImported += chunk.length;
        }

        console.log(`\n✅ Importation terminée ! Total : ${totalImported} films.`);
        process.exit();
    } catch (error) {
        console.error("❌ Erreur critique :", error);
        process.exit(1);
    }
};

importData();
