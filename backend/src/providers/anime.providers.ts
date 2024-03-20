import { env } from "process";
import { Anime, AnimeFragment } from "../types/anime"
import axios from "axios";
import { WithPagination } from "../misc/utils";
import { AnimeSearchParams } from "../routes/anime.routes";
import { map } from "lodash";
import { ArrayResult } from "../types/result";

export type AnilistSearch = {
    data: Array<{node: AnimeFragment}>,
    paging?: { next?: string }
}
const MAL_CLIENT_ID = env['MAL_CLIENT_ID']; // X-MAL-Client-ID

// create instance of Axios with default headers and baseURL
const client = axios.create({
    baseURL: "https://api.myanimelist.net",
    headers: {
        'X-MAL-Client-ID': MAL_CLIENT_ID,
    }
});

export async function searchAnime(params: WithPagination<AnimeSearchParams>) {
    const {limit = 100, offset = 0} =params;
        const fields = 'mean,rank,popularity';

        // search the anime
        const request = () => {
            if ( 'search' in params ) {
                return client.get<AnilistSearch>(`/v2/anime`, { params: { q: params.search, limit, offset, fields }})
            }
            else if ( 'season' in params ) {
                const {season, year } = params;
                return client.get<AnilistSearch>(`/v2/anime/season/${year}/${season}`, { params: { limit, offset, fields }})
            }
            else if ( 'ranking' in params ) {
                const { ranking } = params;
                return client.get<AnilistSearch>(`/v2/anime/ranking`, { params: { ranking_type: ranking, limit, offset, fields }})
            }
            else return Promise.reject()
        };
        
        // result is MAL's response
        const result = (await request()).data;

        // we prefere a different format as response, thus we use type ArrayResult<T>
        return {
            data: map( result.data, next => next.node ),
            hasNext: !!(result.paging?.next) 
        } as ArrayResult<AnimeFragment>       
}

export function getAnimeById(id: number): Promise<Anime> {
    const all_fields = "id,title,main_picture,alternative_titles,start_date,end_date,synopsis,mean,rank,popularity,num_list_users,num_scoring_users,nsfw,created_at,updated_at,media_type,status,genres,my_list_status,num_episodes,start_season,broadcast,source,average_episode_duration,rating,pictures,background,related_anime,related_manga,recommendations,studios,statistics";
    return client.get(`/v2/anime/${id}`, {
        params: {
            fields: all_fields
        }
    }).then( result => result.data )
}