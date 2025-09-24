import { hash } from "bcryptjs";
import { UserNotFoundError } from "../errors/user-not-found-error.js";
import type { IUsersRepository } from "../repositories/users-repository.js";
import { UserAlreadyExistsError } from "../errors/user-already-exists-error.js";

interface UpdateUserUseCaseRequest {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  // image_url?: string;
}

export class UpdateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    id,
    name,
    email,
    password,
    phone,
    // image_url,
  }: UpdateUserUseCaseRequest) {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new UserNotFoundError();
    }
    
    if (email && email !== user.email) {
      const existing = await this.usersRepository.findByEmail(email);
      if (existing) throw new UserAlreadyExistsError();
    }

    // implementar envio de e-mail para confirmar alteração de email futuramente...

    const updateData: any = {};

    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (password !== undefined) updateData.password = await hash(password, 10);
    if (phone !== undefined) updateData.phone = phone;
    // if (image_url !== undefined) updateData.image_url = image_url;

    const userUpdate = await this.usersRepository.update(id, updateData);

    return userUpdate;
  }
}
