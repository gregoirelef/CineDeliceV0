import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import RecipeCard from "../../component/RecipeCard/RecipeCard.jsx";
import "./SearchResultPage.css";
const SearchResultPage = () => {
  const navigate = useNavigate();
  //Fais appel à la fonction useLocation, elle dit qu'elle veux récupérer seulement le state
  const { state } = useLocation();
  //et dans ce state, elle a besoin de récupérer le tableau filteredRecipes.
  //Si state n'est pas là, filteredRecipes est vide
  // Ce composant est donc dépendant du state de useLocation pour fonctionner
  const { filteredRecipes } = state || {};
  const motionTitle = state?.motion;
  const categoryTitle = state?.category;
  // console.log(categoryTitle);
  console.log(motionTitle);

  return (
    <>
      {filteredRecipes.length === 0 ? (
        <div className="no-recipes-found-container">
          <img
            src="../../../assets/img/not-found.webp"
            alt="une serveuse désolé de ne pas pouvoir répondre à une demande"
            className="no-recipes-found-img"
          />
          <p className="no-recipes-found-text">Désolé, il n'y a pas encore de recettes correspondant à votre recherche.</p>
          <button className="no-recipes-found-btn btn" onClick={() => navigate("/recipes/create")}>
            Proposez la vôtre !
          </button>
          <button className="btn button-return-catalog" onClick={() => navigate("/carnet")}>
            Retourner au carnet
          </button>
        </div>
      ) : (
        <section className="section__result">
          <h2 className="section-title recipe-book-title">
            {categoryTitle}
            {!Array.isArray(motionTitle) && motionTitle}
          </h2>

          <div className="recipe__container result-container">
            {filteredRecipes.map((recipe, index) => {
              // Si motionTitle est un tableau, on récupère le titre correspondant à l'index
              const motion = Array.isArray(motionTitle) ? motionTitle[index] : motionTitle;

              return <RecipeCard recipe={recipe} motion={motion} key={index} />;
            })}
          </div>
          <button className="button-return-catalog btn" onClick={() => navigate("/carnet")}>
            Retourner au carnet
          </button>
        </section>
      )}
    </>
  );
};

export default SearchResultPage;
