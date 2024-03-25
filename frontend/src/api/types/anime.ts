import { ArrayResult, WithPagination } from "./result";

export type AnimeSearchParams = WithPagination<{
  ids?: number[],
  search?: string,
  season?: 'WINTER' | 'SPRING' | 'SUMMER' | 'FALL',
  year?: number,
  genres?: string[],
  status?: 'FINISHED' | 'RELEASING' | 'NOT_YET_RELEASED' | 'CANCELED' | 'HIATUS';
  sort?: 'ID' | 'ID_DESC' | 'START_DATE' | 'START_DATE_DESC' | 'END_DATE' | 'END_DATE_DESC' | 'SCORE' | 'SCORE_DESC' | 'POPULARITY' | 'POPULARITY_DESC' | 'TRENDING' | 'TRENDING_DESC' | 'EPISODES' | 'EPISODES_DESC' | 'DURATION' | 'DURATION_DESC' | 'STATUS' | 'STATUS_DESC' | 'UPDATED_AT' | 'UPDATED_AT_DESC'
}>

export type AnimeRecommendationParams = WithPagination<{ id: number }>;

export type AnimeFragment = {
  id: number;
  title: string;
  genres: string[];
  coverImage?: string;
  format?: string;
  status: 'FINISHED' | 'RELEASING' | 'NOT_YET_RELEASED' | 'CANCELED' | 'HIATUS';
  seasonYear?: number;
  season?: 'WINTER' | 'SPRING' | 'SUMMER' | 'FALL',
  startDate?: string;
  endDate?: string;

  episodes?: number;
  nextEpisode?: number;
  score?: number;
}

export type AnimeSearchResult = ArrayResult<AnimeFragment>;
export type AnimeRecommendationResult = ArrayResult<AnimeFragment>;
export type AnimeGenresResult = Array<string>;

export type Anime = AnimeFragment & {
  nextEpisodeAirsAt: number | undefined;
  bannerImage: string;
  description: string;
  seasonYear: number;
  duration: number;
  synonyms: string[];
  countryOfOrigin: string;
  relations: AnimeFragment[];

  studios: string[];
};