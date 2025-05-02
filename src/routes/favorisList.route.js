const express = require("express");
const router = express.Router();
const {
  getAllFavorisListes,
  getFavorisListeById,
  postFilmInFavorisListe,
  deleteFilmFromFavorisListe,
} = require("../controllers/favoris-liste.controller");
const { isAuthenticated } = require("../middleware/auth.middleware");

// Route pour récupérer toutes les listes de favoris
router.get("/", isAuthenticated, getAllFavorisListes);

// Route pour récupérer une liste de favoris par son ID
router.get("/:id", isAuthenticated, getFavorisListeById);

// Route pour ajouter un film à la liste de favoris
router.post("/:id/films", isAuthenticated, postFilmInFavorisListe);

// Route pour supprimer un film de la liste de favoris
router.delete(
  "/:id/films/:filmId",
  isAuthenticated,
  deleteFilmFromFavorisListe
);

module.exports = router;
