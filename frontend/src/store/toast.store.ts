import { Store, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { useStore } from "react-redux";

export type ToastType = {
    id: number;
    title: string;
    message: string;
};

const nextId = ((() => {
    let i = 1;
    return () => i++;
})());

const toastAdapter = createEntityAdapter<ToastType>({
});

export const toastsStore = createSlice({
    name: 'toasts',
    initialState: toastAdapter.getInitialState(),
    reducers: {
        addOne: toastAdapter.addOne,
        removeOne: toastAdapter.removeOne,
        removeAll: toastAdapter.removeAll
    },
    selectors: {
        select: toastAdapter.getSelectors().selectAll
    }
})

export default toastsStore;

/**
 * Creates a store factory
 * @param store 
 * @returns 
 */
export const useCreateToastAction = (store: Store = useStore()) => {
    return (data: Omit<ToastType, 'id'>, timeout: number = 0) => {
        const id = nextId();
        store.dispatch(toastsStore.actions.addOne({ id, ...data }));
        if (timeout > 0) {
            const removeAction = toastsStore.actions.removeOne(id);
            setTimeout(() => store.dispatch(removeAction), timeout);
        }
        return id;
    }
}

export const useCloseToastAction = (store = useStore()) => {
    return (id: number) => store.dispatch(toastsStore.actions.removeOne(id));
}

export const selectToasts = toastsStore.selectors.select;