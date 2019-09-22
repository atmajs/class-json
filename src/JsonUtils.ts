import { ModelInfo } from "./ModelInfo";
import { PropertyInfo } from "./PropertyInfo";
export namespace JsonUtils {
    export const META_KEY = '__json__';
    export function pickModelMeta(mix: object | Function): ModelInfo {
        return mix[META_KEY] || (typeof mix === 'function' && mix.prototype[META_KEY]) || null;
    }
    export function hasModelMeta(mix: object | Function): boolean {
        return pickModelMeta(mix) != null;
    }
    export function resolvePropertyMeta(target: object | Function, propertyKey: string): PropertyInfo {
        let meta = target[META_KEY];
        if (meta == null) {
            meta = {
                Type: typeof target === 'function' ? target : target.constructor,
                properties: {}
            };
            Object.defineProperty(target, META_KEY, { enumerable: false, configurable: true, value: meta });
        }
        let propertyInfo = meta.properties[propertyKey];
        if (propertyInfo == null) {
            propertyInfo = meta.properties[propertyKey] = <PropertyInfo>{
                property: propertyKey
            };
        }
        return propertyInfo;
    }
}
