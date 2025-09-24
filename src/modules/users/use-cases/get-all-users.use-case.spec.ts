import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUserRepository } from "../repositories/in-memory/in-memory-user-repository.js";
import { GetAllUsersUseCase } from "./get-all-users.use-case.js";
import { UsersNotFoundError } from "../errors/users-not-found-error.js";

let inMemoryRepository: InMemoryUserRepository;
let sut: GetAllUsersUseCase;

describe("Get all Users Use Case", () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryUserRepository();
    sut = new GetAllUsersUseCase(inMemoryRepository);
  });

  it("deve retornar todos os usuários se existirem", async () => {
    const user = await inMemoryRepository.create({
      id: "user-id",
      name: "John doe",
      email: "john@example.com",
      password: "123123",
    });

    const result = await sut.execute();

    expect(result.users).toHaveLength(1);
    expect(result.users).toEqual([user]);
  });

  it("deve retornar UserNotFoundError se não houver usuários", async () => {
    await expect(sut.execute()).rejects.toBeInstanceOf(UsersNotFoundError);
  });
});
