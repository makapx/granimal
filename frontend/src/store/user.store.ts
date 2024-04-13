import { createSlice, Dispatch, PayloadAction, Store } from "@reduxjs/toolkit";
import { jwtDecode, JwtPayload } from "jwt-decode"
import { UserType } from "../api/types";
import { createUser, CreateUserParams, dropTokenFromLocalStorage, loadTokenFromLocalStorage, LoginParams, loginUser, storeTokenIntoLocalStorage } from "../api/user.api";

type UserState = {
    user?: UserType & { token: string };
}


const userStore = createSlice({
    name: 'user',
    initialState: {} as UserState,
    reducers: {
        login(_, action: PayloadAction<string>) {
            const token = jwtDecode(action.payload) as UserType & JwtPayload;
            return { user: { token: action.payload, ...token } }
        },
        logout(_, action: PayloadAction<undefined>) {
            return {}
        }
    },
    selectors: {
        isLogged: state => state.user !== undefined
    },

})

export const createLoginAction = async (params: LoginParams) => {
    const {token} = await loginUser(params);
    storeTokenIntoLocalStorage(token);
    return userStore.actions.login(token);
} 
export const createCreateUserAction = async (params: LoginParams) => {
    const {token} = await createUser(params);
    storeTokenIntoLocalStorage(token);
    return userStore.actions.login(token);
}
export const createLogoutAction = () => {
    dropTokenFromLocalStorage();
    return userStore.actions.logout();
}


export default userStore;

export function userAfterInit(store: Store) {
    const token =  loadTokenFromLocalStorage();
    if ( token ) {
        store.dispatch(userStore.actions.login(token));
    }
}