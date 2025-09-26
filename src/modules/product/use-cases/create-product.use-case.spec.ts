import { beforeEach, describe, expect, it } from "vitest";
import { CreateProductUseCase } from "./create-product.use-case.ts";
import { inMemoryProductRepository } from "../repositories/in-memory/in-memory-product-repository.ts";

let InMemoryRepository: inMemoryProductRepository;
let sut: CreateProductUseCase;

describe("Register Product Use Case", () => {
  beforeEach(() => {
    InMemoryRepository = new inMemoryProductRepository();
    sut = new CreateProductUseCase(InMemoryRepository);
  });

  it("deve registrar com sucesso um novo usuário", async () => {
    const product = await InMemoryRepository.create({
      id: crypto.randomUUID(),
      name: "Pizza de Calabresa",
      description: "Pizza do calabreso",
      price: "49,99",
      category_id: "fake-category-id",
      available: false,
      is_combo: false,
      customizations: "Com borda de catupiry",
      createdAt: new Date(),
    });

    expect(product.id).toStrictEqual(expect.any(String));
    expect(product.category_id).toBe("fake-category-id");
  });
});
