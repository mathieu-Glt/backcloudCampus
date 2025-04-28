const express = require("express");
const router = express.Router();
const {
  getAllGenres,
  getGenreById,
  getGenreByName,
  getGenreBySlug,
} = require("../controllers/genre.controller");

// Route pour récupérer tous les genres
router.get("/", getAllGenres);

// Route pour récupérer un genre par son ID
router.get("/:id", getGenreById);

// Route pour récupérer un genre par son nom
router.get("/:name", getGenreByName);

// Route pour récupérer un genre par son slug
router.get("/:slug", getGenreBySlug);

module.exports = router;
