const express = require("express");
const router = express.Router();
const {
  getAllMovies,
  getMovieById,
  getMovieByTitle,
  getMovieBySlug,
  getBestMovies,
  getWorstMovies,
  getLatestMovies,
  getRandomMovies,
} = require("../controllers/movie.controller");

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

module.exports = router;
