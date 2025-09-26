import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeCreateProductUseCase } from "../factories/make-create-product-use-case.ts";
import { createSlug } from "../../../utils/index.ts";
import { CreatedProductError } from "../errors/create-product-error.ts";

const bodyProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.string(),
  image_url: z.string(),
  slug: z.string().optional(),
  category_id: z.uuid(),
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
    slug,
    category_id,
    available,
    is_combo,
    customizations,
  } = bodyProductSchema.parse(request.body);

  const createSlugProduct = createSlug(name);

  try {
    const useCase = makeCreateProductUseCase();

    const product = await useCase.execute({
      name,
      description,
      price,
      image_url,
      slug: createSlugProduct,
      available,
      category_id,
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
