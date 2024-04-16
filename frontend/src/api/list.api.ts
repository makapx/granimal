import { TrackingList } from "./types/tracking-list"

export function getList(userId: number) {
    return fetch(`/api/list/${userId}`)
        .then( result => {
            if ( result.ok ) return result.json() as Promise<TrackingList[]>;
            else return Promise.reject(result);
        });
}

export function putIntoList(token: string, data: Omit<TrackingList,'userId'> ) {
    return fetch(`/api/list/me/${data.animeId}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then( result => {
        if ( result.ok ) return;
        else Promise.reject(result);
    });
}

export function patchListEntry(token: string, data: Omit<TrackingList,'userId'>) {
    return fetch(`/api/list/me/${data.animeId}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then( result => {
        if ( result.ok ) return;
        else Promise.reject(result);
    });
}

export function deleteFromList(token: string, animeId: number|string) {
    return fetch(`/api/list/me/${animeId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then( result => {
        if ( result.ok ) return;
        else Promise.reject(result);
    });
}