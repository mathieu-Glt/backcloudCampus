import {
  UserAttributes,
  UserCreationAttributes,
  UserInstance,
} from "../types/models";

export interface IUserRepository {
  findAll(options?: any): Promise<UserInstance[]>;
  findByPk(id: number, options?: any): Promise<UserInstance | null>;
  findOne(options: any): Promise<UserInstance | null>;
  create(data: UserCreationAttributes): Promise<UserInstance>;
  update(
    data: Partial<UserAttributes>,
    options: any
  ): Promise<[number, UserInstance[]]>;
  destroy(options: any): Promise<number>;
  findByEmail(email: string): Promise<UserInstance | null>;
  findByUsername(username: string): Promise<UserInstance | null>;
  findByVerificationToken(token: string): Promise<UserInstance | null>;
  findByResetPasswordToken(token: string): Promise<UserInstance | null>;
}
