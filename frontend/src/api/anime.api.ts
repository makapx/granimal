import { cullUndefined } from "../utils/object";
import { Anime, AnimeGenresResult, AnimeRecommendationParams, AnimeRecommendationResult, AnimeSearchParams, AnimeSearchResult } from "./types";

/**
 * @description Search anime based on filters
 * @param params 
 * @returns 
 */
export function searchAnime(params: AnimeSearchParams): Promise<AnimeSearchResult> {
    const querystring = new URLSearchParams(cullUndefined(params) as Record<string,string>);
    return fetch(`/api/anime?` + querystring.toString())
        .then( res => res.json() as Promise<AnimeSearchResult>)
}

/**
 * @description Same as searchAnime, but uses post
 * @param params 
 * @returns 
 */
export function searchAnimeUsingPost(params: AnimeSearchParams): Promise<AnimeSearchResult> {
    return fetch(`/api/anime`, { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    })
    .then( res => res.json() as Promise<AnimeSearchResult>)
}

/**
 * @description Get anime by id
 * @param id anime id 
 * @returns 
 */
export function getAnime(id: number): Promise<Anime> {
    return fetch(`/api/anime/${id}`)
        .then( res => res.json() as Promise<Anime>)
}

/**
 * @description Get anime recommendations
 * @param params 
 * @returns 
 */
export function getAnimeRecommendations({id, page = 1, size = 25}: AnimeRecommendationParams): Promise<AnimeRecommendationResult> {
    const querystring = new URLSearchParams({page: page.toString(), size: size.toFixed()});
    return fetch(`/api/anime/${id}/recommendations?` + querystring)
        .then( res => res.json() as Promise<AnimeRecommendationResult>)
}

/**
 * @description Get anime genres
 * @returns an array of strings representing genres
 */
export function getGenres(): Promise<AnimeGenresResult> {
    return fetch(`/api/anime-genres`)
        .then( res => res.json() as Promise<AnimeGenresResult>)
}