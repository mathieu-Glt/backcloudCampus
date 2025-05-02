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
  createGenre: createGenreQuery,
  updateGenre: updateGenreQuery,
  deleteGenre: deleteGenreQuery,
} = require("../queries/genre.queries");
/**
 * Crée un nouveau genre dans la base de données
 * @async
 * @function createGenre
 * @param {Object} req - Requête Express
 * @param {string} req.body.name - Nom du genre à créer
 * @param {Object} res - Réponse Express
 * @param {Function} next - Middleware suivant
 * @returns {Promise<void>}
 * @throws {Error} En cas d'erreur serveur
 */
const createGenre = async (req, res) => {
  try {
    const { name } = req.body;

    const cleanName = xss(name);

    const genre = await createGenreQuery({ name: cleanName });

    res.status(201).json(genre);
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Erreur lors de la création du genre",
      error: error.message,
    });
  } finally {
    next();
  }
};

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

/**
 * Met à jour un genre existant
 * @async
 * @function updateGenre
 * @param {Object} req - Requête Express
 * @param {string} req.params.id - ID du genre à mettre à jour
 * @param {string} req.body.name - Nouveau nom du genre
 * @param {Object} res - Réponse Express
 * @param {Function} next - Middleware suivant
 * @returns {Promise<void>}
 * @throws {Error} Si le genre n'existe pas ou en cas d'erreur serveur
 */
const updateGenre = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const cleanName = xss(name);

    const existingGenre = await getGenreByIdQuery(id);
    if (!existingGenre) {
      return res.status(404).json({
        status: 404,
        message: "Genre not found",
      });
    }

    const genre = await updateGenreQuery(id, { name: cleanName });

    if (!genre) {
      return res.status(404).json({
        status: 404,
        message: "Genre non trouvé",
      });
    }

    res.status(200).json(genre);
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Erreur lors de la mise à jour du genre",
      error: error.message,
    });
  } finally {
    next();
  }
};

/**
 * Supprime un genre de la base de données
 * @async
 * @function deleteGenre
 * @param {Object} req - Requête Express
 * @param {string} req.params.id - ID du genre à supprimer
 * @param {Object} res - Réponse Express
 * @param {Function} next - Middleware suivant
 * @returns {Promise<void>}
 * @throws {Error} Si le genre n'existe pas ou en cas d'erreur serveur
 */
const deleteGenre = async (req, res, next) => {
  try {
    const { id } = req.params;

    const genre = await deleteGenreQuery(id);

    if (!genre) {
      return res.status(404).json({
        status: 404,
        message: "Genre non trouvé",
      });
    }

    res.status(200).json(genre);
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Erreur lors de la suppression du genre",
      error: error.message,
    });
  } finally {
    next();
  }
};

module.exports = {
  getAllGenres,
  getGenreById,
  getGenreByName,
  getGenreBySlug,
  createGenre,
  updateGenre,
  deleteGenre,
};
