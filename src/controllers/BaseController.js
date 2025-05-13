/**
 * Classe de base pour tous les contrôleurs
 */
class BaseController {
  /**
   * Gère les réponses de succès
   * @param {Object} res - Réponse Express
   * @param {number} statusCode - Code de statut HTTP
   * @param {Object} data - Données à envoyer
   */
  sendSuccess(res, statusCode, data) {
    res.status(statusCode).json(data);
  }

  /**
   * Gère les réponses d'erreur
   * @param {Object} res - Réponse Express
   * @param {number} statusCode - Code de statut HTTP
   * @param {string} message - Message d'erreur
   * @param {Error} error - Erreur originale
   */
  sendError(res, statusCode, message, error) {
    res.status(statusCode).json({
      status: statusCode,
      message,
      error: error?.message,
    });
  }

  /**
   * Gère les réponses "non trouvé"
   * @param {Object} res - Réponse Express
   * @param {string} message - Message d'erreur
   */
  sendNotFound(res, message) {
    this.sendError(res, 404, message);
  }
}

module.exports = BaseController;
