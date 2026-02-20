import React, { useState, useEffect } from "react";
import "./moviesPage.css";

const MoviesPage = () => {
//   const [movies, setMovies] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Appel à votre route API existante
//     fetch("http://localhost:5000/api/movies")
//       .then((res) => res.json())
//       .then((json) => {
//         if (json.success) {
//           setMovies(json.data);
//         }
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Erreur lors de la récupération:", err);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <div className="loader">Chargement du catalogue...</div>;
//   }

  return (
//     <div className="movies-container">
//       <header className="movies-header">
//         <h1>Notre Catalogue</h1>
//         <p>{movies.length} films disponibles</p>
//       </header>

//       <div className="movies-grid">
//         {movies.map((movie) => (
//           <div key={movie._id} className="movie-card">
//             <div className="movie-badge">{movie.genre}</div>
//             <div className="movie-info">
//               <h3>{movie.titre}</h3>
//               <p className="director">Par {movie.realisateur}</p>
//               <p className="description">
//                 {movie.description.substring(0, 80)}...
//               </p>
//               <div className="movie-footer">
//                 <span className="price">{movie.prix} €</span>
//                 <button className="btn-add">Ajouter</button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
  );
};

export default MoviesPage;
