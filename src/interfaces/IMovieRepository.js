/**
 * Interface pour le repository de gestion des films
 */
class IMovieRepository {
  constructor() {
    if (this.constructor === IMovieRepository) {
      throw new Error(
        "IMovieRepository est une classe abstraite et ne peut pas être instanciée directement"
      );
    }
  }

  /**
   * Récupère tous les films
   * @param {Object} options - Options de requête
   * @returns {Promise<Array>} Liste des films
   */
  async findAll(options) {
    throw new Error("Méthode abstraite findAll() doit être implémentée");
  }

  /**
   * Récupère un film par son ID
   * @param {string} id - ID du film
   * @param {Object} options - Options de requête
   * @returns {Promise<Object>} Film trouvé
   */
  async findByPk(id, options) {
    throw new Error("Méthode abstraite findByPk() doit être implémentée");
  }

  /**
   * Récupère un film selon des critères
   * @param {Object} options - Options de requête
   * @returns {Promise<Object>} Film trouvé
   */
  async findOne(options) {
    throw new Error("Méthode abstraite findOne() doit être implémentée");
  }

  /**
   * Crée un nouveau film
   * @param {Object} data - Données du film
   * @returns {Promise<Object>} Film créé
   */
  async create(data) {
    throw new Error("Méthode abstraite create() doit être implémentée");
  }

  /**
   * Met à jour un film
   * @param {Object} data - Nouvelles données
   * @param {Object} options - Options de mise à jour
   * @returns {Promise<Array>} Résultat de la mise à jour
   */
  async update(data, options) {
    throw new Error("Méthode abstraite update() doit être implémentée");
  }

  /**
   * Supprime un film
   * @param {Object} options - Options de suppression
   * @returns {Promise<boolean>} True si supprimé avec succès
   */
  async destroy(options) {
    throw new Error("Méthode abstraite destroy() doit être implémentée");
  }
}

module.exports = IMovieRepository;
