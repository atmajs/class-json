declare type TypeName = 'bigint' | 'number' | 'regexp' | 'date' | 'boolean' | 'buffer'
export interface JsonSettings {
    propertyResolver?: 'camelCase' | 'underScore'

    space?: number | string

    types?: {
        [type in TypeName]?: {
            fromJSON? (jsonValue): any
            toJSON? (instanceValue): any
        }
    }
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
