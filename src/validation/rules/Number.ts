import { RuleBase } from '../RuleBase';

export class Minimum extends RuleBase {
    constructor (prop: string, public value: number) {
        super(prop);
    }
    validate (value: any, root: any) {
        if (typeof value !== 'number') {
            return {
                name: 'Minimum.Type',
                property: this.property,
                value: value,
                message: `${this.property} expected to be a number, but got ${typeof value}`
            };
        }
        if (value < this.value) {
            return {
                name: 'Minimum',
                property: this.property,
                value: value,
                message: `${this.property} must be mininum ${this.value}, but got ${value}`
            };
        }
    }
}

export class Maximum extends RuleBase {
    constructor (prop: string, public value: number) {
        super(prop);
    }
    validate (value: any, root: any) {
        if (typeof value !== 'number') {
            return {
                name: 'Maximum.Type',
                property: this.property,
                value: value,
                message: `${this.property} expected to be a number, but got ${typeof value}`
            };
        }
        if (value > this.value) {
            return {
                name: 'Maximum',
                property: this.property,
                value: value,
                message: `${this.property} must be maximum ${this.value}, but got ${value}`
            };
        }
    }
}