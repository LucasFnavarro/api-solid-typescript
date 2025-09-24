import "fastify";
import type { File } from "fastify-multer";

declare module "fastify" {
  interface FastifyRequest {
    file?: File;
    files?: File[];
  }
}
