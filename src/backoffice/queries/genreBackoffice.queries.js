/**
 * @fileoverview Module de requêtes pour les opérations CRUD sur les genres
 */

const Genre = require("../../models/genre.model");

// Méthodes CRUD

/**
 * Crée un nouveau genre dans la base de données
 * @async
 * @function createGenre
 * @param {Object} genreData - Données du genre à créer
 * @param {string} genreData.name - Nom du genre
 * @param {string} genreData.description - Description du genre
 * @returns {Promise<Object>} Le genre créé
 */
const createGenre = async (genreData) => {
  return await Genre.create(genreData);
};

/**
 * Met à jour les informations d'un genre
 * @async
 * @function updateGenre
 * @param {number} id - Identifiant du genre à mettre à jour
 * @param {Object} genreData - Nouvelles données du genre
 * @returns {Promise<Object|null>} Le genre mis à jour ou null si non trouvé
 */
const updateGenre = async (id, genreData) => {
  const genre = await Genre.findByPk(id);
  if (!genre) return null;

  await genre.update(genreData);
  return genre;
};

/**
 * Supprime un genre de la base de données
 * @async
 * @function deleteGenre
 * @param {number} id - Identifiant du genre à supprimer
 * @returns {Promise<Object|null>} Le genre supprimé ou null si non trouvé
 */
const deleteGenre = async (id) => {
  const genre = await Genre.findByPk(id);
  if (!genre) return null;

  await genre.destroy();
  return genre;
};

module.exports = {
  createGenre,
  updateGenre,
  deleteGenre,
};
