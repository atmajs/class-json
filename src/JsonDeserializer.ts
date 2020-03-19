import { JsonSettings } from './JsonSettings';
import { JsonUtils } from './JsonUtils';
import { PropertyInfo } from './PropertyInfo';
import { ModelInfo } from './ModelInfo';
import { Types } from './Types';
import { JsonConverters } from './JsonConvert';
import { Serializable } from './Serializable';
import { JsonSerializer } from './JsonSerializer';
export namespace JsonDeserializer {
    export function deserialize(json, meta: ModelInfo, settings: JsonSettings) {
        let model = fromJsonToModel(json, meta, settings);
        if (meta.Type) {
            let Mix = meta.Type as any;
            if (Mix.fromJson && Mix.fromJson !== Serializable.fromJson) {
                return Mix.fromJson(model);
            }
            let instance = new Mix();
            if (instance.fromJson && instance.fromJson !== Serializable.fromJson) {
                instance.fromJson(model);
                return instance;
            }
            for (let key in model) {
                instance[key] = model[key];;
            }
            return instance;
        }
        return model;
    }
    export function fromJsonToModel(json, meta: ModelInfo, settings: JsonSettings) {
        var model = Object.create(null);
        for (let key in json) {
            let property = resolveName(key, meta.nameMappings, meta, settings);
            let info = meta?.properties[property];
            let value = resolveValue(json[key], info, settings);
            model[property] = value;
        }
        
        return model;
    }
    export function resolveValue(val: any, info: PropertyInfo, settings: JsonSettings) {
        if (info?.Converter?.fromJSON) {
            return info.Converter.fromJSON(val, settings);
        }
        if (info?.Type) {
            let converter = JsonConverters.find(x => x.supports(val, info.Type));
            if (converter) {
                return converter.fromJSON(val, settings);
            }
            let meta = JsonUtils.pickModelMeta(info.Type);
            if (meta) {
                return deserialize(val, meta, settings);
            }
            let Ctor = info.Type as any;
            return new Ctor(val);
        }
        if (Types.isValueType(val)) {
            return val;
        }
        if (Types.isArray(val)) {
            let out = new Array(val.length);
            let arrayType = info?.ArrayType;
            let converter = info?.Converter;
            let itemInfo = <PropertyInfo> {
                Type: arrayType,
                Converter: converter
            };
            for (let i = 0; i < val.length; i++) {
                out[i] = resolveValue(val[i], itemInfo, settings);
            }
            return out;
        }
        return val;
    }
    export function resolveName(key: string, mappings: {
        [jsonKey: string]: PropertyInfo;
    }, meta: ModelInfo, settings: JsonSettings) {
        
        let info = mappings?.[key];
        if (info != null) {
            return info.property;
        }
        return JsonSerializer.toJsonName(key, info, settings);
    }
}
