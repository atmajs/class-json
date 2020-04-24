import { IRule, IRuleError } from './IRule';
import { obj_getKeys, obj_getProperty } from '../utils/obj';

export type TRuleInfo = string | IRuleInfo

export interface IRuleInfo {
    message?: string | ((prop: string, value: any, model: any) => string)
}
export abstract class RuleBase <T = any> implements IRule<T> {

    opts: IRuleInfo
    
    constructor (property: string)
    constructor (property: string, opts: IRuleInfo)
    constructor (property: string, message: string)
    constructor (public property: string, mix?: string | IRuleInfo) {
        if (mix != null) {
            this.opts = typeof mix === 'string' ? { message: mix } : mix;
        }
    }

    abstract validate(value: any, root: any): IRuleError<T>;

    formatMessage (value: any, root: any, $default: string) {
        
        const msg = this.opts?.message;
        if (msg == null) {
            return $default;
        }
        if (typeof msg === 'function') {
            return msg(this.property, value, root);
        }
        if (msg.includes('~[') === false) {
            return msg;
        }
        let model = { property: this.property, value, model: root };
        return msg.replace(/~\[([^\]]+)]/g, (_, acc) => {
            return obj_getProperty(model, acc.trim());
        });
    }
}