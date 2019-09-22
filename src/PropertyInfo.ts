import { IJsonConverter } from './IJsonConverter';
export interface PropertyInfo {
    property?: string;
    jsonIgnore?: boolean;
    jsonName?: string;
    Type?: Function;
    ArrayType?: Function;
    MapType?: Function;
    Converter?: Partial<IJsonConverter>;

    options?: any
}
