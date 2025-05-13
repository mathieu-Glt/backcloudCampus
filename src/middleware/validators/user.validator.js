const { body, validationResult } = require("express-validator");

// Règles de validation pour la création et la mise à jour d'un utilisateur
const validateUser = [
  // Validation du nom d'utilisateur
  body("username")
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("Le nom d'utilisateur doit contenir entre 3 et 30 caractères")
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage(
      "Le nom d'utilisateur ne peut contenir que des lettres, chiffres, tirets et underscores"
    ),

  // Validation de l'email
  body("email")
    .trim()
    .isEmail()
    .withMessage("L'email doit être valide")
    .normalizeEmail(),

  // Validation du mot de passe
  body("password")
    .isLength({ min: 6 })
    .withMessage("Le mot de passe doit contenir au moins 6 caractères")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/)
    .withMessage(
      "Le mot de passe doit contenir au moins une lettre et un chiffre"
    ),

  // Validation du prénom (optionnel)
  body("firstname")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Le prénom ne peut pas dépasser 50 caractères")
    .matches(/^[a-zA-ZÀ-ÿ\s-]+$/)
    .withMessage(
      "Le prénom ne peut contenir que des lettres, espaces et tirets"
    ),

  // Validation du nom de famille (optionnel)
  body("lastname")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Le nom de famille ne peut pas dépasser 50 caractères")
    .matches(/^[a-zA-ZÀ-ÿ\s-]+$/)
    .withMessage(
      "Le nom de famille ne peut contenir que des lettres, espaces et tirets"
    ),

  // Validation du rôle (optionnel)
  body("role")
    .optional()
    .isIn(["USER", "ADMIN"])
    .withMessage("Le rôle doit être 'USER' ou 'ADMIN'"),

  // Middleware pour vérifier les résultats de la validation
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = {
  validateUser,
};
