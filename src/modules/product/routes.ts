import type { FastifyInstance } from "fastify";
import { createProduct } from "./controllers/create-product.controller.ts";

export function productRouts(app: FastifyInstance) {
  app.post("/create", createProduct);
}
