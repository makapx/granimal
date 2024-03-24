import { FastifyInstance } from "fastify";
import {  getGenres } from "../providers/anime";

export default function (app: FastifyInstance, opts: unknown, done: Function) {

  app.get('', () => {
    return getGenres();
  });
  done();
}