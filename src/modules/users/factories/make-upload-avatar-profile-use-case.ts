import { PrismaUsersRepository } from "../repositories/prisma/prisma-users-repository.js";
import { UploadAvatarProfileUseCase } from "../use-cases/upload-avatar-user.use-case.js";

export function makeUploadProfileUseCase() {
  const prismaUserUseCase = new PrismaUsersRepository();
  const uploadAvatarProfile = new UploadAvatarProfileUseCase(prismaUserUseCase);

  return uploadAvatarProfile;
}
