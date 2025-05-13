import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { IUserService } from "../interfaces/IUserService";
import { IUserRepository } from "../interfaces/IUserRepository";
import {
  UserAttributes,
  UserCreationAttributes,
  UserInstance,
} from "../types/models";
import { AppError } from "../middleware/error.middleware";
import { sendVerificationEmail, sendPasswordResetEmail } from "../utils/email";

/**
 * @fileoverview UserService
 * @module services/UserService
 * @description UserService
 * @author [@your-name] (https://github.com/your-username)
 * @version 1.0.0
 */

class UserService implements IUserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async getAllUsers(): Promise<UserInstance[]> {
    return await this.userRepository.findAll({
      attributes: {
        exclude: [
          "password",
          "verificationToken",
          "resetPasswordToken",
          "resetPasswordExpires",
        ],
      },
    });
  }

  async getUserById(id: number): Promise<UserInstance | null> {
    const user = await this.userRepository.findByPk(id, {
      attributes: {
        exclude: [
          "password",
          "verificationToken",
          "resetPasswordToken",
          "resetPasswordExpires",
        ],
      },
    });
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return user;
  }

  async getUserByEmail(email: string): Promise<UserInstance | null> {
    return await this.userRepository.findByEmail(email);
  }

  async getUserByUsername(username: string): Promise<UserInstance | null> {
    return await this.userRepository.findByUsername(username);
  }

  async createUser(userData: UserCreationAttributes): Promise<UserInstance> {
    // Vérifier si l'email existe déjà
    const existingEmail = await this.userRepository.findByEmail(userData.email);
    if (existingEmail) {
      throw new AppError("Email already exists", 400);
    }

    // Vérifier si le nom d'utilisateur existe déjà
    const existingUsername = await this.userRepository.findByUsername(
      userData.username
    );
    if (existingUsername) {
      throw new AppError("Username already exists", 400);
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Générer le token de vérification
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // Créer l'utilisateur
    const user = await this.userRepository.create({
      ...userData,
      password: hashedPassword,
      verificationToken,
    });

    // Envoyer l'email de vérification
    await sendVerificationEmail(user.email, verificationToken);

    return user;
  }

  async updateUser(
    id: number,
    userData: Partial<UserAttributes>
  ): Promise<[number, UserInstance[]]> {
    const user = await this.userRepository.findByPk(id);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    // Si le mot de passe est fourni, le hasher
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }

    return await this.userRepository.update(userData, { where: { id } });
  }

  async deleteUser(id: number): Promise<boolean> {
    const user = await this.userRepository.findByPk(id);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    await this.userRepository.destroy({ where: { id } });
    return true;
  }

  async verifyUser(token: string): Promise<boolean> {
    const user = await this.userRepository.findByVerificationToken(token);
    if (!user) {
      throw new AppError("Invalid verification token", 400);
    }

    await this.userRepository.update(
      { isVerified: true, verificationToken: null },
      { where: { id: user.id } }
    );

    return true;
  }

  async requestPasswordReset(email: string): Promise<boolean> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetExpires = new Date(Date.now() + 3600000); // 1 heure

    await this.userRepository.update(
      {
        resetPasswordToken: resetToken,
        resetPasswordExpires: resetExpires,
      },
      { where: { id: user.id } }
    );

    await sendPasswordResetEmail(user.email, resetToken);
    return true;
  }

  async resetPassword(token: string, newPassword: string): Promise<boolean> {
    const user = await this.userRepository.findByResetPasswordToken(token);
    if (
      !user ||
      !user.resetPasswordExpires ||
      user.resetPasswordExpires < new Date()
    ) {
      throw new AppError("Invalid or expired reset token", 400);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.userRepository.update(
      {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
      { where: { id: user.id } }
    );

    return true;
  }

  async changePassword(
    userId: number,
    currentPassword: string,
    newPassword: string
  ): Promise<boolean> {
    const user = await this.userRepository.findByPk(userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordValid) {
      throw new AppError("Current password is incorrect", 400);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.userRepository.update(
      { password: hashedPassword },
      { where: { id: userId } }
    );

    return true;
  }
}

export default UserService;
