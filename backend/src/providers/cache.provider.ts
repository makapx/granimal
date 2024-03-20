import { AnimeFragment } from "../types/anime";
import db from "../misc/database";
import { map } from "lodash";

export async function cacheAnimes(animes: AnimeFragment[]) {
    
    const stmt = db.prepare(`INSERT OR IGNORE INTO anime VALUES (?,?,?,?,?,?,?)`)
    for ( const anime of animes ) {
        await stmt([
            anime.id,
            anime.title,
            anime.main_picture.medium,
            anime.main_picture.large,
            anime.popularity,
            anime.rank,
            anime.mean
        ]);
    }
}

export async function getCachedAnimes(ids: Array<number>) {
    type Result = {
        id: number,
        title: string,
        main_picture_medium: string,
        main_picture_large: string,
        popularity: number,
        rank: number,
        mean: number
    };

    if ( ids.length === 0 ) {
        return [];
    }

    return db.array<Result>(`SELECT * FROM anime WHERE id IN ?`, [ids])
        .then( animes => map(animes, next => ({
            id: next.id,
            title: next.title,
            main_picture: {
                medium: next.main_picture_medium,
                large: next.main_picture_large
            },
            popularity: next.popularity,
            rank: next.rank,
            mean: next.mean
        })));
}

