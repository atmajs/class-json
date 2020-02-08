export interface JsonSettings {
    propertyResolver?: 'camelCase' | 'underScore'

    space?: number | string 
}
export interface IType {
    Type?: IConstructor
}
export interface IConstructor {
    new (...args): any
}