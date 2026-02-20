"use client";

import React from "react";

interface OrderMovie {
    movieId: string;
    titre: string;
    prix: number;
}

interface Order {
    _id: string;
    createdAt: string;
    totalPrice: number;
    status: string;
    movies: OrderMovie[];
}

interface OrderRowProps {
    order: Order;
}

const OrderRow: React.FC<OrderRowProps> = ({ order }) => {
    const formattedDate = new Date(order.createdAt).toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-gray-800 hover:border-gray-700 transition-all mb-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                    <p className="text-gray-400 text-xs uppercase tracking-widest font-bold mb-1">Commande #{order._id.slice(-8)}</p>
                    <p className="text-white font-medium">{formattedDate}</p>
                </div>
                <div className="mt-2 md:mt-0 flex items-center space-x-4">
                    <div className="text-right">
                        <p className="text-gray-400 text-xs uppercase font-bold">Total</p>
                        <p className="text-[#ff4b2b] font-black text-xl">{order.totalPrice.toFixed(2)} €</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${order.status === "completed" ? "bg-green-900/30 text-green-400 border border-green-500/50" : "bg-yellow-900/30 text-yellow-400 border border-yellow-500/50"
                        }`}>
                        {order.status === "completed" ? "Validée" : order.status}
                    </span>
                </div>
            </div>

            <div className="border-t border-gray-800 pt-4 mt-2">
                <p className="text-gray-400 text-xs font-bold uppercase mb-3">Articles</p>
                <div className="space-y-2">
                    {order.movies.map((movie, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                            <span className="text-gray-300">{movie.titre}</span>
                            <span className="text-gray-500">{movie.prix.toFixed(2)} €</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OrderRow;
