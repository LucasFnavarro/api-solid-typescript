import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetBySlugProductUseCase } from "../factories/make-get-product-by-slug-use-case.ts";
import z from "zod";
import { ProductBySlugError } from "../errors/get-product-by-slug-error.ts";
import { STATUS_CODES } from "http";

const getProductBySlugSchema = z.object({
  slug: z.string("O slug deve ser do tipo string."),
});

export async function getProductBySlug(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { slug } = getProductBySlugSchema.parse(request.params);

  if (!slug || typeof slug !== "string" || slug.trim() === "") {
    return reply.status(400).send({
      success: false,
      message: "Nenhum produto foi encontrado com o slug especificado",
    });
  }

  try {
    const useCase = makeGetBySlugProductUseCase();

    const product = await useCase.execute({
      slug,
    });

    if (!slug) {
      return reply.status(401).send({
        success: false,
        message: "Nenhum produto encontrado com o SLUG especificado xxx",
      });
    }

    return {
      success: true,
      message: "Produto encontrado com sucesso",
      product,
    };
  } catch (err) {
    if (err instanceof ProductBySlugError) {
      return reply.status(401).send({ message: err.message });
    }

    return reply.status(500).send();
  }
}
