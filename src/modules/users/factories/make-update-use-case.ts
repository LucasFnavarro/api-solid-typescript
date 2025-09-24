import { PrismaUsersRepository } from "../repositories/prisma/prisma-users-repository.js";
import { UpdateUserUseCase } from "../use-cases/update-user.use-case.js";

export function makeUpdateUserUseCase() {
  const prismaUserUseCase = new PrismaUsersRepository();
  const updateUserUseCase = new UpdateUserUseCase(prismaUserUseCase);

  return updateUserUseCase;
}
