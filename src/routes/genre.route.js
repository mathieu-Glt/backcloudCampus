const express = require("express");
const router = express.Router();
const {
  getAllGenres,
  getGenreById,
  getGenreByName,
  getGenreBySlug,
  createGenre,
  updateGenre,
  deleteGenre,
} = require("../controllers/genre.controller");
const { isAdmin } = require("../middleware/auth.middleware");
// Route pour récupérer tous les genres
router.get("/", getAllGenres);

// Route pour récupérer un genre par son ID
router.get("/:id", authorize(ROLES.ADMIN), getGenreById);

// Route pour récupérer un genre par son nom
router.get("/:name", authorize(ROLES.ADMIN), getGenreByName);

// Route pour récupérer un genre par son slug
router.get("/:slug", authorize(ROLES.ADMIN), getGenreBySlug);

// Route de création d'un genre
router.post("/", isAdmin, authorize(ROLES.ADMIN), createGenre);

// Route de mise à jour d'un genre
router.put("/:id", isAdmin, authorize(ROLES.ADMIN), updateGenre);

// Route de suppression d'un genre
router.delete("/:id", isAdmin, authorize(ROLES.ADMIN), deleteGenre);

module.exports = router;
