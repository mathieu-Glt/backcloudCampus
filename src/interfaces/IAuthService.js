/**
 * Interface pour le service d'authentification
 */
class IAuthService {
  /**
   * Authentifie un utilisateur
   * @param {string} email - Email de l'utilisateur
   * @param {string} password - Mot de passe de l'utilisateur
   * @returns {Promise<Object>} Résultat de l'authentification
   */
  async authenticate(email, password) {
    throw new Error("Method not implemented");
  }

  /**
   * Vérifie un token JWT
   * @param {string} token - Token JWT à vérifier
   * @returns {Promise<Object>} Résultat de la vérification
   */
  async verifyToken(token) {
    throw new Error("Method not implemented");
  }

  /**
   * Génère un nouveau refresh token
   * @param {string} userId - ID de l'utilisateur
   * @returns {Promise<string>} Refresh token généré
   */
  async generateRefreshToken(userId) {
    throw new Error("Method not implemented");
  }

  /**
   * Vérifie et renouvelle un refresh token
   * @param {string} refreshToken - Refresh token à vérifier
   * @returns {Promise<Object>} Nouveaux tokens d'accès
   */
  async refreshAccessToken(refreshToken) {
    throw new Error("Method not implemented");
  }

  /**
   * Révoque un refresh token
   * @param {string} refreshToken - Refresh token à révoquer
   * @returns {Promise<boolean>} True si révoqué avec succès
   */
  async revokeRefreshToken(refreshToken) {
    throw new Error("Method not implemented");
  }
}

module.exports = IAuthService;
