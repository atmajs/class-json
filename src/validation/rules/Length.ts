import { RuleBase } from '../RuleBase';

export class MinLength extends RuleBase {
    constructor (prop: string, public count: number, mix?) {
        super(prop, mix);
    }
    validate (value: any, root: any) {
        if (typeof value !== 'string') {
            return {
                name: 'MinLength.Type',
                property: this.property,
                value: value,
                message: this.formatMessage(value, root, `${this.property} expected to be string, but got ${typeof value}`)
            };
        }
        if (value.length < this.count) {
            return {
                name: 'MinLength',
                property: this.property,
                value: value,
                message: this.formatMessage(value, root, `${this.property} must be mininum of length ${this.count}, but got ${value.length}`)
            };
        }
    }
}

export class MaxLength extends RuleBase {
    constructor (prop: string, public count: number, mix?) {
        super(prop, mix);
    }
    validate (value: any, root: any) {
        if (typeof value !== 'string') {
            return {
                name: 'MaxLength.Type',
                property: this.property,
                value: value,
                message: this.formatMessage(value, root, `${this.property} expected to be string, but got ${typeof value}`)
            };
        }
        if (value.length > this.count) {
            return {
                name: 'MaxLength',
                property: this.property,
                value: value,
                message: this.formatMessage(value, root, `${this.property} must be maximum of length ${this.count}, but got ${value.length}`)
            };
        }
    }
}