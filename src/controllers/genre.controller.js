/**
 * @fileoverview Contrôleur gérant les opérations de lecture (GET) sur les genres
 */

const xss = require("xss");
const path = require("path");

const {
  getAllGenres: getAllGenresQuery,
  getGenreById: getGenreByIdQuery,
  getGenreByName: getGenreByNameQuery,
  getGenreBySlug: getGenreBySlugQuery,
} = require("../queries/genre.queries");

/**
 * Récupère tous les genres de la base de données
 * @async
 * @function getAllGenres
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 * @returns {Promise<void>}
 * @throws {Error} En cas d'erreur serveur
 */
const getAllGenres = async (req, res) => {
  try {
    const genres = await getAllGenresQuery();
    res.status(200).json(genres);
  } catch (error) {
    console.error("Error fetching genres:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Récupère un genre spécifique par son ID
 * @async
 * @function getGenreById
 * @param {Object} req - Requête Express
 * @param {string} req.params.id - ID du genre à récupérer
 * @param {Object} res - Réponse Express
 * @returns {Promise<void>}
 * @throws {Error} En cas d'erreur serveur
 */
const getGenreById = async (req, res) => {
  try {
    const genre = await getGenreByIdQuery(req.params.id);
    res.status(200).json(genre);
  } catch (error) {
    console.error("Error fetching genre:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Récupère un genre par son nom
 * @async
 * @function getGenreByName
 * @param {Object} req - Requête Express
 * @param {string} req.params.name - Nom du genre à récupérer
 * @param {Object} res - Réponse Express
 * @returns {Promise<void>}
 * @throws {Error} En cas d'erreur serveur
 */
const getGenreByName = async (req, res) => {
  try {
    const genre = await getGenreByNameQuery(req.params.name);
    res.status(200).json(genre);
  } catch (error) {
    console.error("Error fetching genre:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Récupère un genre par son slug
 * @async
 * @function getGenreBySlug
 * @param {Object} req - Requête Express
 * @param {string} req.params.slug - Slug du genre à récupérer
 * @param {Object} res - Réponse Express
 * @returns {Promise<void>}
 * @throws {Error} En cas d'erreur serveur
 */
const getGenreBySlug = async (req, res) => {
  try {
    const genre = await getGenreBySlugQuery(req.params.slug);
    res.status(200).json(genre);
  } catch (error) {
    console.error("Error fetching genre:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllGenres,
  getGenreById,
  getGenreByName,
  getGenreBySlug,
};
