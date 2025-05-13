/**
 * @fileoverview Contrôleur gérant les opérations CRUD sur les utilisateurs dans le backoffice
 */

const BaseController = require("./BaseController");
const UserService = require("../services/UserService");
const AuthService = require("../services/AuthService");
const UserRepository = require("../repositories/UserRepository");
const UserValidator = require("../validators/UserValidator");

/**
 * Contrôleur pour la gestion des utilisateurs
 */
class UserController extends BaseController {
  /**
   * @param {UserService} userService - Service de gestion des utilisateurs
   * @param {AuthService} authService - Service d'authentification
   */
  constructor(userService, authService) {
    super();
    if (!userService) {
      throw new Error("userService est requis");
    }
    if (!authService) {
      throw new Error("authService est requis");
    }
    this.userService = userService;
    this.authService = authService;
  }

  /**
   * Récupère tous les utilisateurs
   */
  async getAllUsers(req, res) {
    const users = await this.userService.getAllUsers();
    this.sendSuccess(res, 200, users);
  }

  /**
   * Récupère un utilisateur par son ID
   */
  async getUserById(req, res) {
    const user = await this.userService.getUserById(req.params.id);
    if (!user) {
      const error = new Error("Utilisateur non trouvé");
      error.status = 404;
      throw error;
    }
    this.sendSuccess(res, 200, user);
  }

  /**
   * Crée un nouvel utilisateur
   */
  async createUser(req, res) {
    const validationResult = UserValidator.validateUserData(req.body);
    if (!validationResult.isValid) {
      const error = new Error(validationResult.errors[0]);
      error.status = 400;
      throw error;
    }

    const user = await this.userService.createUser(req.body);
    this.sendSuccess(res, 201, user);
  }

  /**
   * Met à jour un utilisateur existant
   */
  async updateUser(req, res) {
    const validationResult = UserValidator.validateUserData(req.body);
    if (!validationResult.isValid) {
      const error = new Error(validationResult.errors[0]);
      error.status = 400;
      throw error;
    }

    const user = await this.userService.updateUser(req.params.id, req.body);
    if (!user) {
      const error = new Error("Utilisateur non trouvé");
      error.status = 404;
      throw error;
    }
    this.sendSuccess(res, 200, user);
  }

  /**
   * Supprime un utilisateur
   */
  async deleteUser(req, res) {
    const success = await this.userService.deleteUser(req.params.id);
    if (!success) {
      const error = new Error("Utilisateur non trouvé");
      error.status = 404;
      throw error;
    }
    this.sendSuccess(res, 200, {
      message: "Utilisateur supprimé avec succès",
    });
  }

  /**
   * Authentifie un utilisateur
   */
  async login(req, res) {
    const { email, password } = req.body;
    const result = await this.authService.authenticate(email, password);

    if (!result.success) {
      const error = new Error(result.message);
      error.status = 401;
      throw error;
    }

    this.sendSuccess(res, 200, {
      token: result.token,
      user: result.user,
    });
  }

  /**
   * Vérifie un token JWT
   */
  async verifyToken(req, res) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      const error = new Error("Token manquant");
      error.status = 401;
      throw error;
    }

    const result = await this.authService.verifyToken(token);
    if (!result.success) {
      const error = new Error(result.message);
      error.status = 401;
      throw error;
    }

    this.sendSuccess(res, 200, { user: result.user });
  }
}

// Factory pour créer une instance du contrôleur avec ses dépendances
const createUserController = () => {
  const userRepository = new UserRepository();
  const userService = new UserService(userRepository);
  const authService = new AuthService();
  return new UserController(userService, authService);
};

module.exports = createUserController();
