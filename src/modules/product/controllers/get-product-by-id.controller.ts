import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetByIdProductUseCase } from "../factories/make-get-product-by-id-use-case.ts";
import { success, z } from "zod";
import { GetProductByIdError } from "../errors/get-product-by-id-error.ts";

const getProductByIdParamsSchema = z.object({
  id: z.string().uuid("ID deve ser um UUID válido!"),
});

export async function getProductById(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = getProductByIdParamsSchema.parse(request.params);

  if (!id || typeof id !== "string" || id.trim() === "") {
    return reply.status(404).send({
      success: false,
      message: "Não encontramos nenhum produto com o ID indicado",
    });
  }

  try {
    const useCase = makeGetByIdProductUseCase();

    const product = await useCase.execute({
      id,
    });

    if (!product) {
      return reply.status(404).send({
        success: false,
        message: "Nenhum produto encontrado com o UUID indicado",
      });
    }

    return {
      success: true,
      message: "Produto encontrado com sucesso",
      product,
    };
  } catch (err) {
    if (err instanceof z.ZodError || err instanceof GetProductByIdError) {
      return reply.status(400).send({
        success: false,
        message: err.message,
      });
    }

    return reply.status(500).send();
  }
}
