import {
  type User,
  type Prisma,
  Role,
} from "../../../../../generated/prisma/index.js";
import type { IUsersRepository } from "../users-repository.js";

export class InMemoryUserRepository implements IUsersRepository {
  public items: User[] = [];

  updateAvatar(id: string, imageUrl: string): Promise<any> {
    throw new Error("Method not implemented.");
  }

  getAll(): Promise<User[]> {
    throw new Error("Method not implemented.");
  }

  update(id: string, data: Partial<User>): Promise<User> {
    throw new Error("Method not implemented.");
  }

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((user) => user.id === id);

    if (!user) {
      return null;
    }

    return user ?? null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((user) => user.email === email);

    return user ?? null;
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user: User = {
      id: crypto.randomUUID(),
      name: data.name,
      email: data.email,
      password: data.password,
      role: Role.CLIENT,
      phone: data.phone || null,
      image_url: data.image_url || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.items.push(user);

    return user;
  }

  delete(id: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
}
