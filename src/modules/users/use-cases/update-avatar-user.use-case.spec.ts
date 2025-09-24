import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUserRepository } from "../repositories/in-memory/in-memory-user-repository.js";
import { UpdateUserUseCase } from "./update-user.use-case.js";

let inMemoryRepository: InMemoryUserRepository;
let sut: UpdateUserUseCase;

describe("Update Avatar Profile User Use Case", () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryUserRepository();
    sut = new UpdateUserUseCase(inMemoryRepository);
  });

  it("um usuário deve conseguir atualizar sua foto de perfil", async () => {
    //
  });
});
