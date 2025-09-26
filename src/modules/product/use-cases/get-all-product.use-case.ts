import { ProductNotFoundError } from "../errors/product-not-found-error.ts";
import { IProductRepository } from "../repositories/product-repository.ts";

export class GetAllProductUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute() {
    const products = await this.productRepository.getAll();

    if (products.length === 0) {
      throw new ProductNotFoundError();
    }

    return {
      products,
    };
  }
}
