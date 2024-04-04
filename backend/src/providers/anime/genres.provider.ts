import { WebError } from "../../misc/error";
import { AnimeGenresResult } from "../../types/anime";

type Response = {
  data: {
    GenreCollection: Array<string>
  }
}

/**
 * Get Anilist's genres list
 * @returns 
 */
export async function getGenres() {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const graphql = JSON.stringify({
    query: `
      query {
        GenreCollection
      }
    `,
    variables: { }
  })
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: graphql
  };

  const response = await fetch("https://graphql.anilist.co/", requestOptions);
  const result = await response.json() as Response;
  if ( response.ok ) { 
    return result.data.GenreCollection as AnimeGenresResult;
  }
  else {
    throw new WebError(response.status,'anime::getGenres', result)
  }
}
