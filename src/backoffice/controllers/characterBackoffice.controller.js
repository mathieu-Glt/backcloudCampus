/**
 * @fileoverview Contrôleur gérant les opérations CRUD sur les personnages dans le backoffice
 */

const xss = require("xss");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const {
  createCharacter: createCharacterQuery,
  updateCharacter: updateCharacterQuery,
  deleteCharacter: deleteCharacterQuery,
} = require("../queries/characterBackoffice.queries");

const { getCharacterById } = require("../../queries/character.queries");

/**
 * Crée un nouveau personnage dans la base de données
 * @async
 * @function createCharacter
 * @param {Object} req - Requête Express
 * @param {string} req.body.name - Nom complet du personnage
 * @param {string} req.body.lastName - Nom de famille du personnage
 * @param {string} req.body.firstName - Prénom du personnage
 * @param {string} req.body.picture - URL de l'image du personnage
 * @param {string} req.body.biography - Biographie du personnage
 * @param {Object} res - Réponse Express
 * @returns {Promise<void>}
 * @throws {Error} En cas d'erreur serveur
 */
const createCharacter = async (req, res) => {
  try {
    const { name, lastName, firstName, picture, biography } = req.body;

    const cleanName = xss(name);
    const cleanLastName = xss(lastName);
    const cleanFirstName = xss(firstName);
    const cleanPicture = xss(picture);
    const cleanBiography = xss(biography);

    const characterData = {
      name: cleanName,
      lastName: cleanLastName,
      firstName: cleanFirstName,
      picture: cleanPicture,
      biography: cleanBiography,
    };

    const character = await createCharacterQuery(characterData);
    res.status(201).json(character);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la création du personnage" });
  }
};

/**
 * Upload une image pour un personnage
 * @async
 * @function uploadPicture
 * @param {Object} req - Requête Express
 * @param {string} req.params.id - ID du personnage
 * @param {Object} req.files.image - Fichier image à uploader
 * @param {Object} res - Réponse Express
 * @param {Function} next - Middleware suivant
 * @returns {Promise<void>}
 * @throws {Error} Si l'utilisateur n'est pas authentifié, n'a pas les droits, si le personnage n'existe pas ou si le fichier est invalide
 */
const uploadPicture = async (req, res, next) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).json({
        status: 401,
        message: "Non authentifié",
      });
    }

    const userRole = await User.userRole(req.user.email);
    if (userRole !== "admin") {
      return res.status(403).json({
        status: 403,
        message: "Accès refusé",
      });
    }

    const character = await getCharacterById(req.params.id);
    if (!character) {
      return res.status(404).json({
        status: 404,
        message: "Personnage non trouvé",
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

    const uploadDir = path.join(__dirname, "../../public/images");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    await promisify(image.mv.bind(image))(uploadPath);

    res.status(200).json({
      status: 200,
      message: "Image téléchargée avec succès",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Met à jour un personnage existant
 * @async
 * @function updateCharacter
 * @param {Object} req - Requête Express
 * @param {string} req.params.id - ID du personnage à mettre à jour
 * @param {string} req.body.name - Nouveau nom complet du personnage
 * @param {string} req.body.lastName - Nouveau nom de famille du personnage
 * @param {string} req.body.firstName - Nouveau prénom du personnage
 * @param {string} req.body.picture - Nouvelle URL de l'image du personnage
 * @param {string} req.body.biography - Nouvelle biographie du personnage
 * @param {Object} res - Réponse Express
 * @returns {Promise<void>}
 * @throws {Error} En cas d'erreur serveur
 */
const updateCharacter = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, lastName, firstName, picture, biography } = req.body;

    const cleanName = xss(name);
    const cleanLastName = xss(lastName);
    const cleanFirstName = xss(firstName);
    const cleanPicture = xss(picture);
    const cleanBiography = xss(biography);

    const characterData = {
      name: cleanName,
      lastName: cleanLastName,
      firstName: cleanFirstName,
      picture: cleanPicture,
      biography: cleanBiography,
    };

    const character = await updateCharacterQuery(id, characterData);
    res.status(200).json(character);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour du personnage" });
  }
};

/**
 * Supprime un personnage de la base de données
 * @async
 * @function deleteCharacter
 * @param {Object} req - Requête Express
 * @param {string} req.params.id - ID du personnage à supprimer
 * @param {Object} res - Réponse Express
 * @returns {Promise<void>}
 * @throws {Error} En cas d'erreur serveur
 */
const deleteCharacter = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteCharacterQuery(id);
    res.status(200).json({ message: "Personnage supprimé avec succès" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression du personnage" });
  }
};

module.exports = {
  createCharacter,
  uploadPicture,
  updateCharacter,
  deleteCharacter,
};
