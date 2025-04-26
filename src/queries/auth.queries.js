const User = require("../models/user.model");

// Créer un nouvel utilisateur
const createUser = async (userData) => {
  return await User.create(userData);
};

module.exports = {
  createUser,
};
