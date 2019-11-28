
// source ./UMD.js
(function(factory){
	
	var _name = 'class-json',
		_global = typeof window === 'undefined' ? global : window,
		_module = {
			exports: {}
		};

	factory(_module, _module.exports, _global);

	if (typeof define === 'function' && define.amd) {
        define([], function () {
        	return _module.exports;
        });
        return;
    } 
    if (typeof module === 'object' && module.exports) {
    	module.exports = _module.exports;
    	return;
    }

	if (_name) {
		_global[_name] = _module.exports;
	}

}(function(module, exports, global){
	var _src_Json = {};
var _src_JsonConvert = {};
var _src_JsonDeserializer = {};
var _src_JsonSerializer = {};
var _src_JsonSettings = {};
var _src_JsonUtils = {};
var _src_Serializable = {};
var _src_Types = {};
var _src_utils_is = {};

// source ./ModuleSimplified.js
var _src_JsonUtils;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JsonUtils;
(function (JsonUtils) {
    JsonUtils.META_KEY = '__json__';
    function pickModelMeta(mix) {
        return mix[JsonUtils.META_KEY] || (typeof mix === 'function' && mix.prototype[JsonUtils.META_KEY]) || null;
    }
    JsonUtils.pickModelMeta = pickModelMeta;
    function hasModelMeta(mix) {
        return pickModelMeta(mix) != null;
    }
    JsonUtils.hasModelMeta = hasModelMeta;
    function resolvePropertyMeta(target, propertyKey) {
        let meta = target[JsonUtils.META_KEY];
        if (meta == null) {
            meta = {
                Type: typeof target === 'function' ? target : target.constructor,
                properties: {}
            };
            Object.defineProperty(target, JsonUtils.META_KEY, { enumerable: false, configurable: true, value: meta });
        }
        let propertyInfo = meta.properties[propertyKey];
        if (propertyInfo == null) {
            propertyInfo = meta.properties[propertyKey] = {
                property: propertyKey
            };
        }
        return propertyInfo;
    }
    JsonUtils.resolvePropertyMeta = resolvePropertyMeta;
})(JsonUtils = exports.JsonUtils || (exports.JsonUtils = {}));
//# sourceMappingURL=export.js.map
//# sourceMappingURL=JsonUtils.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_JsonUtils) && isObject(module.exports)) {
		Object.assign(_src_JsonUtils, module.exports);
		return;
	}
	_src_JsonUtils = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Json;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JsonUtils_1 = _src_JsonUtils;
var Json;
(function (Json) {
    function ignore() {
        return function (target, propertyKey, descriptor) {
            let meta = JsonUtils_1.JsonUtils.resolvePropertyMeta(target, propertyKey);
            meta.jsonIgnore = true;
            return descriptor;
        };
    }
    Json.ignore = ignore;
    function name(name) {
        return function (target, propertyKey, descriptor) {
            let meta = JsonUtils_1.JsonUtils.resolvePropertyMeta(target, propertyKey);
            meta.jsonName = name;
            return descriptor;
        };
    }
    Json.name = name;
    function type(Ctor, options) {
        return function (target, propertyKey, descriptor) {
            var viaProperty = descriptor == null;
            let meta = JsonUtils_1.JsonUtils.resolvePropertyMeta(target, propertyKey);
            meta.Type = Ctor;
            meta.options = options;
            return descriptor;
        };
    }
    Json.type = type;
    function converter(Converter) {
        return function (target, propertyKey, descriptor) {
            let meta = JsonUtils_1.JsonUtils.resolvePropertyMeta(target, propertyKey);
            meta.Converter = Converter;
            return descriptor;
        };
    }
    Json.converter = converter;
    function stringify() {
        return function (target, propertyKey, descriptor) {
            let meta = JsonUtils_1.JsonUtils.resolvePropertyMeta(target, propertyKey);
            meta.Converter = {
                toJson(value) {
                    return JSON.stringify(value);
                },
                fromJson(str) {
                    return JSON.parse(str);
                }
            };
            return descriptor;
        };
    }
    Json.stringify = stringify;
})(Json = exports.Json || (exports.Json = {}));
//# sourceMappingURL=export.js.map
//# sourceMappingURL=Json.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_Json) && isObject(module.exports)) {
		Object.assign(_src_Json, module.exports);
		return;
	}
	_src_Json = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_utils_is;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function is_rawObject(x) {
    return x != null && typeof x === 'object' && x.constructor === Object;
}
exports.is_rawObject = is_rawObject;
function is_Array(arr) {
    return (arr != null &&
        typeof arr === 'object' &&
        typeof arr.length === 'number' &&
        typeof arr.slice === 'function');
}
exports.is_Array = is_Array;
//# sourceMappingURL=export.js.map
//# sourceMappingURL=is.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_utils_is) && isObject(module.exports)) {
		Object.assign(_src_utils_is, module.exports);
		return;
	}
	_src_utils_is = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Types;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const is_1 = _src_utils_is;
