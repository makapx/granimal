import { configureStore } from "@reduxjs/toolkit";
import userStore, { userAfterInit, useCreateUserAction, useLoginAction, useLogoutAction, useChangePasswordAction, useChangePictureAction, selectUser } from "./user.store";
import listStore, { useLoadAllAction, usePutIntoListAction, useRemoveFromListAction, listAfterInit, selectors as listSelector } from "./list.store"
import toastsStore, {useCloseToastAction, useCreateToastAction, ToastType, selectToasts  } from "./toast.store";
export const store = configureStore({
    reducer: {
        user: userStore.reducer,
        list: listStore.reducer,
        toasts: toastsStore.reducer
    },
    middleware: defaultOnes => defaultOnes()
});
type StoreType = ReturnType<typeof store.getState>;

userAfterInit(store);
listAfterInit(store);

export default store;

export { useCreateUserAction, useLoginAction, useLogoutAction, useChangePasswordAction, useChangePictureAction, selectUser };
export { useLoadAllAction, usePutIntoListAction, useRemoveFromListAction, listSelector }
export { useCloseToastAction , useCreateToastAction , selectToasts}

export type { ToastType  , StoreType };