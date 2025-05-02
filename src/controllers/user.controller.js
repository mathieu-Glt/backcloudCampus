/**
 * @fileoverview Contrôleur gérant les opérations CRUD sur les utilisateurs dans le backoffice
 */

const bcrypt = require("bcrypt");
const {
  getAllUsers: getAllUsersQuery,
  getUserById: getUserByIdQuery,
  updateUser: updateUserQuery,
  deleteUser: deleteUserQuery,
} = require("../queries/user.queries");

/**
 * Récupère tous les utilisateurs de la base de données
 * @async
 * @function getAllUsers
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 * @returns {Promise<void>}
 * @throws {Error} En cas d'erreur serveur
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersQuery();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Récupère un utilisateur spécifique par son ID
 * @async
 * @function getUserById
 * @param {Object} req - Requête Express
 * @param {string} req.params.id - ID de l'utilisateur à récupérer
 * @param {Object} res - Réponse Express
 * @returns {Promise<void>}
 * @throws {Error} Si l'utilisateur n'est pas trouvé ou en cas d'erreur serveur
 */
const getUserById = async (req, res) => {
  try {
    const user = await getUserByIdQuery(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Met à jour les informations d'un utilisateur
 * @async
 * @function updateUser
 * @param {Object} req - Requête Express
 * @param {string} req.params.id - ID de l'utilisateur à mettre à jour
 * @param {string} [req.body.email] - Nouvel email de l'utilisateur
 * @param {string} [req.body.password] - Nouveau mot de passe de l'utilisateur
 * @param {string} [req.body.firstName] - Nouveau prénom de l'utilisateur
 * @param {string} [req.body.lastName] - Nouveau nom de famille de l'utilisateur
 * @param {string} [req.body.role] - Nouveau rôle de l'utilisateur
 * @param {Object} res - Réponse Express
 * @returns {Promise<void>}
 * @throws {Error} Si l'utilisateur n'est pas trouvé ou en cas d'erreur serveur
 */
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password, firstName, lastName, role } = req.body;

    const updateData = {
      email,
      firstName,
      lastName,
      role,
    };

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const user = await updateUserQuery(id, updateData);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password: _, ...userWithoutPassword } = user.toJSON();
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Supprime un utilisateur de la base de données
 * @async
 * @function deleteUser
 * @param {Object} req - Requête Express
 * @param {string} req.params.id - ID de l'utilisateur à supprimer
 * @param {Object} res - Réponse Express
 * @returns {Promise<void>}
 * @throws {Error} Si l'utilisateur n'est pas trouvé ou en cas d'erreur serveur
 */
const deleteUser = async (req, res) => {
  try {
    const user = await deleteUserQuery(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
