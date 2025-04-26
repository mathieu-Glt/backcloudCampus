const bcrypt = require("bcrypt");
const {
  getAllUsers: getAllUsersQuery,
  getUserById: getUserByIdQuery,
  updateUser: updateUserQuery,
  deleteUser: deleteUserQuery,
} = require("../queries/user.queries");

// Récupérer tous les utilisateurs
const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersQuery();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Récupérer un utilisateur par son ID
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

// Mettre à jour un utilisateur
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

// Supprimer un utilisateur
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
