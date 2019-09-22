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
    export function type(Ctor, options?) {
        return function (target, propertyKey, descriptor?) {
            var viaProperty = descriptor == null;
            let meta = JsonUtils.resolvePropertyMeta(target, propertyKey);
            meta.Type = Ctor;
            meta.options = options;
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
            meta.Converter = <IJsonConverter>{
                toJson(value) {
                    return JSON.stringify(value);
                },
                fromJson(str) {
                    return JSON.parse(str);
                }
            };
            return descriptor;
        };
    }
}
