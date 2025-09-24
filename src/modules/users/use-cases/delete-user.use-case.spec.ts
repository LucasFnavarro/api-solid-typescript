import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUserRepository } from "../repositories/in-memory/in-memory-user-repository.js";
import { DeleteUserUseCase } from "./delete-user.use-case.js";
import { UserNotFoundError } from "../errors/user-not-found-error.js";
import { NotAllowedError } from "../errors/not-allowed-users-error.js";

let inMemoryRepository: InMemoryUserRepository;
let sut: DeleteUserUseCase;

describe("Delete User Use Case", () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryUserRepository();
    sut = new DeleteUserUseCase(inMemoryRepository);
  });

  it("deve lançar um UserNotFoundError se o ator não existir", async () => {
    const actor = await inMemoryRepository.create({
      name: "John Doe",
      email: "john@example.com",
      password: "123123",
      role: "CLIENT",
    });

    await expect(
      sut.execute({ id: actor.id, actorId: "no-existing-id" })
    ).rejects.toBeInstanceOf(UserNotFoundError);
  });

  it("deve lançar um UserNotFoundError se o usuário a ser deletado não existir", async () => {
    const actor = await inMemoryRepository.create({
      name: "John Doe",
      email: "john@example.com",
      password: "123123",
      role: "CLIENT",
    });

    await expect(
      sut.execute({ id: "user-not-found", actorId: actor.id })
    ).rejects.toBeInstanceOf(UserNotFoundError);
  });

  it("deve lançar NotAllowedError se o ator não for ADMIN e tentar deletar outro usuário", async () => {
    const actor = await inMemoryRepository.create({
      name: "John Doe",
      email: "john@example.com",
      password: "123123",
      role: "CLIENT",
    });

    const target = await inMemoryRepository.create({
      name: "Jana Doe",
      email: "jana@example.com",
      password: "123123",
      role: "CLIENT",
    });

    await expect(
      sut.execute({ id: target.id, actorId: actor.id })
    ).rejects.toBeInstanceOf(NotAllowedError);
  });

  it("deve permitir que o ator delete a sí mesmo", async () => {
    const user = await inMemoryRepository.create({
      name: "Jana Doe",
      email: "jana@example.com",
      password: "123123",
      role: "CLIENT",
    });

    await expect(
      sut.execute({ id: user.id, actorId: user.id })
    ).resolves.not.toThrow();
  });

  it("deve permitir que um ADMIN delete outro usuário", async () => {
    const user = await inMemoryRepository.create({
      name: "Jana Doe",
      email: "jana@example.com",
      password: "123123",
      role: "CLIENT",
    });

    const admin = await inMemoryRepository.create({
      name: "Admin Doe",
      email: "admin@example.com",
      password: "123123123",
      role: "ADMIN",
    });

    // usa os ids retornados
    await expect(
      sut.execute({ id: user.id, actorId: admin.id })
    ).resolves.not.toThrow();
  });
});
