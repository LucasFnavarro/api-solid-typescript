import { beforeEach, describe, expect, it } from "vitest";
import { CreateProductUseCase } from "./create-product.use-case.ts";
import { inMemoryProductRepository } from "../repositories/in-memory/in-memory-product-repository.ts";

let InMemoryRepository: inMemoryProductRepository;
let sut: CreateProductUseCase;

describe("Get All Product Use Case", () => {
  beforeEach(() => {
    InMemoryRepository = new inMemoryProductRepository();
    sut = new CreateProductUseCase(InMemoryRepository);
  });

  it("deve retornar todos os produtos cadastrado", async () => {
    //
  });
});
