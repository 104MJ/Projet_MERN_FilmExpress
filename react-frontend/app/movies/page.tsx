"use client";

import React, { useState, useEffect } from "react";
import MovieService from "../../services/movie.service";
import Movie from "../../models/Movie";
import "./moviesPage.css";

const MoviesPage = () => {
  //   const [movies, setMovies] = useState<Movie[]>([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await MovieService.getAllMovies().then((data) => {
          console.log("Réponse API :", data);
          setMovies(
            Array.isArray(data) ? data : data.movies || data.data || [],
          );
        });
        console.log("API movies response:", data.data);

        setMovies(data || []);
      } catch (error) {
        console.error("Erreur API:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading)
    return (
      <div className="loader-container">
        <div className="spinner"></div>
        <p>Chargement du catalogue...</p>
      </div>
    );

  return (
    <div className="movies-page">
      <header className="catalog-header">
        <h1>
          Exploration <span className="highlight">FilmExpress</span>
        </h1>
        <p>Plus de {movies.length} pépites cinématographiques à découvrir</p>
      </header>

      <div className="movies-grid">
        {movies.map((movie) => (
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
                <button className="btn-add-cart">Réserver</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviesPage;
