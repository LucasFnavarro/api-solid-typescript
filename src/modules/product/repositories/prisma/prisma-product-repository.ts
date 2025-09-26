import { Prisma, Product } from "../../../../../generated/prisma/index.js";
import { prisma } from "../../../../lib/prismaClient.ts";
import { IProductRepository } from "../product-repository.ts";

export class PrismaProductRepository implements IProductRepository {
  async getAll(): Promise<Product[]> {
    return await prisma.product.findMany();
  }

  async create(data: Prisma.ProductUncheckedCreateInput): Promise<Product> {
    const user = await prisma.product.create({
      data,
    });

    return user;
  }
}
