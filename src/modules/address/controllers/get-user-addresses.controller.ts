import type { FastifyReply, FastifyRequest } from "fastify";
import { makeGetAllAddressesUserUseCase } from "../factories/make-get-user-addresses-use-case.js";
import { NotFoundAddressesUserError } from "../errors/not-found-addresses-user-error.js";

export async function getUserAddresses(
  request: FastifyRequest,
  reply: FastifyReply
) {
  await request.jwtVerify();
  const loggedUserId = request.user?.sub;

  if (!loggedUserId) {
    return reply.status(401).send({ message: "Unauthorized" });
  }

  try {
    const useCase = makeGetAllAddressesUserUseCase();

    const addresses = await useCase.execute({
      user_id: loggedUserId,
    });

    return reply.status(200).send({
      message: "Addresses retrieved successfully",
      addresses,
    });
  } catch (err) {
    if (err instanceof NotFoundAddressesUserError) {
      return reply.status(404).send({ message: err.message });
    }

    return reply.status(400).send({
      message: err instanceof Error ? err.message : "Unexpected error.",
    });
  }
}
