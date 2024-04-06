import crypto from "crypto";
import database from "../misc/database";
import { DataTypes, Model } from "sequelize";
import { UserType } from "../types/user";
import { WebError } from "../misc/error";
import { FastifyRequest } from "fastify";
import { omit } from "lodash";


// dichiaro il modello
export class User extends Model<UserType> {
    /**
     * Return inner object without password
     * @returns 
     */
    withoutPassword(): Omit<UserType, 'password'> {
        return omit(this.get(), 'password');
    }
    /**
     * Test a password, returns true if the hash of the first argument is the same as our stored one.
     * @param password the password to test against
     * @returns 
     */
    testPasswordAgainst(password: string): boolean {
        const hash = hashPassword(password);
        return hash === this.get().password;

    }
}
User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
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
}, { sequelize: database })
    .sync({ alter: false });

function hashPassword(password: string) {
    return crypto.createHash('md5').update(password).digest('hex');
}
