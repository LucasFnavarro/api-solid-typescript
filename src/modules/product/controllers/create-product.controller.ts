import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeCreateProductUseCase } from "../factories/make-create-product-use-case.ts";
import { CreatedProductError } from "../errors/created-product-error.ts";

const bodyProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.string(),
  image_url: z.string(),
  category: z.uuid(),
  available: z.boolean(),
  is_combo: z.boolean(),
  customizations: z.string().optional(),
});

export async function createProduct(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const {
    name,
    description,
    price,
    image_url,
    category,
    available,
    is_combo,
    customizations,
  } = bodyProductSchema.parse(request.body);

  try {
    const useCase = makeCreateProductUseCase();

    const product = await useCase.execute({
      name,
      description,
      price,
      image_url,
      category,
      available,
      is_combo,
      customizations,
    });

    return reply.status(201).send({
      message: "Produto criado com sucesso",
      product,
    });
  } catch (err) {
    if (err instanceof CreatedProductError) {
      return reply.status(400).send({ message: err.message });
    }

    return reply.status(500).send();
  }
}
