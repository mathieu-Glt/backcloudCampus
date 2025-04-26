const { body, validationResult } = require("express-validator");

/**
 * Middleware de validation pour l'inscription
 */
const registerValidation = [
  // Middleware de debug
  (req, res, next) => {
    console.log("=== Validation Middleware ===");
    console.log("Headers:", req.headers);
    console.log("Content-Type:", req.headers["content-type"]);
    console.log("Raw body:", req.body);
    console.log("Parsed body:", {
      email: req.body.email,
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      role: req.body.role,
    });
    next();
  },

  // Validation de l'email
  body("email")
    .trim()
    .isEmail()
    .withMessage("L'email doit être une adresse email valide")
    .normalizeEmail(),

  // Validation du mot de passe
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Le mot de passe doit contenir au moins 6 caractères")
    .matches(/\d/)
    .withMessage("Le mot de passe doit contenir au moins un chiffre")
    .matches(/[a-z]/)
    .withMessage("Le mot de passe doit contenir au moins une lettre minuscule")
    .matches(/[A-Z]/)
    .withMessage("Le mot de passe doit contenir au moins une lettre majuscule"),

  // Validation du nom d'utilisateur
  body("username")
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("Le nom d'utilisateur doit contenir entre 3 et 30 caractères")
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage(
      "Le nom d'utilisateur ne peut contenir que des lettres, chiffres, tirets et underscores"
    ),

  // Validation du prénom
  body("firstname")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Le prénom doit contenir entre 2 et 50 caractères")
    .matches(/^[a-zA-ZÀ-ÿ\s-]+$/)
    .withMessage(
      "Le prénom ne peut contenir que des lettres, espaces et tirets"
    ),

  // Validation du nom
  body("lastname")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Le nom doit contenir entre 2 et 50 caractères")
    .matches(/^[a-zA-ZÀ-ÿ\s-]+$/)
    .withMessage("Le nom ne peut contenir que des lettres, espaces et tirets"),

  // Validation du rôle
  body("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("Le rôle doit être soit 'user' soit 'admin'"),

  // Middleware pour gérer les erreurs de validation
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Validation errors:", errors.array());
      return res.status(400).json({
        message: "Erreur de validation",
        errors: errors.array(),
      });
    }
    next();
  },
];

/**
 * Middleware de validation pour la connexion
 */
const loginValidation = [
  // Validation de l'email
  body("email")
    .trim()
    .isEmail()
    .withMessage("L'email doit être une adresse email valide")
    .normalizeEmail(),

  // Validation du mot de passe
  body("password").trim().notEmpty().withMessage("Le mot de passe est requis"),

  // Middleware pour gérer les erreurs de validation
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Erreur de validation",
        errors: errors.array(),
      });
    }
    next();
  },
];

module.exports = {
  registerValidation,
  loginValidation,
};
