/**
 * @fileoverview Module de requêtes pour les opérations de lecture sur les personnages
 */

const Character = require("../models/character.model");

// Méthodes CRUD
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
 * Récupère tous les personnages de la base de données
 * @async
 * @function getAllCharacters
 * @returns {Promise<Array<Object>>} Liste des personnages
 */
const getAllCharacters = async () => {
  return await Character.findAll();
};

/**
 * Récupère un personnage par son identifiant
 * @async
 * @function getCharacterById
 * @param {number} id - Identifiant du personnage
 * @returns {Promise<Object|null>} Le personnage trouvé ou null si non trouvé
 */
const getCharacterById = async (id) => {
  return await Character.findByPk(id);
};

/**
 * Récupère un personnage par son slug
 * @async
 * @function getCharacterBySlug
 * @param {string} slug - Slug du personnage
 * @returns {Promise<Object|null>} Le personnage trouvé ou null si non trouvé
 */
const getCharacterBySlug = async (slug) => {
  return await Character.findOne({ where: { slug } });
};

/**
 * Récupère un personnage par son nom
 * @async
 * @function getCharacterByName
 * @param {string} name - Nom du personnage
 * @returns {Promise<Object|null>} Le personnage trouvé ou null si non trouvé
 */
const getCharacterByName = async (name) => {
  return await Character.findOne({ where: { name } });
};

/**
 * Récupère un personnage par son nom de famille
 * @async
 * @function getCharacterByLastName
 * @param {string} lastName - Nom de famille du personnage
 * @returns {Promise<Object|null>} Le personnage trouvé ou null si non trouvé
 */
const getCharacterByLastName = async (lastName) => {
  return await Character.findOne({ where: { lastName } });
};

/**
 * Récupère un personnage par son prénom
 * @async
 * @function getCharacterByFirstName
 * @param {string} firstName - Prénom du personnage
 * @returns {Promise<Object|null>} Le personnage trouvé ou null si non trouvé
 */
const getCharacterByFirstName = async (firstName) => {
  return await Character.findOne({ where: { firstName } });
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
  getAllCharacters,
  getCharacterById,
  getCharacterBySlug,
  getCharacterByName,
  getCharacterByLastName,
  getCharacterByFirstName,
  createCharacter,
  updateCharacter,
  deleteCharacter,
};
