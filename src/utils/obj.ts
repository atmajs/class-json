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

export function obj_getKeys (x): string[] {
    let keys = [];
    let proto = x;
    while (proto != null && proto != Object.prototype) {
        keys.push(
            ...Object.getOwnPropertyNames(proto)
        );
        proto = Object.getPrototypeOf(proto);
    }
    return keys;
}
export function obj_getProperty (obj_: any, path: string) {
    if (obj_ == null) {
        return null;
    }
    if (path.indexOf('.') === -1) {
        return obj_[path];
    }
    var obj = obj_,
        chain = path.split('.'),
        imax = chain.length,
        i = -1;
    while ( obj != null && ++i < imax ) {
        let key = chain[i];
        obj = obj[key];
    }
    return obj;
};