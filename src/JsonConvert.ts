import { JsonSettings } from './JsonSettings';
import { IJsonConverter } from './IJsonConverter';
import { JsonUtils } from './JsonUtils';
import { Types } from './Types';
import { JsonDeserializer } from './JsonDeserializer';
import { JsonSerializer } from './JsonSerializer';


export namespace JsonConvert {
    export function toJson (model, settings?: JsonSettings) {
        if (Types.isArray(model)) {
            return model.map(x => toJson(x, settings));
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
    export function  fromJson <T> (json, settings?: JsonSettings) {
        if (Types.isArray(json)) {
            return json.map(x => fromJson(x, settings));
        }
        let Type = settings?.Type;
        let meta = JsonUtils.pickModelMeta(Type) || { Type, properties: {} };
        return JsonDeserializer.deserialize(json, meta, settings);
    }
}

export const JsonConverters: IJsonConverter[] = [
    {
        supports (val, type) {
            return type === Date || val instanceof Date;
        },
        toJson (val: Date) {
            return val.toISOString();
        },
        fromJson (val: string) {
            return new Date(val);
        }
    },
    {
        supports (val, type) {
            return type === RegExp || val instanceof RegExp;
        },
        toJson (val: RegExp) {
            return val.toString();
        },
        fromJson (val: string) {
            let pattern = val.substring(1, val.lastIndexOf('/'));
            let flags = val.substring(val.lastIndexOf('/') + 1);
            return new RegExp(pattern, flags);
        }
    }
]


