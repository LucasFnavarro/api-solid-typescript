import { Prisma, Product } from "../../../../../generated/prisma/index.js";
import { prisma } from "../../../../lib/prismaClient.ts";
import { IProductRepository } from "../product-repository.ts";

export class PrismaProductRepository implements IProductRepository {
  async create(data: Prisma.ProductCreateInput): Promise<Product> {
    const user = await prisma.product.create({
      data,
    });

    return user;
  }
}
