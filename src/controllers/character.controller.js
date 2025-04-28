/**
 * @fileoverview Contrôleur gérant les opérations de lecture (GET) sur les personnages
 */

const xss = require("xss");
const path = require("path");
const {
  getAllCharacters: getAllCharactersQuery,
  getCharacterById: getCharacterByIdQuery,
  getCharacterBySlug: getCharacterBySlugQuery,
  getCharacterByName: getCharacterByNameQuery,
  getCharacterByLastName: getCharacterByLastNameQuery,
  getCharacterByFirstName: getCharacterByFirstNameQuery,
} = require("../queries/character.queries");

/**
 * Récupère tous les personnages de la base de données
 * @async
 * @function getAllCharacters
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 * @returns {Promise<void>}
 * @throws {Error} En cas d'erreur serveur
 */
const getAllCharacters = async (req, res) => {
  try {
    const characters = await getAllCharactersQuery();
    res.status(200).json(characters);
  } catch (error) {
    console.error("Error fetching characters:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Récupère un personnage spécifique par son ID
 * @async
 * @function getCharacterById
 * @param {Object} req - Requête Express
 * @param {string} req.params.id - ID du personnage à récupérer
 * @param {Object} res - Réponse Express
 * @returns {Promise<void>}
 * @throws {Error} En cas d'erreur serveur
 */
const getCharacterById = async (req, res) => {
  try {
    const character = await getCharacterByIdQuery(req.params.id);
    res.status(200).json(character);
  } catch (error) {
    console.error("Error fetching character:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Récupère un personnage par son slug
 * @async
 * @function getCharacterBySlug
 * @param {Object} req - Requête Express
 * @param {string} req.params.slug - Slug du personnage à récupérer
 * @param {Object} res - Réponse Express
 * @returns {Promise<void>}
 * @throws {Error} En cas d'erreur serveur
 */
const getCharacterBySlug = async (req, res) => {
  try {
    const character = await getCharacterBySlugQuery(req.params.slug);
    res.status(200).json(character);
  } catch (error) {
    console.error("Error fetching character:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Récupère un personnage par son nom complet
 * @async
 * @function getCharacterByName
 * @param {Object} req - Requête Express
 * @param {string} req.params.name - Nom complet du personnage à récupérer
 * @param {Object} res - Réponse Express
 * @returns {Promise<void>}
 * @throws {Error} En cas d'erreur serveur
 */
const getCharacterByName = async (req, res) => {
  try {
    const character = await getCharacterByNameQuery(req.params.name);
    res.status(200).json(character);
  } catch (error) {
    console.error("Error fetching character:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Récupère un personnage par son nom de famille
 * @async
 * @function getCharacterByLastName
 * @param {Object} req - Requête Express
 * @param {string} req.params.lastName - Nom de famille du personnage à récupérer
 * @param {Object} res - Réponse Express
 * @returns {Promise<void>}
 * @throws {Error} En cas d'erreur serveur
 */
const getCharacterByLastName = async (req, res) => {
  try {
    const character = await getCharacterByLastNameQuery(req.params.lastName);
    res.status(200).json(character);
  } catch (error) {
    console.error("Error fetching character:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Récupère un personnage par son prénom
 * @async
 * @function getCharacterByFirstName
 * @param {Object} req - Requête Express
 * @param {string} req.params.firstName - Prénom du personnage à récupérer
 * @param {Object} res - Réponse Express
 * @returns {Promise<void>}
 * @throws {Error} En cas d'erreur serveur
 */
const getCharacterByFirstName = async (req, res) => {
  try {
    const character = await getCharacterByFirstNameQuery(req.params.firstName);
    res.status(200).json(character);
  } catch (error) {
    console.error("Error fetching character:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllCharacters,
  getCharacterById,
  getCharacterBySlug,
  getCharacterByName,
  getCharacterByLastName,
  getCharacterByFirstName,
};
