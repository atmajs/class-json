import { PropertyInfo } from './PropertyInfo';

export interface ModelInfo<T = any> {
    description?: string

    Type: new (...args) => T;

    nameMappings: {
        [jsonKey: string]: PropertyInfo;
    };
    properties: {
        [name in keyof T]: PropertyInfo;
    };
    defaults: {
        [name in keyof T]: any;
    }
}
