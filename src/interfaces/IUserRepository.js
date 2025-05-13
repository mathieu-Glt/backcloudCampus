/**
 * Interface pour le repository utilisateur
 */
class IUserRepository {
  constructor() {
    if (this.constructor === IUserRepository) {
      throw new Error(
        "IUserRepository est une classe abstraite et ne peut pas être instanciée directement"
      );
    }
  }

  /**
   * Trouve tous les utilisateurs
   * @param {Object} options - Options de recherche
   * @returns {Promise<Array>} Liste des utilisateurs
   */
  async findAll(options) {
    throw new Error("Méthode abstraite findAll() doit être implémentée");
  }

  /**
   * Trouve un utilisateur par sa clé primaire
   * @param {string} id - ID de l'utilisateur
   * @param {Object} options - Options de recherche
   * @returns {Promise<Object>} Utilisateur trouvé
   */
  async findByPk(id, options) {
    throw new Error("Méthode abstraite findByPk() doit être implémentée");
  }

  /**
   * Trouve un utilisateur selon des critères
   * @param {Object} options - Options de recherche
   * @returns {Promise<Object>} Utilisateur trouvé
   */
  async findOne(options) {
    throw new Error("Méthode abstraite findOne() doit être implémentée");
  }

  /**
   * Crée un nouvel utilisateur
   * @param {Object} data - Données de l'utilisateur
   * @returns {Promise<Object>} Utilisateur créé
   */
  async create(data) {
    throw new Error("Méthode abstraite create() doit être implémentée");
  }

  /**
   * Met à jour un utilisateur
   * @param {Object} data - Nouvelles données
   * @param {Object} options - Options de mise à jour
   * @returns {Promise<Array>} Résultat de la mise à jour
   */
  async update(data, options) {
    throw new Error("Méthode abstraite update() doit être implémentée");
  }
}

module.exports = IUserRepository;
