import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        movies: [
            {
                movieId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Movie",
                    required: true,
                },
                titre: String,
                prix: Number,
            },
        ],
        totalPrice: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "completed", "cancelled"],
            default: "completed", // Simulation d'un achat direct
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

const OrderModel = mongoose.model("Order", orderSchema);
export default OrderModel;
