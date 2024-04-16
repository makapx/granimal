import { Store, createEntityAdapter, createSlice, isPlainObject } from "@reduxjs/toolkit";
import { TrackingList } from "../api/types/tracking-list";
import { deleteFromList, getList, putIntoList } from "../api/list.api";
import { selectUser } from "./user.store";
import { useStore } from "react-redux";

const ANONYMOUS_LIST_KEY = 'GRANIMAL_ANONYM_LIST';

// @ts-expect-error redux is cursed
const listAdapter = createEntityAdapter<TrackingList>({
    selectId: entity => entity.animeId,
    sortComparer: compareTrackingListEntity
});

export const listStore = createSlice({
    name: 'list',
    initialState: listAdapter.getInitialState(),
    reducers: {
        setOne: listAdapter.setOne,
        removeOne: listAdapter.removeOne,
        setAll: listAdapter.setAll
    },
    selectors: { ...listAdapter.getSelectors() }
});
export default listStore;

/**
 * Creates a factory of put into list actionss
 * @param store 
 * @returns 
 */
export const usePutIntoListAction = (store = useStore()) => {
    return async (trackingList: TrackingList) => {
        const user = selectUser(store.getState());
        if (user)
            await putIntoList(user.token, trackingList);
        store.dispatch(listStore.actions.setOne({ ...trackingList, userId: user?.id }))
    }
}

/**
 * Creates a factory of remove from list actions
 * @param store 
 * @returns 
 */
export const useRemoveFromListAction = (store = useStore()) => {
    return async (trackingList: TrackingList) => {
        const id = isPlainObject(trackingList) ? trackingList.animeId : trackingList;
        const user = selectUser(store.getState());
        if (user)
            await deleteFromList(user.token, id);
        store.dispatch(listStore.actions.removeOne(id))
    }
}

/**
 * Creates a factory of load all actions
 * @param store 
 * @returns 
 */
export const useLoadAllAction = (store: Store = useStore()) => {
    return async () => {
        const user = selectUser(store.getState());
        if (user) {
            const list = await getList(user.id as number);
            return store.dispatch(listStore.actions.setAll(list));
        }
        else {
            try {
                const list = localStorage.getItem(ANONYMOUS_LIST_KEY);
                if (list) {
                    return store.dispatch(listStore.actions.setAll(JSON.parse(list)));
                }

            }
            catch (error) {
                console.error(error)
            }
            return store.dispatch(listStore.actions.setAll([]));

        }
    }
}


function compareTrackingListEntity(a: TrackingList, b: TrackingList) {
    return (new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
}

export const selectors = listStore.getSelectors();

/**
 * Dispatches actions and subscribes for changes, stores changes of offline users into localStorage
 * @param store 
 */
export function listAfterInit(store: Store) {
    useLoadAllAction(store)()
        .then(action => store.dispatch(action));

    store.subscribe(() => {
        const state = store.getState();
        const notLogged = !selectUser(state);

        const list = selectors.selectAll(state.list).filter(e => e.userId === undefined);

        if (notLogged && list.length > 0) {
            localStorage.setItem(ANONYMOUS_LIST_KEY, JSON.stringify(list));
        }
    })
}