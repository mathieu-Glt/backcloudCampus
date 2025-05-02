const { Movie } = require("../models/movie.model");
const { Op, fn } = require("sequelize");

/**
 * Récupère tous les films
 * @returns {Promise<Array>} Liste des films
 */
const getAllMovies = async () => {
  try {
    return await Movie.findAll({
      order: [["createdAt", "DESC"]],
    });
  } catch (error) {
    console.error("Error in getAllMovies:", error);
    throw error;
  }
};

/**
 * Récupère un film par son ID
 * @param {number} id - ID du film
 * @returns {Promise<Object>} Film trouvé
 */
const getMovieById = async (id) => {
  try {
    return await Movie.findByPk(id);
  } catch (error) {
    console.error("Error in getMovieById:", error);
    throw error;
  }
};

/**
 * Crée un nouveau film
 * @async
 * @function createMovie
 * @param {Object} movieData - Données du film
 * @returns {Promise<Object>} Film créé
 */
const createMovie = async (movieData) => {
  try {
    return await Movie.create(movieData);
  } catch (error) {
    console.error("Error in createMovie:", error);
    throw error;
  }
};

/**
 * Met à jour un film
 * @async
 * @function updateMovie
 * @param {number} id - ID du film
 * @param {Object} movieData - Nouvelles données du film
 * @returns {Promise<Object>} Film mis à jour
 */
const updateMovie = async (id, movieData) => {
  try {
    const movie = await Movie.findByPk(id);
    if (!movie) {
      throw new Error("Film non trouvé");
    }
    return await movie.update(movieData);
  } catch (error) {
    console.error("Error in updateMovie:", error);
    throw error;
  }
};

/**
 * Supprime un film
 * @async
 * @function deleteMovie
 * @param {number} id - ID du film
 * @returns {Promise<boolean>} Succès de la suppression
 */
const deleteMovie = async (id) => {
  try {
    const movie = await Movie.findByPk(id);
    if (!movie) {
      throw new Error("Film non trouvé");
    }
    await movie.destroy();
    return true;
  } catch (error) {
    console.error("Error in deleteMovie:", error);
    throw error;
  }
};

/**
 * Récupère un film par son titre
 * @param {string} title - Titre du film
 * @returns {Promise<Object>} Film trouvé
 */
const getMovieByTitle = async (title) => {
  try {
    return await Movie.findOne({ where: { title } });
  } catch (error) {
    console.error("Error in getMovieByTitle:", error);
    throw error;
  }
};

/**
 * Récupère un film par son slug
 * @param {string} slug - Slug du film
 * @returns {Promise<Object>} Film trouvé
 */
const getMovieBySlug = async (slug) => {
  try {
    return await Movie.findOne({ where: { slug } });
  } catch (error) {
    console.error("Error in getMovieBySlug:", error);
    throw error;
  }
};

/**
 * Récupère les films les mieux notés
 * @returns {Promise<Array>} Liste des films
 */
const getBestMovies = async () => {
  try {
    return await Movie.findAll({
      order: [["rate", "DESC"]],
      limit: 10,
    });
  } catch (error) {
    console.error("Error in getBestMovies:", error);
    throw error;
  }
};

/**
 * Récupère les films les moins notés
 * @returns {Promise<Array>} Liste des films
 */
const getWorstMovies = async () => {
  try {
    return await Movie.findAll({
      order: [["rate", "ASC"]],
      limit: 10,
    });
  } catch (error) {
    console.error("Error in getWorstMovies:", error);
    throw error;
  }
};

/**
 * Récupère les films les plus récents
 * @returns {Promise<Array>} Liste des films
 */
const getLatestMovies = async () => {
  try {
    return await Movie.findAll({
      order: [["createdAt", "DESC"]],
      limit: 10,
    });
  } catch (error) {
    console.error("Error in getLatestMovies:", error);
    throw error;
  }
};

/**
 * Récupère des films aléatoires
 * @returns {Promise<Array>} Liste des films
 */
const getRandomMovies = async () => {
  try {
    return await Movie.findAll({
      order: [fn("RANDOM")],
      limit: 10,
    });
  } catch (error) {
    console.error("Error in getRandomMovies:", error);
    throw error;
  }
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
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  updateMovieRate,
  getMovieByTitle,
  getMovieBySlug,
  getBestMovies,
  getWorstMovies,
  getLatestMovies,
  getRandomMovies,
};
