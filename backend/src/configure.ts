
import { env } from "process";
import dotenv from "dotenv";
import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifyAuth from "@fastify/jwt";

import { WebError } from "./misc/error";
import database from "./misc/database";
import { keyPair } from "./misc/crypto-keys";
import { error } from "console";


dotenv.config();

export default async function configure(awaitableCallback: (app: FastifyInstance) => Promise<void>) {
  const port = Number(env['PORT'] ?? 8080);
  
  const app = createApp();

  registerHerrorHandler(app);
  registerExitHandlers(app);
  
  await registerAuthenticationFacilities(app);

  await awaitableCallback(app);


  await app.listen({
    port: port
  });
  
}

async function registerAuthenticationFacilities(app: FastifyInstance) {
  app.register(fastifyJwt, {
    secret: await keyPair()
  });
}

function registerExitHandlers(app: FastifyInstance) {
  for (const signal of ['SIGINT', 'SIGTERM']) {
    process.once(signal,
      () => Promise.all([app.close(), database.close()])
        .then(() => process.exit(0))
    );
  }
}

function createApp() {
  return fastify({
    logger: stringToBoolean(env['LOGGER'] ?? true),
  });
}

function registerHerrorHandler(app: FastifyInstance) {
  app.setErrorHandler(function (error, request, reply) {
    if (error instanceof WebError) {
      reply.code(error.code ?? 500).send(error.data ?? error.scope);
    }
    else {
      reply.send(error);
    }
  });
}

function stringToBoolean(input: string|boolean) {
  return typeof input === 'string' && (['true','on','yes','1'].includes(input.toLowerCase())) || input === true;
}