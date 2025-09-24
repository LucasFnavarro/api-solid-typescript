import {
  type User,
  type Prisma,
  Role,
} from "../../../../../generated/prisma/index.js";
import type { IUsersRepository } from "../users-repository.js";

export class InMemoryUserRepository implements IUsersRepository {
  public items: User[] = [];

  async getAll(): Promise<User[]> {
    return this.items;
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

  async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    const user = this.items.find((user) => user.id === id);

    if (!user) {
      throw new Error("User not found");
    }

    user.name = typeof data.name === "string" ? data.name : user.name;
    user.email = typeof data.email === "string" ? data.email : user.email;
    user.password =
      typeof data.password === "string" ? data.password : user.password;
    user.phone = typeof data.phone === "string" ? data.phone : user.phone;
    user.image_url =
      typeof data.image_url === "string" ? data.image_url : user.image_url;

    user.updatedAt = new Date();

    return user;
  }

  async updateAvatar(id: string, imageUrl: string): Promise<any> {
    const user = this.items.find((user) => user.id === id);

    if (!user) return null;

    user.image_url = imageUrl;
    user.updatedAt = new Date();

    return user;
  }

  async delete(id: string): Promise<User | null> {
    const index = this.items.findIndex((user) => user.id === id);

    if (index === -1) return null;

    const [deleted] = this.items.splice(index, 1);
    return deleted ?? null;
  }
}
