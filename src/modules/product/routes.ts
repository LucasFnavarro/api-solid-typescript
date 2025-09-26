import type { FastifyInstance } from "fastify";
import { createProduct } from "./controllers/create-product.controller.ts";
import { verifyJWT } from "../../middlewares/verify-jwt.ts";
import { getAllProduct } from "./controllers/get-all-product.controller.ts";

export function productRouts(app: FastifyInstance) {
  app.post("/create", { onRequest: [verifyJWT] }, createProduct);
  app.get("/all", getAllProduct);
}