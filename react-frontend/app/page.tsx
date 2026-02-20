"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/authContext";
import AccueilPage from "./accueil/page";
import MoviesPage from "./movies/page";

export default function Home() {
  const { user, logout, isAuthenticated }: any = useAuth();

  // Si non connecté, on affiche la page d'accueil (Hero) des collègues
  if (!isAuthenticated) {
    return <AccueilPage />;
  }

  // Si connecté, on affiche le tableau de bord avec leur liste de films
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 font-sans">
      {/* Header / Navbar : Notre version unifiée avec les liens Panier/Commandes */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between mb-8 py-4 border-b border-white/10">
        <Link href="/" className="text-4xl font-black text-[#ff4b2b] tracking-tighter italic mb-4 md:mb-0">
          FILMEXPRESS
        </Link>

        <nav className="flex items-center space-x-6">
          <Link href="/cart" className="relative group text-gray-300 hover:text-white transition">
            <span className="font-bold">Mon Panier</span>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#ff4b2b] group-hover:w-full transition-all"></div>
          </Link>
          <Link href="/orders" className="relative group text-gray-300 hover:text-white transition">
            <span className="font-bold">Mes Commandes</span>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#ff4b2b] group-hover:w-full transition-all"></div>
          </Link>
          <div className="flex items-center space-x-4 pl-6 border-l border-white/20">
            <span className="text-sm font-medium text-gray-400">
              Salut, <span className="text-white font-bold">{user?.prenom}</span>
            </span>
            <button
              onClick={logout}
              className="text-xs bg-white/10 hover:bg-red-500/20 text-red-500 px-3 py-1.5 rounded-full font-bold transition border border-red-500/30"
            >
              Déconnexion
            </button>
          </div>
        </nav>
      </header>

      <main>
        {/* On injecte ici le composant MoviesPage des collègues */}
        <MoviesPage />
      </main>

      <footer className="max-w-7xl mx-auto mt-20 py-10 border-t border-white/10 text-center text-gray-600 text-sm font-medium">
        &copy; 2026 FILMEXPRESS. Tous droits réservés.
      </footer>
    </div>
  );
}
