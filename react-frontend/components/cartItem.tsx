"use client";

import React from "react";

interface Movie {
    _id: string;
    titre: string;
    prix: number;
    realisateur: string;
}

interface CartItemProps {
    movie: Movie;
    onRemove: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ movie, onRemove }) => {
    return (
        <div className="flex items-center justify-between bg-[#1a1a1a] p-4 rounded-xl border border-gray-800 hover:border-[#ff4b2b]/50 transition-all group">
            <div className="flex items-center space-x-4">
                <div className="w-16 h-24 bg-[#2a2a2a] rounded-lg flex items-center justify-center border border-gray-700 overflow-hidden relative">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest vertical-text">FilmExpress</span>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div>
                    <h3 className="text-white font-bold text-lg group-hover:text-[#ff4b2b] transition-colors">{movie.titre}</h3>
                    <p className="text-gray-400 text-sm">{movie.realisateur}</p>
                    <p className="text-[#ff4b2b] font-black mt-1">{movie.prix.toFixed(2)} €</p>
                </div>
            </div>
            <button
                onClick={() => onRemove(movie._id)}
                className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-all"
                title="Supprimer"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
        </div>
    );
};

export default CartItem;
