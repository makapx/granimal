# Granimal's Backend
## Introduction
In modern web development, a backend is a software which provides data and services to the frontend, this one is no different nonetheless. 

One must not think of the backend as the most troublesome part in designing a client/server software, as the most important goal of such project is to please the end users, which is the frontend's one to bear.

Granimal's goal is to provide an easy to use, 100% privacy respectful, series tracking software for japanese content, and we provide the data through, of course, our own backend.

This short design document will dive through which technologies our software uses, how we use them, which strategies and choices have been made to provide our services.

#### Installation and launch
Before going through nerdy and technical pragraphs, in order to run our backend, install its dependencies, then run one of its start scripts:
```bash
# enter backend's folder
cd backend
# install dependencies
npm i
# start the server, use start:dev to have live-reload feature for development
npm run start
```
#### Technologies used
Our backend uses a combination of modern NodeJS libraries and tooling to achieve fast iteration times and good quality.  

- **Fastify** is our web framework of choice, a modern alternative to ExpressJS with more features and overall nicer APIs and ecosystem.
- **Sequelize** is our ORM of choice, it handles our limited database business with ease of use, has a nice set of features and is compatible with most SQL DBMS, we chosed Sqlite3 for our project.
- **Json Web Tokens** for authentication, by using a signed payload which identifies our logged users, although our use is minimal, it's a great technology compared to session strategies or stored ids.
- **Nodemon** to reload on file changes, which along **ts-node** that allows to run TypeScript sources directly, provides unmatched iteration times to our develpment.

#### External data providers
Our backend gets series data through **Anilist**, a well known online tracking application and database of japanese content.
Anilist provides a nice, free to use, very powerful, **GraphQL** endpoint to query data, which has been very useful to us so far.  

#### Architecture of our backend
Our backend has been organized in a folder structure, each folder contains various logic for various parts of our backend:

- `misc` folder contains miscellaneous utilities and stuff hard to organize elsewhere:
    - `error.ts` contains our `WebError` class, which is used to propagate errors back to `fastify` and thus the client.
    - `crypto-keys.ts` contains our logic and business to generate, load, store and provide the pair of private and public keys required to sign and verify *JWT* tokens.
    - `database.ts` exports our single instance of sequelize.
- `models` folder contains our *sequelize* models:
    - `users.model.ts` contains our *User* model, which automatically hashes passwords and provides two useful methods: *withoutPassword* to return a copy of our *User* type without the password hash, and *testPasswordAgainst* to test a password against our saved hash. 
    - `⚠️ TODO: liste`
- `providers` folder contains encapsulated functionalities to be exposed then using the routes, as their role is to provide data, such functions are to be called as *providers*.
  - `anime` folder contains functions to query *Anilist's* exposed database, has logic to map their response into a *'digested'* easier to use form for our frontend.
  - `user.providers.ts` contains functions to create and manage users, their passwords and their profile pictures, also contains authorization functions. 
  - `⚠️ TODO: liste, cancellare l'utente`
- `routes` contains our router modules to be then exposed by fastify as REST APIs.
  - `anime-genres.route.ts` and `anime.route.ts` expose series data.
  - `user.route.ts` expose users and auth business logic.
- `types` folder contains our type definitions.
  - `result.ts` has some nice to have utility types to handle paginated queries and data.
- `configure.ts` exposes a function to create, configure and register plugins to a *FastifyInstance*, allows us to provide additional configuration through a callback, then prepares the instance to listen.
- `main.ts` is our entry point, in which we call `configure` from `configure.ts` and register our routes.

#### Application bootstrapping
Our `main.ts` is responsable to register routes, by calling `configure` from `configure.ts`, a callback is provided which exposes the actual fastify instance before the backend is put in listen state.
```ts
configure( async app => {
  // mounts animeRoute in /api/anime
  app.register(animeRoute, { prefix: '/api/anime' });
  ... // other code
});
```
By calling `app.register( router, {prefix: prefix})`, where `router` is a function and `prefix` a path, fastify would then call `router` with some params, `router` as a function would bind paths to handlers, then fastify would mount those paths relative to `prefix`.

#### Route declaration
Routing concepts are similar between *express* and *fastify*, we can express a route module in fastify with a function, an example from `anime-genres.route.ts`:
```ts
export default function (app: FastifyInstance, opts: unknown, done: Function) {
  app.get('', () => getGenres() );
  done();
}
```
Once our defined function is called by fastify as effect of `app.register(...)`, it's possible to provide handlers for different pairs of verbs and paths by means of `app.httpverb(path, [params], handler)`, where *params* is optional, one must provide a mount path and a handler function. In our example the handler function is quite simple, it doesn't declare any params and actually resolves into a call to `getGenres()`, *Fastify* indeed allows the handlers to return both promises and non promises results and send them back as reply with ease.

