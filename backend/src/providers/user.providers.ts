import { User } from "../models/user.model";
import { WebError } from "../misc/error";
import { FastifyRequest } from "fastify";
import { UserType } from "../types/user";
import { isNull } from "lodash";

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
export type ChangePictureParams = {
  picture: string;
};

export async function createUser(params: CreateUserParams) {
  const user =  await User.create(params);
  return user.withoutPassword();
}

export async function changeUserPassword(user: UserType, password: string) {
  const userModel = await User.findByPk(user.id);
  await userModel?.update({password});
}

export async function changeUserPicture(user: UserType, picture: string) {
  const userModel = await User.findByPk(user.id);
  await userModel?.update({picture});
}   

export async function loginUser(params: LoginParams) {
  const user = await User.findOne({where: { username: params.username}});
  if ( user && user.testPasswordAgainst(params.password) ) {
      return user.withoutPassword();
      
  };
  throw new WebError(400,'login', "User not found");
}
export async function usernameFree(username: string ) {
  return User.findOne({where: { username }}).then( result => isNull(result));
}
export const authenticate = (req: FastifyRequest<any>) => req.jwtVerify();