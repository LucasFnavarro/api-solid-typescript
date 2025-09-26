import { Prisma, Product } from "../../../../generated/prisma/index.js";

export interface IProductRepository {
  create(data: Prisma.ProductUncheckedCreateInput): Promise<Product>;
  getAll(): Promise<Product[]>;
  getById(id: string): Promise<Product | null>;
  getBySlug(slug: string): Promise<Product | null>;
}
