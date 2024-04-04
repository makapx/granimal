import { FastifyInstance, FastifyRequest } from "fastify";
import { TrackingListDeleteAnimeParams, TrackingListSearchParams, deleteAnimeOfUser, getTrackingListOfUser, trackAnimeById } from "../models/lists.model";
import { authenticationPreHandler } from "../models/users.model";

/**
 * /api/list
 * GET /api/list/:userId // la nostra lista 
 */
export default function ( app: FastifyInstance, opts: unknown, done: Function ) {

    app.get('/:userId', (req: FastifyRequest<{ Params: { userId: number } }>) => {
        return getTrackingListOfUser(req.params.userId);
    });

    app.put('/:userId/:animeId', { preHandler: authenticationPreHandler as any}, (req: FastifyRequest<{Body: TrackingListSearchParams }>) => {
        return trackAnimeById(req.body); // POST body {username: string, animeId: number}
    });

    app.delete('/:userId/:animeId', { preHandler: authenticationPreHandler as any}, (req: FastifyRequest<{Body: TrackingListDeleteAnimeParams }>) => {
        return deleteAnimeOfUser(req.body); // DELETE body {username: string, animeId: number}
    });

    done();
}