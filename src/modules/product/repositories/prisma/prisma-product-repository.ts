import { Prisma, Product } from "../../../../../generated/prisma/index.js";
import { prisma } from "../../../../lib/prismaClient.ts";
import { IProductRepository } from "../product-repository.ts";

export class PrismaProductRepository implements IProductRepository {
  async getBySlug(slug: string): Promise<Product | null> {
    const productBySlug = await prisma.product.findFirst({
      where: {
        slug,
      },
      include: {
        category: true,
      },
    });

    if (!productBySlug) return null;

    return productBySlug ?? null;
  }

  async getById(id: string): Promise<Product | null> {
    return await prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
      },
    });
  }

  async getAll(): Promise<Product[]> {
    return await prisma.product.findMany({
      include: {
        category: true,
      },
    });
  }

  async create(data: Prisma.ProductUncheckedCreateInput): Promise<Product> {
    const user = await prisma.product.create({
      data,
    });

    return user;
  }
}
