import { RuleBase } from '../RuleBase';

export class MinLength extends RuleBase {
    constructor (prop: string, public count: number) {
        super(prop);
    }
    validate (value: any, root: any) {
        if (typeof value !== 'string') {
            return {
                name: 'MinLength.Type',
                property: this.property,
                value: value,
                message: `${this.property} expected to be string, but got ${typeof value}`
            };
        }
        if (value.length < this.count) {
            return {
                name: 'MinLength',
                property: this.property,
                value: value,
                message: `${this.property} must be mininum of length ${this.count}, but got ${value.length}`
            };
        }
    }
}

export class MaxLength extends RuleBase {
    constructor (prop: string, public count: number) {
        super(prop);
    }
    validate (value: any, root: any) {
        if (typeof value !== 'string') {
            return {
                name: 'MaxLength.Type',
                property: this.property,
                value: value,
                message: `${this.property} expected to be string, but got ${typeof value}`
            };
        }
        if (value.length > this.count) {
            return {
                name: 'MaxLength',
                property: this.property,
                value: value,
                message: `${this.property} must be maximum of length ${this.count}, but got ${value.length}`
            };
        }
    }
}