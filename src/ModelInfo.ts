import { PropertyInfo } from './PropertyInfo';
export interface ModelInfo<T = any> {
    Type: new (...args) => T;
    properties: {
        [name in keyof T]: PropertyInfo;
    };
    defaults: {
        [name in keyof T]: any;
    }
}