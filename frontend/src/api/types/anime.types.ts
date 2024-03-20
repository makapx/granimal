

export type AnimeFragment = {
    id: number,
    title: string,
    main_picture: Picture,
    popularity: number,
    rank?: number,
    mean?: number
}

// To parse this data:
//
//   import { Convert, Anime } from "./file";
//
//   const anime = Convert.toAnime(json);

export type Anime = AnimeFragment & Partial<{
    id: number;
    title: string;
    main_picture: Picture;
    alternative_titles: AlternativeTitles;
    start_date: Date;
    synopsis: string;
    mean: number;
    rank: number;
    popularity: number;
    num_list_users: number;
    num_scoring_users: number;
    nsfw: string;
    created_at: Date;
    updated_at: Date;
    media_type: string;
    status: string;
    genres: Genre[];
    num_episodes: number;
    start_season: Season;
    broadcast: Broadcast;
    source: string;
    average_episode_duration: number;
    rating: string;
    pictures: Picture[];
    background: string;
    related_anime: RelatedAnime[];
    related_manga: any[];
    recommendations: Recommendation[];
    studios: Genre[];
    statistics: Statistics;
}>;

export type AlternativeTitles = {
    synonyms: string[];
} & Record<string, string>;

export type Broadcast = {
    day_of_the_week: string;
    start_time: string;
}

export type Genre = {
    id: number;
    name: string;
}

export type Picture = {
    medium: string;
    large: string;
}

export type Recommendation = {
    node: Node;
    num_recommendations: number;
}

export type Node = {
    id: number;
    title: string;
    main_picture: Picture;
}

export type RelatedAnime = {
    node: Node;
    relation_type: RelationType;
    relation_type_formatted: RelationTypeFormatted;
}

export enum RelationType {
    AlternativeVersion = "alternative_version",
    Character = "character",
    Other = "other",
    SideStory = "side_story",
    Summary = "summary",
}

export enum RelationTypeFormatted {
    AlternativeVersion = "Alternative version",
    Character = "Character",
    Other = "Other",
    SideStory = "Side story",
    Summary = "Summary",
}

export type Season = {
    year: number;
    season: string;
}

export type Statistics = {
    status: Status;
    num_list_users: number;
}

export type Status = {
    watching: string;
    completed: string;
    on_hold: string;
    dropped: string;
    plan_to_watch: string;
}

export type RankingType =
    'all'
    | 'airing'
    | 'upcoming'
    | 'tv'
    | 'ova'
    | 'movie'
    | 'special'
    | 'bypopularity'
    | 'favorite';


export type AnimeSearchParams = { search?: string } | { season?: 'winter' | 'spring' | 'summer' | 'fall', year?: string } | { ranking: RankingType };
