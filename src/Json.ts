import { IJsonConverter } from './IJsonConverter';
import { JsonUtils } from "./JsonUtils";
import { IConstructor } from './JsonSettings';

export namespace Json {
    export function ignore() {
        return function (target, propertyKey, descriptor?) {
            let meta = JsonUtils.resolvePropertyMeta(target, propertyKey);
            meta.jsonIgnore = true;
            return descriptor;
        };
    }
    export function name(name) {
        return function (target, propertyKey, descriptor?) {
            let metaObj = JsonUtils.resolveModelMeta(target);
            if (metaObj.nameMappings == null) {
                metaObj.nameMappings = {}
            }
            let metaProp = JsonUtils.resolvePropertyMeta(target, propertyKey);
            metaProp.jsonName = name;
            metaObj.nameMappings[name] = metaProp;
            return descriptor;
        };
    }
    export function type(Ctor: IConstructor, options?) {
        return function (target, propertyKey, descriptor?) {
            var viaProperty = descriptor == null;
            let meta = JsonUtils.resolvePropertyMeta(target, propertyKey);
            meta.Type = Ctor;
            meta.options = options;
            return descriptor;
        };
    }
    export function defaultValue (val: any) {
        return function (target, propertyKey, descriptor?) {
            let meta = JsonUtils.resolvePropertyMeta(target, propertyKey);
            meta.default = value;
            return descriptor;
        };
    }
    export function array(Ctor: IConstructor, options?) {
        return function (target, propertyKey, descriptor?) {
            let meta = JsonUtils.resolvePropertyMeta(target, propertyKey);
            meta.ArrayType = Ctor;
            meta.options = options;
            return descriptor;
        };
    }
    export function value (mix: any) {
        return function (target, propertyKey, descriptor?) {
            let meta = JsonUtils.resolveModelMeta(target);
            let defs = meta.defaults ?? (meta.defaults = {});
            
            defs[propertyKey] = mix;
            return descriptor;
        };
    }
    export function converter(Converter: Partial<IJsonConverter>) {
        return function (target, propertyKey, descriptor?) {
            let meta = JsonUtils.resolvePropertyMeta(target, propertyKey);
            meta.Converter = Converter;
            return descriptor;
        };
    }
    export function stringify() {
        return function (target, propertyKey, descriptor?) {
            let meta = JsonUtils.resolvePropertyMeta(target, propertyKey);
            meta.Converter = <IJsonConverter> {
                toJSON(mix: string | any) {
                    if (typeof mix === 'string') {
                        return mix;
                    }
                    return JSON.stringify(mix);
                },
                fromJSON(mix: string | any) {
                    if (typeof mix !== 'string') {
                        return mix;
                    }
                    return JSON.parse(mix);
                }
            };
            return descriptor;
        };
    }
}
