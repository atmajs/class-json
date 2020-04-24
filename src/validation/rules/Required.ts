import { RuleBase } from '../RuleBase';

export class Required extends RuleBase {
    
    validate (value: any, root: any) {
        if (value == null) {
            return {
                name: 'Required',
                property: this.property,
                value: null,
                message: this.formatMessage(null, root, `${this.property} is not set`)
            };
        }
    }
}