var Types;
(function (Types) {
    function isValueType(x) {
        return x == null || typeof x !== 'object';
    }
    Types.isValueType = isValueType;
    function isArray(x) {
        return is_1.is_Array(x);
    }
    Types.isArray = isArray;
    function isObject(x) {
        return x != null && typeof x === 'object' && is_1.is_Array(x) === false;
    }
    Types.isObject = isObject;
})(Types = exports.Types || (exports.Types = {}));
//# sourceMappingURL=export.js.map
//# sourceMappingURL=Types.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_Types) && isObject(module.exports)) {
		Object.assign(_src_Types, module.exports);
		return;
	}
	_src_Types = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Serializable;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JsonConvert_1 = _src_JsonConvert;
class Serializable {
    constructor(partial) {
        if (partial) {
            for (let key in partial) {
                this[key] = partial[key];
            }
        }
    }
    static fromJson(json, settings) {
        return JsonConvert_1.JsonConvert.fromJson(json, this, settings);
    }
    toJson(settings) {
        return JsonConvert_1.JsonConvert.toJson(this, settings);
    }
}
exports.Serializable = Serializable;
//# sourceMappingURL=export.js.map
//# sourceMappingURL=Serializable.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_Serializable) && isObject(module.exports)) {
		Object.assign(_src_Serializable, module.exports);
		return;
	}
	_src_Serializable = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_JsonDeserializer;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JsonUtils_1 = _src_JsonUtils;
const Types_1 = _src_Types;
const JsonConvert_1 = _src_JsonConvert;
const Serializable_1 = _src_Serializable;
var JsonDeserializer;
(function (JsonDeserializer) {
    function deserialize(json, meta, settings) {
        let model = toModelJson(json, meta, settings);
        if (meta.Type) {
            let Mix = meta.Type;
            if (Mix.fromJson && Mix.fromJson !== Serializable_1.Serializable.fromJson) {
                return Mix.fromJson(model);
            }
            let instance = new Mix();
            if (instance.fromJson) {
                instance.fromJson(model);
                return instance;
            }
            for (let key in model) {
                instance[key] = model[key];
            }
            return instance;
        }
        return model;
    }
    JsonDeserializer.deserialize = deserialize;
    function toModelJson(json, meta, settings) {
        var nameMappings = Object.create(null);
        if (meta) {
            for (let prop in meta.properties) {
                if (meta.properties[prop].jsonName) {
                    nameMappings[meta.properties[prop].jsonName] = meta.properties[prop];
                }
            }
        }
        var model = Object.create(null);
        for (let key in json) {
            let property = resolveName(key, nameMappings, meta, settings);
            let info = meta && meta.properties[property];
            let value = resolveValue(json[key], info, settings);
            model[property] = value;
        }
        return model;
    }
    JsonDeserializer.toModelJson = toModelJson;
    function resolveValue(val, info, settings) {
        if (info && info.Type) {
            let converter = JsonConvert_1.JsonConverters.find(x => x.supports(val, info.Type));
            if (converter) {
                return converter.fromJson(val, info, settings);
            }
            let meta = JsonUtils_1.JsonUtils.pickModelMeta(info.Type);
            if (meta) {
                return deserialize(val, meta, settings);
            }
        }
        if (Types_1.Types.isValueType(val)) {
            return val;
        }
        if (Types_1.Types.isArray(val)) {
            let out = new Array(val.length);
            let arrayType = info && info.ArrayType;
            for (let i = 0; i < val.length; i++) {
                out[i] = resolveValue(val[i], { Type: arrayType }, settings);
            }
            return out;
        }
        return val;
    }
    JsonDeserializer.resolveValue = resolveValue;
    function resolveName(key, mappings, meta, settings) {
        let info = mappings[key];
        if (info) {
            return info.property;
        }
        return key.replace(/(?<=.)_([a-z])/g, (full, letter) => letter.toUpperCase());
    }
    JsonDeserializer.resolveName = resolveName;
})(JsonDeserializer = exports.JsonDeserializer || (exports.JsonDeserializer = {}));
//# sourceMappingURL=export.js.map
//# sourceMappingURL=JsonDeserializer.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_JsonDeserializer) && isObject(module.exports)) {
		Object.assign(_src_JsonDeserializer, module.exports);
		return;
	}
	_src_JsonDeserializer = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_JsonSerializer;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JsonUtils_1 = _src_JsonUtils;
