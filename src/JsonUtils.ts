import { ModelInfo } from "./ModelInfo";
import { PropertyInfo } from "./PropertyInfo";
import { IRule } from './validation/IRule';
import { obj_clone, obj_map } from './utils/obj';
export namespace JsonUtils {
    export const META_KEY = '__json__';
    export function resolveModelMeta <TAdditional = void> (mix: object | Function): ModelInfo & TAdditional {
        if (mix == null) {
            return null;
        }
        let target = typeof mix === 'function' ? mix.prototype : mix;
        let meta = target[META_KEY];
        if (meta != null) {
            if (target.hasOwnProperty(META_KEY) === false) {
                // was inherited
                meta = obj_clone(meta);
                meta.Type = mix;
                Object.defineProperty(target, META_KEY, {
                    enumerable: false,
                    configurable: true,
                    value: meta
                });
            }
        }
        if (meta == null) {
            meta = <any> {
                Type: typeof mix === 'function' ? mix : mix.constructor,
                properties: {}
            };
            Object.defineProperty(target, META_KEY, {
                enumerable: false,
                configurable: true,
                value: meta,
             });
        }
        return meta;
    }
    export function pickModelMeta <TAdditional = {}> (mix: any | Function): ModelInfo & TAdditional {
        if (mix == null) {
            return null;
        }
        let isFn = typeof mix === 'function';
        if (isFn && mix === Object) {
            return null;
        }
        if (isFn) {
            return mix.prototype[META_KEY] || null;
        }
        return mix[META_KEY] || null;
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

    /** For environments without @decorator support. The deco methods for each field can be listed extra */
    export function decorate <T extends new (...args: any) => any> (Ctor: T, fields: { [key in InstanceType<T>]: Function[] } ): T {
        for (let field in fields) {
            decorateFromTs(fields[field], Ctor, field, void 0);
        }
        return Ctor;
    }

    export const map = obj_map;


    function decorateFromTs (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof (Reflect as any).decorate === "function") r = (Reflect as any).decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
}
