import type { FastifyInstance } from "fastify";
import { register } from "./controllers/register-user.controller.js";
import { authenticate } from "./controllers/authenticate-user.controller.js";
import { getProfile } from "./controllers/get-profile-user.controller.js";
import { verifyJWT } from "../../middlewares/verify-jwt.js";
import { update } from "./controllers/update-user.controller.js";
import { deleteUser } from "./controllers/delete-user.controller.js";
import { uploadAvatar } from "./controllers/upload-avatar-user.controller.js";

export function usersRoutes(app: FastifyInstance) {
  // criar usuário
  app.post("/register", register);

  // fazer login
  app.post("/auth", authenticate);

  // atualizar avatar profile
  app.post("/:id/avatar-profile", { onRequest: [verifyJWT] }, uploadAvatar);

  // obter perfil auth
  app.get("/me", { onRequest: [verifyJWT] }, getProfile);

  // atualizar user
  app.put("/:id", { onRequest: [verifyJWT] }, update);

  // excluír user
  app.delete("/:id", { onRequest: [verifyJWT] }, deleteUser);
}
