import { JsonSettings } from './JsonSettings';
import { JsonUtils } from './JsonUtils';
import { PropertyInfo } from './PropertyInfo';
import { ModelInfo } from './ModelInfo';
import { Types } from './Types';
import { JsonConverters } from './JsonConvert';
import { Serializable } from './Serializable';
import { JsonSerializer } from './JsonSerializer';
import { IJsonConverter } from './IJsonConverter';

export namespace JsonDeserializer {
    export function deserialize(json, meta: ModelInfo, settings: JsonSettings) {
        let model = fromJsonToModel(json, meta, settings);
        if (meta.Type) {
            let Mix = meta.Type as any;
            if (Mix.fromJSON && Mix.fromJSON !== Serializable.fromJSON) {
                return Mix.fromJSON(model);
            }
            let instance = new Mix();
            if (instance.fromJSON && instance.fromJSON !== Serializable.fromJSON) {
                instance.fromJSON(model);
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
        if (Types.isArray(json)) {
            return json.map(value => fromJsonToModel(value, meta, settings));
        }
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
        let Type = info?.Type;
        if (Type != null) {
            if (Type === Number) {
                return typeof val === 'number'
                    ? val
                    : Number(val);
            }
            if (Type === String) {
                return typeof val === 'string'
                    ? val
                    : String(val);
            }
            if (Type === Boolean) {
                if (typeof val === 'string') {
                    if (val === '0' || val === 'false') {
                        return false;
                    }
                }
                return Boolean(val);
            }
            if (Type === $BigInt) {
                return typeof val === 'bigint'
                    ? val
                    : BigInt(val);
            }
            let converter:IJsonConverter = null;
            for (let i = 0; i < JsonConverters.length; i++) {
                if (JsonConverters[i].supports(val, Type)) {
                    converter = JsonConverters[i];
                    break;
                }
            }
            if (converter) {
                return converter.fromJSON(val, settings);
            }
            let meta = JsonUtils.pickModelMeta(Type);
            if (meta) {
                console.log('META', meta);
                return deserialize(val, meta, settings);
            }
            let Ctor = Type as any;
            return new Ctor(val);
        }
        let Meta = info?.Meta;
        if (Meta) {
            return deserialize(val, Meta, settings)
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


const $BigInt = typeof BigInt !== 'undefined' ? BigInt : null;
