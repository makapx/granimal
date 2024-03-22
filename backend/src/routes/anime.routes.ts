import fastify, { FastifyInstance, FastifyRequest } from "fastify";

import { WithPagination } from "../misc/utils";
import { AnimeFragment, AnimeFragmentParams } from "../types/anime";
import { getAnime, searchAnime } from "../providers/anime";
// fastify requires routes to be functions which accept a set of parameters
// the first being the instance, the last a close chain function 
export default function (app: FastifyInstance, opts: unknown, done: Function) {



    // search anime with AnimeSearchParams
    app.get('', async (req: FastifyRequest<{ Querystring: AnimeFragmentParams }>) => {
        return searchAnime(req.query);
    });

    app.get('/:id', (req: FastifyRequest<{ Params: { id: number } }>) => {
        return getAnime(req.params.id);
    });

    done();
}