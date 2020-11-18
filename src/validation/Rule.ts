import { JsonUtils } from "../JsonUtils";
import { Required } from './rules/Required';
import { MinLength, MaxLength } from './rules/Length';
import { Pattern } from './rules/Pattern';
import { Custom } from './rules/Custom';
import { Minimum, Maximum } from './rules/Number';
import { StringEnum } from './rules/String';
import { TRuleInfo, IRuleInfo } from './RuleBase';
import { PropertyInfo } from '../PropertyInfo';

export namespace Rule {


    export function required(message?: string)
    export function required(opts?: IRuleInfo)
    export function required(mix?: any) {
        return function (target, propertyKey, descriptor?) {
            let rules = JsonUtils.resolvePropertyRules(target, propertyKey);
            let rule = new Required(propertyKey, mix);
            rules.unshift(rule);
            return descriptor;
        };
    }
    export function minLength(count: number, message?: string)
    export function minLength(count: number, opts?: IRuleInfo)
    export function minLength(count: number, mix?: any) {
        return function (target, propertyKey, descriptor?) {
            let rules = JsonUtils.resolvePropertyRules(target, propertyKey);
            let rule = new MinLength(propertyKey, count, mix);
            rules.unshift(rule);
            return descriptor;
        };
    }
    export function maxLength(count: number, message?: string)
    export function maxLength(count: number, opts?: IRuleInfo)
    export function maxLength(count: number, mix?: any) {
        return function (target, propertyKey, descriptor?) {
            let rules = JsonUtils.resolvePropertyRules(target, propertyKey);
            let rule = new MaxLength(propertyKey, count, mix);
            rules.unshift(rule);
            return descriptor;
        };
    }

    export function minimum(val: number, message?: string)
    export function minimum(val: number, opts?: IRuleInfo)
    export function minimum(val: number, mix?) {
        return function (target, propertyKey, descriptor?) {
            let rules = JsonUtils.resolvePropertyRules(target, propertyKey);
            let rule = new Minimum(propertyKey, val, mix);
            rules.unshift(rule);
            return descriptor;
        };
    }

    export function maximum(val: number, message?: string)
    export function maximum(val: number, opts?: IRuleInfo)
    export function maximum(val: number, mix?) {
        return function (target, propertyKey, descriptor?) {
            let rules = JsonUtils.resolvePropertyRules(target, propertyKey);
            let rule = new Maximum(propertyKey, val, mix);
            rules.unshift(rule);
            return descriptor;
        };
    }

    export function pattern(pattern: string | RegExp, message?: string)
    export function pattern(pattern: string | RegExp, opts?: IRuleInfo)
    export function pattern(pattern: string | RegExp, mix?) {
        if (typeof pattern === 'string') {
            pattern = new RegExp(pattern);
        }
        return function (target, propertyKey, descriptor?) {
            let rules = JsonUtils.resolvePropertyRules(target, propertyKey);
            let rule = new Pattern(propertyKey, pattern as RegExp, mix);
            rules.unshift(rule);
            return descriptor;
        };
    }

    export function stringEnum(values: string[], message?: string)
    export function stringEnum(values: string[], opts?: IRuleInfo)
    export function stringEnum(values: string[], mix?) {
        return function (target, propertyKey, descriptor?) {
            let rules = JsonUtils.resolvePropertyRules(target, propertyKey);
            let rule = new StringEnum(propertyKey, values, mix);
            rules.unshift(rule);
            return descriptor;
        };
    }

    export function validate (fn: (val, root) => string, name = 'Custom') {
        return function (target, propertyKey, descriptor?) {
            let rules = JsonUtils.resolvePropertyRules(target, propertyKey);
            let rule = new Custom(propertyKey, fn, name);
            rules.unshift(rule);
            return descriptor;
        };
    }
}

export namespace RuleUtil {
    // Unwrap Decorators in Json.meta
    export function unboxRules (props: {
        [name: string]: PropertyInfo;
    }) {

        for (let key in props) {
            let rules = props[key].rules;
            if (rules == null) {
                continue;
            }
            let fns = rules.filter(x => typeof x === 'function');
            if (fns.length === 0) {
                continue;
            }
            let target = {};
            fns.map((fn: any) => {
                fn(target, key);
            });
            let unboxed = JsonUtils.resolvePropertyRules(target, key);
            let arr = rules.map(rule => {
                if (typeof rule === 'function') {
                    return unboxed.shift();
                };
                return rule;
            });
            props[key].rules = arr;
        }
    }
}
