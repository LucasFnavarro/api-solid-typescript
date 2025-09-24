import { UserSNotFoundError } from "../errors/users-not-found-error.js";
import type { IUsersRepository } from "../repositories/users-repository.js";

export class GetAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute() {
    const users = await this.usersRepository.getAll();

    if (!users || users.length === 0) {
      throw new UserSNotFoundError();
    }

    return {
      users,
    };
  }
}
