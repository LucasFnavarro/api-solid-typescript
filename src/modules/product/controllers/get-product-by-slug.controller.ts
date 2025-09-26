import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetBySlugProductUseCase } from "../factories/make-get-product-by-slug-use-case.ts";

export async function getProductBySlug(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { slug } = request.params as { slug: string };

  if (!slug) {
    return reply
      .status(400)
      .send({
        message: "Nenhum produto foi encontrado com o slug especificado",
      });
  }

  try {
    const useCase = makeGetBySlugProductUseCase();

    const product = await useCase.execute({
      slug,
    });

    if (!slug) {
      return reply
        .status(401)
        .send({ message: "Nenhum produto encontrado com o SLUG especificado" });
    }

    return {
      message: "Produto encontrado com sucesso",
      product,
    };
  } catch (err) {
    return reply.status(500).send();
  }
}
