import { JsonSettings } from './JsonSettings';
import { PropertyInfo } from "./PropertyInfo";
export interface IJsonConverter {
    supports(val: any, type?: Function): boolean;
    fromJSON(jsonValue, info?: PropertyInfo, settings?: JsonSettings): any;
    toJSON(instanceValue, info?: PropertyInfo, settings?: JsonSettings): any;
}
