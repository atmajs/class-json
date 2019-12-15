import { IRule, IRuleError } from './IRule';

export abstract class RuleBase <T = any> implements IRule<T> {
    constructor (public property: string) {

    }

    abstract validate(value: any, root: any): IRuleError<T>;
}