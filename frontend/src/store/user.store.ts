import { createSlice, PayloadAction, Store } from "@reduxjs/toolkit";
import { jwtDecode, JwtPayload } from "jwt-decode"
import { UserType } from "../api/types";
import { createUser, CreateUserParams, dropTokenFromLocalStorage, loadTokenFromLocalStorage, LoginParams, loginUser, storeTokenIntoLocalStorage } from "../api/user.api";
import { useStore } from "react-redux";

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
 * Creates a function that would request, then dispatch to store user's
 * @returns 
 */
export const useLoginAction = () => {
    const store = useStore();
    return async ( params: LoginParams ) => {
        const {token} = await loginUser(params);
        storeTokenIntoLocalStorage(token);

        const payload = jwtDecode(token) as UserType & JwtPayload;
        store.dispatch(userStore.actions.login({...payload, token}));        
    }
}

export const useCreateUserAction = () => {
    const store = useStore();
    return async ( params: CreateUserParams ) => {
        const {token} = await createUser(params);
        storeTokenIntoLocalStorage(token);

        const payload = jwtDecode(token) as UserType & JwtPayload;
        store.dispatch(userStore.actions.login({...payload, token}));        
       
    }
}

export const useLogoutAction = () => {
    const store = useStore();
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
