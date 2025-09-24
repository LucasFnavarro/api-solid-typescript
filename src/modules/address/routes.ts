import type { FastifyInstance } from "fastify";
import { register } from "./controllers/register-addresses.controller.js";
import { verifyJWT } from "../../middlewares/verify-jwt.js";
import { getUserAddresses } from "./controllers/get-user-addresses.controller.js";

export async function addressRoutes(app: FastifyInstance) {
  app.get("/all", { onRequest: [verifyJWT] }, getUserAddresses);

  app.post("/create", { onRequest: [verifyJWT] }, register);
}
