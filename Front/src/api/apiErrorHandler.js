import { useErrorBoundary } from "react-error-boundary";

/**
 * * Gère les erreurs en utilisant le hook useErrorBoundary de react-error-boundary.
 * @function useErrorHandler
 * @param {function} showBoundary - Fonction pour afficher la frontière d'erreur.
 * @param {Error} error - L'erreur à gérer.
 * @returns 
 */


// Définition d'un hook adapté à la gestion des erreurs
export function useErrorHandler() {
  const { showBoundary } = useErrorBoundary();

  const handleError = (error) => {
    console.error("Une erreur s'est produite", error);

    // Si c'est une instance d'Error ET que le code HTTP est 500, on affiche la boundary
    if (error instanceof Error && error.status === 500) {
      showBoundary(error);
    }
  };

  return handleError;
}
