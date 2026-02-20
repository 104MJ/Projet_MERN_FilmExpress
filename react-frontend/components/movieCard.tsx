"use client";

import React from "react";

interface Movie {
    _id: string;
    titre: string;
    prix: number;
    realisateur: string;
    annee: number;
    genre: string;
}

interface MovieCardProps {
    movie: Movie;
    onAddToCart: (id: string) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onAddToCart }) => {
    return (
        <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden border border-gray-800 hover:border-[#ff4b2b] transition-all group flex flex-col h-full">
            <div className="aspect-[2/3] bg-[#2a2a2a] relative overflow-hidden flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                <span className="text-gray-500 font-black text-2xl uppercase tracking-widest text-center transform -rotate-12 group-hover:scale-110 transition-transform">
                    {movie.titre}
                </span>
                <div className="absolute top-4 right-4 bg-[#ff4b2b] text-white font-black px-3 py-1 rounded-full text-sm shadow-lg">
                    {movie.prix.toFixed(2)} €
                </div>
            </div>

            <div className="p-6 flex-grow flex flex-col">
                <div className="mb-4">
                    <span className="text-[#ff4b2b] text-xs font-bold uppercase tracking-widest">{movie.genre}</span>
                    <h3 className="text-white text-xl font-bold mt-1 line-clamp-1 group-hover:text-[#ff4b2b] transition-colors">{movie.titre}</h3>
                    <p className="text-gray-400 text-sm mt-1">{movie.realisateur} • {movie.annee}</p>
                </div>

                <button
                    onClick={() => onAddToCart(movie._id)}
                    className="mt-auto w-full bg-white text-black font-black py-3 rounded-xl hover:bg-[#ff4b2b] hover:text-white transition-all transform active:scale-95 flex items-center justify-center space-x-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 100-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                    </svg>
                    <span>Ajouter au panier</span>
                </button>
            </div>
        </div>
    );
};

export default MovieCard;
