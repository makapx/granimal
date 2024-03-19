import { FastifyErrorCodes, FastifyReply, FastifyRequest } from "fastify";

export class WebError extends Error {
    constructor( public code: FastifyErrorCodes , error?: any ) {
        super(error)
    }
    static create(code: FastifyErrorCodes, error?: any): WebError {
        return new WebError(code, error);
    }
}

export function fastifyErrorHandler( error: Error, request: FastifyRequest, reply: FastifyReply) {
    if ( error instanceof F)
}