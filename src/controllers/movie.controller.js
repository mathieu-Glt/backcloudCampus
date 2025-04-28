/**
 * @fileoverview Contrôleur gérant les opérations de lecture (GET) sur les films
 */

const xss = require("xss");
const path = require("path");
const {
  getAllMovies: getAllMoviesQuery,
  getMovieById: getMovieByIdQuery,
  getMovieByTitle: getMovieByTitleQuery,
  getMovieBySlug: getMovieBySlugQuery,
  getBestMovies: getBestMoviesQuery,
  getWorstMovies: getWorstMoviesQuery,
  getLatestMovies: getLatestMoviesQuery,
  getRandomMovies: getRandomMoviesQuery,
} = require("../queries/movie.queries");

/**
 * Récupère tous les films de la base de données
 * @async
 * @function getAllMovies
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 * @returns {Promise<void>}
 * @throws {Error} En cas d'erreur serveur
 */
const getAllMovies = async (req, res) => {
  try {
    const movies = await getAllMoviesQuery();
    res.status(200).json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Récupère un film spécifique par son ID
 * @async
 * @function getMovieById
 * @param {Object} req - Requête Express
 * @param {string} req.params.id - ID du film à récupérer
 * @param {Object} res - Réponse Express
 * @returns {Promise<void>}
 * @throws {Error} En cas d'erreur serveur
 */
const getMovieById = async (req, res) => {
  try {
    const movie = await getMovieByIdQuery(req.params.id);
    res.status(200).json(movie);
  } catch (error) {
    console.error("Error fetching movie:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Récupère un film par son titre
 * @async
 * @function getMovieByTitle
 * @param {Object} req - Requête Express
 * @param {string} req.params.title - Titre du film à récupérer
 * @param {Object} res - Réponse Express
 * @returns {Promise<void>}
 * @throws {Error} En cas d'erreur serveur
 */
const getMovieByTitle = async (req, res) => {
  try {
    const movie = await getMovieByTitleQuery(req.params.title);
    res.status(200).json(movie);
  } catch (error) {
    console.error("Error fetching movie:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Récupère un film par son slug
 * @async
 * @function getMovieBySlug
 * @param {Object} req - Requête Express
 * @param {string} req.params.slug - Slug du film à récupérer
 * @param {Object} res - Réponse Express
 * @returns {Promise<void>}
 * @throws {Error} En cas d'erreur serveur
 */
const getMovieBySlug = async (req, res) => {
  try {
    const movie = await getMovieBySlugQuery(req.params.slug);
    res.status(200).json(movie);
  } catch (error) {
    console.error("Error fetching movie:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Récupère les films les mieux notés
 * @async
 * @function getBestMovies
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 * @returns {Promise<void>}
 * @throws {Error} En cas d'erreur serveur
 */
const getBestMovies = async (req, res) => {
  try {
    const movies = await getBestMoviesQuery();
    res.status(200).json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Récupère les films les moins bien notés
 * @async
 * @function getWorstMovies
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 * @returns {Promise<void>}
 * @throws {Error} En cas d'erreur serveur
 */
const getWorstMovies = async (req, res) => {
  try {
    const movies = await getWorstMoviesQuery();
    res.status(200).json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Récupère les films les plus récemment ajoutés
 * @async
 * @function getLatestMovies
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 * @returns {Promise<void>}
 * @throws {Error} En cas d'erreur serveur
 */
const getLatestMovies = async (req, res) => {
  try {
    const movies = await getLatestMoviesQuery();
    res.status(200).json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Récupère une sélection aléatoire de films
 * @async
 * @function getRandomMovies
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 * @returns {Promise<void>}
 * @throws {Error} En cas d'erreur serveur
 */
const getRandomMovies = async (req, res) => {
  try {
    const movies = await getRandomMoviesQuery();
    res.status(200).json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllMovies,
  getMovieById,
  getMovieByTitle,
  getMovieBySlug,
  getBestMovies,
  getWorstMovies,
  getLatestMovies,
  getRandomMovies,
};
