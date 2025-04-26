const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

/**
 * Middleware pour vérifier l'authentification et récupérer les tokens
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 * @param {Function} next - Fonction next
 */
const isAuthenticated = (req, res, next) => {
  try {
    // 1. Vérification de l'authentification Passport
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
      // res.status(401).redirect("/login");
    }

    // 2. Récupération des tokens depuis la session
    const token = req.session.token;
    const refreshToken = req.session.refreshToken;

    if (!token || !refreshToken) {
      return res.status(401).json({ message: "Tokens not found in session" });
      // res.status(401).redirect("/login");
    }

    // 3. Vérification de la validité du token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.user; // Ajout de l'utilisateur décodé à la requête
    } catch (error) {
      // Si le token est expiré, on essaie avec le refresh token
      try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

        // Génération d'un nouveau token
        const newToken = jwt.sign(
          { user: decoded.user },
          process.env.JWT_SECRET,
          {
            expiresIn: "2h",
          }
        );

        // Mise à jour du token dans la session
        req.session.token = newToken;
        req.user = decoded.user;
      } catch (refreshError) {
        return res
          .status(401)
          .json({ message: "Session expired, please login again" });
      }
    }

    // 4. Ajout des tokens à la requête pour un accès facile
    req.tokens = {
      token: req.session.token,
      refreshToken: req.session.refreshToken,
    };

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Middleware pour vérifier si l'utilisateur est admin
 */
const isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === "admin") {
    return next();
  }
  res
    .status(403)
    .json({ message: "Accès refusé. Droits administrateur requis." });
};

/**
 * Middleware pour vérifier si l'utilisateur est le propriétaire de la ressource ou un admin
 */
const isOwnerOrAdmin = (req, res, next) => {
  if (
    req.isAuthenticated() &&
    (req.user.id === req.params.id || req.user.role === "admin")
  ) {
    return next();
  }
  res.status(403).json({
    message:
      "Accès refusé. Vous n'êtes pas autorisé à accéder à cette ressource.",
  });
};

// Vérifier les credentials d'un utilisateur
const verifyUserCredentials = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return null;

  const isPasswordValid = await User.comparePassword(password, user.password);
  if (!isPasswordValid) return null;

  return user;
};

const authenticate = async (req, res, next) => {
  try {
    // Récupérer le token du header Authorization
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token non fourni" });
    }

    const token = authHeader.split(" ")[1];

    // Vérifier le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Récupérer l'utilisateur
    const user = await User.findByPk(decoded.user.id);
    if (!user) {
      return res.status(401).json({ message: "Utilisateur non trouvé" });
    }

    // Ajouter l'utilisateur à la requête
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Token invalide" });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expiré" });
    }
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

module.exports = {
  isAuthenticated,
  isAdmin,
  isOwnerOrAdmin,
  verifyUserCredentials,
  authenticate,
};
