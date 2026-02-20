"use client";

import Link from "next/link";
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
        <Link href="/login" className="btn-explore">
          Connectez-vous
        </Link>
        <br />
        <Link href="/register" className="mt-4 inline-block text-white hover:underline font-bold">
          Inscrivez-vous
        </Link>
      </div>
    </div>
  );
};

export default AccueilPage;
