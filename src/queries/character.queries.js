/**
 * @fileoverview Module de requêtes pour les opérations de lecture sur les personnages
 */

const Character = require("../models/character.model");

// Méthodes CRUD

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

module.exports = {
  getAllCharacters,
  getCharacterById,
  getCharacterBySlug,
  getCharacterByName,
  getCharacterByLastName,
  getCharacterByFirstName,
};
