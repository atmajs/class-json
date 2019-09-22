import { JsonSettings } from './JsonSettings';
import { PropertyInfo } from "./PropertyInfo";
export interface IJsonConverter {
    supports(val: any, type?: Function): boolean;
    fromJson(jsonValue, info?: PropertyInfo, settings?: JsonSettings): any;
    toJson(instanceValue, info?: PropertyInfo, settings?: JsonSettings): any;
}
