import { Prisma, Product } from "../../../../../generated/prisma/index.js";
import { IProductRepository } from "../product-repository.ts";

export class inMemoryProductRepository implements IProductRepository {
  public items: Product[] = [];
  
  async getBySlug(slug: string): Promise<Product | null> {
    throw new Error("Method not implemented.");
  }

  async getById(id: string): Promise<Product | null> {
    const product = this.items.find((product) => product.id === id);

    if (!product) return null;

    return product;
  }

  async getAll(): Promise<Product[]> {
    return this.items;
  }

  async create(data: Prisma.ProductUncheckedCreateInput): Promise<Product> {
    const product: Product = {
      id: crypto.randomUUID(),
      name: data.name,
      description: data.description || null,
      price: data.price,
      image_url: data.image_url || null,
      slug: data.slug || null,
      available: data.available || null,
      is_combo: data.is_combo || null,
      customizations: data.customizations || null,
      category_id: data.category_id,
      createdAt: new Date(),
    };

    this.items.push(product);

    return product;
  }
}
