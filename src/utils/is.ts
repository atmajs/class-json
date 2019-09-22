export function is_rawObject(x): x is object{
    return x != null && typeof x === 'object' && x.constructor === Object;
}