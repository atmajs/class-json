import { JsonSettings } from './JsonSettings';
import { JsonUtils } from './JsonUtils';
import { PropertyInfo } from './PropertyInfo';
import { Types } from './Types';
import { JsonConverters, JsonConvert } from './JsonConvert';
import { is_rawObject } from './utils/is';


export namespace JsonSerializer {
    export function resolveValue(val: any, info: PropertyInfo, settings: JsonSettings) {
        if (Types.isValueType(val)) {
            return val;
        }
        if (info && info.Converter && info.Converter.toJson) {
            return info.Converter.toJson(val, info, settings);
        }
        if (Types.isArray(val)) {
            let arr = new Array(val.length);
            for (let i = 0; i < val.length; i++) {
                arr[i] = JsonSerializer.resolveValue(val[i], info, settings);
            }
            return arr;
        }
        if (is_rawObject(val)) {
            let obj = Object.create(null);
            for (let key in val) {
                obj[key] = JsonSerializer.resolveValue(val[key], null, settings);
            }
            return obj;
        }
        let type = info && info.Type || val.constructor;
        let converter = JsonConverters.find(x => x.supports(val, type));
        if (converter) {
            return converter.toJson(val, info, settings);
        }
        if (JsonUtils.hasModelMeta(val)) {
            return JsonConvert.toJson(val, settings);
        }
        return val;
    }
    export function resolveName(key: string, info: PropertyInfo, settings: JsonSettings) {
        if (info && info.jsonName != null) {
            return info.jsonName;
        }
        let type = settings && settings.propertyResolver || 'camelCase';
        if (type === 'camelCase') {
            return key.replace(/(?<=.)_(\w)/g, (full, letter) => letter.toUpperCase());
        }
        if (type === 'underScore') {
            return key
                .replace(/^([A-Z])/, (full, letter) => `${letter.toLowerCase()}`)
                .replace(/(?<=.)([A-Z])/g, (full, letter) => `_${letter.toLowerCase()}`);
        }
        throw new Error(`Invalid propertyResolver name: ${type}`);
    }
}
