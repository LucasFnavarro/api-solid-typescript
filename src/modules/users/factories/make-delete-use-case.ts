import { PrismaUsersRepository } from "../repositories/prisma/prisma-users-repository.js";
import { DeleteUserUseCase } from "../use-cases/delete-user.use-case.js";

export function makeDeleteUserUseCase() {
  const prismaUserUseCase = new PrismaUsersRepository();
  const deleteUserUseCase = new DeleteUserUseCase(prismaUserUseCase);

  return deleteUserUseCase;
}
