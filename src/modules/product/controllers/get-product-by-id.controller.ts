import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetByIdProductUseCase } from "../factories/make-get-product-by-id-use-case.ts";

export async function getProductById(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = request.params as { id: string };

  if (!id) {
    return reply.status(400).send({});
  }

  try {
    const useCase = makeGetByIdProductUseCase();

    const product = await useCase.execute({
      id,
    });

    if (!product) {
      return reply
        .status(401)
        .send({ message: "Nenhum produto encontrado com o ID especificado" });
    }

    return {
      message: "Produto encontrado com sucesso",
      product,
    };
  } catch (err) {
    return reply.status(500).send();
  }
}
