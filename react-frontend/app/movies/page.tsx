"use client";

import React, { useState, useEffect } from "react";
import movieService from "@/services/movie.service";
import cartService from "@/services/cart.service";
import { useAuth } from "@/context/authContext";
import "./moviesPage.css";

const MoviesPage = () => {
  const { isAuthenticated } = useAuth();
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [cartMessage, setCartMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadData = async (page: number) => {
    setLoading(true);
    try {
      const data = await (movieService as any).getAllMovies(page, 20);
      const newMovies = data.data || [];
      setMovies(newMovies);
      // Si on a moins de 20 films, c'est qu'on est à la fin
      setHasMore(newMovies.length === 20);
    } catch (error) {
      console.error("Erreur API:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(currentPage);
  }, [currentPage]);

  const handleAddToCart = async (movieId: string) => {
    if (!isAuthenticated) {
      alert("Veuillez vous connecter pour ajouter au panier");
      return;
    }

    try {
      await cartService.addToCart(movieId);
      setCartMessage("Film ajouté au panier !");
      setTimeout(() => setCartMessage(""), 3000);
    } catch (err) {
      console.error("Erreur lors de l'ajout au panier", err);
    }
  };

  const filteredMovies = movies.filter((movie) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      movie.titre.toLowerCase().includes(searchLower) ||
      movie.genre.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="movies-page">
      {cartMessage && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-bottom-4 duration-300">
          <div className="px-8 py-4 rounded-2xl shadow-2xl font-bold bg-green-600 text-white">
            {cartMessage}
          </div>
        </div>
      )}

      <header className="catalog-header">
        <h1>
          Exploration <span className="highlight">FilmExpress</span>
        </h1>
        <p>Découvrez notre catalogue pépite par pépite</p>

        <div className="search-container">
          <input
            type="text"
            placeholder="Rechercher sur cette page..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </header>

      {loading ? (
        <div className="loader-container-small">
          <div className="spinner-small"></div>
          <p>Chargement...</p>
        </div>
      ) : (
        <>
          <div className="movies-grid">
            {filteredMovies.length > 0 ? (
              filteredMovies.map((movie) => (
                <div key={movie._id} className="movie-card">
                  <div className="card-badge">{movie.genre}</div>
                  <div className="card-content">
                    <span className="movie-year">{movie.annee}</span>
                    <h3 className="movie-title">{movie.titre}</h3>
                    <p className="movie-director">
                      Par <span>{movie.realisateur}</span>
                    </p>
                    <p className="movie-desc">
                      {movie.description ||
                        "Aucune description disponible pour ce film."}
                    </p>
                    <div className="card-footer">
                      <span className="movie-price">{movie.prix} €</span>
                      <button
                        className="btn-add-cart"
                        onClick={() => handleAddToCart(movie._id)}
                      >
                        Réserver
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <p>Aucun film trouvé sur cette page... 🍿</p>
              </div>
            )}
          </div>

          <div className="pagination-bar">
            <button
              className="btn-page"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Précédent
            </button>
            <span className="page-info">Page {currentPage}</span>
            <button
              className="btn-page"
              disabled={!hasMore}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Suivant
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MoviesPage;
