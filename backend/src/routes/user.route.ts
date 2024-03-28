import { FastifyInstance, FastifyRequest } from "fastify";
import { ChangePasswordParams, CreateUserParams, LoginParams, Users, authenticationPreHandler, changePassword, createUser, getLoggedUserFromRequest, hashPassword, loginUser } from "../models/users.model";
import { signToken, verifyToken } from "../misc/crypto-keys";
import { User } from "../types/user";
import { WebError } from "../misc/error";



export default function ( app: FastifyInstance, opts: unknown, done: Function ) {

    app.post('/signup', async (req: FastifyRequest<{Body: CreateUserParams}>) => {
        return createUser(req.body);
    });
    app.post('/login', async (req: FastifyRequest<{Body: LoginParams}>) => {
        return loginUser(req.body);
    });

    app.patch('/password',{ preHandler: authenticationPreHandler as any }, (req: FastifyRequest<{Body: ChangePasswordParams}>) => {
        return changePassword(getLoggedUserFromRequest(req), req.body.password);
    });

    app.get('', { preHandler: authenticationPreHandler }, req => {
        return getLoggedUserFromRequest(req);
    })
    done();
}   