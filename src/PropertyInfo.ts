import { IJsonConverter } from './IJsonConverter';
import { IRule } from './validation/IRule';
import { IConstructor } from './JsonSettings';
export interface PropertyInfo {
    property?: string;
    jsonIgnore?: boolean;
    jsonName?: string;
    Type?: IConstructor;
    ArrayType?: IConstructor;
    MapType?: Function;
    Converter?: Partial<IJsonConverter>;
    rules?: IRule[]
    options?: any
}
