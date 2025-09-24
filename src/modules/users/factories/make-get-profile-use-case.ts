import { PrismaUsersRepository } from "../repositories/prisma/prisma-users-repository.js";
import { getProfileUserUseCase } from "../use-cases/get-profile-user.use-case.js";

export function makeGetProfileUserUseCase() {
  const prismaUserUseCase = new PrismaUsersRepository();
  const getProfileUseCase = new getProfileUserUseCase(prismaUserUseCase);

  return getProfileUseCase;
}
