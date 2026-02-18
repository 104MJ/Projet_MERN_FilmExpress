import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Le user est requis"],
    },
    movies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
        required: [true, "Le film est requis"],
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const CartModel = mongoose.model("Cart", cartSchema);
export default CartModel;
