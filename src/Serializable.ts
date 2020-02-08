import { JsonSettings, IType } from './JsonSettings';
import { JsonConvert } from './JsonConvert';
import { JsonValidate, IValidationSettings } from './JsonValidate';
import { JsonUtils } from './JsonUtils';

export class Serializable<T> {

    constructor(partial?: Partial<T>) {
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
