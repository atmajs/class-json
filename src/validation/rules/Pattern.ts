import { RuleBase } from '../RuleBase';

export class Pattern extends RuleBase {
    constructor (prop: string, public pattern: RegExp, mix?) {
        super(prop, mix);
    }
    validate (value: any, root: any) {
        if (typeof value !== 'string') {
            return {
                name: 'Pattern.Type',
                property: this.property,
                value: value,
                message: this.formatMessage(value, root, `${this.property} expected to be string, but got ${typeof value}`)
            };
        }
        if (this.pattern.test(value) === false) {
            return {
                name: 'Pattern',
                property: this.property,
                value: value,
                message: this.formatMessage(value, root, `${this.property} must match the pattern ${ String(this.pattern) }`)
            };
        }
    }
}