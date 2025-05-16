import { authFetch } from "./urlWrapperApiToken.js";
// import de la variable d'environnement VITE
const API_URL = import.meta.env.VITE_API_URL;

/**
 * Récupère toutes les recettes depuis l'API.
 * @async
 * @function getRecipes
 * @returns {Promise<Array>} - Un tableau d'objets contenant les recettes.
 * @throws {Error} - Si une erreur se produit lors de la récupération des données
 */

export async function getRecipes() {
  // on met dans un try-catch pour recupérer les erreurs
  try {
    // on fait la demande API avec la route parametrée du back
    const response = await fetch(`${API_URL}/recipes`);
    // on récupère la réponse de l'API (ici les recettes disponibles)
    const dataRecipes = await response.json();
    // on vérifie que l'on a une réponse
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des recettes");
    }
    // on renvoie les données
    return dataRecipes;
    // si une erreur survient on l'indique
  } catch (error) {
    console.error("Erreur dans getRecipes:", error.message);
    throw error;
  }
}

/**
 * Récupère une recette par son ID.
 * @param  id - L'identifiant de la recette
 * @async
 * @function getRecipeById
 * @returns {Promise<Object>} - Un objet contenant les données de la recette.
 * @throws {Error} - Si une erreur se produit lors de la récupération des données.
 */

export async function getRecipeById(id) {
  // on met dans un try-catch pour recupérer les erreurs
  try {
    // on fait la demande API avec la route paramétrée du back et l'id de la recette
    const response = await fetch(`${API_URL}/recipes/${id}`);

    // on récupere la réponse de l'API (ici la recette ciblé)
    const recipe = await response.json();

    // on vérifie que la réponse est valide
    // on vérifie que l'on a une réponse
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des recettes");
    }
    // on renvoie les données
    return recipe;

    // si une erreur survient on l'indique
  } catch (error) {
    console.error("Erreur dans getRecipeById:", error.message);
    throw error;
  }
}

/**
 * Créer une nouvelle recette
 * @async
 * @function createRecipes
 * @param {FormData} formData- les Données du formulaire de création
 * @param {string} token - token de l'utilisateur connecté
 * @returns {Promise<Object>} - Un objet contenant les données de la recette créée.
 * @throws {Error} - Si une erreur se produit lors de la création de la recette.
 */
export async function createRecipes(formData) {
  try {
    // on fait la demande API avec la route paramétrée du back
    // on précise la méthode et le contenu du header avec le token
    const response = await authFetch(`${API_URL}/recipes`, {
      method: "POST",
      body: formData,
    });
    // on récupère la réponse de l'API (ici les données de la recette crée)
    const dataRecipe = await response.json();
    // on vérifie que l'on a une réponse
    if (!response.ok) {
      throw new Error(dataRecipe?.details?.[0] || "Une erreur est survenue lors de l'enregistrement en BDD");
    }
    // on renvoie les données
    return dataRecipe;
    // si une erreur survient on l'indique
  } catch (error) {
    console.error("Erreur lors de la création de recette:", error.message);
    throw error;
  }
}

/**
 * Récupèration des recettes en fonction de la recherche
 * @async
 * @function getRecipeBySearch
 * @param {string} search - Le terme de recherche
 * @returns {Promise<Array>} - Un tableau d'objets contenant les recettes trouvées.
 * @throws {Error} - Si une erreur se produit lors de la récupération des données.
 */

export async function getRecipeBySearch(search) {
  // on met dans un try-catch pour récupérer les erreurs
  try {
    // on fait la demande API avec la route paramétrée du back, le mot rechercher
    const response = await fetch(`${API_URL}/recipes/search/${search}`);
    // on récupère la réponse de l'API (ici les recettes trouvées avec le mot recherché)
    const foundRecipes = await response.json();
    // on vérifie que l'on a une réponse
    if (!response.ok) {
      throw new Error(foundRecipes?.details?.[0] || "Une erreur est survenue lors de l'enregistrement en BDD");
    }
    console.log(foundRecipes);
    // on renvoie les données
    return foundRecipes;
    // si une erreur survient on l'indique
  } catch (error) {
    console.error("Erreur lors de la création de recette:", error.message);
    throw error;
  }
}
