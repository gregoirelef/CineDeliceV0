// Importation des hooks useEffect et useState depuis la bibliothèque de React
import React, { useEffect, useState } from "react";
// Importation de useParams et Navigate depuis le router dom
import { Navigate, useNavigate, useParams } from "react-router-dom";
// Importation de la fonction afin d'obtenir la recette par son id
import { getRecipeById } from "../../api/index.js";
//css
import "./recipe.css";
// Import de la variable d'environnement
const API_URL = import.meta.env.VITE_API_URL;

/** /* ---------------------------------------------------------------------------------------------- 
 * @description Page de détails pour une recette individuelle.
 * Cette page utilise l’ID passé dans l’URL pour charger les données d’une recette via l’API.
 * Gère le chargement, les erreurs, et redirige vers une 404 en cas d'échec.
 /* ---------------------------------------------------------------------------------------------- */

const Recipe = () => {
  const navigate = useNavigate();
  // ------------------ PARAMÈTRES D'URL ------------------
  //   Récupération de l'id d'une recette à partir des paramètres de l'URL
  const { id } = useParams();

  // ------------------ ÉTATS LOCAUX ------------------

  /** @state Déclaration d'un état pour stocker les détails de la recette => 'recipe' désigne la valeur actuelle et 'setRecipe' la fonction permettant de la mettre à jour*/

  const [recipe, setRecipe] = useState(null); // Initialisation de l'état

  const [loading, setLoading] = useState(true); // état de chargement

  const [error, setError] = useState(null); // état de gestion des erreurs

  // ------------------ CHARGEMENT DES DONNÉES ------------------

  // en cas de changement de l'id, redéclenchement du useEffect()
  useEffect(() => {
    // La fonction est asynchrone afin de charger les données de la recette (promsesse)
    const loadData = async () => {
      // Vérification de la présence de l'id

      try {
        if (id) {
          // Appel d'une fonction afin d'obtenir la recette à partir de son identifiant
          const newRecipe = await getRecipeById(parseInt(id));
          // Récupération de la nouvelle recette

          setRecipe(newRecipe);
        }
      } catch (error) {
        setError(`Erreur perçue lors de la récupération de la recette: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    // Appel de la fonction loadData
    loadData();
    // Déclenchement de l'effet lorsque l'id change
  }, [id]);

  // ------------------ GESTION DU CHARGEMENT / ERREUR ------------------
  if (loading) {
    return <p>Loading...</p>; //Affiche un message de chargement
  }

  if (error || !recipe) {
    // Redirection vers une page 404 en cas d'erreur ou si aucune recette est affichée
    return <Navigate to="/404" replace />;
  }
  // ------------------ RENDU ------------------
  return (
    <>
      <section className="section__recipe section">
        <div className="container recipe__details-container">
          {/* Balises qui seront intégrées dans le head */}
          <title>{recipe.title}</title>
          <meta name="description" content={`page de la recette : ${recipe.title}`} />
          <meta name="keywords" content={`Ciné délices, recettes, cinéma, ${recipe.title}`} />

          <h2 className="section-title has-text-centered">{recipe.title}</h2>

          <div className="recipe_items">
            {/* <!-- The order of the elements change depending on the version (tablet, desktop...) --> */}

            <figure id="recipe_img">
              <img src={`${API_URL}/${recipe.picture}`} alt={recipe.title} />
            </figure>

            <div className="level_completion-recipe">
              <p className="has-text-centered" id="level">
                Difficulté : {recipe.difficulty.name}
              </p>
              <p className="has-text-centered">-</p>
              <p className="has-text-centered" id="complétion">
                Temps de réalisation : {recipe.completion_time} minutes
              </p>
            </div>

            <div className="anecdote card">
              <h3 className="card_title">{recipe.title}</h3>
              <p className="text_recipe">{recipe.description}</p>
            </div>

            <div className="ingredients card">
              <h3 className="card_title">Ingrédients :</h3>
              <ul className="text_recipe">
                {recipe.ingredients.map((ingredient, index) => (
                  <li className="ingredient_items" key={index}>
                    • {ingredient.name} - {ingredient.RecipeHasIngredient.quantity} {ingredient.RecipeHasIngredient.unit}
                  </li>
                ))}
              </ul>
            </div>
            <div className="instruction card">
              <h3 className="card_title">Étapes :</h3>
              <p className="text_recipe"> {recipe.instruction} </p>
            </div>
          </div>

          <div className="button-center">
            <button className="button-return-catalog btn" onClick={() => navigate("/carnet")}>
              Retourner au carnet
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Recipe;
