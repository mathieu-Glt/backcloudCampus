/**
 * Interface pour le repository des genres
 */
class IGenreRepository {
  constructor() {
    if (this.constructor === IGenreRepository) {
      throw new Error(
        "IGenreRepository est une classe abstraite et ne peut pas être instanciée directement"
      );
    }
  }

  /**
   * Récupère tous les genres
   * @param {Object} options - Options de recherche
   * @returns {Promise<Array>} Liste des genres
   */
  async findAll(options) {
    throw new Error("Méthode abstraite findAll() doit être implémentée");
  }

  /**
   * Récupère un genre par son ID
   * @param {string} id - ID du genre
   * @param {Object} options - Options de recherche
   * @returns {Promise<Object>} Genre trouvé
   */
  async findByPk(id, options) {
    throw new Error("Méthode abstraite findByPk() doit être implémentée");
  }

  /**
   * Crée un nouveau genre
   * @param {Object} genreData - Données du genre à créer
   * @returns {Promise<Object>} Nouveau genre créé
   */
  async create(genreData) {
    throw new Error("Méthode abstraite create() doit être implémentée");
  }

  /**
   * Met à jour un genre existant
   * @param {string} id - ID du genre à mettre à jour
   * @param {Object} genreData - Données du genre à mettre à jour
   * @returns {Promise<Object>} Genre mis à jour
   */
  async update(id, genreData) {
    throw new Error("Méthode abstraite update() doit être implémentée");
  }

  /**
   * Supprime un genre existant
   * @param {string} id - ID du genre à supprimer
   * @param {Object} options - Options de suppression
   * @returns {Promise<boolean>} True si le genre a été supprimé, false sinon
   */
  async destroy(id, options) {
    throw new Error("Méthode abstraite destroy() doit être implémentée");
  }
}

module.exports = IGenreRepository;
