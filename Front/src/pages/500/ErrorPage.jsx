import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <>
    {/* Balises qui seront intégrées dans le head */}
    <title>500| Ciné Délices</title>
    <meta name="description" content="Page d'erreur 500" />

    <div className="error-page">
      <img src="/images/error-page.webp" alt="error-page-image" className="error-image" />
      <Link to="/" className="home-link">
        <button className="btn btn-error-page">Retour à l'accueil</button>
      </Link>
    </div>
    </>
  );
};

export default ErrorPage;
