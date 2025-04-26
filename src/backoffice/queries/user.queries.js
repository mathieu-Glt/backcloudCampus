const User = require("../../models/user.model");

// Récupérer tous les utilisateurs
const getAllUsers = async () => {
  return await User.findAll({
    attributes: { exclude: ["password"] },
  });
};

// Récupérer un utilisateur par son ID
const getUserById = async (id) => {
  return await User.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
};


// Récupérer un utilisateur par son email (sans le mot de passe)
const getUserByEmail = async (email) => {
  return await User.findOne({
    where: { email },
    attributes: { exclude: ["password"] },
  });
};

// Créer un nouvel utilisateur
const registerUser = async (userData) => {
  return await User.create(userData);
};

// Mettre à jour un utilisateur
const updateUser = async (id, userData) => {
  const user = await User.findByPk(id);
  if (!user) return null;

  await user.update(userData);
  return user;
};

// Supprimer un utilisateur
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
