import { ArrayResult } from "../../types/result";
import { WebError } from "../../misc/error";
import { AnilistFragment, mapFragments } from "./fragment.provider";
import { AnimeRecommendationParams, AnimeRecommendationResult } from "../../types/anime";
import { map } from "lodash";

type Response = {
  data: {
    recommendations: {
      pageInfo: {
        hasNextPage: boolean
      }
      results: Array<{anime: AnilistFragment}>
    }
  }
}
/**
 * Get recommendations for a base anime, uses pagination. 
 * @param params 
 * @returns 
 */
export async function getRecommendations(params: AnimeRecommendationParams) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const graphql = JSON.stringify({
    query: `
      query ($id: Int, $page: Int = 1, $perPage: Int = 25) {
        recommendations: Page(perPage: $perPage, page: $page) {
          pageInfo {
            hasNextPage
          }
          results: recommendations(mediaId: $id) {
            id
            anime: mediaRecommendation {
               id
                  title {
                    english
                    romaji
                  }
                  genres
                  status
                  season
                  seasonYear
                  coverImage {
                    large
                  }
                  format
                  startDate {
                    year
                    month
                    day
                  }
                  endDate {
                    year
                    month
                    day
                  }
                  episodes
                  nextAiringEpisode {
                    id
                    episode
                  }
                  averageScore
                
            }
          }
        }
      }
    `,
    variables: {
      id: params.id,
      page: params.page,
      perPage: params.size
    }
  })
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: graphql
  };

  const response = await fetch("https://graphql.anilist.co/", requestOptions);
  const result = await response.json() as Response;
  if (response.ok) {
    const arrayResult: AnimeRecommendationResult = {
      hasNext: result.data.recommendations.pageInfo.hasNextPage,
      result: mapFragments(map(result.data.recommendations.results, 'anime'))
    };

    return arrayResult;
  }
  else {
    throw new WebError(response.status, 'anime::getRecommendations', result)
  }

}

