import { PrismaProductRepository } from "../repositories/prisma/prisma-product-repository.ts";
import { GetProductByIdUseCase } from "../use-cases/get-product-by-id.use-case.ts";

export function makeGetByIdProductUseCase() {
  const prismaProductUseCase = new PrismaProductRepository();
  const getProductByIdUseCase = new GetProductByIdUseCase(prismaProductUseCase);

  return getProductByIdUseCase;
}
