/**
 * Classe abstraite pour le service de gestion des genres
 */
class IGenreService {
  constructor() {
    if (this.constructor === IGenreService) {
      throw new Error(
        "IGenreService est une classe abstraite et ne peut pas être instanciée directement"
      );
    }
  }

  /**
   * Récupère tous les genres
   * @abstract
   * @returns {Promise<Array>} Liste des genres
   */
  async getAllGenres() {
    throw new Error("Méthode abstraite getAllGenres() doit être implémentée");
  }

  /**
   * Récupère un genre par son ID
   * @abstract
   * @param {string} id - ID du genre
   * @returns {Promise<Object>} Genre trouvé
   */
  async getGenreById(id) {
    throw new Error("Méthode abstraite getGenreById() doit être implémentée");
  }

  /**
   * Crée un nouveau genre
   * @abstract
   * @param {Object} genreData - Données du genre à créer
   * @returns {Promise<Object>} Nouveau genre créé
   */
  async createGenre(genreData) {
    throw new Error("Méthode abstraite createGenre() doit être implémentée");
  }

  /**
   * Met à jour un genre existant
   * @abstract
   * @param {string} id - ID du genre à mettre à jour
   * @param {Object} genreData - Données du genre à mettre à jour
   * @returns {Promise<Object>} Genre mis à jour
   */
  async updateGenre(id, genreData) {
    throw new Error("Méthode abstraite updateGenre() doit être implémentée");
  }

  /**
   * Supprime un genre existant
   * @abstract
   * @param {string} id - ID du genre à supprimer
   * @returns {Promise<boolean>} True si le genre a été supprimé, false sinon
   */
  async deleteGenre(id) {
    throw new Error("Méthode abstraite deleteGenre() doit être implémentée");
  }
}

module.exports = IGenreService;
