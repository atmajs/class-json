import { JsonSettings, IType } from './JsonSettings';
import { IJsonConverter } from './IJsonConverter';
import { JsonUtils } from './JsonUtils';
import { Types } from './Types';
import { JsonDeserializer } from './JsonDeserializer';
import { JsonSerializer } from './JsonSerializer';
import { ModelInfo } from './ModelInfo';


export namespace JsonConvert {
    export function toJson (model, settings?: JsonSettings) {
        console.warn('Obsolete (static toJson) - use toJSON instead');
        return toJSON(model, settings);
    }
    export function toJSON (model, settings?: JsonSettings & IType) {
        if (Types.isArray(model)) {
            return model.map(x => toJSON(x, settings));
        }
        return JsonSerializer.serializeObject(model, settings?.Type, settings);
    }
    export function fromJson (model, settings?: JsonSettings) {
        console.warn('Obsolete (static toJson) - use toJSON instead');
        return toJSON(model, settings);
    }
    export function  fromJSON <T = any> (json, settings?: JsonSettings & IType): T {
        if (Types.isArray(json)) {
            return <any> json.map(x => fromJSON(x, settings));
        }
        let Type = settings?.Type;
        let meta = JsonUtils.pickModelMeta(Type) ?? getMetaFor(Type);
        return JsonDeserializer.deserialize(json, meta, settings);
    }

    export function stringify (instance, settings?: JsonSettings): string {
        let json = toJSON(instance, settings);
        return JSON.stringify(json, null, settings?.space);
    }

    export function parse <T = any> (str: string, settings?: JsonSettings): T {
        let json = JSON.parse(str);
        return fromJSON(json, settings) as T;
    }
}

export const JsonConverters: IJsonConverter[] = [
    {
        name: 'date',
        supports (val, type) {
            return type === Date || val instanceof Date;
        },
        toJSON (val: Date) {
            return val;
        },
        fromJSON (val: string) {
            return typeof val === 'string'
                ? new Date(val)
                : val;
        }
    },
    {
        name: 'regex',
        supports (val, type) {
            return type === RegExp || val instanceof RegExp;
        },
        toJSON (val: RegExp) {
            return val.toString();
        },
        fromJSON (val: string) {
            let pattern = val.substring(1, val.lastIndexOf('/'));
            let flags = val.substring(val.lastIndexOf('/') + 1);
            return new RegExp(pattern, flags);
        }
    }
];

/** Perf: reuse default empty metas */
const DEFAULT_META = <ModelInfo> {
    Type: null,
    properties: {},
    defaults: null
};
function getMetaFor(Type) {
    DEFAULT_META.Type = Type;
    return DEFAULT_META;
}
