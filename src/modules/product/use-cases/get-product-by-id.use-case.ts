import { GetProductByIdError } from "../errors/get-product-by-id-error.ts";
import { IProductRepository } from "../repositories/product-repository.ts";

interface GetProductByIdUseCaseRequest {
  id: string;
}

export class GetProductByIdUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute({ id }: GetProductByIdUseCaseRequest) {
    const productId = await this.productRepository.getById(id);

    if (!productId) {
      throw new GetProductByIdError();
    }

    return {
      productId,
    };
  }
}