const Types_1 = _src_Types;
const JsonConvert_1 = _src_JsonConvert;
const is_1 = _src_utils_is;
var JsonSerializer;
(function (JsonSerializer) {
    function resolveValue(val, info, settings) {
        if (Types_1.Types.isValueType(val)) {
            return val;
        }
        if (info && info.Converter && info.Converter.toJson) {
            return info.Converter.toJson(val, info, settings);
        }
        if (Types_1.Types.isArray(val)) {
            let arr = new Array(val.length);
            for (let i = 0; i < val.length; i++) {
                arr[i] = JsonSerializer.resolveValue(val[i], info, settings);
            }
            return arr;
        }
        if (is_1.is_rawObject(val)) {
            let obj = Object.create(null);
            for (let key in val) {
                obj[key] = JsonSerializer.resolveValue(val[key], null, settings);
            }
            return obj;
        }
        let type = info && info.Type || val.constructor;
        let converter = JsonConvert_1.JsonConverters.find(x => x.supports(val, type));
        if (converter) {
            return converter.toJson(val, info, settings);
        }
        if (JsonUtils_1.JsonUtils.hasModelMeta(val)) {
            return JsonConvert_1.JsonConvert.toJson(val, settings);
        }
        return val;
    }
    JsonSerializer.resolveValue = resolveValue;
    function resolveName(key, info, settings) {
        if (info && info.jsonName != null) {
            return info.jsonName;
        }
        let type = settings && settings.propertyResolver || 'camelCase';
        if (type === 'camelCase') {
            return key.replace(/(?<=.)_(\w)/g, (full, letter) => letter.toUpperCase());
        }
        if (type === 'underScore') {
            return key
                .replace(/^([A-Z])/, (full, letter) => `${letter.toLowerCase()}`)
                .replace(/(?<=.)([A-Z])/g, (full, letter) => `_${letter.toLowerCase()}`);
        }
        throw new Error(`Invalid propertyResolver name: ${type}`);
    }
    JsonSerializer.resolveName = resolveName;
})(JsonSerializer = exports.JsonSerializer || (exports.JsonSerializer = {}));
//# sourceMappingURL=export.js.map
//# sourceMappingURL=JsonSerializer.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_JsonSerializer) && isObject(module.exports)) {
		Object.assign(_src_JsonSerializer, module.exports);
		return;
	}
	_src_JsonSerializer = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_JsonConvert;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JsonUtils_1 = _src_JsonUtils;
const Types_1 = _src_Types;
const JsonDeserializer_1 = _src_JsonDeserializer;
const JsonSerializer_1 = _src_JsonSerializer;
var JsonConvert;
(function (JsonConvert) {
    function toJson(model, settings) {
        if (Types_1.Types.isArray(model)) {
            return model.map(x => toJson(x, settings));
        }
        let meta = JsonUtils_1.JsonUtils.pickModelMeta(model);
        let json = Object.create(null);
        for (let key in model) {
            let propertyInfo = meta && meta.properties[key];
            if (propertyInfo != null && propertyInfo.jsonIgnore) {
                continue;
            }
            let property = JsonSerializer_1.JsonSerializer.resolveName(key, propertyInfo, settings);
            let val = JsonSerializer_1.JsonSerializer.resolveValue(model[key], propertyInfo, settings);
            json[property] = val;
        }
        return json;
    }
    JsonConvert.toJson = toJson;
    function fromJson(json, Ctor, settings) {
        if (Types_1.Types.isArray(json)) {
            return json.map(x => fromJson(x, Ctor, settings));
        }
        let meta = JsonUtils_1.JsonUtils.pickModelMeta(Ctor) || { Type: Ctor, properties: {} };
        return JsonDeserializer_1.JsonDeserializer.deserialize(json, meta, settings);
    }
    JsonConvert.fromJson = fromJson;
})(JsonConvert = exports.JsonConvert || (exports.JsonConvert = {}));
exports.JsonConverters = [
    {
        supports(val, type) {
            return type === Date || val instanceof Date;
        },
        toJson(val) {
            return val.toISOString();
        },
        fromJson(val) {
            return new Date(val);
        }
    },
    {
        supports(val, type) {
            return type === RegExp || val instanceof RegExp;
        },
        toJson(val) {
            return val.toString();
        },
        fromJson(val) {
            let pattern = val.substring(1, val.lastIndexOf('/'));
            let flags = val.substring(val.lastIndexOf('/') + 1);
            return new RegExp(pattern, flags);
        }
    }
];
//# sourceMappingURL=export.js.map
//# sourceMappingURL=JsonConvert.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_JsonConvert) && isObject(module.exports)) {
		Object.assign(_src_JsonConvert, module.exports);
		return;
	}
	_src_JsonConvert = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_JsonSettings;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=export.js.map
//# sourceMappingURL=JsonSettings.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_JsonSettings) && isObject(module.exports)) {
		Object.assign(_src_JsonSettings, module.exports);
		return;
	}
	_src_JsonSettings = module.exports;
}());
// end:source ./ModuleSimplified.js

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Json_1 = _src_Json;
exports.Json = Json_1.Json;
var JsonConvert_1 = _src_JsonConvert;
exports.JsonConvert = JsonConvert_1.JsonConvert;
var Serializable_1 = _src_Serializable;
exports.Serializable = Serializable_1.Serializable;
var JsonSettings_1 = _src_JsonSettings;
exports.JsonSettings = JsonSettings_1.JsonSettings;
//# sourceMappingURL=export.js.map
//# sourceMappingURL=export.ts.map
}));
// end:source ./UMD.js
