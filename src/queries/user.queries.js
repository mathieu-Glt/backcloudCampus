/**
 * @fileoverview Module de requêtes pour les opérations CRUD sur les utilisateurs
 */

const User = require("../models/user.model");

/**
 * Récupère tous les utilisateurs de la base de données
 * @async
 * @function getAllUsers
 * @returns {Promise<Array<Object>>} Liste des utilisateurs sans leurs mots de passe
 */
const getAllUsers = async () => {
  return await User.findAll({
    attributes: { exclude: ["password"] },
  });
};

/**
 * Récupère un utilisateur par son identifiant
 * @async
 * @function getUserById
 * @param {number} id - Identifiant de l'utilisateur
 * @returns {Promise<Object|null>} L'utilisateur trouvé ou null si non trouvé
 */
const getUserById = async (id) => {
  return await User.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
};

/**
 * Récupère un utilisateur par son email
 * @async
 * @function getUserByEmail
 * @param {string} email - Email de l'utilisateur
 * @returns {Promise<Object|null>} L'utilisateur trouvé ou null si non trouvé
 */
const getUserByEmail = async (email) => {
  return await User.findOne({
    where: { email },
    attributes: { exclude: ["password"] },
  });
};

/**
 * Crée un nouvel utilisateur dans la base de données
 * @async
 * @function registerUser
 * @param {Object} userData - Données de l'utilisateur à créer
 * @param {string} userData.email - Email de l'utilisateur
 * @param {string} userData.password - Mot de passe de l'utilisateur
 * @param {string} userData.firstName - Prénom de l'utilisateur
 * @param {string} userData.lastName - Nom de famille de l'utilisateur
 * @param {string} [userData.role="user"] - Rôle de l'utilisateur
 * @returns {Promise<Object>} L'utilisateur créé
 */
const registerUser = async (userData) => {
  return await User.create(userData);
};

/**
 * Met à jour les informations d'un utilisateur
 * @async
 * @function updateUser
 * @param {number} id - Identifiant de l'utilisateur à mettre à jour
 * @param {Object} userData - Nouvelles données de l'utilisateur
 * @returns {Promise<Object|null>} L'utilisateur mis à jour ou null si non trouvé
 */
const updateUser = async (id, userData) => {
  const user = await User.findByPk(id);
  if (!user) return null;

  await user.update(userData);
  return user;
};

/**
 * Supprime un utilisateur de la base de données
 * @async
 * @function deleteUser
 * @param {number} id - Identifiant de l'utilisateur à supprimer
 * @returns {Promise<Object|null>} L'utilisateur supprimé ou null si non trouvé
 */
const deleteUser = async (id) => {
  const user = await User.findByPk(id);
  if (!user) return null;

  await user.destroy();
  return user;
};

module.exports = {
  getAllUsers,
  getUserById,
  registerUser,
  updateUser,
  deleteUser,
  getUserByEmail,
};
