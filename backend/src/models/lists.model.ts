import database from "../misc/database";
import { TrackingList } from "../types/trackinglist";
import { DataTypes, Model } from "sequelize";
import { WebError } from "../misc/error";
import { AnimeSearchParams } from "../types/anime";
import { Users } from "./users.model";
import { searchAnime } from "../providers/anime";

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
        defaultValue: ""
    },
    progress: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
});


TrackingLists.sync({alter: true})
    .catch(console.error);


export type TrackingListSearchParams = {
    username: string;
    userId?: number;
    animeId: number;
    animeName: string;
};

export type TrackingListDeleteAnimeParams = {
    username: string;
    animeId: number
}

export type TrackingEntry = {
    userId: number;
    animeId: number;
};

// Get tracking list of user id
export async function getTrackingListOfUser ( userId: number ): Promise<{ animeIdList: any }>{
    const trackingList = await TrackingLists.findAll({where: { userId: userId}});

    if (trackingList.length > 0) {
        const animeIdList = trackingList.map(( trackingList ) => trackingList.dataValues.animeId);
        return { animeIdList };
    } else
        return { animeIdList: [] };
    // throw new WebError(400, 'list', "User id not found in Tracking List");
}

export async function trackAnimeById( params: TrackingListSearchParams ) {
    const user = await Users.findOne({where: {username: params.username}});
    if( user ){
        const existingUserId = user.dataValues.id as number;
        // search anime on Anilist
        const animeSearchParam: AnimeSearchParams = {
            ids: [params.animeId]
        }
        // const animeExists = await searchAnime(animeSearchParam);
        if ( ( /*animeExists.result.length > 0*/ 1  ) ){
            const trackingEntryParams: TrackingEntry = {
                userId: existingUserId,
                animeId: params.animeId
            };
            // save on db
            const [trackingList] = await TrackingLists.upsert(trackingEntryParams);
            // const trackingList = TrackingLists.build(trackingEntryParams);
            // await trackingList.save();
            return trackingList;
        }
        else
            throw new WebError (400, 'tracking-list', 'Anime not found');
    } else
        throw new WebError (400, 'tracking-list', 'User not found or not logged in');
}

// Deletes anime of User
export async function deleteAnimeOfUser( params: TrackingListDeleteAnimeParams ) {
    const user = await Users.findOne({where: {username: params.username}});
    if( user ){
        TrackingLists.destroy({where: {
            userId: user.dataValues.id,
            animeId: params.animeId
            }
        })
        return;
    }
    throw new WebError (400, 'user', 'User not registered');
}