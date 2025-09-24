import type { FastifyReply, FastifyRequest } from "fastify";
import { makeRegisterAddressUseCase } from "../factories/make-register-use-case.js";
import { registerAddressesBodySchema } from "../schemas/index.js";

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
}
