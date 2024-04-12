import { FastifyInstance, FastifyRequest } from "fastify";
import { WebError } from "../misc/error";
import { removeFromList, getList, putIntoList } from "../providers/lists.providers";
import { authenticate } from "../providers/user.providers";
import { TrackingList } from "../types/trackinglist";
import { UserType } from "../types/user";

export default function ( app: FastifyInstance, opts: unknown, done: Function ) {

    app.get('/:userId', (req: FastifyRequest<{ Params: { userId: number|'me' } }>) => {
        const userId: number = req.params.userId === 'me' 
            ? (req.user as UserType)?.id as number ?? req.params.userId
            :  req.params.userId; 
        return getList(userId);
    });

    app.put('/:userId/:animeId', { preHandler: authenticate }, (req: FastifyRequest<{Body: Partial<TrackingList>, Params: { userId: number, animeId: number } }>) => {
        const user = req.user as UserType;
        return putIntoList(user.id as number, req.params.animeId, req.body);
    });

    app.delete('/:userId/:animeId', { preHandler: authenticate }, async (req: FastifyRequest<{ Params: { userId: number, animeId: number } }>, reply) => {
        const user = req.user as UserType;
        const deleted = await removeFromList(user.id as number, req.params.animeId);
        if ( deleted === 0)
            reply.status(304);
    });

    app.patch('/:userId/:animeId', { preHandler: authenticate }, (req: FastifyRequest<{Body: Partial<TrackingList>, Params: { userId: number, animeId: number } }>, reply) => {
        const user = req.user as UserType;
        return putIntoList(user.id as number, req.params.animeId, req.body)
            .catch(() => {throw new WebError(400, 'user', 'User not found')});
    });

    done();
}