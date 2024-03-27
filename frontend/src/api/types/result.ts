export type ArrayResult<T> = {
    result: Array<T>;
    hasNext: boolean;
}

export type WithPagination<T> = T & {
    page?: number;
    size?: number;
}