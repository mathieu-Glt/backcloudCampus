/**
 * @fileoverview Module de requêtes pour les opérations CRUD sur les films
 */

const Movie = require("../../models/movie.model");

// Méthodes CRUD

/**
 * Crée un nouveau film dans la base de données
 * @async
 * @function createMovie
 * @param {Object} movieData - Données du film à créer
 * @param {string} movieData.title - Titre du film
 * @param {string} movieData.synopsis - Synopsis du film
 * @param {string} movieData.picture - URL de l'affiche du film
 * @param {string} movieData.url - URL de la bande-annonce
 * @param {number} movieData.rate - Note du film
 * @param {number} movieData.genreId - ID du genre associé
 * @returns {Promise<Object>} Le film créé
 */
const createMovie = async (movieData) => {
  return await Movie.create(movieData);
};

/**
 * Met à jour les informations d'un film
 * @async
 * @function updateMovie
 * @param {number} id - Identifiant du film à mettre à jour
 * @param {Object} movieData - Nouvelles données du film
 * @returns {Promise<Object|null>} Le film mis à jour ou null si non trouvé
 */
const updateMovie = async (id, movieData) => {
  const movie = await Movie.findByPk(id);
  if (!movie) return null;

  await movie.update(movieData);
  return movie;
};

/**
 * Supprime un film de la base de données
 * @async
 * @function deleteMovie
 * @param {number} id - Identifiant du film à supprimer
 * @returns {Promise<Object|null>} Le film supprimé ou null si non trouvé
 */
const deleteMovie = async (id) => {
  const movie = await Movie.findByPk(id);
  if (!movie) return null;

  await movie.destroy();
  return movie;
};

/**
 * Met à jour la note d'un film
 * @async
 * @function updateMovieRate
 * @param {number} id - Identifiant du film
 * @param {number} rate - Nouvelle note du film
 * @returns {Promise<Object|null>} Le film mis à jour ou null si non trouvé
 */
const updateMovieRate = async (id, rate) => {
  const movie = await Movie.findByPk(id);
  if (!movie) return null;

  await movie.update({ rate });
  return movie;
};

module.exports = {
  createMovie,
  updateMovie,
  deleteMovie,
  updateMovieRate,
};
