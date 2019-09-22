import { PropertyInfo } from './PropertyInfo';
export interface ModelInfo<T = any> {
    Type: new (...args) => T;
    properties: {
        [name: string]: PropertyInfo;
    };
}
