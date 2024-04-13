import { UserType } from "../api/types";

export type UserState = {
    user?: UserType & { token: string };
}
export type StoreType = {
    user: UserState;
}