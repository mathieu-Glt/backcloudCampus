const ROLES = require("../../config/roles");

/**
 * Middleware d'autorisation basé sur les rôles
 * @param {string[]} allowedRoles - Tableau des rôles autorisés
 * @returns {Function} Middleware Express
 */
const authorize = (allowedRoles = []) => {
  return (req, res, next) => {
    // Vérifier si l'utilisateur est authentifié
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Accès non autorisé. Veuillez vous connecter.",
      });
    }

    // Vérifier si l'utilisateur a un rôle
    if (!req.user.role) {
      return res.status(403).json({
        success: false,
        message: "Rôle non défini pour cet utilisateur.",
      });
    }

    // Si aucun rôle n'est spécifié, autoriser tous les utilisateurs authentifiés
    if (allowedRoles.length === 0) {
      return next();
    }

    // Vérifier si le rôle de l'utilisateur est autorisé
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message:
          "Vous n'avez pas les permissions nécessaires pour accéder à cette ressource.",
      });
    }

    next();
  };
};

// Middleware spécifique pour les administrateurs
const isAdmin = authorize([ROLES.ADMIN]);

// Middleware pour les utilisateurs authentifiés
const isAuthenticated = authorize([]);

// Middleware pour les utilisateurs normaux
const isUser = authorize([ROLES.USER]);

module.exports = {
  authorize,
  isAdmin,
  isAuthenticated,
  isUser,
};
