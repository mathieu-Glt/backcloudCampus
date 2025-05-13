const { body, validationResult } = require("express-validator");

/**
 * Classe de validation pour les utilisateurs
 */
class UserValidator {
  /**
   * Règles de validation pour la création et la mise à jour d'un utilisateur
   * @returns {Array} Tableau de middlewares de validation
   */
  static getValidationRules() {
    return [
      // Validation du nom d'utilisateur
      body("username")
        .trim()
        .isLength({ min: 3, max: 30 })
        .withMessage(
          "Le nom d'utilisateur doit contenir entre 3 et 30 caractères"
        )
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
    ];
  }

  /**
   * Middleware pour vérifier les résultats de la validation
   * @param {Object} req - Requête Express
   * @param {Object} res - Réponse Express
   * @param {Function} next - Middleware suivant
   */
  static validate(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }

  /**
   * Valide les données utilisateur
   * @param {Object} userData - Données à valider
   * @returns {Object} Résultat de la validation
   */
  static validateUserData(userData) {
    const errors = [];

    // Validation du nom d'utilisateur
    if (userData.username) {
      if (userData.username.length < 3 || userData.username.length > 30) {
        errors.push(
          "Le nom d'utilisateur doit contenir entre 3 et 30 caractères"
        );
      }
      if (!/^[a-zA-Z0-9_-]+$/.test(userData.username)) {
        errors.push(
          "Le nom d'utilisateur ne peut contenir que des lettres, chiffres, tirets et underscores"
        );
      }
    }

    // Validation de l'email
    if (userData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userData.email)) {
        errors.push("L'email doit être valide");
      }
    }

    // Validation du mot de passe
    if (userData.password) {
      if (userData.password.length < 6) {
        errors.push("Le mot de passe doit contenir au moins 6 caractères");
      }
      if (
        !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/.test(
          userData.password
        )
      ) {
        errors.push(
          "Le mot de passe doit contenir au moins une lettre et un chiffre"
        );
      }
    }

    // Validation du prénom
    if (userData.firstname) {
      if (userData.firstname.length > 50) {
        errors.push("Le prénom ne peut pas dépasser 50 caractères");
      }
      if (!/^[a-zA-ZÀ-ÿ\s-]+$/.test(userData.firstname)) {
        errors.push(
          "Le prénom ne peut contenir que des lettres, espaces et tirets"
        );
      }
    }

    // Validation du nom de famille
    if (userData.lastname) {
      if (userData.lastname.length > 50) {
        errors.push("Le nom de famille ne peut pas dépasser 50 caractères");
      }
      if (!/^[a-zA-ZÀ-ÿ\s-]+$/.test(userData.lastname)) {
        errors.push(
          "Le nom de famille ne peut contenir que des lettres, espaces et tirets"
        );
      }
    }

    // Validation du rôle
    if (userData.role && !["USER", "ADMIN"].includes(userData.role)) {
      errors.push("Le rôle doit être 'USER' ou 'ADMIN'");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}

module.exports = UserValidator;
