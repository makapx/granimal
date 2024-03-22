import { chain, flatMap, map } from "lodash";
import day from "dayjs";
import { convertDate } from "./utils";
import { ArrayResult } from "../../types/result";
import { Anime, AnimeFragment, AnimeFragmentParams } from "../../types/anime";
import { WebError } from "../../misc/error";
import { AnilistFragment, mapFragment, mapFragments } from "./fragment.provider";

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
  recommendations: {
    nodes: Array<{
      id: number;
      mediaRecommendation: AnilistFragment & { type: string };
    }>;
  };
};

type Root = {
  data: {
    Media: AnimeMedia
  }
}






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
          recommendations {
            nodes {
              id
              mediaRecommendation {
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
  if ( response.ok ) { 
    const media = result.data.Media;
    return ({
      ...mapFragment(media),
      nextEpisodeAirsAt: media.nextAiringEpisode?.airingAt,
      bannerImage: media.bannerImage,
      description: media.description,
      seasonYear: media.seasonYear,
      duration: media.duration,
      synonyms: media.synonyms,
      countryOfOrigin: media.countryOfOrigin,
      relations: flatMap(
        media.relations.edges, 
        ({node}) => node.type === 'ANIME' ? [mapFragment(node)] : []
      ),
      recommendations: flatMap(
        media.recommendations.nodes,
        ({mediaRecommendation}) => mediaRecommendation.type === 'ANIME' ? [mapFragment(mediaRecommendation)] : []
      ),
      studios: map(media.studios.edges, next => next.node.name),

    });
  }
  else {
    throw new WebError(response.status,'anime::getAnime', result)
  }

}
