import { UserNotFoundError } from "../errors/user-not-found-error.js";
import type { IUsersRepository } from "../repositories/users-repository.js";

interface getProfileUserUseCaseRequest {
  id: string;
}

export class getProfileUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ id }: getProfileUserUseCaseRequest) {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new UserNotFoundError();
    }

    return {
      user,
    };
  }
}
