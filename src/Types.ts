import { is_Array } from './utils/is';

export namespace Types {
    export function isValueType(x) {
        return x == null || typeof x !== 'object';
    }
    export function isArray(x): x is any[] {
        return is_Array(x);
    }
    export function isObject(x): x is object {
        return x != null && typeof x === 'object' && is_Array(x) === false;
    }
}
