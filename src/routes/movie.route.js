const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
const { isAuthenticated } = require("../middleware/auth.middleware");
const { isAdmin } = require("../middleware/auth.middleware");
const {
  getAllMovies,
  getMovieById,
  getMovieByTitle,
  getMovieBySlug,
  getBestMovies,
  getWorstMovies,
  getLatestMovies,
  getRandomMovies,
  createMovie,
  updateMovie,
  deleteMovie,
  uploadPicture,
} = require("../controllers/movie.controller");

// Configuration de fileUpload
router.use(
  fileUpload({
    createParentPath: true,
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB max
    },
    abortOnLimit: true,
  })
);

// Route pour récupérer tous les films
router.get("/", getAllMovies);
// Route pour récupérer un film par son titre
router.get("/title/:title", getMovieByTitle);

// Route pour récupérer un film par son slug
router.get("/slug/:slug", getMovieBySlug);

// Route pour récupérer les films les mieux notés
router.get("/best", getBestMovies);

// Route pour récupérer les films les moins notés
router.get("/worst", getWorstMovies);

// Route pour récupérer les films les plus récents
router.get("/latest", getLatestMovies);

// Route pour récupérer les films de façon aléatoire
router.get("/random", getRandomMovies);

// Route d'upload
router.post("/picture", isAdmin, authorize(ROLES.ADMIN), uploadPicture);

// Route de création d'un film
router.post("/", isAdmin, authorize(ROLES.ADMIN), createMovie);

// Route de mise à jour d'un film
router.put("/:id", isAdmin, authorize(ROLES.ADMIN), updateMovie);

// Route de suppression d'un film
router.delete("/:id", isAdmin, authorize(ROLES.ADMIN), deleteMovie);

module.exports = router;
