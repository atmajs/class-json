export function is_rawObject(x): x is object{
    return x != null && typeof x === 'object' && x.constructor === Object;
}

export function is_Array<T = any>(arr): arr is T[] {
    return (
        arr != null &&
        typeof arr === 'object' &&
        typeof arr.length === 'number' &&
        typeof arr.slice === 'function'
    );
}