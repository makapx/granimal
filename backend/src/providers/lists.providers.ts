import { TrackingList } from "../types/trackinglist";
import { TrackingLists } from "../models/lists.model";

// Get tracking list of user id

export async function getList(userId: number): Promise<{ animeIdList: any; }> {
    const trackingList = await TrackingLists.findAll({ where: { userId: userId } });

    const animeIdList = trackingList.map((trackingList) => trackingList.get());
    return { animeIdList };
}

export async function putIntoList(userId: number, animeId: number, params: Partial<TrackingList>) {
    const trackingEntryParams: TrackingList = { userId, animeId, ...params };
    await TrackingLists.upsert(trackingEntryParams);
}
// Deletes anime of User

export function removeFromList(userId: number, animeId: number) {
    return TrackingLists.destroy({ where: { userId, animeId } });
}
