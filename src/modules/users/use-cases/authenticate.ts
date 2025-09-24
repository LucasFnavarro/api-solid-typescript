import { compare } from "bcryptjs";
import { UserInvalidCredentialsError } from "../errors/user-invalid-credentials.js";
import type { IUsersRepository } from "../repositories/users-repository.js";

interface AuthenticateUserUseCaseRequest {
  email: string;
  password: string;
}

export class AuthenticateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ email, password }: AuthenticateUserUseCaseRequest) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new UserInvalidCredentialsError();
    }

    const doesPasswordMatch = await compare(password, user.password);

    if (!doesPasswordMatch) {
      throw new UserInvalidCredentialsError();
    }

    return {
      user,
    };
  }
}
