import type { FastifyReply, FastifyRequest } from "fastify";
import { UserAlreadyExistsError } from "../errors/user-already-exists-error.js";
import { makeRegisterUseCase } from "../factories/make-register-use-case.js";
import { createUserSchema } from "../schemas/index.js";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const { name, email, password, phone } = createUserSchema.parse(request.body);

  try {
    const useCase = makeRegisterUseCase();

    await useCase.execute({
      name,
      email,
      password,
      phone,
    });

    


    return reply.status(201).send({
      message: "User created successfully",
    });
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(401).send({ message: err.message });
    }

    return reply.status(500).send();
  }
}
