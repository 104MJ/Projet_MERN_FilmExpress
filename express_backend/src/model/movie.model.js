import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    titre: {
      type: String,
      required: [true, "Le titre est requis"],
      trim: true,
    },
    realisateur: {
      type: String,
      required: [true, "Le réalisateur est requis"],
      trim: true,
    },
    annee: {
      type: Number,
      required: [true, "L'année est requise"],
    },
    genre: {
      type: String,
      required: [true, "Le genre est requis"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "La description est requise"],
      trim: true,
    },
    prix: {
      type: Number,
      required: [true, "Le prix est requis"],
      min: [0, "Le prix doit être positif"],
    },
  },

  {
    timestamps: true,
    versionKey: false,
  },
);

const MovieModel = mongoose.model("Movie", movieSchema);
export default MovieModel;
