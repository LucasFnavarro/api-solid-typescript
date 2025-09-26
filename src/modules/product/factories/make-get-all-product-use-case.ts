import { PrismaProductRepository } from "../repositories/prisma/prisma-product-repository.ts";
import { GetAllProductUseCase } from "../use-cases/get-all-product.use-case.ts";

export function makeGetAllProductUseCase() {
  const prismaProductUseCase = new PrismaProductRepository();
  const getAllProductUseCase = new GetAllProductUseCase(prismaProductUseCase);

  return getAllProductUseCase;
}
