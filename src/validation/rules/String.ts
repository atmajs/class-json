import { RuleBase } from '../RuleBase';

export class StringEnum extends RuleBase {
    constructor (prop: string, public values: string[]) {
        super(prop);
    }
    validate (value: any, root: any) {
        if (typeof value !== 'string') {
            return {
                name: 'StringEnum.Type',
                property: this.property,
                value: value,
                message: `${this.property} expected to be a string, but got ${typeof value}`
            };
        }
        if (this.values.includes(value) === false) {
            return {
                name: 'StringEnum',
                property: this.property,
                value: value,
                message: `${this.property} must be one of ${this.values.join(',')}, but got ${value}`
            };
        }
    }
}