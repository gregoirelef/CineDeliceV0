import { Difficulty } from "../models/association.js";

const difficulyController = {
  /**
   * Récupère toutes les difficultés de plats.
   * @async
   * @function getAllDifficulty
   * @param {import('express').Request} req - Requête Express
   * @param {import('express').Response} res - Réponse Express
   * @param {Function} next - Fonction middleware suivante
   * @returns {Promise<void>}
   */
  async getAllDifficulty(req, res, next) {
    const difficulty = await Difficulty.findAll();
    // Si difficultés trouvées, on les renvoie au format JSON avec un statut 200
    res.status(200).json(difficulty);
  },
};

export default difficulyController;
