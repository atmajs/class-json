import { JsonSettings } from './JsonSettings';
import { PropertyInfo } from "./PropertyInfo";
export interface IJsonConverter {
    name?: string
    supports(val: any, type?: Function): boolean;
    fromJSON(jsonValue, settings?: JsonSettings): any;
    toJSON(instanceValue, settings?: JsonSettings): any;
}
