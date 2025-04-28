/**
 * @fileoverview Module de requêtes pour les opérations d'authentification
 */

const User = require("../models/user.model");

/**
 * Crée un nouvel utilisateur dans la base de données
 * @async
 * @function createUser
 * @param {Object} userData - Données de l'utilisateur à créer
 * @param {string} userData.email - Email de l'utilisateur
 * @param {string} userData.password - Mot de passe de l'utilisateur
 * @param {string} userData.firstName - Prénom de l'utilisateur
 * @param {string} userData.lastName - Nom de famille de l'utilisateur
 * @param {string} [userData.role="user"] - Rôle de l'utilisateur
 * @returns {Promise<Object>} L'utilisateur créé
 */
const createUser = async (userData) => {
  return await User.create(userData);
};

module.exports = {
  createUser,
};
