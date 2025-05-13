/**
 * Middleware de gestion d'erreurs global
 * @param {Error} err - L'erreur capturée
 * @param {Request} req - L'objet requête Express
 * @param {Response} res - L'objet réponse Express
 * @param {NextFunction} next - La fonction next Express
 */
const errorHandler = (err, req, res, next) => {
  // Si les headers ont déjà été envoyés, on délègue au gestionnaire d'erreurs par défaut d'Express
  if (res.headersSent) {
    return next(err);
  }

  // Log de l'erreur pour le debugging
  console.error(err.stack);

  // Définition du statut HTTP
  const statusCode = err.status || err.statusCode || 500;

  // En production, on envoie un message d'erreur simple
  if (process.env.NODE_ENV === "production") {
    res.status(statusCode).json({
      status: "error",
      message: "Une erreur est survenue sur le serveur",
    });
  } else {
    // En développement, on envoie plus de détails
    res.status(statusCode).json({
      status: "error",
      message: err.message,
      stack: err.stack,
      error: err,
    });
  }
};

module.exports = errorHandler;
