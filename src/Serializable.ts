import { JsonSettings, IType } from './JsonSettings';
import { JsonConvert } from './JsonConvert';
import { JsonValidate, IValidationSettings } from './JsonValidate';
import { JsonUtils } from './JsonUtils';


type DeepPartial<T> = {
    [key in keyof T]?: T[key] extends object ? DeepPartial<T[key]> : T[key];
}

// class Foo {
//     name: string
//     bar: Bar
//     arr: any[]
// }
// class Bar {
//     b1: string
//     b2: string
//     arr: any[]
// }

// function f (x: DeepPartial<Foo>) {}
// f({ name: 'hello', bar: { b1: 'B1' }, arr: [ 1 ] })


export class Serializable<T> {

    constructor(partial?: DeepPartial<T>) {
        if (partial != null) {
            for (let key in partial) {
                (this as any)[key] = partial[key];
            }
        }
        let defs = JsonUtils.pickModelMeta(this)?.defaults;
        if (defs != null) {
            for (let key in defs) {
                if (this[key] == null) {
                    this[key] = defs[key];
                }
            }
        }
    }
    static fromJson<T extends typeof Serializable>(this: T, json, settings: JsonSettings & IType = { Type: null }): InstanceType<T> {
        console.warn('Obsolete (fromJson) - use fromJSON instead');
        return this.fromJSON(json, settings);
    }

    static fromJSON<T extends typeof Serializable>(this: T, json, settings: JsonSettings & IType = { Type: null }): InstanceType<T> {
        settings.Type = settings.Type ?? this;
        return JsonConvert.fromJSON(json, settings);
    }

    static validate (x, settings: IValidationSettings = {}) {
        if (settings.Type == null) {
            settings.Type = this;
        }
        return JsonValidate.validate(x, settings);
    }
    toJson(settings?: JsonSettings) {
        console.warn('Obsolete (toJson) - use toJSON instead');
        return this.toJSON(settings);
    }
    toJSON(settings?: JsonSettings) {
        return JsonConvert.toJSON(this, settings);
    }
    assign (partial?: Partial<T>): this {
        Object.assign(this, partial);
        return this;
    }
}
