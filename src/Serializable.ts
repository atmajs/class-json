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
    static fromJson(json, settings?: JsonSettings) {
        return JsonConvert.fromJson(json, this, settings);
    }
    toJson(settings?: JsonSettings) {
        return JsonConvert.toJson(this, settings);
    }
}
