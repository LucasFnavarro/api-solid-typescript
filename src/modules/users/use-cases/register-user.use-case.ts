import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "../errors/user-already-exists-error.js";
import type { IUsersRepository } from "../repositories/users-repository.js";
import type { User } from "../../../../generated/prisma/index.js";

interface RegisterUserUseCaseRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
}

interface RegisterUserUseCaseResponse {
  user: User;
}

export class RegisterUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    name,
    email,
    password,
    phone,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const doesUserExists = await this.usersRepository.findByEmail(email);

    if (doesUserExists) {
      throw new UserAlreadyExistsError();
    }

    const passwordHash = await hash(password, 10);

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      phone,
    });

    return {
      user,
    };
  }
}
