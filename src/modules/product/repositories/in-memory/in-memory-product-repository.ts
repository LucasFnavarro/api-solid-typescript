import { Prisma, Product } from "../../../../../generated/prisma/index.js";
import { IProductRepository } from "../product-repository.ts";

export class InMemoryProductRepository implements IProductRepository {
  public items: Product[] = [];

  async create(data: Prisma.ProductCreateInput): Promise<Product> {
    throw new Error("Method not implemented.");
  }
}
