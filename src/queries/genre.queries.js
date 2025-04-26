const { Genre } = require("../models/genre.model");
const { Op } = require("sequelize");

/**
 * Récupère tous les genres
 * @returns {Promise<Array>} Liste des genres
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
 * Récupère un genre par son ID
 * @param {number} id - ID du genre
 * @returns {Promise<Object>} Genre trouvé
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
 * Crée un nouveau genre
 * @param {Object} genreData - Données du genre
 * @returns {Promise<Object>} Genre créé
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
 * Met à jour un genre
 * @param {number} id - ID du genre
 * @param {Object} genreData - Nouvelles données du genre
 * @returns {Promise<Object>} Genre mis à jour
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
 * Supprime un genre
 * @param {number} id - ID du genre
 * @returns {Promise<boolean>} Succès de la suppression
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
 * @param {string} name - Nom du genre
 * @returns {Promise<Object>} Genre trouvé
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
 * @param {string} slug - Slug du genre
 * @returns {Promise<Object>} Genre trouvé
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
  getAllGenres,
  getGenreById,
  createGenre,
  updateGenre,
  deleteGenre,
  getGenreByName,
  getGenreBySlug,
};
