import type { User, Prisma } from "../../../../../generated/prisma/index.js";
import { prisma } from "../../../../lib/prismaClient.js";
import type { IUsersRepository } from "../users-repository.js";

export class PrismaUsersRepository implements IUsersRepository {
  async updateAvatar(id: string, imageUrl: string): Promise<any> {
    return prisma.user.update({
      where: { id },
      data: { image_url: imageUrl },
    });
  }

  async getAll(): Promise<User[]> {
    return await prisma.user.findMany();
  }

  async findById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { id },
      include: {
        address: true,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { email } });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<User | null> {
    const user = await prisma.user.delete({ where: { id } });

    return user ?? null;
  }

  async saveActivationToken(
    userId: string,
    token: string,
    expiresAt: Date
  ): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: { activationToken: token, tokenExpiresAt: expiresAt },
    });
  }

  async removeActivationToken(userId: string): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: { activationToken: null, tokenExpiresAt: null },
    });
  }

  async findByActivationToken(token: string): Promise<User | null> {
    return prisma.user.findFirst({
      where: {
        activationToken: token,
        tokenExpiresAt: { gte: new Date() },
      },
    });
  }
}
