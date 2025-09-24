import { uploadCloudinary } from "../../../config/cloudinary-service.js";
import { UserNotFoundError } from "../errors/user-not-found-error.js";
import type { IUsersRepository } from "../repositories/users-repository.js";

interface UploadAvatarProfileUseCaseRequest {
  id: string;
  fileBuffer: Buffer;
  fileName: string;
}

export class UploadAvatarProfileUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ id, fileBuffer, fileName }: UploadAvatarProfileUseCaseRequest) {
    const doesUserExists = await this.usersRepository.findById(id);

    if (!doesUserExists) {
      throw new UserNotFoundError();
    }

    const imageUrl = await uploadCloudinary(fileBuffer, fileName);

    const user = await this.usersRepository.updateAvatar(id, imageUrl);

    return {
      user,
    };
  }
}
