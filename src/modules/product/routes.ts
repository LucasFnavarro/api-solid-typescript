import type { FastifyInstance } from "fastify";
import { createProduct } from "./controllers/create-product.controller.ts";
import { verifyJWT } from "../../middlewares/verify-jwt.ts";
import { getAllProduct } from "./controllers/get-all-product.controller.ts";
import { getProductById } from "./controllers/get-product-by-id.controller.ts";
import { getProductBySlug } from "./controllers/get-product-by-slug.controller.ts";

export function productRouts(app: FastifyInstance) {
  app.post("/create", { onRequest: [verifyJWT] }, createProduct);

  app.get("/:id", getProductById);
  app.get("/slug/:slug", getProductBySlug);
  app.get("/all", getAllProduct);
}
