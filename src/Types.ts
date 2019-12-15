import { is_Array } from './utils/is';

export namespace Types {
    export function isValueType(x) {
        return x == null || typeof x !== 'object';
    }
    export function isArray(x): x is any[] {
        return is_Array(x);
    }
    export function isObject(x): x is object {
        if (x == null || typeof x !== 'object') {
            return false;
        }
        if (is_Array(x)) {
            return false;
        }
        if (x instanceof Date || 
            x instanceof RegExp || 
            x instanceof Number || 
            x instanceof String) {

                return false;
            }

        return true;
    }
}
