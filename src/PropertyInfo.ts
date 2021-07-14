import { IJsonConverter } from './IJsonConverter';
import { IRule } from './validation/IRule';
import { IConstructor, IFunction } from './JsonSettings';
import { ModelInfo } from './ModelInfo';
export interface PropertyInfo {
    description?: string
    property?: string;
    jsonIgnore?: boolean;
    jsonName?: string;
    Type?: IConstructor | IFunction;
    Meta?: ModelInfo
    ArrayType?: IConstructor | IFunction;
    MapType?: Function;
    Converter?: Partial<IJsonConverter>;
    rules?: IRule[]
    default?: any
    options?: any
}
