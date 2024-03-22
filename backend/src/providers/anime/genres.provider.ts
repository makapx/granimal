import { map } from "lodash";
import day from "dayjs";
import { convertDate } from "./utils";
import { ArrayResult } from "../../types/result";
import { AnimeFragment, AnimeFragmentParams } from "../../types/anime";
import { WebError } from "../../misc/error";


type Response = {
  data: {
    GenreCollection: Array<string>
  }
}

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
    return result.data.GenreCollection;
  }
  else {
    throw new WebError(response.status,'anime::getGenres', result)
  }

}
