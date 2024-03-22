import "./dotenv_";
import fastify from "fastify";
import anime from "./routes/anime.routes";
import { env } from "process";
import { WebError } from "./misc/error";
const app = fastify({
    logger: env['LOGGER'] === '1' || env['LOGGER']?.toLowerCase() === 'true'
});

app.setErrorHandler(function(error, request, reply) {
    if ( error instanceof WebError ) {
        console.log(error)
        reply.code(error.code ?? 500).send(error.data);
    }
    else {
        reply.send(error);
    }
})


app.register(anime, { prefix: '/api/anime'});

app.listen({
    port: Number(env['PORT']) || 8080
})
    .then( _ => console.log(`Listening on port ${env['PORT'] || 8080}`) )
    .catch(console.error)