#### Authentication in routes
Authentication is provided via JWT, to require a path to have the user logged in, `user.provider.ts` provides the function `authenticate`, which passed through a handler param via the `onRequest` field, ensures the requests has a valid token, then puts the payload into `FastifyRequest`'s instance `req.user`.
```ts
app.patch('/password', { onRequest: authenticate }, (req: FastifyRequest<{ Body: ChangePasswordParams}>) => {
  return changeUserPassword(req.user as UserType, req.body.password)
});
```
As one could see, `FastifyRequest<>` has an extensive template params which accepts three field types:
- `Params`, the URL params. In `/api/user/:id` *id* is a param and thus `FastiyRequest<{Params:{id: string}}>` is a valid signature.
- `Querystring`, the URI params. In `/api/anime?search=Samurai`, *search* is a query param and thus `FastifyRequest<{Querystring:{search: string}}>` is a valid signature.
- `Body` indicates the type of the body. **Fastify automatically parse JSON bodies.** 

#### Anilist integration
*Anilist* integration is provided by providers exported from the modules located in `src/providers/anime/`, the providers are:
- **searchAnime**, this one provides search capabilities of TV series from *Anilist*.
- **getGenres**, this one provides *Anilist*'s genres list.
- **getAnime**, this one provides extended data about a single TV series.
- **getRecommendations**, this one provides recommendations from a given TV series.

Of these providers, the most important one is **searchAnime**, as it's responsable for searching TV series, a required step before all other providers except *getGenres*.  
Its full parameter list in such object:
```ts
export type AnimeSearchParams = WithPagination<{
  ids?: number[],
  search?: string,
  season?: 'WINTER' | 'SPRING' | 'SUMMER' | 'FALL',
  year?: number,
  genres?: string[],
  status?: 'FINISHED' | 'RELEASING' | 'NOT_YET_RELEASED' | 'CANCELED' | 'HIATUS';
  sort?: 'ID' | 'ID_DESC' | 'START_DATE' | 'START_DATE_DESC' | 'END_DATE' | 'END_DATE_DESC' | 'SCORE' | 'SCORE_DESC' | 'POPULARITY' | 'POPULARITY_DESC' | 'TRENDING' | 'TRENDING_DESC' | 'EPISODES' | 'EPISODES_DESC' | 'DURATION' | 'DURATION_DESC' | 'STATUS' | 'STATUS_DESC' | 'UPDATED_AT' | 'UPDATED_AT_DESC'
}>
```
To better explain parameters filters, let's break up the type:
- **WithPagination<...>** attaches two properties, *page* and *size*, to our declaration, which are responsable of pagination of our result data.
  - **ids** must be a list of *Anilist's*  series IDs, that's it: you provide an array of identifiers, and the search result will return series with the corresponding identifiers.
    - For example, `searchAnime({ids: [21, 1]})` would return a search result with *One Piece* (21) and *Cowboy Bebop* (1).
    - This search capability is to be used to provide data to user's list.
  - **search** allows us to search by a string of terms.
    - For exmple, `searchAnime({search: "Steins;Gate"})` would return a search result for the term *Steins;Gate*.
  - **season** and **year** allows us to search by season and year respectively.
  - **genres** allows us to search by genre.
    - For example, `searchAnime({genres: ['Adventure','Romance']})` would return those anime with genres *Adventure* and *Romance*.
  - **status** allows to research by airing status.
    - For example, `searchAnime(status: 'NOT_YET_REALEASED', search: 'Madoka Magica')` would returns those series which will be found using the terms *Madoka Magica* but *not yet released*.
  - **sort** allows us to sort by a given order.
    - For example, using `sort: 'TRENDING_DESC'` will sort the result by the most trending series in a descending order.
    
Any combination of parameters can be possible, be aware that some of them may yields empty results as the search is exlusive, ie. consider *ids, search, season, year, genres* and *status* as evaluated with an *AND* statement in *SQL*.

Anilist's integration uses *GraphQL* under the hood, this allows us to have two types of results for our APIs:
- **AnimeFragment** is a type with just enough data to be used in backend's business and to be shown as search results and *Card* components into our frontend.
  - Both *searchAnime* and *getRecommendations* return a *ArrayResult* of *AnimeFragment*(s).
- **Anime** is an extended *AnimeFragment* type with denser informations, to be used in series' *page* into our Frontend.
  - *getAnime* returns such type.

#### ⚠️🏗️ User's tracking list
A registered user may hold a list of *tracked TV series*, each tracking record must hold:
- The series' **id**, which is just the identifier of the series according to *Anilist*.
- A **status** representing the user progress, which may be one of *watching*, *pending*, *paused*, *completed*, *dumped*.  
- A **progress**, a counter on the number of episodes the user watched.
- A **score** so the user may keep track of its enjoyment of the series.

Some more fields are to be defined, in particular, it is to be defined a way to notify the user that a new episode for such series has aired.

As discussed before, to provide the list of anime fragments given a user's tracking list, one could use `searchAnime`.
For example, consider a type `TrackingEntry` as the entry entity of a user's tracking list, which holds an `id` field as discussed before, one can search those anime by:
```ts
const trackingList: Array<TrackingEntry> = /* get the tracking list */;
const trackingListIds = trackingList.map( entry => entry.id );
const animes: ArrayResult<AnimeFragment> = await searchAnime({ids: trackingListIds});
```
Not much logic needs to be implemented here, ordering, pagination and chunking is frontend's job, and as it uses a state manager library, I expect it to use a entity manager for required logic.