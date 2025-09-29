import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "../errors/user-already-exists-error.js";
import type { IUsersRepository } from "../repositories/users-repository.js";
import type { User } from "../../../../generated/prisma/index.js";
import Mail from "../../../lib/Mail.ts";

interface RegisterUserUseCaseRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
  isActive: false;
}

interface RegisterUserUseCaseResponse {
  user: User;
}

export class RegisterUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private mailService: typeof Mail
  ) {}

  async execute({
    name,
    email,
    password,
    phone,
    isActive,
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
      isActive,
    });

    const activationToken = crypto.randomUUID();
    


    await this.mailService.sendMail({
      from: "API DELIVERY <delivery@codegenius.com",
      to: `${name} <${email}>`,
      subject: "Cadastro de usuário",
      html: `Olá, ${name}, bem-vindo(a) ao sistema de develiry da CodeGenius`,
    });

    return {
      user,
    };
  }
}
