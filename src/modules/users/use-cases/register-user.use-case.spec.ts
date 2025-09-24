import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUserRepository } from "../repositories/in-memory/in-memory-user-repository.js";
import { RegisterUserUseCase } from "../use-cases/register-user.use-case.js";
import { UserAlreadyExistsError } from "../errors/user-already-exists-error.js";

let inMemoryRepository: InMemoryUserRepository;
let sut: RegisterUserUseCase;

describe("Register User Use Case", () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryUserRepository();
    sut = new RegisterUserUseCase(inMemoryRepository);
  });

  it("should successfully register a new user", async () => {
    const user = await inMemoryRepository.create({
      id: crypto.randomUUID(),
      name: "John Doe",
      email: "john@example.com",
      phone: "123123123",
      password: "123123",
      createdAt: Date(),
      updatedAt: Date(),
    });

    expect(user.id).toStrictEqual(expect.any(String));
  });

  it("should throw an error when trying to register a user with an existing email", async () => {
    await sut.execute({
      name: "John Doe",
      email: "john@example.com",
      phone: "123123123",
      password: "123123",
    });

    await expect(() =>
      sut.execute({
        name: "John Doe",
        email: "john@example.com",
        phone: "123123123",
        password: "123123",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
