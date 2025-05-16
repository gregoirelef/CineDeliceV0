// importation de la function pour récupéré le Token

import { authFetch } from "./urlWrapperApiToken.js";
// import de la variable d'environnement VITE
const API_URL = import.meta.env.VITE_API_URL;

/**
 * Créer une nouvelle oeuvre
 * @param {string} id- Id de l'user à supprimer
 * @param {string} token - token de l'utilisateur conecté
 */
// function pour récupérer tous les utilisateurs
export async function getAllUsers() {
  // on met dans un try-catch pour recupérer les erreurs
  try {
    // on fait la demande API avec la route parametrée du back
    const response = await authFetch(`${API_URL}/admin/users`, {
      // on complete le header avec les données de formulaire et le token
      method: "GET",
      credentials: "include",
    });
    // on vérifie que l'on a une réponse
    if (!response.ok) {
      // Gestion des erreurs HTTP
      throw new Error(`Erreur HTTP : ${response.status} ${response.statusText}`);
    }
    // on récupère la réponse de l'API avec les données demandées (ici les données de tous les utilisateurs)
    const dataUsers = await response.json();
    // console.log(dataUsers);
    // on renvoie les données
    return dataUsers;
  } catch (error) {
    // si une erreur survient on l'indique.
    console.error("Erreur lors de la récupération des utilisateurs :", error);
    return;
  }
}

/**
 * Suprimmer un utilisateur
 * @param {string} id- Id de l'user à supprimer
 */

