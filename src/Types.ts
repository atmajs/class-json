import { is_ArrayLike } from 'atma-utils';
export namespace Types {
    export function isValueType(x) {
        return x == null || typeof x !== 'object';
    }
    export function isArray(x): x is any[] {
        return is_ArrayLike(x);
    }
    export function isObject(x): x is object {
        return x != null && typeof x === 'object' && is_ArrayLike(x) === false;
    }
}
