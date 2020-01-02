import { ModelInfo } from "./ModelInfo";
import { PropertyInfo } from "./PropertyInfo";
import { IRule } from './validation/IRule';
export namespace JsonUtils {
    export const META_KEY = '__json__';
    export function resolveModelMeta <TAdditional = void> (mix: object | Function): ModelInfo & TAdditional {
        if (mix == null) {
            return null;
        }
        let target = typeof mix === 'function' ? mix.prototype : mix;
        let meta = target[META_KEY];
        if (meta == null) {
            meta = <any> {
                Type: typeof mix === 'function' ? mix : mix.constructor,
                properties: {}
            };
            Object.defineProperty(target, META_KEY, { enumerable: false, configurable: true, value: meta });
        }
        return meta;
    }
    export function pickModelMeta <TAdditional = void> (mix: object | Function): ModelInfo & TAdditional {
        if (mix == null) {
            return null;
        }
        return mix[META_KEY] || (typeof mix === 'function' && mix.prototype[META_KEY]) || null;
    }
    export function hasModelMeta(mix: object | Function): boolean {
        return pickModelMeta(mix) != null;
    }
    export function pickPropertyMeta <TAdditional = void> (target: object | Function, propertyKey: string): PropertyInfo & TAdditional {
        let meta = pickModelMeta <TAdditional> (target);
        return meta?.properties[propertyKey] as any;
    }
    export function resolvePropertyMeta <TAdditional = void> (target: object | Function, propertyKey: string): PropertyInfo & TAdditional {
        let meta: ModelInfo & TAdditional = resolveModelMeta(target);
        let propertyInfo = meta.properties[propertyKey];
        if (propertyInfo == null) {
            propertyInfo = meta.properties[propertyKey] = <PropertyInfo>{
                property: propertyKey,
                rules: null
            };
        }
        return propertyInfo as any;
    }
    export function pickPropertyRules (target: object | Function, propertyKey: string): IRule[] {
        let propInfo = pickPropertyMeta(target, propertyKey);
        return propInfo?.rules;
    }
    export function resolvePropertyRules(target: object | Function, propertyKey: string): IRule[] {
        let propInfo = resolvePropertyMeta(target, propertyKey);
        return propInfo.rules ?? (propInfo.rules = []);
    }
}
