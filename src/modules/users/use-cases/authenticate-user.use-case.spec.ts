import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUserRepository } from "../repositories/in-memory/in-memory-user-repository.js";
import { AuthenticateUserUseCase } from "../use-cases/authenticate.js";
import { hash } from "bcryptjs";

let inMemoryRepository: InMemoryUserRepository;
let sut: AuthenticateUserUseCase;

describe("Authenticate User Use Case", () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryUserRepository();
    sut = new AuthenticateUserUseCase(inMemoryRepository);
  });

  it("should ble able to authenticate", async () => {
    inMemoryRepository.create({
      id: crypto.randomUUID(),
      name: "John Doe",
      email: "john@example.com",
      phone: "123123123",
      password: await hash("123123", 10),
      image_url: "profile.png",
      createdAt: Date(),
      updatedAt: Date(),
    });

    const { user } = await sut.execute({
      email: "john@example.com",
      password: "123123",
    });

    expect(user.id).toStrictEqual(expect.any(String));
    expect(user.email).toStrictEqual("john@example.com");
  });
});
