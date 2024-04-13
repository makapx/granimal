import { configureStore } from "@reduxjs/toolkit";
import userStore, { createCreateUserAction, createLoginAction, userAfterInit } from "./user.store";

export const store = configureStore({
    reducer: {
        user: userStore.reducer
    },
    middleware: defaultOnes => defaultOnes()
});

userAfterInit(store);

export type { StoreType as StoreState  } from "./type"
export default store;
export { createCreateUserAction, createLoginAction};