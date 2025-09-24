import { PrismaUsersRepository } from "../repositories/prisma/prisma-users-repository.js";
import { AuthenticateUserUseCase } from "../use-cases/authenticate.js";

export function makeAuthenticateUseCase() {
  const prismaUserUseCase = new PrismaUsersRepository();
  const authenticateUserUseCase = new AuthenticateUserUseCase(prismaUserUseCase);

  return authenticateUserUseCase;
}
