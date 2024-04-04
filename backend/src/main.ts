import configure from "./configure";
import animeRoute from "./routes/anime.route";
import animeGenresRoute from "./routes/anime-genres.route";
import userRoute from "./routes/user.route";
import listRoute from "./routes/list.route";

configure( async app => {

  // mounts animeRoute in /api/anime
  app.register(animeRoute, { prefix: '/api/anime' });

  // mounts animeGenresRoute in /api/anime-genres
  app.register(animeGenresRoute, { prefix: '/api/anime-genres' });

  // mounts user and auth with same router module
  app.register(userRoute, { prefix: '/api/auth' });
  app.register(userRoute, { prefix: '/api/user' });

  app.register(listRoute, { prefix: "/api/list"});

  
});
