import fastify, { FastifyInstance, FastifyRequest } from "fastify";

import { UserType } from "../types/user";
import { WebError } from "../misc/error";
import { ChangePasswordParams, ChangePictureParams, CreateUserParams, LoginParams, authenticate, changeUserPassword, changeUserPicture, createUser, loginUser } from "../providers/user.providers";



export default function (app: FastifyInstance, opts: unknown, done: Function) {

    
    app.post('/signup', async (req: FastifyRequest<{ Body: CreateUserParams }>, reply) => {
        const user = await createUser(req.body);
        const token = await reply.jwtSign(user);
        return { token };
    });

    app.post('/login', async (req: FastifyRequest<{ Body: LoginParams }>, reply) => {
        const user = await loginUser(req.body);
        const token = await reply.jwtSign(user);
        return { token };
    });

    app.patch('/password', { onRequest: authenticate }, (req: FastifyRequest<{ Body: ChangePasswordParams}>) => {
        return changeUserPassword(req.user as UserType, req.body.password)
    });

    app.patch('/picture', { onRequest: authenticate }, (req: FastifyRequest<{ Body: ChangePictureParams}>) => {
        return changeUserPicture(req.user as UserType, req.body.picture)
    });

    app.get('',{ onRequest: authenticate }, req => req.user );
    done();
}   