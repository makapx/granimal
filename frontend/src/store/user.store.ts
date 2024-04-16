import { createSlice, PayloadAction, Store } from "@reduxjs/toolkit";
import { jwtDecode, JwtPayload } from "jwt-decode"
import { UserType } from "../api/types";
import { changeUserPassword, changeUserPicture, createUser, CreateUserParams, dropTokenFromLocalStorage, loadTokenFromLocalStorage, LoginParams, loginUser, storeTokenIntoLocalStorage } from "../api/user.api";
import { useStore } from "react-redux";
import { useLoadAllAction } from "./list.store";

type UserState = {
    user?: UserType & { token: string };
}

const userStore = createSlice({
    name: 'user',
    initialState: {} as UserState,
    reducers: {
        login(_, action: PayloadAction<UserType & { token: string }>) {
            return { user: action.payload }
        },
        logout() {
            return {}
        }
    },
    selectors: {
        isLogged: state => state.user !== undefined
    }
});

/**
 * Creates a factory of login actions
 * @returns 
 */
export const useLoginAction = (store = useStore()) => {
    return async ( params: LoginParams ) => {
        const {token} = await loginUser(params);
        parseAndDispatch(token, store);
        useLoadAllAction(store)();
    }
}
/**
 * Creates a factory of create user actions
 * @param store 
 * @returns 
 */
export const useCreateUserAction = (store = useStore()) => {
    return async ( params: CreateUserParams ) => {
        const {token} = await createUser(params);
        parseAndDispatch(token, store);      
        useLoadAllAction(store)();

    }
}

/**
 * Create a factory of logout actions
 * @param store 
 * @returns 
 */
export const useLogoutAction = (store = useStore()) => {
    return (  ) => {
        dropTokenFromLocalStorage();
        store.dispatch(userStore.actions.logout()); 
    }
}

/**
 * Create a factory of change password actions, once changed, a new token and login will be stored
 * @param store 
 * @returns 
 */
export const useChangePasswordAction = (store = useStore()) => {
    return async (password: string) => {
        const user = selectUser(store.getState());
        if ( user ) {
            const {token} = await changeUserPassword({password}, user.token);
            parseAndDispatch(token, store);
        }
    }
}

/**
 * Create a factory of change password actions, once changed, a new token and login will be stored
 * @param store 
 * @returns 
 */
export const useChangePictureAction = (store = useStore()) => {
    return async (picture: string) => {
        const user = selectUser(store.getState());
        if ( user ) {
            const {token} = await changeUserPicture({picture}, user.token);
            parseAndDispatch(token, store);
        }
    }
}

export default userStore;

/**
 * Parses token and dispatches to the store, returns user with token
 * @param token 
 * @param store 
 * @returns 
 */
function parseAndDispatch(token: string, store: Store) {
    storeTokenIntoLocalStorage(token);
    const payload = jwtDecode(token) as UserType & JwtPayload;
    const user = { ...payload, token };
    store.dispatch(userStore.actions.login(user));
    return user;
}

export function userAfterInit(store: Store) {
    const token =  loadTokenFromLocalStorage();
    if ( token ) {
        const payload = jwtDecode(token) as UserType & JwtPayload;
        store.dispatch(userStore.actions.login({...payload, token}));
    }
}

export const selectToken = (state: any)  => state.user.user?.token;
export const selectUser = (state: any)  => state.user?.user as UserType & { token: string } | undefined;
