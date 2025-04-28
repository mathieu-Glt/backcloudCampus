const express = require("express");
const router = express.Router();
const {
  createGenre,
  updateGenre,
  deleteGenre,
} = require("../controllers/genreBackoffice.controller");

// Route de création d'un genre
router.post("/", createGenre);

// Route de mise à jour d'un genre
router.put("/:id", updateGenre);

// Route de suppression d'un genre
router.delete("/:id", deleteGenre);

module.exports = router;
