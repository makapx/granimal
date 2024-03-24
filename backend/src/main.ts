import configure from "./configure";
import animeRoute from "./routes/anime.route";
import animeGenresRoute from "./routes/anime-genres.route";



configure( async app => {
  app.register(animeRoute, { prefix: '/api/anime' });
  app.register(animeGenresRoute, { prefix: '/api/anime-genres' })

});
