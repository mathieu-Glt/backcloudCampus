const express = require("express");
const router = express.Router();
const { authorize } = require("../../server/middleware/authorize");
const ROLES = require("../../config/roles");
const { isAdmin } = require("../middleware/auth.middleware");
const genreController = require("../controllers/genre.controller");

// Route pour récupérer tous les genres
router.get("/", genreController.getAllGenres);

// Route pour récupérer un genre par son ID
router.get("/:id", authorize(ROLES.ADMIN), genreController.getGenreById);

// Route pour récupérer un genre par son nom
router.get("/:name", authorize(ROLES.ADMIN), genreController.getGenreByName);

// Route pour récupérer un genre par son slug
router.get("/:slug", authorize(ROLES.ADMIN), genreController.getGenreBySlug);

// Route de création d'un genre
router.post("/", isAdmin, authorize(ROLES.ADMIN), genreController.createGenre);

// Route de mise à jour d'un genre
router.put(
  "/:id",
  isAdmin,
  authorize(ROLES.ADMIN),
  genreController.updateGenre
);

// Route de suppression d'un genre
router.delete(
  "/:id",
  isAdmin,
  authorize(ROLES.ADMIN),
  genreController.deleteGenre
);

module.exports = router;
