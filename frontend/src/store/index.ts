import { configureStore } from "@reduxjs/toolkit";
import userStore, { userAfterInit, useCreateUserAction, useLoginAction, useLogoutAction, useChangePasswordAction, useChangePictureAction, selectUser } from "./user.store";
import listStore, { useLoadAllAction, usePutIntoListAction, useRemoveFromListAction, listAfterInit, selectors as listSelector } from "./list.store"
export const store = configureStore({
    reducer: {
        user: userStore.reducer,
        list: listStore.reducer
    },
    middleware: defaultOnes => defaultOnes()
});

userAfterInit(store);
listAfterInit(store);

export type StoreType = ReturnType<typeof store.getState>;

export default store;

export { useCreateUserAction, useLoginAction, useLogoutAction, useChangePasswordAction, useChangePictureAction, selectUser };
export { useLoadAllAction, usePutIntoListAction, useRemoveFromListAction, listSelector }