/**
 * Middleware de gestion des erreurs
 * @param {Error} err - L'erreur à gérer
 * @param {Request} req - La requête Express
 * @param {Response} res - La réponse Express
 * @param {NextFunction} next - La fonction next
 */
const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  // Erreurs de validation Sequelize
  if (err.name === "SequelizeValidationError") {
    return res.status(400).json({
      status: 400,
      message: "Erreur de validation",
      errors: err.errors.map((e) => ({
        field: e.path,
        message: e.message,
      })),
    });
  }

  // Erreurs de contrainte unique Sequelize
  if (err.name === "SequelizeUniqueConstraintError") {
    return res.status(409).json({
      status: 409,
      message: "Conflit de données",
      errors: err.errors.map((e) => ({
        field: e.path,
        message: e.message,
      })),
    });
  }

  // Erreurs Passport
  if (err.name === "AuthenticationError") {
    return res.status(401).json({
      status: 401,
      message: err.message || "Échec de l'authentification",
    });
  }

  // Erreurs JWT
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      status: 401,
      message: "Token invalide",
    });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      status: 401,
      message: "Token expiré",
    });
  }

  // Erreurs de fichiers
  if (err.name === "MulterError") {
    return res.status(400).json({
      status: 400,
      message: "Erreur lors du téléchargement du fichier",
      error: err.message,
    });
  }

  // Erreurs de type Cast (MongoDB)
  //   if (err.name === "CastError") {
  //     return res.status(400).json({
  //       status: 400,
  //       message: "Format d'ID invalide",
  //     });
  //   }

  // Erreurs personnalisées avec statusCode
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
      ...(err.errors && { errors: err.errors }),
    });
  }

  // Erreur par défaut
  res.status(500).json({
    status: 500,
    message: "Erreur serveur",
    ...(process.env.NODE_ENV === "development" && { error: err.message }),
  });
};

// Middleware pour gérer les erreurs Passport
const passportErrorHandler = (err, req, res, next) => {
  if (err) {
    console.error("Passport Error:", err);
    return res.status(401).json({
      status: 401,
      message: err.message || "Échec de l'authentification",
    });
  }
  next();
};

module.exports = {
  errorHandler,
  passportErrorHandler,
};
