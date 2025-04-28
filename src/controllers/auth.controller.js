/**
 * @fileoverview Contrôleur d'authentification gérant l'inscription, la connexion et la déconnexion des utilisateurs
 */

const bcrypt = require("bcrypt");
const xss = require("xss");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const passport = require("passport");
const csrf = require("csrf");
const tokens = new csrf();

const {
  getUserByEmail: getUserByEmailQuery,
} = require("../backoffice/queries/user.queries");

const { createUser: registerUserQuery } = require("../queries/auth.queries");

/**
 * Enregistre un nouvel utilisateur dans la base de données
 * @async
 * @function registerUser
 * @param {Object} req - Requête Express
 * @param {string} req.body.email - Email de l'utilisateur
 * @param {string} req.body.password - Mot de passe de l'utilisateur
 * @param {string} req.body.firstname - Prénom de l'utilisateur
 * @param {string} req.body.lastname - Nom de famille de l'utilisateur
 * @param {string} req.body.username - Nom d'utilisateur
 * @param {string} [req.body.role="user"] - Rôle de l'utilisateur (par défaut: "user")
 * @param {Object} res - Réponse Express
 * @returns {Promise<void>}
 * @throws {Error} Si l'utilisateur existe déjà ou en cas d'erreur serveur
 */
const registerUser = async (req, res) => {
  console.log("=== registerUser ===");
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

  try {
    // 1. Récupération des données depuis le corps de la requête
    const { email, password, firstname, lastname, role, username } = req.body;

    // 2. Nettoyage des données avec xss pour prévenir les attaques XSS
    const cleanEmail = xss(email);
    const cleanPassword = xss(password);
    const cleanFirstname = xss(firstname);
    const cleanLastname = xss(lastname);
    const cleanRole = xss(role);
    const cleanUsername = xss(username);

    // 3. Vérification de l'unicité de l'email et du nom d'utilisateur
    const userExists = await User.userExists(cleanEmail, cleanUsername);
    if (userExists) {
      return res.status(400).json({
        status: 400,
        message:
          "Un utilisateur avec cet email ou ce nom d'utilisateur existe déjà",
      });
    }

    // 4. Préparation de l'objet utilisateur avec les données nettoyées
    const newUser = {
      email: cleanEmail,
      password: cleanPassword, // Le mot de passe sera hashé automatiquement par le setter du modèle
      firstname: cleanFirstname,
      lastname: cleanLastname,
      username: cleanUsername,
      role: cleanRole || "user", // Valeur par défaut "user" si aucun rôle n'est spécifié
    };

    // 5. Création de l'utilisateur dans la base de données
    const user = await registerUserQuery(newUser);

    // 6. Retour de l'utilisateur créé sans le mot de passe (pour des raisons de sécurité)
    const { password: _, ...userWithoutPassword } = user.toJSON();
    res.status(201).json({
      status: 201,
      user: userWithoutPassword,
      message: "User created successfully",
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ status: 500, message: "Internal server error", error: error });
  }
};

/**
 * Authentifie un utilisateur existant
 * @async
 * @function loginUser
 * @param {Object} req - Requête Express
 * @param {string} req.body.email - Email de l'utilisateur
 * @param {string} req.body.password - Mot de passe de l'utilisateur
 * @param {Object} res - Réponse Express
 * @param {Function} next - Middleware suivant
 * @returns {Promise<void>}
 * @throws {Error} Si les identifiants sont invalides ou en cas d'erreur serveur
 */
const loginUser = async (req, res, next) => {
  console.log("=== loginUser ===");
  console.log("Headers:", req.headers);
  console.log("Content-Type:", req.headers["content-type"]);
  console.log("Raw body:", req.body);

  passport.authenticate("local", async (err, user, info) => {
    try {
      if (err) {
        return next(err);
      }
      if (!user) {
        const error = new Error(info.message || "Identifiants invalides");
        error.statusCode = 401;
        return next(error);
      }

      // Création des tokens avec uniquement les informations nécessaires
      const tokenPayload = {
        id: user.id,
        email: user.email,
        role: user.role,
        firstname: user.firstname,
        lastname: user.lastname,
      };

      const token = jwt.sign({ user: tokenPayload }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });
      const refreshToken = jwt.sign(
        { user: tokenPayload },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      // Récupération de l'utilisateur sans le mot de passe
      const userWithoutPassword = await getUserByEmailQuery(user.email);

      // Connexion de l'utilisateur avec Passport
      req.login(user, (err) => {
        if (err) {
          return next(err);
        }

        // Stockage des tokens dans la session express
        req.session.token = token;
        req.session.refreshToken = refreshToken;

        // Réponse avec l'utilisateur connecté, les tokens et le token CSRF
        res.status(200).json({
          status: 200,
          message: "Connexion réussie",
          user: userWithoutPassword,
          token,
          refreshToken,
          csrfToken: req.session.csrfSecret
            ? tokens.create(req.session.csrfSecret)
            : null,
        });
      });
    } catch (error) {
      next(error);
    }
  })(req, res, next);
};

/**
 * Déconnecte l'utilisateur et détruit sa session
 * @async
 * @function sessionDestroy
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 * @returns {Promise<void>}
 * @throws {Error} En cas d'erreur lors de la destruction de la session
 */
const sessionDestroy = async (req, res) => {
  try {
    // 1. Vérification si l'utilisateur est connecté
    if (!req.isAuthenticated()) {
      return res.status(401).json({
        message: "No active session to destroy",
      });
    }

    // 2. Sauvegarde des informations de l'utilisateur pour le log
    const userInfo = {
      id: req.user.id,
      email: req.user.email,
    };

    // 3. Déconnexion de Passport avec callback
    req.logout((err) => {
      if (err) {
        console.error("Error during passport logout:", err);
      }

      // 4. Nettoyage des cookies côté client
      res.clearCookie("connect.sid");
    });

    // 6. Destruction de la session après l'envoi de la réponse
    if (req.session) {
      req.session.destroy();
    }

    // 5. Réponse de succès
    res.status(200).json({
      message: "Logged out successfully",
      user: userInfo,
    });
  } catch (error) {
    console.error("Error during session destruction:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

/**
 * Vérifie l'état d'authentification de l'utilisateur
 * @function checkAuth
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 * @returns {void}
 * @throws {Error} En cas d'erreur lors de la vérification de l'authentification
 */
const checkAuth = (req, res) => {
  try {
    // 1. Vérification de l'authentification Passport
    if (!req.isAuthenticated()) {
      return res.status(401).json({
        isAuthenticated: false,
        message: "Not authenticated with Passport",
      });
    }

    // 2. Récupération des tokens depuis la session
    const token = req.session.token;
    const refreshToken = req.session.refreshToken;

    if (!token || !refreshToken) {
      return res.status(401).json({
        isAuthenticated: false,
        message: "Tokens not found in session",
      });
    }

    // 3. Réponse avec toutes les informations
    res.status(200).json({
      isAuthenticated: true,
      message: "Successfully authenticated",
      passport: {
        user: req.user, // Données de l'utilisateur de Passport
        isAuthenticated: req.isAuthenticated(),
      },
      session: {
        token: token,
        refreshToken: refreshToken,
        sessionId: req.sessionID,
        cookie: req.session.cookie,
      },
    });
  } catch (error) {
    console.error("Error checking authentication:", error);
    res.status(500).json({
      isAuthenticated: false,
      message: "Internal server error",
    });
  }
};

module.exports = { registerUser, loginUser, sessionDestroy, checkAuth };
