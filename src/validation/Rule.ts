import { JsonUtils } from "../JsonUtils";
import { Required } from './rules/Required';
import { MinLength, MaxLength } from './rules/Length';
import { Pattern } from './rules/Pattern';

export namespace Rule {
    export function required() {
        return function (target, propertyKey, descriptor?) {
            let rules = JsonUtils.resolvePropertyRules(target, propertyKey);
            let rule = new Required(propertyKey);
            rules.push(rule);
            return descriptor;
        };
    }
    export function minLength(count: number) {
        return function (target, propertyKey, descriptor?) {
            let rules = JsonUtils.resolvePropertyRules(target, propertyKey);
            let rule = new MinLength(propertyKey, count);
            rules.push(rule);
            return descriptor;
        };
    }
    export function maxLength(count: number) {
        return function (target, propertyKey, descriptor?) {
            let rules = JsonUtils.resolvePropertyRules(target, propertyKey);
            let rule = new MaxLength(propertyKey, count);
            rules.push(rule);
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
            rules.push(rule);
            return descriptor;
        };
    }
}
