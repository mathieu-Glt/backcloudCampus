const IAuthService = require("../interfaces/IAuthService");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../models/user.model");
const config = require("../config/config");
const crypto = require("crypto");

class AuthService extends IAuthService {
  /**
   * Vérifie si un utilisateur existe déjà avec l'email ou le nom d'utilisateur fourni
   * @param {string} email - Email à vérifier
   * @param {string} username - Nom d'utilisateur à vérifier
   * @returns {Promise<boolean>} - True si l'utilisateur existe, false sinon
   */
  async userExists(email, username) {
    try {
      return await User.userExists(email, username);
    } catch (error) {
      console.error(
        "Erreur lors de la vérification de l'existence de l'utilisateur:",
        error
      );
      throw error;
    }
  }

  /**
   * Crée un nouvel utilisateur
   * @param {Object} userData - Données de l'utilisateur à créer
   * @returns {Promise<Object>} - Utilisateur créé (sans le mot de passe)
   */
  async createUser(userData) {
    try {
      // Création de l'utilisateur
      const user = await User.create(userData);

      // Retourner l'utilisateur sans le mot de passe
      const { password, ...userWithoutPassword } = user.toJSON();
      return userWithoutPassword;
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur:", error);
      throw error;
    }
  }

  /**
   * Authentifie un utilisateur
   * @param {string} email - Email de l'utilisateur
   * @param {string} password - Mot de passe de l'utilisateur
   * @returns {Promise<Object>} - Résultat de l'authentification
   */
  async authenticate(email, password) {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return { success: false, message: "Utilisateur non trouvé" };
      }

      const isValidPassword = await user.comparePassword(password);
      if (!isValidPassword) {
        return { success: false, message: "Mot de passe incorrect" };
      }

      // Générer le token JWT
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        config.auth.jwtSecret,
        { expiresIn: config.auth.jwtExpiration }
      );

      // Mettre à jour la dernière connexion
      await user.update({ lastLogin: new Date() });

      // Retourner l'utilisateur sans le mot de passe
      const { password: _, ...userWithoutPassword } = user.toJSON();

      return {
        success: true,
        token,
        user: userWithoutPassword,
      };
    } catch (error) {
      console.error("Erreur lors de l'authentification:", error);
      throw error;
    }
  }

  /**
   * Vérifie un token JWT
   * @param {string} token - Token JWT à vérifier
   * @returns {Promise<Object>} - Résultat de la vérification
   */
  async verifyToken(token) {
    try {
      const decoded = jwt.verify(token, config.auth.jwtSecret);
      const user = await User.findByPk(decoded.id, {
        attributes: { exclude: ["password"] },
      });

      if (!user) {
        return { success: false, message: "Utilisateur non trouvé" };
      }

      return {
        success: true,
        user,
      };
    } catch (error) {
      if (error.name === "JsonWebTokenError") {
        return { success: false, message: "Token invalide" };
      }
      if (error.name === "TokenExpiredError") {
        return { success: false, message: "Token expiré" };
      }
      throw error;
    }
  }

  async generateRefreshToken(userId) {
    // Génération d'un token aléatoire
    const refreshToken = crypto.randomBytes(40).toString("hex");

    // Stockage du token dans la base de données
    await User.update({ refreshToken }, { where: { id: userId } });

    return refreshToken;
  }

  async refreshAccessToken(refreshToken) {
    try {
      // Recherche de l'utilisateur avec ce refresh token
      const user = await User.findOne({
        where: { refreshToken },
        attributes: { exclude: ["password"] },
      });

      if (!user) {
        return {
          success: false,
          message: "Refresh token invalide",
        };
      }

      // Génération d'un nouveau token d'accès
      const accessToken = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        config.jwt.secret,
        { expiresIn: config.jwt.expiresIn }
      );

      // Génération d'un nouveau refresh token
      const newRefreshToken = await this.generateRefreshToken(user.id);

      return {
        success: true,
        accessToken,
        refreshToken: newRefreshToken,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: "Erreur lors du renouvellement du token",
      };
    }
  }

  async revokeRefreshToken(refreshToken) {
    try {
      const result = await User.update(
        { refreshToken: null },
        { where: { refreshToken } }
      );

      return {
        success: result[0] > 0,
        message:
          result[0] > 0 ? "Token révoqué avec succès" : "Token non trouvé",
      };
    } catch (error) {
      return {
        success: false,
        message: "Erreur lors de la révocation du token",
      };
    }
  }
}

module.exports = AuthService;
