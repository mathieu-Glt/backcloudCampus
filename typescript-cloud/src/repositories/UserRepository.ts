import { User } from "../models";
import { IUserRepository } from "../interfaces/IUserRepository";
import {
  UserAttributes,
  UserCreationAttributes,
  UserInstance,
} from "../types/models";

/**
 * @fileoverview UserRepository
 * @module repositories/UserRepository
 * @description UserRepository
 * @author [@your-name] (https://github.com/your-username)
 * @version 1.0.0
 */

class UserRepository implements IUserRepository {
  async findAll(options?: any): Promise<UserInstance[]> {
    return await User.findAll(options);
  }

  async findByPk(id: number, options?: any): Promise<UserInstance | null> {
    return await User.findByPk(id, options);
  }

  async findOne(options: any): Promise<UserInstance | null> {
    return await User.findOne(options);
  }

  async create(data: UserCreationAttributes): Promise<UserInstance> {
    return await User.create(data);
  }

  async update(
    data: Partial<UserAttributes>,
    options: any
  ): Promise<[number, UserInstance[]]> {
    return await User.update(data, options);
  }

  async destroy(options: any): Promise<number> {
    return await User.destroy(options);
  }

  async findByEmail(email: string): Promise<UserInstance | null> {
    return await User.findOne({ where: { email } });
  }

  async findByUsername(username: string): Promise<UserInstance | null> {
    return await User.findOne({ where: { username } });
  }

  async findByVerificationToken(token: string): Promise<UserInstance | null> {
    return await User.findOne({ where: { verificationToken: token } });
  }

  async findByResetPasswordToken(token: string): Promise<UserInstance | null> {
    return await User.findOne({ where: { resetPasswordToken: token } });
  }
}

export default UserRepository;
