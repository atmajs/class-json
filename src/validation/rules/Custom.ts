import { RuleBase } from '../RuleBase';

export class Custom extends RuleBase {
    constructor (prop: string, public fn: (val, root) => string, public name = 'Custom') {
        super(prop);
    }
    validate (value: any, root: any) {
        let message = this.fn(value, root);
        if (message != null) {
            return {
                name: this.name,
                property: this.property,
                value: value,
                message: message
            };
        }
    }
}