import { NotAllowedError } from "../errors/not-allowed-users-error.js";
import { UserNotFoundError } from "../errors/user-not-found-error.js";
import type { IUsersRepository } from "../repositories/users-repository.js";

interface DeleteUserUseCaseRequest {
  id: string;
  actorId: string;
}

export class DeleteUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ id, actorId }: DeleteUserUseCaseRequest) {
    const actor = await this.usersRepository.findById(actorId);

    if (!actor) throw new UserNotFoundError();

    const user = await this.usersRepository.findById(id);

    if (!user) throw new UserNotFoundError();

    if (actorId !== id && actor.role !== "ADMIN") {
      throw new NotAllowedError();
    }

    await this.usersRepository.delete(id);
  }
}
