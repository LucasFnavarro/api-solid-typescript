import type { Prisma, User } from "../../../../generated/prisma/index.js";

export interface IUsersRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  getAll(): Promise<User[]>;
  create(data: Prisma.UserCreateInput): Promise<User>;
  update(id: string, data: Prisma.UserUpdateInput): Promise<User>;
  updateAvatar(id: string, imageUrl: string): Promise<any>;
  delete(id: string): Promise<User | null>;

  // Métodos para ativação de conta
  saveActivationToken(
    userId: string,
    token: string,
    expiresAt: Date
  ): Promise<void>;
  removeActivationToken(userId: string): Promise<void>;
  findByActivationToken(token: string): Promise<User | null>;
}
