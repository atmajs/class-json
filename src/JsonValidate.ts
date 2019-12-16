import { IRule, IRuleError } from './validation/IRule';
import { JsonUtils } from './JsonUtils';
import { ModelInfo } from './ModelInfo';
import { Types } from './Types';

export interface IValidationSettings {
    Type?: new <T = any> (...args) => T
}

export namespace JsonValidate {
    export function validate (model: any, settings?: IValidationSettings): IRuleError[] {
        let meta = JsonUtils.pickModelMeta(model) ?? JsonUtils.pickModelMeta(settings?.Type);
        let errors = validateByMeta(model, model, meta, '');
        return errors ?? []
    }

    function validateByMeta (model: any, root, meta: ModelInfo, path: string): IRuleError[] {
        if (meta == null) {
            return null;
        }
        let result: IRuleError[] = null;
        for (let key in model) {
            let val = model[key];
            let propInfo = meta.properties[key];
            let rules = propInfo?.rules;
            if (rules) {
                let error = execRules(val, model, rules, path);
                if (error) {
                    (result ?? (result = [])).push(error);
                }
            }
            if (Types.isValueType(val)) {
                continue;
            }
            if (Types.isArray(val)) {
                let arr = val as any[];
                let Type = propInfo?.ArrayType;
                let innerMeta = JsonUtils.pickModelMeta(Type);

                for (let i = 0; i < arr.length; i++) {
                    let x = arr[i];
                    let $innerMeta = JsonUtils.pickModelMeta(x) ?? innerMeta;
                    let parentPath = path ? `${path}.${i}` : `${i}`
                    let errors = validateByMeta(x, root, $innerMeta, parentPath);
                    if (errors) {
                        (result ?? (result = [])).push(...errors);
                    }
                }
            }
            if (Types.isObject(val)) {
                let obj = val as any;
                let Type = propInfo?.Type;
                let innerMeta = JsonUtils.pickModelMeta(Type) ?? JsonUtils.pickModelMeta(obj);
                let parentPath = path ? `${path}.${key}` : `${key}`;
                let errors = validateByMeta(obj, root, innerMeta, parentPath);
                if (errors) {
                    (result ?? (result = [])).push(...errors);
                }
            }
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