import  { FastifyInstance, FastifyRequest } from "fastify";
import { getAnime, getRecommendations, searchAnime } from "../providers/anime";
import { WithPagination } from "../types/result";
import { AnimeSearchParams } from "../types/anime";
// fastify requires routes to be functions which accept a set of parameters
// the first being the instance, the last a close chain function 
export default function (app: FastifyInstance, opts: unknown, done: Function) {


    // search anime with AnimeSearchParams
    app.get('', async (req: FastifyRequest<{ Querystring: AnimeSearchParams }>) => {
        return searchAnime(req.query);
    });

    // get anime by Id
    app.get('/:id', (req: FastifyRequest<{ Params: { id: number } }>) => {
        return getAnime(req.params.id);
    });

    // get anime recommendations
    app.get('/:id/recommendations', (req: FastifyRequest<{ Params: { id: number }, Querystring: WithPagination<{}> }>) => {
        return getRecommendations({id: req.params.id, ...req.query});
    });

    done();
}