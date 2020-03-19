import { IJsonConverter } from './IJsonConverter';
import { IRule } from './validation/IRule';
import { IConstructor } from './JsonSettings';
export interface PropertyInfo {
    description?: string
    property?: string;
    jsonIgnore?: boolean;
    jsonName?: string;
    Type?: IConstructor;
    ArrayType?: IConstructor;
    MapType?: Function;
    Converter?: Partial<IJsonConverter>;
    rules?: IRule[]
    default?: any
    options?: any
}
