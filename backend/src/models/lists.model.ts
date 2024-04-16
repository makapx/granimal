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
        type: DataTypes.INTEGER
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

