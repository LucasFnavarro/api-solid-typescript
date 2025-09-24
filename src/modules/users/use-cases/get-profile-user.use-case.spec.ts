import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUserRepository } from "../repositories/in-memory/in-memory-user-repository.js";
import { getProfileUserUseCase } from "./get-profile-user.use-case.js";
import { UserNotFoundError } from "../errors/user-not-found-error.js";

let inMemoryRepository: InMemoryUserRepository;
let sut: getProfileUserUseCase;

describe("Get Profile User Use Case", () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryUserRepository();
    sut = new getProfileUserUseCase(inMemoryRepository);
  });

  it("deve retornar o perfil do usuário se existir", async () => {
    const user = await inMemoryRepository.create({
      id: "user-1",
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123123",
    });

    const result = await sut.execute({ id: user.id });

    expect(result.user).toEqual(user);
  });

  it("deve lançar UserNotFoundError se o usuário não existir", async () => {
    await expect(sut.execute({ id: "non-existing-id" })).rejects.toBeInstanceOf(
      UserNotFoundError
    );
  });
});
