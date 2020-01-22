export function obj_clone <T> (source: T): T {
    if (source == null || typeof source !== 'object') {
        return source;
    }
    if (Array.isArray(source)) {
        let arr = source;
        let out = new Array(arr.length);
        for (let i = 0; i < arr.length; i++) {
            out[i] = obj_clone(arr[i]);
        }
        return out as any as T;
    }
    let Ctor = source.constructor;
    if (Ctor === Object) {
        let obj = {} as T;
        for (let key in source) {
            obj[key] = obj_clone(source[key]);
        }
        return obj;
    }
    return source;
}