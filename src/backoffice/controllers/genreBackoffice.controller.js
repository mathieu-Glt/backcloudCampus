/**
 * @fileoverview Contrôleur gérant les opérations CRUD sur les genres dans le backoffice
 */

const xss = require("xss");
const path = require("path");

const {
  createGenre: createGenreQuery,
  updateGenre: updateGenreQuery,
  deleteGenre: deleteGenreQuery,
  getGenreById: getGenreByIdQuery,
} = require("../queries/genreBackoffice.queries");

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
  createGenre,
  updateGenre,
  deleteGenre,
};
