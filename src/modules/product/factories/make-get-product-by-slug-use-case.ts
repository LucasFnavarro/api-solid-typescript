import { PrismaProductRepository } from "../repositories/prisma/prisma-product-repository.ts";
import { GetProductByIdUseCase } from "../use-cases/get-product-by-id.use-case.ts";
import { GetProductBySlugUseCase } from "../use-cases/get-product-by-slug.use-case.ts";

export function makeGetBySlugProductUseCase() {
  const prismaProductUseCase = new PrismaProductRepository();
  const getAllProductUseCase = new GetProductBySlugUseCase(prismaProductUseCase);

  return getAllProductUseCase;
}
