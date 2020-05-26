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

function keysToObj<T>(keys: (keyof T)[]) {
    if (keys == null) {
        return null;
    }
    let obj = Object.create(null);
    for (let i = 0; i < keys.length; i++) {
        obj[keys[i]] = 1;
    }
    return obj;
}
export function obj_map<T extends object, TOut = any>(source: T | T[], mapper: IMapper<T>) {
    if (source == null || typeof source !== 'object') {
        return source;
    }
    if (Array.isArray(source)) {
        return source.map(x => obj_map(x, mapper));
    }

    let out: TOut = Object.create(null);
    let excludeProps: Partial<T> = keysToObj(mapper?.exclude);
    let includeProps: Partial<T> = keysToObj(mapper?.include);

    for (let key in source) {
        let val = source[key];
        if (val == null) {
            continue;
        }
        if (excludeProps != null && key in excludeProps === true) {
            continue;
        }
        if (includeProps != null && key in includeProps !== true) {
            continue;
        }
        let info = mapper?.props?.[key];
        if (info?.ignore) {
            continue;
        }
        let name = info?.name ?? key;
        if (info?.map) {
            out[name] = info?.map(<any> val);
            continue;
        }
        if (typeof val === 'object' && info != null && (info.exclude || info.include || info.props)) {
            val = obj_map<any>(<any> val, info);
        }
        out[name] = val;
    }
    return out;
}


export interface IMapper<T> {
    ignore?: boolean
    exclude?: (keyof T)[]
    include?: (keyof T)[]
    props?: {
        [key in keyof T]?: IPropMapper<T[key]>
    }
}
export interface IPropMapper<T> extends IMapper<T> {
    ignore?: boolean
    name?: string
    map? (x: T): any
}
