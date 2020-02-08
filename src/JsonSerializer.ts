import { JsonSettings, IConstructor } from './JsonSettings';
import { JsonUtils } from './JsonUtils';
import { PropertyInfo } from './PropertyInfo';
import { Types } from './Types';
import { JsonConverters, JsonConvert } from './JsonConvert';
import { is_rawObject } from './utils/is';
import { IJsonConverter } from './IJsonConverter';


export namespace JsonSerializer {

    // export function serialize (x: any, Type: IConstructor, Converter: IJsonConverter, settings: JsonSettings) {
    //     if (Converter?.toJSON) {
    //         return Converter.toJSON(x, settings);
    //     }
    //     if (Types.isValueType(x)) {
    //         return x;
    //     }
    //     if (Types.isArray(x)) {
    //         let arr = new Array(x.length);
            
    //         for (let i = 0; i < x.length; i++) {
    //             arr[i] = serialize(x, info.ArrayType, settings);
    //         }
    //         return arr;
    //     }
    // }

    export function serializeObject(model: any, Type: IConstructor, settings: JsonSettings) {
        let meta = JsonUtils.pickModelMeta(model) ?? JsonUtils.pickModelMeta(Type);
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
            let property = toJsonName(key, propertyInfo, settings);
            let val = toJsonValue(modelVal, propertyInfo, settings);
            json[property] = val;
        }
        return json;
    }

    export function toJsonValue(val: any, info: PropertyInfo, settings: JsonSettings) {
        if (info?.Converter?.toJSON) {
            return info.Converter.toJSON(val, settings);
        }
        if (Types.isValueType(val)) {
            return val;
        }
        if (Types.isArray(val)) {
            let arr = new Array(val.length);
            
            for (let i = 0; i < val.length; i++) {
                arr[i] = serializeObject(val[i], info.ArrayType, settings);
            }
            return arr;
        }
        if (is_rawObject(val)) {
            let obj = Object.create(null);
            for (let key in val) {
                obj[key] = JsonSerializer.toJsonValue(val[key], null, settings);
            }
            return obj;
        }
        let type = info?.Type ?? val.constructor;
        let converter = JsonConverters.find(x => x.supports(val, type));
        if (converter) {
            return converter.toJSON(val, settings);
        }
        if (JsonUtils.hasModelMeta(val)) {
            return JsonConvert.toJSON(val, settings);
        }
        return val;
    }
    export function toJsonName(key: string, info: PropertyInfo, settings: JsonSettings) {
        if (info?.jsonName != null) {
            return info.jsonName;
        }
        let type = settings?.propertyResolver;
        if (type == null) {
            return key;
        }
        if (type === 'camelCase') {
            return key.replace(/(_+)(\w)/g, (full, underscore, letter, i) => {
                if (i === 0) {
                    return full;
                }
                return letter.toUpperCase()
            });
        }
        if (type === 'underScore') {
            return key
                .replace(/^([A-Z])/, (full, letter) => `${letter.toLowerCase()}`)
                .replace(/([A-Z])/g, (full, letter, i) => {
                    if (i === 0) {
                        return full;
                    }
                    return `_${letter.toLowerCase()}`;
                });
        }
        throw new Error(`Invalid propertyResolver name: ${type}`);
    }
}
