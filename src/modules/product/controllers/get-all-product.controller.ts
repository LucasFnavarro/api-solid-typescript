import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetAllProductUseCase } from "../factories/make-get-all-product-use-case.ts";
import { ProductNotFoundError } from "../errors/product-not-found-error.ts";

export async function getAllProduct(_: FastifyRequest, reply: FastifyReply) {
  try {
    const useCase = makeGetAllProductUseCase();

    const products = await useCase.execute();

    return reply.status(200).send({
      message: "Produtos listado com sucesso",
      products,
    });
  } catch (err) {
    if (err instanceof ProductNotFoundError) {
      return reply.status(400).send({ message: err.message });
    }

    return reply
      .status(500)
      .send({ message: "Erro interno ao listar os produtos" });
  }
}
