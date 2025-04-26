const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");
const {
  isAuthenticated,
  isAdmin,
} = require("../../middleware/auth.middleware");

// Routes protégées nécessitant une authentification
router.get("/profile", isAuthenticated, (req, res) => {
  console.log("req.user", req.user);
  res.json(req.user);
});

// Routes nécessitant des droits admin
router.get("/", isAdmin, getAllUsers);
router.get("/:id", isAdmin, getUserById);
router.put("/:id", isAdmin, updateUser);
router.delete("/:id", isAdmin, deleteUser);

// Exemple d'utilisation de isOwnerOrAdmin
router.get("/me", isAuthenticated, (req, res) => {
  res.json(req.user);
});

router.put("/me", isAuthenticated, (req, res) => {
  // L'utilisateur peut modifier son propre profil
  updateUser(req, res);
});

module.exports = router;
