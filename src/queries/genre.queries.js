/**
 * @fileoverview Module de requêtes pour les opérations CRUD sur les genres
 */

const { Genre } = require("../models/genre.model");
const { Op } = require("sequelize");

/**
 * Récupère tous les genres de la base de données
 * @async
 * @function getAllGenres
 * @returns {Promise<Array<Object>>} Liste des genres triés par nom
 * @throws {Error} En cas d'erreur lors de la récupération
 */
const getAllGenres = async () => {
  try {
    return await Genre.findAll({
      order: [["name", "ASC"]],
    });
  } catch (error) {
    console.error("Error in getAllGenres:", error);
    throw error;
  }
};

/**
 * Récupère un genre par son identifiant
 * @async
 * @function getGenreById
 * @param {number} id - Identifiant du genre
 * @returns {Promise<Object|null>} Le genre trouvé ou null si non trouvé
 * @throws {Error} En cas d'erreur lors de la récupération
 */
const getGenreById = async (id) => {
  try {
    return await Genre.findByPk(id, {
      include: [
        {
          association: "movies",
          attributes: ["id", "title", "slug", "posterPath"],
        },
      ],
    });
  } catch (error) {
    console.error("Error in getGenreById:", error);
    throw error;
  }
};

/**
 * Crée un nouveau genre dans la base de données
 * @async
 * @function createGenre
 * @param {Object} genreData - Données du genre à créer
 * @param {string} genreData.name - Nom du genre
 * @param {string} genreData.description - Description du genre
 * @returns {Promise<Object>} Le genre créé
 * @throws {Error} En cas d'erreur lors de la création
 */
const createGenre = async (genreData) => {
  try {
    return await Genre.create(genreData);
  } catch (error) {
    console.error("Error in createGenre:", error);
    throw error;
  }
};

/**
 * Met à jour les informations d'un genre
 * @async
 * @function updateGenre
 * @param {number} id - Identifiant du genre à mettre à jour
 * @param {Object} genreData - Nouvelles données du genre
 * @returns {Promise<Object|null>} Le genre mis à jour ou null si non trouvé
 * @throws {Error} En cas d'erreur lors de la mise à jour
 */
const updateGenre = async (id, genreData) => {
  try {
    const genre = await Genre.findByPk(id);
    if (!genre) {
      throw new Error("Genre non trouvé");
    }
    return await genre.update(genreData);
  } catch (error) {
    console.error("Error in updateGenre:", error);
    throw error;
  }
};

/**
 * Supprime un genre de la base de données
 * @async
 * @function deleteGenre
 * @param {number} id - Identifiant du genre à supprimer
 * @returns {Promise<Object|null>} Le genre supprimé ou null si non trouvé
 * @throws {Error} En cas d'erreur lors de la suppression
 */
const deleteGenre = async (id) => {
  try {
    const genre = await Genre.findByPk(id);
    if (!genre) {
      throw new Error("Genre non trouvé");
    }
    await genre.destroy();
    return true;
  } catch (error) {
    console.error("Error in deleteGenre:", error);
    throw error;
  }
};

/**
 * Récupère un genre par son nom
 * @async
 * @function getGenreByName
 * @param {string} name - Nom du genre
 * @returns {Promise<Object|null>} Le genre trouvé ou null si non trouvé
 * @throws {Error} En cas d'erreur lors de la récupération
 */
const getGenreByName = async (name) => {
  try {
    return await Genre.findOne({
      where: { name: { [Op.iLike]: name } },
    });
  } catch (error) {
    console.error("Error in getGenreByName:", error);
    throw error;
  }
};

/**
 * Récupère un genre par son slug
 * @async
 * @function getGenreBySlug
 * @param {string} slug - Slug du genre
 * @returns {Promise<Object|null>} Le genre trouvé ou null si non trouvé
 * @throws {Error} En cas d'erreur lors de la récupération
 */
const getGenreBySlug = async (slug) => {
  try {
    return await Genre.findOne({
      where: { slug },
      include: [
        {
          association: "movies",
          attributes: ["id", "title", "slug", "posterPath"],
        },
      ],
    });
  } catch (error) {
    console.error("Error in getGenreBySlug:", error);
    throw error;
  }
};

module.exports = {
  createGenre,
  getAllGenres,
  getGenreById,
  updateGenre,
  deleteGenre,
  getGenreByName,
  getGenreBySlug,
};
