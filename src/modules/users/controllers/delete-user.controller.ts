import type { FastifyReply, FastifyRequest } from "fastify";
import { UserNotFoundError } from "../errors/user-not-found-error.js";
import { makeDeleteUserUseCase } from "../factories/make-delete-use-case.js";
import { NotAllowedError } from "../errors/not-allowed-users-error.js";

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const actorId = request.user.sub;

  try {
    const useCase = makeDeleteUserUseCase();

    await useCase.execute({
      id,
      actorId,
    });

    return reply.status(200).send({ message: "Usuário excluído com sucesso." });
  } catch (err) {
    if (err instanceof UserNotFoundError || err instanceof NotAllowedError) {
      return reply.status(400).send({ message: err.message });
    }

    return reply.status(500).send({ messsage: "Internal server error" });
  }
}
