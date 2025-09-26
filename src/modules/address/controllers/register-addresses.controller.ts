import type { FastifyReply, FastifyRequest } from "fastify";
import { makeRegisterAddressUseCase } from "../factories/make-register-use-case.js";
import { registerAddressesBodySchema } from "../schemas/index.js";
import { ErrorCreatedAddressesUserError } from "../errors/error-created-addresses-user-error.js";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify();
  const loggedUserId = request.user?.sub;

  const {
    street,
    number,
    neighborhood,
    city,
    country,
    zipCode,
    latitude,
    longitude,
  } = registerAddressesBodySchema.parse(request.body);

  try {
    const useCase = makeRegisterAddressUseCase();

    await useCase.execute({
      street,
      number,
      neighborhood,
      city,
      country,
      zipCode,
      latitude: latitude || null,
      longitude: longitude || null,
      user_id: loggedUserId,
    });

    return reply
      .status(201)
      .send({ message: "Endereço cadastrado com sucesso." });
  } catch (err) {
    if (err instanceof ErrorCreatedAddressesUserError) {
      return reply.status(400).send({ message: err.message });
    }

    return reply.status(500).send({ message: "Internal server error" });
  }
}
