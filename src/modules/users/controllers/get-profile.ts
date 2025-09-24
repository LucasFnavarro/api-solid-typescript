import type { FastifyReply, FastifyRequest } from "fastify";
import { makeGetProfileUserUseCase } from "../factories/make-get-profile-use-case.js";
import { UserNotFoundError } from "../errors/user-not-found-error.js";

export async function getProfile(request: FastifyRequest, reply: FastifyReply) {
  const useCase = makeGetProfileUserUseCase();

  const { user } = await useCase.execute({
    id: request.user.sub,
  });

  if (!user) {
    throw new UserNotFoundError();
  }

  return reply.status(200).send({
    user: {
      ...user,
      password: undefined,
    },
  });
}
