import { Anime, AnimeFragment, AnimeSearchParams } from "./types/anime.types";
import { ArrayResult, WithPagination } from "./types/misc.types";

export function search(params: WithPagination<AnimeSearchParams>) {
    const urlparmas = new URLSearchParams(params as Record<string,string>);
    return fetch(`/api/anime?` + urlparmas.toString())
        .then( res => res.json() as Promise<ArrayResult<AnimeFragment>>)
}
export function get(id: number) {
    return fetch(`/api/anime/${id}`)
        .then( res => res.json() as Promise<Anime>)
}