const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
const { isAuthenticated, isAdmin } = require("../middleware/auth.middleware");
const movieController = require("../controllers/movie.controller");
const { authorize } = require("../../server/middleware/authorize");
const ROLES = require("../../config/roles");

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

// Routes publiques (lecture)
router.get("/", movieController.getAllMovies);
router.get("/:id", movieController.getMovieById);
router.get("/title/:title", movieController.getMovieByTitle);
router.get("/genre/:genre", movieController.getMoviesByGenre);

// Route pour récupérer un film par son slug
router.get("/slug/:slug", movieController.getMovieBySlug);

// Route pour récupérer les films les mieux notés
// router.get("/best", movieController.getBestMovies);

// Route pour récupérer les films les moins notés
// router.get("/worst", movieController.getWorstMovies);

// Route pour récupérer les films les plus récents
// router.get("/latest", movieController.getLatestMovies);

// Route pour récupérer les films de façon aléatoire
// router.get("/random", movieController.getRandomMovies);

// Route d'upload
// router.post(
//   "/picture",
//   isAdmin,
//   authorize(ROLES.ADMIN),
//   movieController.uploadPicture
// );

// Routes protégées (écriture) - nécessitent une authentification et des droits admin
router.post(
  "/",
  isAuthenticated,
  isAdmin,
  authorize(ROLES.ADMIN),
  movieController.createMovie
);
router.put(
  "/:id",
  isAuthenticated,
  isAdmin,
  authorize(ROLES.ADMIN),
  movieController.updateMovie
);
router.delete(
  "/:id",
  isAuthenticated,
  isAdmin,
  authorize(ROLES.ADMIN),
  movieController.deleteMovie
);

module.exports = router;
