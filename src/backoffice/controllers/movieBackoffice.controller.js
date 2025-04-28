/**
 * @fileoverview Contrôleur gérant les opérations CRUD sur les films dans le backoffice
 */

const xss = require("xss");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const {
  createMovie: createMovieQuery,
  updateMovie: updateMovieQuery,
  deleteMovie: deleteMovieQuery,
  updateMovieRate: updateMovieRateQuery,
} = require("../queries/movieBackoffice.queries");

/**
 * Crée un nouveau film dans la base de données
 * @async
 * @function createMovie
 * @param {Object} req - Requête Express
 * @param {string} req.body.title - Titre du film
 * @param {string} req.body.synopsis - Synopsis du film
 * @param {string} req.body.picture - URL de l'image du film
 * @param {string} req.body.url - URL du film
 * @param {number} req.body.rate - Note du film
 * @param {Object} res - Réponse Express
 * @param {Function} next - Middleware suivant
 * @returns {Promise<void>}
 * @throws {Error} Si l'utilisateur n'est pas authentifié, n'a pas les droits ou si le film existe déjà
 */
const createMovie = async (req, res) => {
  try {
    const { title, synopsis, picture, url, rate } = req.body;

    const cleanTitle = xss(title);
    const cleanSynopsis = xss(synopsis);
    const cleanPicture = xss(picture);
    const cleanUrl = xss(url);
    const cleanRate = xss(rate);

    // 1. Vérification de l'authentification et des droits
    if (!req.isAuthenticated()) {
      return res.status(401).json({
        status: 401,
        message: "Non authentifié",
      });
    }

    // Véridier rôle utisateur
    const userRole = await User.userRole(req.user.email);
    if (userRole !== "admin") {
      return res.status(403).json({
        status: 403,
        message: "You are not authorized to create a movie",
      });
    }

    const movieExists = await Movie.movieExists(cleanTitle);
    if (movieExists) {
      return res.status(400).json({
        status: 400,
        message: "Movie already exists",
      });
    }

    const newMovie = await createMovieQuery(req.body);

    res.status(201).json({
      status: 201,
      message: "Movie created successfully",
      movie: newMovie,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Upload une image pour un film
 * @async
 * @function uploadPicture
 * @param {Object} req - Requête Express
 * @param {Object} req.files.image - Fichier image à uploader
 * @param {Object} res - Réponse Express
 * @param {Function} next - Middleware suivant
 * @returns {Promise<void>}
 * @throws {Error} Si l'utilisateur n'est pas authentifié, n'a pas les droits ou si le fichier est invalide
 */
const uploadPicture = async (req, res, next) => {
  try {
    // 1. Vérification de l'authentification et des droits
    if (!req.isAuthenticated()) {
      return res.status(401).json({
        status: 401,
        message: "Non authentifié",
      });
    }

    // 2. Vérification du rôle admin
    const userRole = await User.userRole(req.user.email);
    if (userRole !== "admin") {
      return res.status(403).json({
        status: 403,
        message: "You are not authorized to upload a picture",
      });
    }

    // 3. Vérification de la présence du fichier
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        status: 400,
        message: "No file was uploaded",
      });
    }

    const image = req.files.image;

    // 4. Vérification du type de fichier
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(image.mimetype)) {
      return res.status(400).json({
        status: 400,
        message: "File type not allowed",
      });
    }

    // 5. Création du nom de fichier unique
    const timestamp = Date.now();
    const filename = `${timestamp}-${image.name}`;
    const uploadPath = path.join(__dirname, "../../public/images", filename);

    // 6. Création du dossier s'il n'existe pas
    const uploadDir = path.join(__dirname, "../../public/images");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // 7. Déplacement du fichier avec promesse
    //   image.mv(uploadPath, (error) => {
    //     if (error) {
    //         // Gérer l'erreur
    //     } else {
    //         // Fichier déplacé avec succès
    //     }
    // });
    await promisify(image.mv.bind(image))(uploadPath);

    // 8. Réponse de succès
    res.status(200).json({
      status: 200,
      message: "Image uploaded successfully",
      data: {
        filename: filename,
        url: `/images/${filename}`,
        size: image.size,
        mimetype: image.mimetype,
      },
    });
  } catch (error) {
    console.error("Error during upload:", error);
    next(error);
  }
};

/**
 * Met à jour un film existant
 * @async
 * @function updateMovie
 * @param {Object} req - Requête Express
 * @param {string} req.params.id - ID du film à mettre à jour
 * @param {string} req.body.title - Nouveau titre du film
 * @param {string} req.body.synopsis - Nouveau synopsis du film
 * @param {string} req.body.picture - Nouvelle URL de l'image du film
 * @param {string} req.body.url - Nouvelle URL du film
 * @param {number} req.body.rate - Nouvelle note du film
 * @param {Object} res - Réponse Express
 * @param {Function} next - Middleware suivant
 * @returns {Promise<void>}
 * @throws {Error} Si l'utilisateur n'est pas authentifié, n'a pas les droits ou si le film n'existe pas
 */
const updateMovie = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, synopsis, picture, url, rate } = req.body;

    // 1. Vérification de l'authentification et des droits
    if (!req.isAuthenticated()) {
      return res.status(401).json({
        status: 401,
        message: "Non authentifié",
      });
    }

    // Véridier rôle utisateur
    const userRole = await User.userRole(req.user.email);
    if (userRole !== "admin") {
      return res.status(403).json({
        status: 403,
        message: "You are not authorized to update a movie",
      });
    }

    const movie = await updateMovieQuery(id, req.body);
    if (!movie) {
      return res.status(404).json({
        status: 404,
        message: "Movie not found",
      });
    }

    const cleanTitle = xss(title);
    const cleanSynopsis = xss(synopsis);
    const cleanPicture = xss(picture);

    await movie.update({
      title: cleanTitle,
      synopsis: cleanSynopsis,
      picture: cleanPicture,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Supprime un film de la base de données
 * @async
 * @function deleteMovie
 * @param {Object} req - Requête Express
 * @param {string} req.params.id - ID du film à supprimer
 * @param {Object} res - Réponse Express
 * @param {Function} next - Middleware suivant
 * @returns {Promise<void>}
 * @throws {Error} Si l'utilisateur n'est pas authentifié, n'a pas les droits ou si le film n'existe pas
 */
const deleteMovie = async (req, res, next) => {
  try {
    const { id } = req.params;

    // 1. Vérification de l'authentification et des droits
    if (!req.isAuthenticated()) {
      return res.status(401).json({
        status: 401,
        message: "Non authentifié",
      });
    }

    // Véridier rôle utisateur
    const userRole = await User.userRole(req.user.email);
    if (userRole !== "admin") {
      return res.status(403).json({
        status: 403,
        message: "You are not authorized to delete a movie",
      });
    }

    const movie = await deleteMovieQuery(id);
    if (!movie) {
      return res.status(404).json({
        status: 404,
        message: "Movie not found",
      });
    }

    res.status(200).json({
      status: 200,
      message: "Movie deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createMovie,
  updateMovie,
  deleteMovie,
  uploadPicture,
};
