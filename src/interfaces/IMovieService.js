/**
 * Interface pour le service de gestion des films
 */
class IMovieService {
  /**
   * Récupère tous les films
   * @returns {Promise<Array>} Liste des films
   */
  async getAllMovies() {
    throw new Error("Method not implemented");
  }

  /**
   * Récupère un film par son ID
   * @param {string} id - ID du film
   * @returns {Promise<Object>} Film trouvé
   */
  async getMovieById(id) {
    throw new Error("Method not implemented");
  }

  /**
   * Récupère un film par son titre
   * @param {string} title - Titre du film
   * @returns {Promise<Object>} Film trouvé
   */
  async getMovieByTitle(title) {
    throw new Error("Method not implemented");
  }

  /**
   * Récupère un film par son genre
   * @param {string} genre - Genre du film
   * @returns {Promise<Array>} Liste des films
   */
  async getMoviesByGenre(genre) {
    throw new Error("Method not implemented");
  }

  /**
   * Récupère un film par son slug
   * @param {string} slug - Slug du film
   * @returns {Promise<Object>} Film trouvé
   */
  async getMovieBySlug(slug) {
    throw new Error("Method not implemented");
  }

  /**
   * Récupère les films les mieux notés
   * @returns {Promise<Array>} Liste des films
   */
  async getBestMovies() {
    throw new Error("Method not implemented");
  }

  /**
   * Récupère les films les moins notés
   * @returns {Promise<Array>} Liste des films
   */
  async getWorstMovies() {
    throw new Error("Method not implemented");
  }

  /**
   * Récupère les films les plus récents
   * @returns {Promise<Array>} Liste des films
   */
  async getLatestMovies() {
    throw new Error("Method not implemented");
  }

  /**
   * Récupère des films aléatoires
   * @returns {Promise<Array>} Liste des films
   */
  async getRandomMovies() {
    throw new Error("Method not implemented");
  }

  /**
   * Crée un nouveau film
   * @param {Object} movieData - Données du film
   * @returns {Promise<Object>} Film créé
   */
  async createMovie(movieData) {
    throw new Error("Method not implemented");
  }

  /**
   * Met à jour un film existant
   * @param {string} id - ID du film
   * @param {Object} movieData - Nouvelles données
   * @returns {Promise<Object>} Film mis à jour
   */
  async updateMovie(id, movieData) {
    throw new Error("Method not implemented");
  }

  /**
   * Supprime un film
   * @param {string} id - ID du film
   * @returns {Promise<boolean>} True si supprimé avec succès
   */
  async deleteMovie(id) {
    throw new Error("Method not implemented");
  }

  /**
   * Met à jour la note d'un film
   * @param {string} id - ID du film
   * @param {number} rate - Nouvelle note
   * @returns {Promise<Object>} Film mis à jour
   */
  async updateMovieRate(id, rate) {
    throw new Error("Method not implemented");
  }
}

module.exports = IMovieService;
