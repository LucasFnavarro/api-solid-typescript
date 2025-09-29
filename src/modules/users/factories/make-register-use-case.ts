import Mail from "../../../lib/Mail.ts";
import { PrismaUsersRepository } from "../repositories/prisma/prisma-users-repository.js";
import { RegisterUserUseCase } from "../use-cases/register-user.use-case.js";

export function makeRegisterUseCase() {
  const prismaUserUseCase = new PrismaUsersRepository();
  const registerUserUseCase = new RegisterUserUseCase(prismaUserUseCase, Mail);

  return registerUserUseCase;
}
