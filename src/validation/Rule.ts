import { JsonUtils } from "../JsonUtils";
import { Required } from './rules/Required';
import { MinLength, MaxLength } from './rules/Length';
import { Pattern } from './rules/Pattern';
import { Custom } from './rules/Custom';
import { Minimum, Maximum } from './rules/Number';
import { StringEnum } from './rules/String';

export namespace Rule {
    export function required() {
        return function (target, propertyKey, descriptor?) {
            let rules = JsonUtils.resolvePropertyRules(target, propertyKey);
            let rule = new Required(propertyKey);
            rules.unshift(rule);
            return descriptor;
        };
    }
    export function minLength(count: number) {
        return function (target, propertyKey, descriptor?) {
            let rules = JsonUtils.resolvePropertyRules(target, propertyKey);
            let rule = new MinLength(propertyKey, count);
            rules.unshift(rule);
            return descriptor;
        };
    }
    export function maxLength(count: number) {
        return function (target, propertyKey, descriptor?) {
            let rules = JsonUtils.resolvePropertyRules(target, propertyKey);
            let rule = new MaxLength(propertyKey, count);
            rules.unshift(rule);
            return descriptor;
        };
    }
    export function minimum(val: number) {
        return function (target, propertyKey, descriptor?) {
            let rules = JsonUtils.resolvePropertyRules(target, propertyKey);
            let rule = new Minimum(propertyKey, val);
            rules.unshift(rule);
            return descriptor;
        };
    }
    export function maximum(val: number) {
        return function (target, propertyKey, descriptor?) {
            let rules = JsonUtils.resolvePropertyRules(target, propertyKey);
            let rule = new Maximum(propertyKey, val);
            rules.unshift(rule);
            return descriptor;
        };
    }
    export function pattern(pattern: string | RegExp) {
        if (typeof pattern === 'string') {
            pattern = new RegExp(pattern);
        }
        return function (target, propertyKey, descriptor?) {
            let rules = JsonUtils.resolvePropertyRules(target, propertyKey);
            let rule = new Pattern(propertyKey, pattern as RegExp);
            rules.unshift(rule);
            return descriptor;
        };
    }
    export function stringEnum(values: string[]) {
        return function (target, propertyKey, descriptor?) {
            let rules = JsonUtils.resolvePropertyRules(target, propertyKey);
            let rule = new StringEnum(propertyKey, values);
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
