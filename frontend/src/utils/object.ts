export function cullUndefined<T extends Object>(obj: T): Partial<T> {
    return Object.entries(obj).
        reduce((obj, [key, value]) => value !== undefined ? ({ ...obj, [key]: value }) : obj, {});
}