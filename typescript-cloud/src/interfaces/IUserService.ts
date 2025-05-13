import {
  UserAttributes,
  UserCreationAttributes,
  UserInstance,
} from "../types/models";

/*
 * @fileoverview IUserService
 * @module interfaces/IUserService
 * @description IUserService
 * @author [@your-name] (https://github.com/your-username)
 * @version 1.0.0
 */

// Interface pour le service des utilisateurs
// Définit les méthodes disponibles pour le service des utilisateurs
export interface IUserService {
  getAllUsers(): Promise<UserInstance[]>;
  getUserById(id: number): Promise<UserInstance | null>;
  getUserByEmail(email: string): Promise<UserInstance | null>;
  getUserByUsername(username: string): Promise<UserInstance | null>;
  createUser(userData: UserCreationAttributes): Promise<UserInstance>;
  updateUser(
    id: number,
    userData: Partial<UserAttributes>
  ): Promise<[number, UserInstance[]]>;
  deleteUser(id: number): Promise<boolean>;
  verifyUser(token: string): Promise<boolean>;
  requestPasswordReset(email: string): Promise<boolean>;
  resetPassword(token: string, newPassword: string): Promise<boolean>;
  changePassword(
    userId: number,
    currentPassword: string,
    newPassword: string
  ): Promise<boolean>;
}
