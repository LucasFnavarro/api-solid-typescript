import { CreatedProductError } from "../errors/created-product-error.ts";
import { IProductRepository } from "../repositories/product-repository.ts";

interface CreateProductUseCaseRequest {
  name: string;
  description: string;
  price: string;
  image_url: string;
  category_id: string;
  available: boolean;
  is_combo: boolean;
  customizations?: string | null;
}

export class CreateProductUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute({
    name,
    description,
    price,
    image_url,
    category_id,
    available,
    is_combo,
    customizations,
  }: CreateProductUseCaseRequest) {
    const newProduct = await this.productRepository.create({
      name,
      description,
      price,
      image_url,
      category_id,
      available,
      is_combo,
      customizations,
    });

    if (!newProduct) {
      throw new CreatedProductError();
    }

    return {
      newProduct,
    };
  }
}
