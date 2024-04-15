import { createSlice, PayloadAction, Store } from "@reduxjs/toolkit";
import { jwtDecode, JwtPayload } from "jwt-decode"
import { UserType } from "../api/types";
import { createUser, CreateUserParams, dropTokenFromLocalStorage, loadTokenFromLocalStorage, LoginParams, loginUser, storeTokenIntoLocalStorage } from "../api/user.api";
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
    },

})

/**
 * Creates a factory of login actions
 * @returns 
 */
export const useLoginAction = (store = useStore()) => {
    return async ( params: LoginParams ) => {
        const {token} = await loginUser(params);
        storeTokenIntoLocalStorage(token);

        const payload = jwtDecode(token) as UserType & JwtPayload;
        store.dispatch(userStore.actions.login({...payload, token}));        
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
        storeTokenIntoLocalStorage(token);

        const payload = jwtDecode(token) as UserType & JwtPayload;
        store.dispatch(userStore.actions.login({...payload, token}));        
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

export default userStore;

export function userAfterInit(store: Store) {
    const token =  loadTokenFromLocalStorage();
    if ( token ) {
        const payload = jwtDecode(token) as UserType & JwtPayload;
        store.dispatch(userStore.actions.login({...payload, token}));
    }
}

export const selectToken = (state: any)  => state.user.user?.token;
export const selectUser = (state: any)  => state.user?.user as UserType & { token: string } | undefined;
