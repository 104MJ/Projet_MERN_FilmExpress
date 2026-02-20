"use client";

import React from "react";
import "./accueilPage.css";

const AccueilPage = () => {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1>FilmExpress</h1>
        <p>
          Plongez dans un catalogue de plus de 700 000 films. L'émotion du
          cinéma, directement chez vous.
        </p>
        <button
          className="btn-explore"
          onClick={() => (window.location.href = "/api/register")}
        >
          Connectez-vous
        </button>
        <br></br>
        <button onClick={() => (window.location.href = "/api/auth")}>
          Inscrivez-vous
        </button>
      </div>
    </div>
  );
};

export default AccueilPage;
