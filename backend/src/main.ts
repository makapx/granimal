import configure from "./configure";
import animeRoute from "./routes/anime.route";
import animeGenresRoute from "./routes/anime-genres.route";
import userRoute from "./routes/user.route";



configure( async app => {

  // mounts animeRoute in /api/anime
  app.register(animeRoute, { prefix: '/api/anime' });

  // mounts animeGenresRoute in /api/anime-genres
  app.register(animeGenresRoute, { prefix: '/api/anime-genres' });

  app.register(userRoute, { prefix: '/api/auth' });
  
});
