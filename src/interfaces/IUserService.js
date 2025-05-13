/**
 * Classe abstraite pour le service de gestion des utilisateurs
 */
class IUserService {
  constructor() {
    if (this.constructor === IUserService) {
      throw new Error(
        "IUserService est une classe abstraite et ne peut pas être instanciée directement"
      );
    }
  }

  /**
   * Récupère tous les utilisateurs
   * @abstract
   * @returns {Promise<Array>} Liste des utilisateurs
   */
  async getAllUsers() {
    throw new Error("Méthode abstraite getAllUsers() doit être implémentée");
  }

  /**
   * Récupère un utilisateur par son ID
   * @abstract
   * @param {string} id - ID de l'utilisateur
   * @returns {Promise<Object>} Utilisateur trouvé
   */
  async getUserById(id) {
    throw new Error("Méthode abstraite getUserById() doit être implémentée");
  }

  /**
   * Récupère un utilisateur par son email
   * @abstract
   * @param {string} email - Email de l'utilisateur
   * @returns {Promise<Object>} Utilisateur trouvé
   */
  async getUserByEmail(email) {
    throw new Error("Méthode abstraite getUserByEmail() doit être implémentée");
  }

  /**
   * Crée un nouvel utilisateur
   * @abstract
   * @param {Object} userData - Données de l'utilisateur
   * @returns {Promise<Object>} Utilisateur créé
   */
  async createUser(userData) {
    throw new Error("Méthode abstraite createUser() doit être implémentée");
  }

  /**
   * Met à jour un utilisateur existant
   * @abstract
   * @param {string} id - ID de l'utilisateur
   * @param {Object} userData - Nouvelles données
   * @returns {Promise<Object>} Utilisateur mis à jour
   */
  async updateUser(id, userData) {
    throw new Error("Méthode abstraite updateUser() doit être implémentée");
  }

  /**
   * Supprime un utilisateur
   * @abstract
   * @param {string} id - ID de l'utilisateur
   * @returns {Promise<boolean>} True si supprimé avec succès
   */
  async deleteUser(id) {
    throw new Error("Méthode abstraite deleteUser() doit être implémentée");
  }
}

module.exports = IUserService;
