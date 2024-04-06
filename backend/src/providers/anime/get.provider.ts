import { flatMap, map } from "lodash";
import { Anime } from "../../types/anime";
import { WebError } from "../../misc/error";
import { AnilistFragment, mapFragment } from "./fragment.provider";
import dayjs from "dayjs";

type AnimeMedia = {
  id: number;
  title: {
    english?: string;
    romaji: string;
  };
  genres: Array<string>;
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
    airingAt: number;

  };
  averageScore?: number;


  bannerImage: string;
  description: string;
  seasonYear: number;
  duration: number;
  synonyms: Array<string>;
  countryOfOrigin: string;
  relations: {
    edges: Array<{
      id: number;
      relationType: string;
      node: AnilistFragment & { type: string };
    }>;
  };
  studios: {
    edges: Array<{
      isMain: boolean;
      node: {
        id: number;
        name: string;
      };
    }>;
  };
};

type Root = {
  data: {
    Media: AnimeMedia
  }
}

/**
 * Get anime by Anilist's id
 * @param id 
 * @returns 
 */
export async function getAnime(id: number): Promise<Anime> {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const graphql = JSON.stringify({
    query: `
      query media($id: Int, $type: MediaType) {
        Media(id: $id, type: $type) {
          id
          title {
            romaji
            english
          }
          coverImage {
            extraLarge
            large
          }
          bannerImage
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
          description
          season
          seasonYear
          format
          status
          episodes
          duration
          genres
          synonyms
          averageScore
          countryOfOrigin
          nextAiringEpisode {
            airingAt
            episode
          }
          relations {
            edges {
              id
              relationType(version: 2)
              node {
                 id
                  title {
                    english
                    romaji
                  }
                  type
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
          studios {
            edges {
              isMain
              node {
                id
                name
              }
            }
          }
        }
      }
    `,
    variables: { id }
  })
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: graphql
  };

  const response = await fetch("https://graphql.anilist.co/", requestOptions);
  const result = await response.json() as Root;
  if (response.ok) {
    const media = result.data.Media;
    return ({
      ...mapFragment(media),
      nextEpisodeAirsAt: dayjs((media.nextAiringEpisode?.airingAt ?? 0) * 1000).toISOString(),
      bannerImage: media.bannerImage,
      description: media.description,
      seasonYear: media.seasonYear,
      duration: media.duration,
      synonyms: media.synonyms,
      countryOfOrigin: media.countryOfOrigin,
      relations: flatMap(
        media.relations.edges,
        ({ node }) => node.type === 'ANIME' ? [mapFragment(node)] : []
      ),
      studios: map(media.studios.edges, next => next.node.name),

    }) as Anime;
  }
  else {
    throw new WebError(response.status, 'anime::getAnime', result);
  }

}
