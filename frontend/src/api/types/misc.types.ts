export type WithPagination<T extends {}> = T & { limit?: number, offset?: number };
export type ArrayResult<T> = {
    data: Array<T>;
    hasNext: boolean;
};