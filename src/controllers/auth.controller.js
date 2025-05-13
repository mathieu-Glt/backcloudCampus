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
const BaseController = require("./BaseController");
const AuthService = require("../services/AuthService");

class AuthController extends BaseController {
  constructor() {
    super();
    this.authService = new AuthService();
  }

  async register(req, res) {
    console.log("=== registerUser ===");
    console.log("Raw body:", req.body);
    console.log("Parsed body:", {
      email: req.body.email,
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      role: req.body.role,
    });

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
    // Utilisation du service UserService
    const userExists = await this.authService.userExists(
      cleanEmail,
      cleanUsername
    );

    if (userExists) {
      const err = new Error(
        "Un utilisateur avec cet email ou ce nom d'utilisateur existe déjà"
      );
      err.status = 400;
      return this.sendError(res, err.status, err.message);
    }

    // 4. Préparation de l'objet utilisateur avec les données nettoyées
    const newUser = {
      email: cleanEmail,
      password: cleanPassword,
      firstname: cleanFirstname,
      lastname: cleanLastname,
      username: cleanUsername,
      role: cleanRole || "user",
    };

    // 5. Création de l'utilisateur dans la base de données
    const user = await this.authService.createUser(newUser);

    // 6. Retour de l'utilisateur créé sans le mot de passe
    const { password: _, ...userWithoutPassword } = user.toJSON();
    this.sendSuccess(res, 201, {
      status: 201,
      user: userWithoutPassword,
      message: "User created successfully",
    });
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await this.authService.authenticate(email, password);

      if (!result.success) {
        return this.sendError(res, 401, result.message);
      }

      this.sendSuccess(res, 200, {
        token: result.token,
        refreshToken: result.refreshToken,
        user: result.user,
      });
    } catch (error) {
      this.sendError(res, 500, "Erreur lors de l'authentification");
    }
  }

  async verifyToken(req, res) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return this.sendError(res, 401, "Token manquant");
      }

      const result = await this.authService.verifyToken(token);
      if (!result.success) {
        return this.sendError(res, 401, result.message);
      }

      this.sendSuccess(res, 200, { user: result.user });
    } catch (error) {
      this.sendError(res, 500, "Erreur lors de la vérification du token");
    }
  }

  async refreshToken(req, res) {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        return this.sendError(res, 400, "Refresh token manquant");
      }

      const result = await this.authService.refreshAccessToken(refreshToken);
      if (!result.success) {
        return this.sendError(res, 401, result.message);
      }

      this.sendSuccess(res, 200, {
        token: result.token,
        refreshToken: result.refreshToken,
      });
    } catch (error) {
      this.sendError(res, 500, "Erreur lors du rafraîchissement du token");
    }
  }

  async logout(req, res) {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        return this.sendError(res, 400, "Refresh token manquant");
      }

      const success = await this.authService.revokeRefreshToken(refreshToken);
      if (!success) {
        return this.sendError(res, 400, "Refresh token invalide");
      }

      this.sendSuccess(res, 200, { message: "Déconnexion réussie" });
    } catch (error) {
      this.sendError(res, 500, "Erreur lors de la déconnexion");
    }
  }
}

module.exports = new AuthController();
