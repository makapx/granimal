import crypto from "crypto";
import database from "../misc/database";
import { DataTypes, Model  } from "sequelize";
import { User } from "../types/user";

// computa l'md5 della password
function hashPassword(password: string): string {
    return crypto.createHash('md5').update(password).digest('hex');
}

// dichiaro il modello
export const Users = database.define<Model<User>>('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value: string) {
            this.setDataValue('password', hashPassword(value));
        }
    },
    picture: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "default.png"
    }
});

// sincronizzo il modello sul database
Users.sync({alter: true})
    .catch(console.error);

