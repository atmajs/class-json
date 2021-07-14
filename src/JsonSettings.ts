export interface JsonSettings {
    propertyResolver?: 'camelCase' | 'underScore'

    space?: number | string
}
export interface IType {
    Type?: IConstructor | IFunction
}
export interface IConstructor {
    new (...args): any
}
export interface IFunction {
    (...args): any
}
