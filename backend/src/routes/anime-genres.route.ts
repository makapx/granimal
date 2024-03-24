import { FastifyInstance } from "fastify";
import {  getGenres } from "../providers/anime";
// fastify requires routes to be functions which accept a set of parameters
// the first being the instance, the last a close chain function 
export default function (app: FastifyInstance, opts: unknown, done: Function) {



  // search anime with AnimeSearchParams
  app.get('', () => {
    return getGenres();
  });
  done();
}