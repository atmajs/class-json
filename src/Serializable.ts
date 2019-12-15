import { JsonSettings } from './JsonSettings';
import { JsonConvert } from './JsonConvert';


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
    toJson(settings?: JsonSettings) {
        return JsonConvert.toJson(this, settings);
    }
}
