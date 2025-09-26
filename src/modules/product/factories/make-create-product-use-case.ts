import { PrismaProductRepository } from "../repositories/prisma/prisma-product-repository.ts";
import { CreateProductUseCase } from "../use-cases/create-product.use-case.ts";

export function makeCreateProductUseCase() {
  const prismaProductUseCase = new PrismaProductRepository();
  const createProductUseCase = new CreateProductUseCase(prismaProductUseCase);

  return createProductUseCase;
}
