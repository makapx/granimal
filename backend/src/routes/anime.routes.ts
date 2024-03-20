import fastify, { FastifyInstance, FastifyRequest } from "fastify";

import { WithPagination } from "../misc/utils";
import { AnimeFragment } from "../types/anime";
import { getAnimeById, searchAnime } from "../providers/anime.provider";

export type RankingType =
    'all'
    |'airing'
    |'upcoming'
    |'tv'
    |'ova'
    |'movie'
    |'special'
    |'bypopularity'
    |'favorite';


export type AnilistSearch = {
    data: Array<{node: AnimeFragment}>,
    paging?: { next?: string }
}
export type AnimeSearchParams = { search?: string } | { season?: 'winter'|'spring'|'summer'|'fall', year?: string } | { ranking: RankingType };

// fastify requires routes to be functions which accept a set of parameters
// the first being the instance, the last a close chain function 
export default function (app: FastifyInstance, opts: unknown, done: Function) {



    // search anime with AnimeSearchParams
    app.get('', async (req: FastifyRequest<{ Querystring: WithPagination<AnimeSearchParams> }>) => {
        return searchAnime(req.query);
    });

    app.get('/:id', (req: FastifyRequest<{ Params: { id: number } }>) => {
        return getAnimeById(req.params.id);
    });

    done();
}