const express = require("express");
const router = express.Router();
const {
  uploadPicture,
  createMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movieBackoffice.controller");
const fileUpload = require("express-fileupload");

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

// Route d'upload
router.post("/picture", uploadPicture);

// Route de création d'un film
router.post("/", createMovie);

// Route de mise à jour d'un film
router.put("/:id", updateMovie);

// Route de suppression d'un film
router.delete("/:id", deleteMovie);

module.exports = router;
