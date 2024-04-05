import { FastifyInstance, FastifyRequest } from "fastify";
import { deleteAnimeOfUser, getTrackingListOfUser, trackAnime } from "../models/lists.model";
import { authenticate } from "../providers/user.providers";
import { TrackingList } from "../types/trackinglist";
import { WebError } from "../misc/error";

export default function ( app: FastifyInstance, opts: unknown, done: Function ) {

    app.get('/:userId', (req: FastifyRequest<{ Params: { userId: number } }>) => {
        return getTrackingListOfUser(req.params.userId);
    });

    app.put('/:userId/:animeId', { preHandler: authenticate }, (req: FastifyRequest<{Body: Partial<TrackingList>, Params: { userId: number, animeId: number } }>) => {
        return trackAnime(req.params.userId, req.params.animeId, req.body);
    });

    app.delete('/:userId/:animeId', { preHandler: authenticate }, async (req: FastifyRequest<{ Params: { userId: number, animeId: number } }>, reply) => {
        const deleted = await deleteAnimeOfUser(req.params.userId, req.params.animeId);
        if ( deleted === 0)
            reply.status(304);
    });

    app.patch('/:userId/:animeId', { preHandler: authenticate }, (req: FastifyRequest<{Body: Partial<TrackingList>, Params: { userId: number, animeId: number } }>, reply) => {
        return trackAnime(req.params.userId, req.params.animeId, req.body)
            .catch(() => {throw new WebError(400, 'user', 'User not found')});
    });

    done();
}