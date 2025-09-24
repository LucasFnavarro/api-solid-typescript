import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import cors from "@fastify/cors";

import { ZodError } from "zod";
import { env } from "./env/index.js";
import { usersRoutes } from "./modules/users/routes.js";
import multipart from "@fastify/multipart";
import { addressRoutes } from "./modules/address/routes.js";

export const app = fastify();

app.register(cors, {
  origin: "*",
  methods: ["GET", "PUT", "POST", "DELETE", "PATCH", "HEAD", "OPTIONS"],
});

// JWT
app.register(fastifyJwt, {
  secret: env.JWT_SECRET as string,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: "10m",
  },
});

app.register(fastifyCookie);

app.register(multipart, {
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});

// ROUTES
app.register(usersRoutes, { prefix: "/user" });
app.register(addressRoutes, { prefix: "/address" });

// ERROR HANDLER
app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error:", issues: error.format() });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  }

  return reply.status(500).send({ message: "Internal server error" });
});
