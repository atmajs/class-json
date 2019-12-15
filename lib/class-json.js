
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
exports.__esModule = true;
var JsonUtils;
(function (JsonUtils) {
    JsonUtils.META_KEY = '__json__';
    function pickModelMeta(mix) {
        if (mix == null) {
            return null;
        }
        return mix[JsonUtils.META_KEY] || (typeof mix === 'function' && mix.prototype[JsonUtils.META_KEY]) || null;
    }
    JsonUtils.pickModelMeta = pickModelMeta;
    function hasModelMeta(mix) {
        return pickModelMeta(mix) != null;
    }
    JsonUtils.hasModelMeta = hasModelMeta;
    function pickPropertyMeta(target, propertyKey) {
        var _a;
        var meta = pickModelMeta(target);
        return (_a = meta) === null || _a === void 0 ? void 0 : _a.properties[propertyKey];
    }
    JsonUtils.pickPropertyMeta = pickPropertyMeta;
    function resolvePropertyMeta(target, propertyKey) {
        var meta = target[JsonUtils.META_KEY];
        if (meta == null) {
            meta = {
                Type: typeof target === 'function' ? target : target.constructor,
                properties: {}
            };
            Object.defineProperty(target, JsonUtils.META_KEY, { enumerable: false, configurable: true, value: meta });
        }
        var propertyInfo = meta.properties[propertyKey];
        if (propertyInfo == null) {
            propertyInfo = meta.properties[propertyKey] = {
                property: propertyKey,
                rules: null
            };
        }
        return propertyInfo;
    }
    JsonUtils.resolvePropertyMeta = resolvePropertyMeta;
    function pickPropertyRuleMeta(target, propertyKey) {
        var _a;
        var propInfo = pickPropertyMeta(target, propertyKey);
        return (_a = propInfo) === null || _a === void 0 ? void 0 : _a.rules;
    }
    JsonUtils.pickPropertyRuleMeta = pickPropertyRuleMeta;
    function resolvePropertyRules(target, propertyKey) {
        var _a;
        var propInfo = resolvePropertyMeta(target, propertyKey);
        return _a = propInfo.rules, (_a !== null && _a !== void 0 ? _a : (propInfo.rules = []));
    }
    JsonUtils.resolvePropertyRules = resolvePropertyRules;
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
exports.__esModule = true;
var JsonUtils_1 = _src_JsonUtils;
var Json;
(function (Json) {
    function ignore() {
        return function (target, propertyKey, descriptor) {
            var meta = JsonUtils_1.JsonUtils.resolvePropertyMeta(target, propertyKey);
            meta.jsonIgnore = true;
            return descriptor;
        };
    }
    Json.ignore = ignore;
    function name(name) {
        return function (target, propertyKey, descriptor) {
            var meta = JsonUtils_1.JsonUtils.resolvePropertyMeta(target, propertyKey);
            meta.jsonName = name;
            return descriptor;
        };
    }
    Json.name = name;
    function type(Ctor, options) {
        return function (target, propertyKey, descriptor) {
            var viaProperty = descriptor == null;
            var meta = JsonUtils_1.JsonUtils.resolvePropertyMeta(target, propertyKey);
            meta.Type = Ctor;
            meta.options = options;
            return descriptor;
        };
    }
    Json.type = type;
    function array(Ctor, options) {
        return function (target, propertyKey, descriptor) {
            var viaProperty = descriptor == null;
            var meta = JsonUtils_1.JsonUtils.resolvePropertyMeta(target, propertyKey);
            meta.ArrayType = Ctor;
            meta.options = options;
            return descriptor;
        };
    }
    Json.array = array;
    function converter(Converter) {
        return function (target, propertyKey, descriptor) {
            var meta = JsonUtils_1.JsonUtils.resolvePropertyMeta(target, propertyKey);
            meta.Converter = Converter;
            return descriptor;
        };
    }
    Json.converter = converter;
    function stringify() {
        return function (target, propertyKey, descriptor) {
            var meta = JsonUtils_1.JsonUtils.resolvePropertyMeta(target, propertyKey);
            meta.Converter = {
                toJson: function (value) {
                    return JSON.stringify(value);
                },
                fromJson: function (str) {
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
exports.__esModule = true;
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
exports.__esModule = true;
var is_1 = _src_utils_is;
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
        if (x == null || typeof x !== 'object') {
            return false;
        }
        if (is_1.is_Array(x)) {
            return false;
        }
        if (x instanceof Date ||
            x instanceof RegExp ||
            x instanceof Number ||
            x instanceof String) {
            return false;
        }
        return true;
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
exports.__esModule = true;
var JsonConvert_1 = _src_JsonConvert;
var Serializable = /** @class */ (function () {
    function Serializable(partial) {
        if (partial) {
            for (var key in partial) {
                this[key] = partial[key];
            }
        }
    }
    Serializable.fromJson = function (json, settings) {
        if (settings === void 0) { settings = { Type: null }; }
        var _a;
        settings.Type = (_a = settings.Type, (_a !== null && _a !== void 0 ? _a : this));
        return JsonConvert_1.JsonConvert.fromJson(json, settings);
    };
    Serializable.prototype.toJson = function (settings) {
        return JsonConvert_1.JsonConvert.toJson(this, settings);
    };
    return Serializable;
}());
exports.Serializable = Serializable;
//# sourceMappingURL=Serializable.js.map
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
exports.__esModule = true;
var JsonUtils_1 = _src_JsonUtils;
var Types_1 = _src_Types;
var JsonConvert_1 = _src_JsonConvert;
var Serializable_1 = _src_Serializable;
var JsonDeserializer;
(function (JsonDeserializer) {
    function deserialize(json, meta, settings) {
        var model = toModelJson(json, meta, settings);
        if (meta.Type) {
            var Mix = meta.Type;
            if (Mix.fromJson && Mix.fromJson !== Serializable_1.Serializable.fromJson) {
                return Mix.fromJson(model);
            }
            var instance = new Mix();
            if (instance.fromJson) {
                instance.fromJson(model);
                return instance;
            }
            for (var key in model) {
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
            for (var prop in meta.properties) {
                if (meta.properties[prop].jsonName) {
                    nameMappings[meta.properties[prop].jsonName] = meta.properties[prop];
                }
            }
        }
        var model = Object.create(null);
        for (var key in json) {
            var property = resolveName(key, nameMappings, meta, settings);
            var info = meta && meta.properties[property];
            var value = resolveValue(json[key], info, settings);
            model[property] = value;
        }
        return model;
    }
    JsonDeserializer.toModelJson = toModelJson;
    function resolveValue(val, info, settings) {
        if (info && info.Type) {
            var converter = JsonConvert_1.JsonConverters.find(function (x) { return x.supports(val, info.Type); });
            if (converter) {
                return converter.fromJson(val, info, settings);
            }
            var meta = JsonUtils_1.JsonUtils.pickModelMeta(info.Type);
            if (meta) {
                return deserialize(val, meta, settings);
            }
            var Ctor = info.Type;
            return new Ctor(val);
        }
        if (Types_1.Types.isValueType(val)) {
            return val;
        }
        if (Types_1.Types.isArray(val)) {
            var out = new Array(val.length);
            var arrayType = info && info.ArrayType;
            for (var i = 0; i < val.length; i++) {
                out[i] = resolveValue(val[i], { Type: arrayType }, settings);
            }
            return out;
        }
        return val;
    }
    JsonDeserializer.resolveValue = resolveValue;
    function resolveName(key, mappings, meta, settings) {
        var info = mappings[key];
        if (info) {
            return info.property;
        }
        return key.replace(/(?<=.)_([a-z])/g, function (full, letter) { return letter.toUpperCase(); });
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
exports.__esModule = true;
var JsonUtils_1 = _src_JsonUtils;
var Types_1 = _src_Types;
var JsonConvert_1 = _src_JsonConvert;
var is_1 = _src_utils_is;
var JsonSerializer;
(function (JsonSerializer) {
    function toJsonValue(val, info, settings) {
        var _a, _b;
        if ((_b = (_a = info) === null || _a === void 0 ? void 0 : _a.Converter) === null || _b === void 0 ? void 0 : _b.toJson) {
            return info.Converter.toJson(val, info, settings);
        }
        if (Types_1.Types.isValueType(val)) {
            return val;
        }
        if (Types_1.Types.isArray(val)) {
            var arr = new Array(val.length);
            for (var i = 0; i < val.length; i++) {
                arr[i] = JsonSerializer.toJsonValue(val[i], info, settings);
            }
            return arr;
        }
        if (is_1.is_rawObject(val)) {
            var obj = Object.create(null);
            for (var key in val) {
                obj[key] = JsonSerializer.toJsonValue(val[key], null, settings);
            }
            return obj;
        }
        var type = info && info.Type || val.constructor;
        var converter = JsonConvert_1.JsonConverters.find(function (x) { return x.supports(val, type); });
        if (converter) {
            return converter.toJson(val, info, settings);
        }
        if (JsonUtils_1.JsonUtils.hasModelMeta(val)) {
            return JsonConvert_1.JsonConvert.toJson(val, settings);
        }
        return val;
    }
    JsonSerializer.toJsonValue = toJsonValue;
    function toJsonName(key, info, settings) {
        var _a, _b;
        if (((_a = info) === null || _a === void 0 ? void 0 : _a.jsonName) != null) {
            return info.jsonName;
        }
        var type = (_b = settings) === null || _b === void 0 ? void 0 : _b.propertyResolver;
        if (type == null) {
            return key;
        }
        if (type === 'camelCase') {
            return key.replace(/(?<=.)_(\w)/g, function (full, letter) { return letter.toUpperCase(); });
        }
        if (type === 'underScore') {
            return key
                .replace(/^([A-Z])/, function (full, letter) { return "" + letter.toLowerCase(); })
                .replace(/(?<=.)([A-Z])/g, function (full, letter) { return "_" + letter.toLowerCase(); });
        }
        throw new Error("Invalid propertyResolver name: " + type);
    }
    JsonSerializer.toJsonName = toJsonName;
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
exports.__esModule = true;
var JsonUtils_1 = _src_JsonUtils;
var Types_1 = _src_Types;
var JsonDeserializer_1 = _src_JsonDeserializer;
var JsonSerializer_1 = _src_JsonSerializer;
var JsonConvert;
(function (JsonConvert) {
    function toJson(model, settings) {
        var _a, _b;
        if (Types_1.Types.isArray(model)) {
            return model.map(function (x) { return toJson(x, settings); });
        }
        var meta = (_a = JsonUtils_1.JsonUtils.pickModelMeta(model), (_a !== null && _a !== void 0 ? _a : JsonUtils_1.JsonUtils.pickModelMeta((_b = settings) === null || _b === void 0 ? void 0 : _b.Type)));
        var json = Object.create(null);
        for (var key in model) {
            var propertyInfo = meta && meta.properties[key];
            if (propertyInfo != null && propertyInfo.jsonIgnore) {
                continue;
            }
            var property = JsonSerializer_1.JsonSerializer.toJsonName(key, propertyInfo, settings);
            var val = JsonSerializer_1.JsonSerializer.toJsonValue(model[key], propertyInfo, settings);
            json[property] = val;
        }
        return json;
    }
    JsonConvert.toJson = toJson;
    function fromJson(json, settings) {
        var _a;
        if (Types_1.Types.isArray(json)) {
            return json.map(function (x) { return fromJson(x, settings); });
        }
        var Type = (_a = settings) === null || _a === void 0 ? void 0 : _a.Type;
        var meta = JsonUtils_1.JsonUtils.pickModelMeta(Type) || { Type: Type, properties: {} };
        return JsonDeserializer_1.JsonDeserializer.deserialize(json, meta, settings);
    }
    JsonConvert.fromJson = fromJson;
})(JsonConvert = exports.JsonConvert || (exports.JsonConvert = {}));
exports.JsonConverters = [
    {
        supports: function (val, type) {
            return type === Date || val instanceof Date;
        },
        toJson: function (val) {
            return val.toISOString();
        },
        fromJson: function (val) {
            return new Date(val);
        }
    },
    {
        supports: function (val, type) {
            return type === RegExp || val instanceof RegExp;
        },
        toJson: function (val) {
            return val.toString();
        },
        fromJson: function (val) {
            var pattern = val.substring(1, val.lastIndexOf('/'));
            var flags = val.substring(val.lastIndexOf('/') + 1);
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
exports.__esModule = true;
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
exports.__esModule = true;
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
