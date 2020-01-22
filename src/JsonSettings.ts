export interface JsonSettings {
    propertyResolver?: 'camelCase' | 'underScore'
    Type?: new (...args) => any

    space?: number | string 
}
