import { map } from "lodash";
import day from "dayjs";
import { convertDate } from "./utils";
import { ArrayResult } from "../../types/result";
import { WebError } from "../../misc/error";
import { AnimeFragment, AnimeSearchParams, AnimeSearchResult } from "../../types/anime";

export type AnilistFragment = {
  id: number;
  title: {
    english?: string;
    romaji: string;
  };
  genres: Array<string>;
  seasonYear?: number;
  season?: 'WINTER' | 'SPRING' | 'SUMMER' | 'FALL';
  status: 'FINISHED' | 'RELEASING' | 'NOT_YET_RELEASED' | 'CANCELED' | 'HIATUS';
  coverImage: {
    large: string;
  };
  format?: string;
  startDate: {
    year?: number;
    month?: number;
    day?: number;
  };
  endDate: {
    year?: number;
    month?: number;
    day?: number;
  };
  episodes?: number;
  nextAiringEpisode?: {
    id: number;
    episode: number;
  };
  averageScore?: number;
};

type Response = {
  data: {
    anime: {
      pageInfo: {
        hasNextPage: boolean
      }
      results: Array<AnilistFragment>
    }
  }
}

export async function searchAnime(params: AnimeSearchParams) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const graphql = JSON.stringify({
    query: `
      query ( $ids: [Int], $search: String, $season: MediaSeason, $seasonYear: Int, $genres: [String], $page: Int = 1, $perPage: Int = 25, $sort: MediaSort = SCORE_DESC, $status: MediaStatus) {
        anime: Page(perPage: $perPage, page: $page) {
          pageInfo {
            hasNextPage
          }
          results: media(type: ANIME, search: $search, season: $season, seasonYear: $seasonYear, id_in: $ids, genre_in: $genres, sort: [$sort], status: $status) {
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
    `,
    variables: {
      ids: params.ids,
      search: params.search,
      season: params.season,
      seasonYear: params.year,
      genres: params.genres,
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
  if ( response.ok ) {
    const arrayResult: AnimeSearchResult = {
      hasNext: result.data.anime.pageInfo.hasNextPage,
      result: mapFragments(result.data.anime.results)
    };
  
    return arrayResult;
  }
  else {
    throw new WebError(response.status,'anime::searchAnime', result)
  }

}
export const mapFragment = (anime: AnilistFragment) => {
  console.log(anime)
  return ({
  id: anime.id,
  title: anime.title?.english ?? anime.title?.romaji ?? 'Unnamed',
  season: anime.season,
  seasonYear: anime.seasonYear,
  genres: anime.genres,
  coverImage: anime.coverImage?.large,
  status: anime.status,
  format: anime.format,
  startDate: convertDate(anime.startDate ),
  endDate: convertDate(anime.endDate ),
  episodes: anime.episodes ?? (anime.nextAiringEpisode?.episode ?? 1) - 1,
  nextEpisode: anime.nextAiringEpisode?.episode,
  score: anime.averageScore
})};
export function mapFragments(fragments: AnilistFragment[]): AnimeFragment[] {
  return map(fragments, mapFragment);
}

