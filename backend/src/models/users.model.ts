import crypto from "crypto";
import database from "../misc/database";
import { DataTypes, Model  } from "sequelize";
import { User } from "../types/user";
import { signToken, verifyToken } from "../misc/crypto-keys";
import { WebError } from "../misc/error";
import { FastifyRequest } from "fastify";

// computa l'md5 della password
export function hashPassword(password: string): string {
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
});

// sincronizzo il modello sul database
Users.sync({alter: true})
    .catch(console.error);

export type CreateUserParams = {
    username: string;
    password: string;
    picture?: string;
};
export type LoginParams = {
    username: string;
    password: string;
};

export type ChangePasswordParams = {
    password: string;
};
export async function createUser(params: CreateUserParams) {
    const user = Users.build(params);
    await user.save();
    return loginUser(params);
}
export async function changePassword(user: User, password: string) {
    const userModel = await Users.findByPk(user.id);
    await userModel?.update({password});
}   
export async function loginUser(params: LoginParams) {
    const user = await Users.findOne({where: { username: params.username}});
    if ( user ) {
        const passwordMatches =  hashPassword(params.password) === (user as any).password;
        if ( passwordMatches ) {

            const token_payload = ({...user.get(), password: undefined });
            return signToken(token_payload).then( token => ({token}))
        }
    };
    throw new WebError(400,'login', "User not found");
}

export function getLoggedUserFromRequest(req: FastifyRequest): User {
    return (req as any)['user'];
}

export async function authenticateUser(req: FastifyRequest<{}>) {
    let token = req.headers.authorization;
    token = token?.split(' ')[1];
    if ( token ) {
        const user = await verifyToken<User>(token);
        (req as any)['user'] = user;
        return;
    }
    throw new WebError(401, 'login', "authentication failed");

}
export const authenticationPreHandler = async (request: FastifyRequest, reply: unknown, done: Function) => {
    await authenticateUser(request);
    return done();
} 