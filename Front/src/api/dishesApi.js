// import de la variable d'environnement VITE
const API_URL = import.meta.env.VITE_API_URL;

/**
 * @async
 * @function getDishesCategories
 * @returns {Promise<Array>|null>} - Un tableau d'objets contenant les catégories de plat.
 * @throws {Error} - Si une erreur se produit lors de la récupération des données.
  */
//récupérer toutes les categories de plat
export async function getDishesCategories() {
  // on met dans un try-catch pour recupérer les erreurs
  try {
    // on fait la demande API avec la route parrametré du back
    const response = await fetch(`${API_URL}/dishesCategories`);
    if (response.status === 500) {
      window.location.href = "/500"; // redirige immédiatement
      return null;
    }
    // on verrifie que l'on ai une réponse
    if (!response.ok) {
      // Gestion des erreurs HTTP
      throw new Error(`Erreur HTTP : ${response.status} ${response.statusText}`);
    }
    // on récupere la réponse de l'API avec les données demandé (ici les données des categories de plat)
    const dataDishesCategories = await response.json();
    // on renvois les données
    return dataDishesCategories;
    // si une erreur survient on l'indique
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories de plat :", error);
    return;
  }
}

/**
 * Récupére toutes les difficultées de plat depuis l'API.
 * @async
 * @function getDishesDifficulty
 * @returns {Promise<Array>} - Un tableau d'objets contenant les difficultées de plat.
 * @throws {Error} - Si une erreur se produit lors de la récupération des données.
 */
export async function getDishesDifficulty() {
  // on met dans un try-catch pour recupérer les erreurs
  try {
     // on fait la demande API avec la route parrametré du back
    const response = await fetch(`${API_URL}/dishesDifficulty`);
    // on verrifie que l'on ai une réponse
    if (!response.ok) {
      // Gestion des erreurs HTTP
      throw new Error(`Erreur HTTP : ${response.status} ${response.statusText}`);
    }
    // on récupere la réponse de l'API avec les données demandé (ici les difficulté de plat)
    const dataDishesDifficulty = await response.json();
    // on renvois les données
    return dataDishesDifficulty;
    // si une erreur survient on l'indique
  } catch (error) {
    console.error("Erreur lors de la récupération des difficultées de plat :", error);
    return;
  }
}