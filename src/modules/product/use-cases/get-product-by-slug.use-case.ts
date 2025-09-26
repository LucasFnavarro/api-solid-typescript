import { ProductBySlugError } from "../errors/get-product-by-slug-error.ts";
import { IProductRepository } from "../repositories/product-repository.ts";

interface GetProductBySlugUseCaseRequest {
  slug: string;
}

export class GetProductBySlugUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute({ slug }: GetProductBySlugUseCaseRequest) {
    const productBySlug = await this.productRepository.getBySlug(slug);

    if (!productBySlug) {
      throw new ProductBySlugError();
    }

    return {
      productBySlug,
    };
  }
}
