import { JsonSettings } from './JsonSettings';
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
    export function toJSON (model, settings?: JsonSettings) {
        if (Types.isArray(model)) {
            return model.map(x => toJSON(x, settings));
        }
        let meta = JsonUtils.pickModelMeta(model) ?? JsonUtils.pickModelMeta(settings?.Type);
        let json = Object.create(null);
       
        for (let key in model) {
            let propertyInfo = meta?.properties[key];
            if (propertyInfo != null && propertyInfo.jsonIgnore) {
                continue;
            }
            let modelVal = model[key];
            if (typeof modelVal === 'function') {
                continue;
            }
            let property = JsonSerializer.toJsonName(key, propertyInfo, settings);
            let val = JsonSerializer.toJsonValue(modelVal, propertyInfo, settings);
            json[property] = val;
        }
        return json;
    }
    export function fromJson (model, settings?: JsonSettings) {
        console.warn('Obsolete (static toJson) - use toJSON instead');
        return toJSON(model, settings);
    }
    export function  fromJSON <T> (json, settings?: JsonSettings) {
        if (Types.isArray(json)) {
            return json.map(x => fromJSON(x, settings));
        }
        let Type = settings?.Type;
        let meta = JsonUtils.pickModelMeta(Type) || getMetaFor(Type);
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
        supports (val, type) {
            return type === Date || val instanceof Date;
        },
        toJSON (val: Date) {
            return val.toISOString();
        },
        fromJSON (val: string) {
            return new Date(val);
        }
    },
    {
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