// function pour supprimmer un utilisateur par son ID
export async function deleteOneUser(id) {
  try {
    // on fait la demande API avec la route paramétré du back, l'ID du user.
    // on précise la methode et le contenu du hearder avec le Token
    const response = await authFetch(`${API_URL}/admin/user/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    // on récupère la réponse de l'API (ici la suppression de l'utilisateur)
    const deletedUser = await response.json();
    // on renvoie les données
    return deletedUser;
  } catch (error) {
    // si une erreur survient on l'indique.
    console.error("Erreur dans la suppression de l'user:", error.message);
    throw error;
  }
}

/**
 * Supprimmer un ingrédient
 * @param {string} id- Id de l'ingrédient à supprimer
 */
// function pour supprimer un ingrédient par son ID
export async function deleteOneIngredient(id) {
  try {
    // on fait la demande API avec la route paramétré du back, l'ID de l'ingredient.
    // on précise la méthode et le contenu du header avec le token
    const response = await authFetch(`${API_URL}/admin/ingredients/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    // on récupère la réponse de l'API (ici la suppression de l'ingrédient)
    const data = await response.json();

    if (!response.ok) {
      // On jette une erreur contenant les détails du backend
      throw new Error(JSON.stringify(data.details || [data.message || "Erreur serveur."]));
    }
    // on renvoie les données
    return data;
  } catch (error) {
    // si une erreur survient on l'indique.
    console.error("Erreur dans la suppression de l'user:", error.message);
    throw error;
  }
}



/**
 * Supprimmer un film
 * @param {string} id- ID du film à supprimer
 */
// function pour supprimmer une motion par son ID
export async function deleteOneMotion(id) {
  try {
    // on fait la demande API avec la route paramétrée du back, l'ID de la motion.
    // on précise la methode et le contenu du header avec le Token
    const response = await authFetch(`${API_URL}/admin/motions/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    // on récupère la réponse de l'API (ici la superession de la motion)
    const deletedMotion = await response.json();
    // on renvois les données
    return deletedMotion;
  } catch (error) {
    // si une erreur survient on l'indique.
    console.error("Erreur dans la suppression de l'user:", error.message);
    throw error;
  }
}

/**
 * Supprimmer un utilisateur
 * @param {string} ingredient- l'éngredient à créer
 */
// function pour créeé un ingredient
export async function createIngredient(ingredient) {
  try {
    // on fait la demande API avec la route paramétrée du back pour créer un ingredient.
    // on précise la methode et le contenu du header avec le èoken
    const response = await authFetch(`${API_URL}/admin/ingredients`, {
      method: "POST",
      credentials: "include",

      // on transforme le body en string
      body: JSON.stringify(ingredient),
    });
    // on récupere la réponse de l'API (ici la création d'un ingrédient)
    const data = await response.json();
    // on vérifie que l'on a une réponse positive
    if (!response.ok) {
      // Si l'erreur est une erreur de validation, elle aura un tableau 'details'
      if (data.details && Array.isArray(data.details)) {
        // Transforme en chaîne de caractères pour faciliter l'affichage
        throw new Error(JSON.stringify(data.details));
      }
      //si erreur on l'indique
      throw new Error(data.message || "Une erreur est survenue");
    }
    // Renvoie l'ingrédient créé si tout va bien
    return data;
    // si une erreur survient on l'indique
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'ingrédient:", error.message);
    throw error; // Relance l'erreur pour qu'elle soit traitée dans le frontend
  }
}

/**
 * Supprimer une recette
 * @param {string} id- Id de la recette à supprimer
 */
// fonction pour supprimmer une recette
export async function deleteOneRecipe(id) {
  try {
    // on fait la demande API avec la route paramétrée du back avec l'ID de la recette.
    // on précise la methode et le contenu du header avec le token
    const response = await authFetch(`${API_URL}/admin/recipes/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    // on récupère la réponse de l'API (ici la supression d'une recette)
    const deletedRecipe = await response.json();
    // Renvoie la confirmation de la suppression de la recette si tout va bien
    return deletedRecipe;
    // si une erreur survient on l'indique
  } catch (error) {
    console.error("Erreur dans la suppression de l'user:", error.message);
    throw error;
  }
}

/**
 * Modifier une nouvelle recette
 * @param {string} formData- Formulaire de la recette à modifier
 */

// fonction pour modifier une recette
export async function modifyOneRecipe(id, formData) {
  try {
    // on fait la demande API avec la route paramétrée du back avec l'ID de la recette.
    // on précise la méthode et le contenu du header avec le token
    const response = await authFetch(`${API_URL}/admin/recipes/${id}`, {
      method: "PATCH",
      credentials: "include",
      body: formData,
    });
    // on récupère la réponse de l'API (ici la modification d'une recette)
    const changedRecipe = await response.json();
    // on vérifie que l'on a une réponse positive
    if (!response.ok) {
      // Si l'erreur est une erreur de validation, elle aura un tableau 'details'
      throw new Error(changedRecipe.details?.[0] || "Erreur lors de la modification");
    }
    // Renvoie la recette modifiée si tout va bien
    return changedRecipe;
    // si une erreur survient on l'indique
  } catch (error) {
    console.error("Erreur dans la modification", error.message);
    throw error;
  }
}

/**
 * Modification d'une motion en envoyant une requête PATCH
 * @async
 * @function modifyOneMotion
 * @param {string} id - ID de la motion à modifier
 * @param {FormData} formData - Données du formulaire contenant les informations de la motion
 * @returns {Promise<object>} - La motion modifiée
 * @throws {Error} - En cas d'erreur lors de la requête ou de la réponse
 */

// fonction pour modifier une motion
export async function modifyOneMotion(id, formData) {
  // on met dans un try-catch pour recupérer les erreurs
  try {
    const response = await authFetch(`${API_URL}/admin/motions/${id}`, {
      method: "PATCH",
      credentials: "include",
      body: formData,
    });
    // on vérifie que l'on a une réponse positive
    const changedMotion = await response.json();
    if (!response.ok) {
      // Si l'erreur est une erreur de validation, elle aura un tableau 'details'
      throw new Error(changedMotion.details?.[0] || "Erreur lors de la modification");
    }
    // Renvoie la motion modifiée si tout va bien
    return changedMotion;
    // si une erreur survient on l'indique
  } catch (error) {
    console.error("Erreur dans la modification", error.message);
    throw error;
  }
}