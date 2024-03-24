import dotenv from "dotenv";
import { env } from "process";

import fastify, { FastifyInstance } from "fastify";

import { WebError } from "./misc/error";
dotenv.config();

export default async function configure(cb: (app: FastifyInstance) => Promise<void>) {
  const port = Number(env['PORT'] ?? 8080);
  const app = fastify({
    logger: stringToBoolean(env['LOGGER'] ?? true),
  });

  app.setErrorHandler(function (error, request, reply) {
    if (error instanceof WebError) {
      reply.code(error.code ?? 500).send(error.data);
    }
    else {
      reply.send(error);
    }
  })

  await cb(app);
  
  await app.listen({
    port: port
  });
}

function stringToBoolean(input: string|boolean) {
  return typeof input === 'string' && (['true','on','yes','1'].includes(input.toLowerCase())) || input === true;
}