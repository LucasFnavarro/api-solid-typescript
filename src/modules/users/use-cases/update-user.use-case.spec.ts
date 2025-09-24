import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUserRepository } from "../repositories/in-memory/in-memory-user-repository.js";
import { UpdateUserUseCase } from "./update-user.use-case.js";

let inMemoryRepository: InMemoryUserRepository;
let sut: UpdateUserUseCase;

describe("Update User Use Case", () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryUserRepository();
    sut = new UpdateUserUseCase(inMemoryRepository);
  });

  it("um usuário deve conseguir editar a sua própria conta", async () => {
    const user = await inMemoryRepository.create({
      id: "user-01",
      name: "John Doe",
      email: "john@example.com",
      phone: "123123123",
      password: "123123",
      createdAt: Date(),
      updatedAt: Date(),
      role: "CLIENT",
    });

    const updatedUser = await sut.execute({
      id: user.id,
      name: "John Updated",
      phone: "99999999999",
    });

    expect(updatedUser.name).toBe("John Updated");
    expect(updatedUser.phone).toBe("99999999999");
    expect(updatedUser.id).toBe(user.id);
  });
});
