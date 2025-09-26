import { Prisma, Product } from "../../../../generated/prisma/index.js";

export interface IProductRepository {
  create(data: Prisma.ProductCreateInput): Promise<Product>
}