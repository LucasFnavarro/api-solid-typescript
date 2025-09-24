import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { UserInvalidCredentialsError } from "../errors/user-invalid-credentials.js";
import { makeAuthenticateUseCase } from "../factories/make-authenticate-use-case.js";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const useCase = makeAuthenticateUseCase();

    const { user } = await useCase.execute({
      email,
      password,
    });

    const token = await reply.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
        },
      }
    );

    const refreshToken = await reply.jwtSign(
      { role: user.role },
      {
        sign: {
          sub: user.id,
          expiresIn: "7d",
        },
      }
    );

    return reply
      .setCookie("refreshToken", refreshToken, {
        path: "/",
        secure: true, // HTTPs
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({
        token,
      });
  } catch (err) {
    if (err instanceof UserInvalidCredentialsError) {
      return reply.status(400).send({ message: err.message });
    }

    return reply.status(500).send();
  }
}
