/**
 * @fileoverview Module de requêtes pour les opérations CRUD sur les personnages
 */

const Character = require("../../models/character.model");

// Méthodes CRUD

/**
 * Crée un nouveau personnage dans la base de données
 * @async
 * @function createCharacter
 * @param {Object} characterData - Données du personnage à créer
 * @param {string} characterData.name - Nom du personnage
 * @param {string} characterData.description - Description du personnage
 * @param {string} characterData.picture - URL de l'image du personnage
 * @param {number} characterData.movieId - ID du film associé
 * @returns {Promise<Object>} Le personnage créé
 */
const createCharacter = async (characterData) => {
  return await Character.create(characterData);
};

/**
 * Met à jour les informations d'un personnage
 * @async
 * @function updateCharacter
 * @param {number} id - Identifiant du personnage à mettre à jour
 * @param {Object} characterData - Nouvelles données du personnage
 * @returns {Promise<Object|null>} Le personnage mis à jour ou null si non trouvé
 */
const updateCharacter = async (id, characterData) => {
  const character = await Character.findByPk(id);
  if (!character) return null;
  await character.update(characterData);
  return character;
};

/**
 * Supprime un personnage de la base de données
 * @async
 * @function deleteCharacter
 * @param {number} id - Identifiant du personnage à supprimer
 * @returns {Promise<Object|null>} Le personnage supprimé ou null si non trouvé
 */
const deleteCharacter = async (id) => {
  const character = await Character.findByPk(id);
  if (!character) return null;
  await character.destroy();
  return character;
};

module.exports = {
  createCharacter,
  updateCharacter,
  deleteCharacter,
};
