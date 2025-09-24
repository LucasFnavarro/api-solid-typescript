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

  async getAll(): Promise<User[]> {
    return this.items;
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const user = this.items.find((user) => user.id === id);

    if (!user) return null;

    
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
      id: data.id || crypto.randomUUID(),
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role || Role.CLIENT,
      phone: data.phone || null,
      image_url: data.image_url || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.items.push(user);

    return user;
  }

  async delete(id: string): Promise<User | null> {
    const index = this.items.findIndex((user) => user.id === id);

    if (index === -1) return null;

    const [deleted] = this.items.splice(index, 1);
    return deleted ?? null;
  }
}
