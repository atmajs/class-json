import { IJsonConverter } from './IJsonConverter';
import { IRule } from './validation/IRule';
export interface PropertyInfo {
    property?: string;
    jsonIgnore?: boolean;
    jsonName?: string;
    Type?: Function;
    ArrayType?: Function;
    MapType?: Function;
    Converter?: Partial<IJsonConverter>;
    rules?: IRule[]
    options?: any
}
