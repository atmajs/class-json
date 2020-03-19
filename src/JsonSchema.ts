import { JsonUtils } from './JsonUtils';
import { obj_getKeys } from './utils/obj';
import { PropertyInfo } from './PropertyInfo';
import { Pattern } from './validation/rules/Pattern';
import { Required } from './validation/rules/Required';
import { MinLength, MaxLength } from './validation/rules/Length';
import { Minimum, Maximum } from './validation/rules/Number';
import { Custom } from './validation/rules/Custom';
import { StringEnum } from './validation/rules/String';


export interface IJsonSchemaBase {
    type: 'string' |  'number' | 'integer' | 'boolean' | 'object' | 'array' | 'any'
    title?: string
    description?: string
    default?: any
    validation?: any
}
export interface IJsonSchemaString {
    pattern?: string
    format?: 'date-time' | 'time' | 'date' | 'email' | 'ipv4' | 'ipv6' | 'regex' | 'uri'
    
    enum?: (string | number)[]
    minLength?: number
    maxLength?: number
}
export interface IJsonSchemaNumber {
    minimum?: number
    maximum?: number
}

export interface IJsonSchemaBoolean {
    
}
export interface IJsonSchemaObject {
    properties?: { [key: string] : ISchema }
    required?: string[]
}
export interface IJsonSchemaArray {
    items?: ISchema
}

export type ISchema = IJsonSchemaBase 
    & IJsonSchemaString 
    & IJsonSchemaNumber 
    & IJsonSchemaBoolean
    & IJsonSchemaObject
    & IJsonSchemaArray;



export namespace JsonSchema {
    export function getSchema (Type, schema?: Partial<ISchema>): ISchema {
        if (Type == null) {
            return {
                type: 'any'
            };
        }
        if (schema?.type === 'array') {
            return {
                type: 'array',
                items: getSchema(Type)
            };
        }
        if (Type === String) {
            return {
                type: 'string'
            };
        }
        if (Type === Boolean) {
            return {
                type: 'boolean'
            };
        }
        if (Type === Number) {
            return {
                type: 'number'
            };
        }
        if (Type === Date) {
            return {
                type: 'string',
                format: 'date-time'
            };
        }
        if (Type === RegExp) {
            return {
                type: 'string',
                format: 'regex'
            };
        }

        let object = <ISchema> {
            type: 'object',
            properties: <{[key: string]: ISchema}>{}
        };

        let meta = JsonUtils.pickModelMeta(Type);
        if (meta?.properties != null) {
            for (let prop in meta.properties) {
                let propMeta = meta.properties[prop];
                let props = object.properties;
                if (propMeta.ArrayType) {
                    props[prop] = getSchema(propMeta.ArrayType, { type: 'array' });
                    if (propMeta.description) {
                        props[prop].description = propMeta.description;
                    }
                    continue;
                }
                props[prop] = getSchema(propMeta?.Type, null);
                if (propMeta.rules) {
                    for (let rule of propMeta.rules) {
                        if (rule instanceof Pattern) {
                            props[prop].pattern = rule.pattern.toString();
                            continue;
                        }
                        if (rule instanceof Required) {
                            if (object.required == null) {
                                object.required = [];
                            }
                            object.required.push(prop);
                            continue;
                        }
                        if (rule instanceof MinLength) {
                            props[prop].minLength = rule.count;
                            continue;
                        }
                        if (rule instanceof MaxLength) {
                            props[prop].maxLength = rule.count;
                            continue;
                        }
                        if (rule instanceof Minimum) {
                            props[prop].minimum = rule.value;
                            continue;
                        }
                        if (rule instanceof Maximum) {
                            props[prop].maximum = rule.value;
                            continue;
                        }
                        if (rule instanceof Custom) {
                            props[prop].validation = rule.fn.toString();
                        }
                        if (rule instanceof StringEnum) {
                            props[prop].enum = rule.values;
                        }
                    }
                }
                if (propMeta.default != null) {
                    props[prop].default = propMeta.default;
                }
                if (propMeta.description) {
                    props[prop].description = propMeta.description;
                }
            }
        }
        if (meta?.description) {
            object.description = meta.description;
        }

        let keys = obj_getKeys(Type.prototype);
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            if (key in object.properties 
                || key === '__json__' 
                || key === 'toJSON' 
                || key === 'toJson') {
                continue;
            };
            let val = Type.prototype[key];
            if (typeof val === 'function') {
                continue;
            }
            object.properties[key] = getSchema(val);
        }
        return object;
    }
}