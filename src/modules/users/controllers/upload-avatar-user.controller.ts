import type { FastifyReply, FastifyRequest } from "fastify";
import { makeUploadProfileUseCase } from "../factories/make-upload-avatar-profile-use-case.js";

export async function uploadAvatar(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = request.params as { id: string };
  const file = await request.file();

  if (!file) {
    return reply.status(400).send({ message: "Nenhum arquivo foi enviado." });
  }

  const buffer = await file.toBuffer();

  const useCase = makeUploadProfileUseCase();

  await useCase.execute({
    id,
    fileBuffer: buffer,
    fileName: file.filename,
  });

  return reply
    .status(200)
    .send({ message: "Foto de perfil atualizada com sucesso." });
}
