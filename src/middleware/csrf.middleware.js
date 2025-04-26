const csrf = require("csrf");
const tokens = new csrf();

/**
 * Middleware pour générer et vérifier les tokens CSRF
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 * @param {Function} next - Fonction next
 */
const csrfProtection = (req, res, next) => {
  // Génération d'un nouveau token CSRF
  const secret = tokens.secretSync();
  const token = tokens.create(secret);

  // Stockage du secret dans la session
  req.session.csrfSecret = secret;

  // Ajout du token dans les headers de la réponse
  res.setHeader("X-CSRF-Token", token);

  // Vérification du token pour les requêtes POST, PUT, DELETE
  if (["POST", "PUT", "DELETE"].includes(req.method)) {
    const csrfToken = req.headers["x-csrf-token"];
    const secret = req.session.csrfSecret;

    if (!csrfToken || !secret || !tokens.verify(secret, csrfToken)) {
      return res.status(403).json({
        status: 403,
        message: "Invalid CSRF token",
      });
    }
  }

  next();
};

module.exports = csrfProtection;
