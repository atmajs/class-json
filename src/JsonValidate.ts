import { IRule, IRuleError } from './validation/IRule';
import { JsonUtils } from './JsonUtils';
import { ModelInfo } from './ModelInfo';
import { Types } from './Types';
import { PropertyInfo } from './PropertyInfo';

export interface IValidationSettings<T = any> {
    Type?: new (...args) => T
}

const EMPTY = [];
export namespace JsonValidate {
    export function validate <T> (model: T, settings?: IValidationSettings): IRuleError[] {
        let meta = JsonUtils.pickModelMeta(model) ?? JsonUtils.pickModelMeta(settings?.Type);
        if (meta == null) {
            return <IRuleError[]> [
                { message: 'Object has not validation meta information' }
            ];
        }
        let errors = validateByMeta(model, model, meta, '');
        return errors ?? EMPTY;
    }
    export function validateProperty <T> (model: T, key: keyof T, settings?: IValidationSettings): IRuleError[] {
        let meta = JsonUtils.pickModelMeta(model) ?? JsonUtils.pickModelMeta(settings?.Type);
        if (meta == null) {
            return <IRuleError[]> [
                { message: 'Object has not validation meta information' }
            ];
        }
        let val = model[key];
        let propInfo = meta.properties[key];
        let errors = validateSingleValue(model, val, model, key as string, propInfo, '');
        return errors ?? EMPTY;
    }

    function validateByMeta (model: any, root, meta: ModelInfo, path: string): IRuleError[] {
        if (meta == null) {
            return null;
        }
        let result: IRuleError[] = null;
        for (let key in model) {
            let val = model[key];
            let propInfo = meta.properties[key];

            let error = validateSingleValue(model, val,  root ?? model, key, propInfo, path);
            if (error) {
                (result ?? (result = [])).push(...error);
            }
        }
        return result;
    }
    function validateSingleValue  (
        model: any, 
        val: any, 
        root: any, 
        key: string,
        propInfo: PropertyInfo, 
        outerPath: string
    ): IRuleError[] {
        let result = null as IRuleError[];
        let rules = propInfo?.rules;
        if (rules) {
            let error = execRules(val, model, rules, outerPath);
            if (error) {
                (result ?? (result = [])).push(error);
            }
        }
        if (Types.isValueType(val)) {
            return result;
        }
        if (Types.isArray(val)) {
            let arr = val as any[];
            let Type = propInfo?.ArrayType;
            let innerMeta = JsonUtils.pickModelMeta(Type);

            for (let i = 0; i < arr.length; i++) {
                let x = arr[i];
                let $innerMeta = JsonUtils.pickModelMeta(x) ?? innerMeta;
                let parentPath = outerPath ? `${outerPath}.${i}` : `${i}`
                let errors = validateByMeta(x, root, $innerMeta, parentPath);
                if (errors) {
                    (result ?? (result = [])).push(...errors);
                }
            }
            return result;
        }
        if (Types.isObject(val)) {
            let obj = val as any;
            let Type = propInfo?.Type;
            let innerMeta = JsonUtils.pickModelMeta(Type) ?? JsonUtils.pickModelMeta(obj);
            let parentPath = outerPath ? `${outerPath}.${key}` : `${key}`;
            let errors = validateByMeta(obj, root, innerMeta, parentPath);
            if (errors) {
                (result ?? (result = [])).push(...errors);
            }
            return result;
        }
        return result;
    }

    function execRules (val: any, root: any, rules: IRule[], parentPath: string): IRuleError {
        if (rules == null || rules.length === 0) {
            return null;
        }
        for (let i = 0; i < rules.length; i++) {
            let error = rules[i].validate(val, root);
            if (error != null) {
                if (parentPath) {
                    error.property = `${parentPath}.${error.property}`;
                }
                return error;
            }
        }
        return null;
    }
}