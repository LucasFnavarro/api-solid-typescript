import type { FastifyInstance } from "fastify";
import { register } from "./controllers/register.js";
import { authenticate } from "./controllers/authenticate.js";
import { getProfile } from "./controllers/get-profile.js";
import { verifyJWT } from "../../middlewares/verify-jwt.js";
import { update } from "./controllers/update.js";
import { deleteUser } from "./controllers/delete-user.js";
import { uploadAvatar } from "./controllers/upload-avatar.js";

export function usersRoutes(app: FastifyInstance) {
  // criar usuário
  app.post("/register", register);

  // fazer login
  app.post("/auth", authenticate);
  app.post("/:id/avatar-profile", { onRequest: [verifyJWT] }, uploadAvatar);

  // obter perfil auth
  app.get("/me", { onRequest: [verifyJWT] }, getProfile);

  // atualizar user
  app.put("/:id", { onRequest: [verifyJWT] }, update);

  // excluír user
  app.delete("/:id", { onRequest: [verifyJWT] }, deleteUser);
}
