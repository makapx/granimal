import database from "../misc/database";
import { TrackingList } from "../types/trackinglist";
import { DataTypes, Model } from "sequelize";

export const TrackingLists = database.define<Model<TrackingList>>('TrackingList', {
    userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        primaryKey: true,
        unique: false
    },
    animeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: false
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: "Watching",
        validate: {
            isIn: [['Watching', 'Pending', 'Completed', 'Dumped', 'Paused']]
        }
    },
    progress: {
        type: DataTypes.INTEGER,
        validate: {
            min: 0,
            max: 100
        }
    },
    score: {
        type: DataTypes.INTEGER,
        validate: {
            min: 0,
            max: 100
        }
    }
});

TrackingLists.sync({alter: false});

export type TrackingEntry = {
    userId: number;
    animeId: number;
};

// Get tracking list of user id
export async function getTrackingListOfUser ( userId: number ): Promise<{ animeIdList: any }>{
    const trackingList = await TrackingLists.findAll({where: { userId: userId}});

    const animeIdList = trackingList.map(( trackingList ) => trackingList.get());
    return { animeIdList };
}

export async function trackAnime( userId: number, animeId: number,  params: Partial<TrackingList> ) {
    const trackingEntryParams: TrackingList = {userId, animeId, ...params};
    await TrackingLists.upsert(trackingEntryParams);
}

// Deletes anime of User
export function deleteAnimeOfUser( userId: number, animeId: number ) {
    return TrackingLists.destroy({where: { userId, animeId }});
}