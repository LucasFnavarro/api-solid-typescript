import type { FastifyReply, FastifyRequest } from "fastify";
import { UserNotFoundError } from "../errors/user-not-found-error.js";
import { makeUpdateUserUseCase } from "../factories/make-update-use-case.js";
import { UserAlreadyExistsError } from "../errors/user-already-exists-error.js";
import { updateUserSchema } from "../schemas/index.js";
import { ZodError } from "zod";

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };

  const updateBody = updateUserSchema.parse(request.body);

  // converte o updateBody em um array de pares [chave, valor]
  // EXEMPLO: [["name", "Lucas"], ["email", undefined], ["age", 26]]...
  const data: any = Object.fromEntries(
    Object.entries(updateBody).filter(([_, v]) => v !== undefined)
  );

  try {
    const useCase = makeUpdateUserUseCase();

    const updateUser = await useCase.execute({
      id,
      ...data,
    });

    return reply
      .status(200)
      .send({ message: "User update successfully.", updateUser });
  } catch (err) {
    if (
      err instanceof UserNotFoundError ||
      err instanceof UserAlreadyExistsError ||
      err instanceof ZodError
    ) {
      return reply.status(400).send({ message: err.message });
    }

    return reply.status(500).send();
  }
}
