import { IJsonConverter } from './IJsonConverter';
import { JsonUtils } from "./JsonUtils";

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
            let meta = JsonUtils.resolvePropertyMeta(target, propertyKey);
            meta.jsonName = name;
            return descriptor;
        };
    }
    export function type(Ctor: Function, options?) {
        return function (target, propertyKey, descriptor?) {
            var viaProperty = descriptor == null;
            let meta = JsonUtils.resolvePropertyMeta(target, propertyKey);
            meta.Type = Ctor;
            meta.options = options;
            return descriptor;
        };
    }
    export function array(Ctor: Function, options?) {
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
                    return JSON.stringify(value);
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
