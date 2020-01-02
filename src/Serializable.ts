import { JsonSettings } from './JsonSettings';
import { JsonConvert } from './JsonConvert';
import { JsonValidate, IValidationSettings } from './JsonValidate';


export class Serializable<T> {
    constructor(partial?: Partial<T>) {
        if (partial) {
            for (let key in partial) {
                (this as any)[key] = partial[key];
            }
        }
    }
    static fromJson(json, settings: JsonSettings = { Type: null }) {
        settings.Type = settings.Type ?? this;
        return JsonConvert.fromJson(json, settings);
    }
    static validate (x, settings: IValidationSettings = {}) {
        if (settings.Type == null) {
            settings.Type = this;
        }
        return JsonValidate.validate(x, settings);
    }
    toJson(settings?: JsonSettings) {
        return JsonConvert.toJson(this, settings);
    }
    toJSON() {
        return JsonConvert.toJson(this);
    }
}
