const IUserService = require("../interfaces/IUserService");
const bcrypt = require("bcryptjs");
const UserValidator = require("../validators/UserValidator");

class UserService extends IUserService {
  /**
   * @param {Object} userRepository - Repository pour l'accès aux données utilisateur
   */
  constructor(userRepository) {
    super();
    if (!userRepository) {
      throw new Error("userRepository est requis");
    }
    this.userRepository = userRepository;
  }

  async getAllUsers() {
    return await this.userRepository.findAll({
      attributes: { exclude: ["password"] },
    });
  }

  async getUserById(id) {
    return await this.userRepository.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
  }

  async getUserByEmail(email) {
    return await this.userRepository.findOne({
      where: { email },
      attributes: { exclude: ["password"] },
    });
  }

  async createUser(userData) {
    // Validation des données avant création
    const validationResult = UserValidator.validateUserData(userData);
    if (!validationResult.isValid) {
      throw new Error(validationResult.errors[0]);
    }

    // Vérification si l'email existe déjà
    const existingUser = await this.getUserByEmail(userData.email);
    if (existingUser) {
      throw new Error("Cet email est déjà utilisé");
    }

    // Hashage du mot de passe
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }

    // Création de l'utilisateur
    const user = await this.userRepository.create(userData);
    const { password, ...userWithoutPassword } = user.toJSON();
    return userWithoutPassword;
  }

  async updateUser(id, userData) {
    // Validation des données avant mise à jour
    const validationResult = UserValidator.validateUserData(userData);
    if (!validationResult.isValid) {
      throw new Error(validationResult.errors[0]);
    }

    // Vérification si l'utilisateur existe
    const existingUser = await this.getUserById(id);
    if (!existingUser) {
      throw new Error("Utilisateur non trouvé");
    }

    // Si l'email est modifié, vérifier qu'il n'est pas déjà utilisé
    if (userData.email && userData.email !== existingUser.email) {
      const userWithEmail = await this.getUserByEmail(userData.email);
      if (userWithEmail) {
        throw new Error("Cet email est déjà utilisé");
      }
    }

    // Hashage du mot de passe si modifié
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }

    // Mise à jour de l'utilisateur
    const [updated] = await this.userRepository.update(userData, {
      where: { id },
      returning: true,
    });

    if (!updated) {
      return null;
    }

    const user = await this.userRepository.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
    return user;
  }

  async deleteUser(id) {
    const user = await this.userRepository.findByPk(id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return false;
    }

    await this.userRepository.destroy({
      where: { id },
    });
    return true;
  }
}

module.exports = UserService;
