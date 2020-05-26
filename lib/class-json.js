
// source ./UMD.js
(function (factory) {

    var _name = 'class-json',
        _global = typeof window === 'undefined' ? global : window,
        _module = {
            exports: {}
        };

    factory(_module, _module.exports, _global);

    if (typeof module === 'object' && module.exports) {
        module.exports = _module.exports;
        return;
    }

    if (typeof define === 'function' && define.amd) {
        define([], function () {
            return _module.exports;
        });
        return;
    }
    
    if (_name) {
        _global[_name] = _module.exports;
    }

}(function (module, exports, global) {

    var _src_Json = {};
var _src_JsonConvert = {};
var _src_JsonDeserializer = {};
var _src_JsonSchema = {};
var _src_JsonSerializer = {};
var _src_JsonSettings = {};
var _src_JsonUtils = {};
var _src_JsonValidate = {};
var _src_Serializable = {};
var _src_Types = {};
var _src_utils_is = {};
var _src_utils_obj = {};
var _src_validation_Rule = {};
var _src_validation_RuleBase = {};
var _src_validation_rules_Custom = {};
var _src_validation_rules_Length = {};
var _src_validation_rules_Number = {};
var _src_validation_rules_Pattern = {};
var _src_validation_rules_Required = {};
var _src_validation_rules_String = {};

// source ./ModuleSimplified.js
var _src_utils_obj;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
exports.__esModule = true;
function obj_clone(source) {
    if (source == null || typeof source !== 'object') {
        return source;
    }
    if (Array.isArray(source)) {
        var arr = source;
        var out = new Array(arr.length);
        for (var i = 0; i < arr.length; i++) {
            out[i] = obj_clone(arr[i]);
        }
        return out;
    }
    var Ctor = source.constructor;
    if (Ctor === Object) {
        var obj = {};
        for (var key in source) {
            obj[key] = obj_clone(source[key]);
        }
        return obj;
    }
    return source;
}
exports.obj_clone = obj_clone;
function obj_getKeys(x) {
    var keys = [];
    var proto = x;
    while (proto != null && proto != Object.prototype) {
        keys.push.apply(keys, Object.getOwnPropertyNames(proto));
        proto = Object.getPrototypeOf(proto);
    }
    return keys;
}
exports.obj_getKeys = obj_getKeys;
function obj_getProperty(obj_, path) {
    if (obj_ == null) {
        return null;
    }
    if (path.indexOf('.') === -1) {
        return obj_[path];
    }
    var obj = obj_, chain = path.split('.'), imax = chain.length, i = -1;
    while (obj != null && ++i < imax) {
        var key = chain[i];
        obj = obj[key];
    }
    return obj;
}
exports.obj_getProperty = obj_getProperty;
;
function keysToObj(keys) {
    if (keys == null) {
        return null;
    }
    var obj = Object.create(null);
    for (var i = 0; i < keys.length; i++) {
        obj[keys[i]] = 1;
    }
    return obj;
}
function obj_map(source, mapper) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    if (source == null) {
        return null;
    }
    if (Array.isArray(source)) {
        return source.map(function (x) { return obj_map(x, mapper); });
    }
    var out = Object.create(null);
    var excludeProps = keysToObj((_a = mapper) === null || _a === void 0 ? void 0 : _a.exclude);
    var includeProps = keysToObj((_b = mapper) === null || _b === void 0 ? void 0 : _b.include);
    for (var key in source) {
        var val = source[key];
        if (val == null) {
            continue;
        }
        if (excludeProps != null && key in excludeProps === true) {
            continue;
        }
        if (includeProps != null && key in includeProps !== true) {
            continue;
        }
        var info = (_d = (_c = mapper) === null || _c === void 0 ? void 0 : _c.props) === null || _d === void 0 ? void 0 : _d[key];
        if ((_e = info) === null || _e === void 0 ? void 0 : _e.ignore) {
            continue;
        }
        var name = (_g = (_f = info) === null || _f === void 0 ? void 0 : _f.name, (_g !== null && _g !== void 0 ? _g : key));
        if ((_h = info) === null || _h === void 0 ? void 0 : _h.map) {
            out[name] = (_j = info) === null || _j === void 0 ? void 0 : _j.map(val);
            continue;
        }
        if (typeof val === 'object') {
            if (val instanceof Date === false &&
                val instanceof RegExp === false &&
                val instanceof Number === false &&
                val instanceof String === false) {
                val = obj_map(val, info);
            }
        }
        out[name] = val;
    }
    return out;
}
exports.obj_map = obj_map;
//# sourceMappingURL=obj.js.map
//# sourceMappingURL=obj.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_utils_obj) && isObject(module.exports)) {
		Object.assign(_src_utils_obj, module.exports);
		return;
	}
	_src_utils_obj = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_JsonUtils;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
exports.__esModule = true;
var obj_1 = _src_utils_obj;
var JsonUtils;
(function (JsonUtils) {
    JsonUtils.META_KEY = '__json__';
    function resolveModelMeta(mix) {
        if (mix == null) {
            return null;
        }
        var target = typeof mix === 'function' ? mix.prototype : mix;
        var meta = target[JsonUtils.META_KEY];
        if (meta != null) {
            if (target.hasOwnProperty(JsonUtils.META_KEY) === false) {
                // was inherited
                meta = obj_1.obj_clone(meta);
                meta.Type = mix;
                Object.defineProperty(target, JsonUtils.META_KEY, {
                    enumerable: false,
                    configurable: true,
                    value: meta
                });
            }
        }
        if (meta == null) {
            meta = {
                Type: typeof mix === 'function' ? mix : mix.constructor,
                properties: {}
            };
            Object.defineProperty(target, JsonUtils.META_KEY, {
                enumerable: false,
                configurable: true,
                value: meta
            });
        }
        return meta;
    }
    JsonUtils.resolveModelMeta = resolveModelMeta;
    function pickModelMeta(mix) {
        if (mix == null) {
            return null;
        }
        var isFn = typeof mix === 'function';
        if (isFn && mix === Object) {
            return null;
        }
        if (isFn) {
            return mix.prototype[JsonUtils.META_KEY] || null;
        }
        return mix[JsonUtils.META_KEY] || null;
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
        var meta = resolveModelMeta(target);
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
    function pickPropertyRules(target, propertyKey) {
        var _a;
        var propInfo = pickPropertyMeta(target, propertyKey);
        return (_a = propInfo) === null || _a === void 0 ? void 0 : _a.rules;
    }
    JsonUtils.pickPropertyRules = pickPropertyRules;
    function resolvePropertyRules(target, propertyKey) {
        var _a;
        var propInfo = resolvePropertyMeta(target, propertyKey);
        return _a = propInfo.rules, (_a !== null && _a !== void 0 ? _a : (propInfo.rules = []));
    }
    JsonUtils.resolvePropertyRules = resolvePropertyRules;
    JsonUtils.map = obj_1.obj_map;
})(JsonUtils = exports.JsonUtils || (exports.JsonUtils = {}));
//# sourceMappingURL=JsonUtils.js.map
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
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
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
            var metaObj = JsonUtils_1.JsonUtils.resolveModelMeta(target);
            if (metaObj.nameMappings == null) {
                metaObj.nameMappings = {};
            }
            var metaProp = JsonUtils_1.JsonUtils.resolvePropertyMeta(target, propertyKey);
            metaProp.jsonName = name;
            metaObj.nameMappings[name] = metaProp;
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
            var meta = JsonUtils_1.JsonUtils.resolvePropertyMeta(target, propertyKey);
            meta.ArrayType = Ctor;
            meta.options = options;
            return descriptor;
        };
    }
    Json.array = array;
    function value(mix) {
        console.log('Obsolete: renamed .defaultValue');
        return defaultValue(mix);
    }
    Json.value = value;
    function defaultValue(mix) {
        return function (target, propertyKey, descriptor) {
            var _a;
            var metaModel = JsonUtils_1.JsonUtils.resolveModelMeta(target);
            var defs = (_a = metaModel.defaults, (_a !== null && _a !== void 0 ? _a : (metaModel.defaults = {})));
            defs[propertyKey] = mix;
            var metaProp = JsonUtils_1.JsonUtils.resolvePropertyMeta(target, propertyKey);
            metaProp["default"] = value;
            return descriptor;
        };
    }
    Json.defaultValue = defaultValue;
    function converter(Converter) {
        return function (target, propertyKey, descriptor) {
            var meta = JsonUtils_1.JsonUtils.resolvePropertyMeta(target, propertyKey);
            meta.Converter = Converter;
            return descriptor;
        };
    }
    Json.converter = converter;
    function description(text) {
        return function (target, propertyKey, descriptor) {
            if (propertyKey == null) {
                var metaModel = JsonUtils_1.JsonUtils.resolveModelMeta(target);
                metaModel.description = text;
                return;
            }
            var metaProp = JsonUtils_1.JsonUtils.resolvePropertyMeta(target, propertyKey);
            metaProp.description = text;
            return descriptor;
        };
    }
    Json.description = description;
    function meta(meta) {
        return function (target, propertyKey, descriptor) {
            if (propertyKey == null) {
                var metaModel = JsonUtils_1.JsonUtils.resolveModelMeta(target);
                Object.assign(metaModel, meta);
                return;
            }
            var metaProp = JsonUtils_1.JsonUtils.resolvePropertyMeta(target, propertyKey);
            metaProp.Meta = meta;
            return descriptor;
        };
    }
    Json.meta = meta;
    function stringify() {
        return function (target, propertyKey, descriptor) {
            var meta = JsonUtils_1.JsonUtils.resolvePropertyMeta(target, propertyKey);
            meta.Converter = {
                toJSON: function (mix) {
                    if (typeof mix === 'string') {
                        return mix;
                    }
                    return JSON.stringify(mix);
                },
                fromJSON: function (mix) {
                    if (typeof mix !== 'string') {
                        return mix;
                    }
                    return JSON.parse(mix);
                }
            };
            return descriptor;
        };
    }
    Json.stringify = stringify;
})(Json = exports.Json || (exports.Json = {}));
//# sourceMappingURL=Json.js.map
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
var _src_validation_RuleBase;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
exports.__esModule = true;
var obj_1 = _src_utils_obj;
var RuleBase = /** @class */ (function () {
    function RuleBase(property, mix) {
        this.property = property;
        if (mix != null) {
            this.opts = typeof mix === 'string' ? { message: mix } : mix;
        }
    }
    RuleBase.prototype.formatMessage = function (value, root, $default) {
        var _a;
        var msg = (_a = this.opts) === null || _a === void 0 ? void 0 : _a.message;
        if (msg == null) {
            return $default;
        }
        if (typeof msg === 'function') {
            return msg(this.property, value, root);
        }
        if (msg.includes('~[') === false) {
            return msg;
        }
        var model = { property: this.property, value: value, model: root };
        return msg.replace(/~\[([^\]]+)]/g, function (_, acc) {
            return obj_1.obj_getProperty(model, acc.trim());
        });
    };
    return RuleBase;
}());
exports.RuleBase = RuleBase;
//# sourceMappingURL=export.js.map
//# sourceMappingURL=RuleBase.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_validation_RuleBase) && isObject(module.exports)) {
		Object.assign(_src_validation_RuleBase, module.exports);
		return;
	}
	_src_validation_RuleBase = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_validation_rules_Required;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var RuleBase_1 = _src_validation_RuleBase;
var Required = /** @class */ (function (_super) {
    __extends(Required, _super);
    function Required() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Required.prototype.validate = function (value, root) {
        if (value == null) {
            return {
                name: 'Required',
                property: this.property,
                value: null,
                message: this.formatMessage(null, root, this.property + " is not set")
            };
        }
    };
    return Required;
}(RuleBase_1.RuleBase));
exports.Required = Required;
//# sourceMappingURL=export.js.map
//# sourceMappingURL=Required.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_validation_rules_Required) && isObject(module.exports)) {
		Object.assign(_src_validation_rules_Required, module.exports);
		return;
	}
	_src_validation_rules_Required = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_validation_rules_Length;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var RuleBase_1 = _src_validation_RuleBase;
var MinLength = /** @class */ (function (_super) {
    __extends(MinLength, _super);
    function MinLength(prop, count, mix) {
        var _this = _super.call(this, prop, mix) || this;
        _this.count = count;
        return _this;
    }
    MinLength.prototype.validate = function (value, root) {
        if (typeof value !== 'string') {
            return {
                name: 'MinLength.Type',
                property: this.property,
                value: value,
                message: this.formatMessage(value, root, this.property + " expected to be string, but got " + typeof value)
            };
        }
        if (value.length < this.count) {
            return {
                name: 'MinLength',
                property: this.property,
                value: value,
                message: this.formatMessage(value, root, this.property + " must be mininum of length " + this.count + ", but got " + value.length)
            };
        }
    };
    return MinLength;
}(RuleBase_1.RuleBase));
exports.MinLength = MinLength;
var MaxLength = /** @class */ (function (_super) {
    __extends(MaxLength, _super);
    function MaxLength(prop, count, mix) {
        var _this = _super.call(this, prop, mix) || this;
        _this.count = count;
        return _this;
    }
    MaxLength.prototype.validate = function (value, root) {
        if (typeof value !== 'string') {
            return {
                name: 'MaxLength.Type',
                property: this.property,
                value: value,
                message: this.formatMessage(value, root, this.property + " expected to be string, but got " + typeof value)
            };
        }
        if (value.length > this.count) {
            return {
                name: 'MaxLength',
                property: this.property,
                value: value,
                message: this.formatMessage(value, root, this.property + " must be maximum of length " + this.count + ", but got " + value.length)
            };
        }
    };
    return MaxLength;
}(RuleBase_1.RuleBase));
exports.MaxLength = MaxLength;
//# sourceMappingURL=export.js.map
//# sourceMappingURL=Length.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_validation_rules_Length) && isObject(module.exports)) {
		Object.assign(_src_validation_rules_Length, module.exports);
		return;
	}
	_src_validation_rules_Length = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_validation_rules_Pattern;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var RuleBase_1 = _src_validation_RuleBase;
var Pattern = /** @class */ (function (_super) {
    __extends(Pattern, _super);
    function Pattern(prop, pattern, mix) {
        var _this = _super.call(this, prop, mix) || this;
        _this.pattern = pattern;
        return _this;
    }
    Pattern.prototype.validate = function (value, root) {
        if (typeof value !== 'string') {
            return {
                name: 'Pattern.Type',
                property: this.property,
                value: value,
                message: this.formatMessage(value, root, this.property + " expected to be string, but got " + typeof value)
            };
        }
        if (this.pattern.test(value) === false) {
            return {
                name: 'Pattern',
                property: this.property,
                value: value,
                message: this.formatMessage(value, root, this.property + " must match the pattern " + String(this.pattern))
            };
        }
    };
    return Pattern;
}(RuleBase_1.RuleBase));
exports.Pattern = Pattern;
//# sourceMappingURL=export.js.map
//# sourceMappingURL=Pattern.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_validation_rules_Pattern) && isObject(module.exports)) {
		Object.assign(_src_validation_rules_Pattern, module.exports);
		return;
	}
	_src_validation_rules_Pattern = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_validation_rules_Custom;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var RuleBase_1 = _src_validation_RuleBase;
var Custom = /** @class */ (function (_super) {
    __extends(Custom, _super);
    function Custom(prop, fn, name) {
        if (name === void 0) { name = 'Custom'; }
        var _this = _super.call(this, prop) || this;
        _this.fn = fn;
        _this.name = name;
        return _this;
    }
    Custom.prototype.validate = function (value, root) {
        var message = this.fn(value, root);
        if (message != null) {
            return {
                name: this.name,
                property: this.property,
                value: value,
                message: message
            };
        }
    };
    return Custom;
}(RuleBase_1.RuleBase));
exports.Custom = Custom;
//# sourceMappingURL=export.js.map
//# sourceMappingURL=Custom.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_validation_rules_Custom) && isObject(module.exports)) {
		Object.assign(_src_validation_rules_Custom, module.exports);
		return;
	}
	_src_validation_rules_Custom = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_validation_rules_Number;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var RuleBase_1 = _src_validation_RuleBase;
var Minimum = /** @class */ (function (_super) {
    __extends(Minimum, _super);
    function Minimum(prop, value, mix) {
        var _this = _super.call(this, prop, mix) || this;
        _this.value = value;
        return _this;
    }
    Minimum.prototype.validate = function (value, root) {
        if (typeof value !== 'number') {
            return {
                name: 'Minimum.Type',
                property: this.property,
                value: value,
                message: this.formatMessage(value, root, this.property + " expected to be a number, but got " + typeof value)
            };
        }
        if (value < this.value) {
            return {
                name: 'Minimum',
                property: this.property,
                value: value,
                message: this.formatMessage(value, root, this.property + " must be mininum " + this.value + ", but got " + value)
            };
        }
    };
    return Minimum;
}(RuleBase_1.RuleBase));
exports.Minimum = Minimum;
var Maximum = /** @class */ (function (_super) {
    __extends(Maximum, _super);
    function Maximum(prop, value, mix) {
        var _this = _super.call(this, prop, mix) || this;
        _this.value = value;
        return _this;
    }
    Maximum.prototype.validate = function (value, root) {
        if (typeof value !== 'number') {
            return {
                name: 'Maximum.Type',
                property: this.property,
                value: value,
                message: this.formatMessage(value, root, this.property + " expected to be a number, but got " + typeof value)
            };
        }
        if (value > this.value) {
            return {
                name: 'Maximum',
                property: this.property,
                value: value,
                message: this.formatMessage(value, root, this.property + " must be maximum " + this.value + ", but got " + value)
            };
        }
    };
    return Maximum;
}(RuleBase_1.RuleBase));
exports.Maximum = Maximum;
//# sourceMappingURL=export.js.map
//# sourceMappingURL=Number.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_validation_rules_Number) && isObject(module.exports)) {
		Object.assign(_src_validation_rules_Number, module.exports);
		return;
	}
	_src_validation_rules_Number = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_validation_rules_String;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var RuleBase_1 = _src_validation_RuleBase;
var StringEnum = /** @class */ (function (_super) {
    __extends(StringEnum, _super);
    function StringEnum(prop, values, mix) {
        var _this = _super.call(this, prop, mix) || this;
        _this.values = values;
        return _this;
    }
    StringEnum.prototype.validate = function (value, root) {
        if (typeof value !== 'string') {
            return {
                name: 'StringEnum.Type',
                property: this.property,
                value: value,
                message: this.formatMessage(value, root, this.property + " expected to be a string, but got " + typeof value)
            };
        }
        if (this.values.includes(value) === false) {
            return {
                name: 'StringEnum',
                property: this.property,
                value: value,
                message: this.formatMessage(value, root, this.property + " must be one of " + this.values.join(',') + ", but got " + value)
            };
        }
    };
    return StringEnum;
}(RuleBase_1.RuleBase));
exports.StringEnum = StringEnum;
//# sourceMappingURL=export.js.map
//# sourceMappingURL=String.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_validation_rules_String) && isObject(module.exports)) {
		Object.assign(_src_validation_rules_String, module.exports);
		return;
	}
	_src_validation_rules_String = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_validation_Rule;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
exports.__esModule = true;
var JsonUtils_1 = _src_JsonUtils;
var Required_1 = _src_validation_rules_Required;
var Length_1 = _src_validation_rules_Length;
var Pattern_1 = _src_validation_rules_Pattern;
var Custom_1 = _src_validation_rules_Custom;
var Number_1 = _src_validation_rules_Number;
var String_1 = _src_validation_rules_String;
var Rule;
(function (Rule) {
    function required(mix) {
        return function (target, propertyKey, descriptor) {
            var rules = JsonUtils_1.JsonUtils.resolvePropertyRules(target, propertyKey);
            var rule = new Required_1.Required(propertyKey, mix);
            rules.unshift(rule);
            return descriptor;
        };
    }
    Rule.required = required;
    function minLength(count, mix) {
        return function (target, propertyKey, descriptor) {
            var rules = JsonUtils_1.JsonUtils.resolvePropertyRules(target, propertyKey);
            var rule = new Length_1.MinLength(propertyKey, count, mix);
            rules.unshift(rule);
            return descriptor;
        };
    }
    Rule.minLength = minLength;
    function maxLength(count, mix) {
        return function (target, propertyKey, descriptor) {
            var rules = JsonUtils_1.JsonUtils.resolvePropertyRules(target, propertyKey);
            var rule = new Length_1.MaxLength(propertyKey, count, mix);
            rules.unshift(rule);
            return descriptor;
        };
    }
    Rule.maxLength = maxLength;
    function minimum(val, mix) {
        return function (target, propertyKey, descriptor) {
            var rules = JsonUtils_1.JsonUtils.resolvePropertyRules(target, propertyKey);
            var rule = new Number_1.Minimum(propertyKey, val, mix);
            rules.unshift(rule);
            return descriptor;
        };
    }
    Rule.minimum = minimum;
    function maximum(val, mix) {
        return function (target, propertyKey, descriptor) {
            var rules = JsonUtils_1.JsonUtils.resolvePropertyRules(target, propertyKey);
            var rule = new Number_1.Maximum(propertyKey, val, mix);
            rules.unshift(rule);
            return descriptor;
        };
    }
    Rule.maximum = maximum;
    function pattern(pattern, mix) {
        if (typeof pattern === 'string') {
            pattern = new RegExp(pattern);
        }
        return function (target, propertyKey, descriptor) {
            var rules = JsonUtils_1.JsonUtils.resolvePropertyRules(target, propertyKey);
            var rule = new Pattern_1.Pattern(propertyKey, pattern, mix);
            rules.unshift(rule);
            return descriptor;
        };
    }
    Rule.pattern = pattern;
    function stringEnum(values, mix) {
        return function (target, propertyKey, descriptor) {
            var rules = JsonUtils_1.JsonUtils.resolvePropertyRules(target, propertyKey);
            var rule = new String_1.StringEnum(propertyKey, values, mix);
            rules.unshift(rule);
            return descriptor;
        };
    }
    Rule.stringEnum = stringEnum;
    function validate(fn, name) {
        if (name === void 0) { name = 'Custom'; }
        return function (target, propertyKey, descriptor) {
            var rules = JsonUtils_1.JsonUtils.resolvePropertyRules(target, propertyKey);
            var rule = new Custom_1.Custom(propertyKey, fn, name);
            rules.unshift(rule);
            return descriptor;
        };
    }
    Rule.validate = validate;
})(Rule = exports.Rule || (exports.Rule = {}));
//# sourceMappingURL=export.js.map
//# sourceMappingURL=Rule.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_validation_Rule) && isObject(module.exports)) {
		Object.assign(_src_validation_Rule, module.exports);
		return;
	}
	_src_validation_Rule = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_utils_is;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
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
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
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
var _src_JsonValidate;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
exports.__esModule = true;
var JsonUtils_1 = _src_JsonUtils;
var Types_1 = _src_Types;
var Required_1 = _src_validation_rules_Required;
var EMPTY = [];
var JsonValidate;
(function (JsonValidate) {
    function validate(model, settings) {
        var _a, _b, _c;
        var meta = (_a = JsonUtils_1.JsonUtils.pickModelMeta(model), (_a !== null && _a !== void 0 ? _a : JsonUtils_1.JsonUtils.pickModelMeta((_b = settings) === null || _b === void 0 ? void 0 : _b.Type)));
        if (meta == null) {
            if (((_c = settings) === null || _c === void 0 ? void 0 : _c.mustValidate) === true) {
                return [
                    { message: 'Object has not validation meta information' }
                ];
            }
            return EMPTY;
        }
        var errors = validateByMeta(model, model, meta, '');
        return (errors !== null && errors !== void 0 ? errors : EMPTY);
    }
    JsonValidate.validate = validate;
    function validateProperty(model, key, settings) {
        var _a, _b, _c;
        var meta = (_a = JsonUtils_1.JsonUtils.pickModelMeta(model), (_a !== null && _a !== void 0 ? _a : JsonUtils_1.JsonUtils.pickModelMeta((_b = settings) === null || _b === void 0 ? void 0 : _b.Type)));
        if (meta == null) {
            if (((_c = settings) === null || _c === void 0 ? void 0 : _c.mustValidate) === true) {
                return [
                    { message: 'Object has not validation meta information' }
                ];
            }
            return EMPTY;
        }
        var val = model[key];
        var propInfo = meta.properties[key];
        var errors = validateSingleValue(model, val, model, key, propInfo, '');
        return (errors !== null && errors !== void 0 ? errors : EMPTY);
    }
    JsonValidate.validateProperty = validateProperty;
    function validateByMeta(model, root, meta, path) {
        var _a, _b;
        if (meta == null) {
            return null;
        }
        var result = null;
        for (var key in model) {
            var val = model[key];
            var propInfo = meta.properties[key];
            var error = val == null
                ? checkOptional(model, (root !== null && root !== void 0 ? root : model), key, propInfo, path)
                : validateSingleValue(model, val, (root !== null && root !== void 0 ? root : model), key, propInfo, path);
            if (error) {
                (_a = ((result !== null && result !== void 0 ? result : (result = [])))).push.apply(_a, error);
            }
        }
        for (var key in meta.properties) {
            if (key in model) {
                // was handled
                continue;
            }
            var propInfo = meta.properties[key];
            var error = checkOptional(model, (root !== null && root !== void 0 ? root : model), key, propInfo, path);
            if (error) {
                (_b = ((result !== null && result !== void 0 ? result : (result = [])))).push.apply(_b, error);
            }
        }
        return result;
    }
    function validateSingleValue(model, val, root, key, propInfo, outerPath) {
        var _a, _b;
        var _c, _d, _e, _f, _g;
        var result = null;
        var rules = (_c = propInfo) === null || _c === void 0 ? void 0 : _c.rules;
        if (rules) {
            var error = execRules(val, model, rules, outerPath);
            if (error) {
                ((result !== null && result !== void 0 ? result : (result = []))).push(error);
            }
        }
        if (Types_1.Types.isValueType(val)) {
            return result;
        }
        if (Types_1.Types.isArray(val)) {
            var arr = val;
            var Type = (_d = propInfo) === null || _d === void 0 ? void 0 : _d.ArrayType;
            var innerMeta = JsonUtils_1.JsonUtils.pickModelMeta(Type);
            for (var i = 0; i < arr.length; i++) {
                var x = arr[i];
                var $innerMeta = (_e = JsonUtils_1.JsonUtils.pickModelMeta(x), (_e !== null && _e !== void 0 ? _e : innerMeta));
                var parentPath = outerPath ? outerPath + "." + i : "" + i;
                var errors = validateByMeta(x, root, $innerMeta, parentPath);
                if (errors) {
                    (_a = ((result !== null && result !== void 0 ? result : (result = [])))).push.apply(_a, errors);
                }
            }
            return result;
        }
        if (Types_1.Types.isObject(val)) {
            var obj = val;
            var Type = (_f = propInfo) === null || _f === void 0 ? void 0 : _f.Type;
            var innerMeta = (_g = JsonUtils_1.JsonUtils.pickModelMeta(Type), (_g !== null && _g !== void 0 ? _g : JsonUtils_1.JsonUtils.pickModelMeta(obj)));
            var parentPath = outerPath ? outerPath + "." + key : "" + key;
            var errors = validateByMeta(obj, root, innerMeta, parentPath);
            if (errors) {
                (_b = ((result !== null && result !== void 0 ? result : (result = [])))).push.apply(_b, errors);
            }
            return result;
        }
        return result;
    }
    function execRules(val, root, rules, parentPath) {
        if (rules == null || rules.length === 0) {
            return null;
        }
        for (var i = 0; i < rules.length; i++) {
            var error = rules[i].validate(val, root);
            if (error != null) {
                if (parentPath) {
                    error.property = parentPath + "." + error.property;
                }
                return error;
            }
        }
        return null;
    }
    function checkOptional(model, root, key, propInfo, outerPath) {
        var _a;
        var rules = (_a = propInfo) === null || _a === void 0 ? void 0 : _a.rules;
        if (rules == null || rules.length === 0) {
            return null;
        }
        for (var _i = 0, rules_1 = rules; _i < rules_1.length; _i++) {
            var rule = rules_1[_i];
            if (rule instanceof Required_1.Required) {
                var error = rule.validate(null, root);
                if (error) {
                    error.property = outerPath ? outerPath + "." + key : "" + key;
                    return [error];
                }
            }
        }
    }
})(JsonValidate = exports.JsonValidate || (exports.JsonValidate = {}));
//# sourceMappingURL=export.js.map
//# sourceMappingURL=JsonValidate.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_JsonValidate) && isObject(module.exports)) {
		Object.assign(_src_JsonValidate, module.exports);
		return;
	}
	_src_JsonValidate = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Serializable;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
exports.__esModule = true;
var JsonConvert_1 = _src_JsonConvert;
var JsonValidate_1 = _src_JsonValidate;
var JsonUtils_1 = _src_JsonUtils;
// class Foo {
//     name: string
//     bar: Bar
//     arr: any[]
// }
// class Bar {
//     b1: string
//     b2: string
//     arr: any[]
// }
// function f (x: DeepPartial<Foo>) {}
// f({ name: 'hello', bar: { b1: 'B1' }, arr: [ 1 ] })
var Serializable = /** @class */ (function () {
    function Serializable(partial) {
        var _a;
        if (partial != null) {
            for (var key in partial) {
                this[key] = partial[key];
            }
        }
        var defs = (_a = JsonUtils_1.JsonUtils.pickModelMeta(this)) === null || _a === void 0 ? void 0 : _a.defaults;
        if (defs != null) {
            for (var key in defs) {
                if (this[key] == null) {
                    this[key] = defs[key];
                }
            }
        }
    }
    Serializable.fromJson = function (json, settings) {
        if (settings === void 0) { settings = { Type: null }; }
        console.warn('Obsolete (fromJson) - use fromJSON instead');
        return this.fromJSON(json, settings);
    };
    Serializable.fromJSON = function (json, settings) {
        if (settings === void 0) { settings = { Type: null }; }
        var _a;
        settings.Type = (_a = settings.Type, (_a !== null && _a !== void 0 ? _a : this));
        return JsonConvert_1.JsonConvert.fromJSON(json, settings);
    };
    Serializable.validate = function (x, settings) {
        if (settings === void 0) { settings = {}; }
        if (settings.Type == null) {
            settings.Type = this;
        }
        return JsonValidate_1.JsonValidate.validate(x, settings);
    };
    Serializable.prototype.toJson = function (settings) {
        console.warn('Obsolete (toJson) - use toJSON instead');
        return this.toJSON(settings);
    };
    Serializable.prototype.toJSON = function (settings) {
        return JsonConvert_1.JsonConvert.toJSON(this, settings);
    };
    Serializable.prototype.assign = function (partial) {
        Object.assign(this, partial);
        return this;
    };
    return Serializable;
}());
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
var _src_JsonSerializer;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
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
    // export function serialize (x: any, Type: IConstructor, Converter: IJsonConverter, settings: JsonSettings) {
    //     if (Converter?.toJSON) {
    //         return Converter.toJSON(x, settings);
    //     }
    //     if (Types.isValueType(x)) {
    //         return x;
    //     }
    //     if (Types.isArray(x)) {
    //         let arr = new Array(x.length);
    //         for (let i = 0; i < x.length; i++) {
    //             arr[i] = serialize(x, info.ArrayType, settings);
    //         }
    //         return arr;
    //     }
    // }
    function serializeObject(model, Type, settings) {
        var _a, _b;
        if (Types_1.Types.isValueType(model)) {
            return model;
        }
        var meta = (_a = JsonUtils_1.JsonUtils.pickModelMeta(model), (_a !== null && _a !== void 0 ? _a : JsonUtils_1.JsonUtils.pickModelMeta(Type)));
        var json = Object.create(null);
        for (var key in model) {
            var propertyInfo = (_b = meta) === null || _b === void 0 ? void 0 : _b.properties[key];
            if (propertyInfo != null && propertyInfo.jsonIgnore) {
                continue;
            }
            var modelVal = model[key];
            if (typeof modelVal === 'function') {
                continue;
            }
            var property = toJsonName(key, propertyInfo, settings);
            var val = toJsonValue(modelVal, propertyInfo, settings);
            json[property] = val;
        }
        return json;
    }
    JsonSerializer.serializeObject = serializeObject;
    function toJsonValue(val, info, settings) {
        var _a, _b, _c, _d, _e;
        if ((_b = (_a = info) === null || _a === void 0 ? void 0 : _a.Converter) === null || _b === void 0 ? void 0 : _b.toJSON) {
            return info.Converter.toJSON(val, settings);
        }
        if (Types_1.Types.isValueType(val)) {
            return val;
        }
        if (Types_1.Types.isArray(val)) {
            var arr = new Array(val.length);
            for (var i = 0; i < val.length; i++) {
                arr[i] = serializeObject(val[i], (_c = info) === null || _c === void 0 ? void 0 : _c.ArrayType, settings);
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
        var type = (_e = (_d = info) === null || _d === void 0 ? void 0 : _d.Type, (_e !== null && _e !== void 0 ? _e : val.constructor));
        var converter = JsonConvert_1.JsonConverters.find(function (x) { return x.supports(val, type); });
        if (converter) {
            return converter.toJSON(val, settings);
        }
        if (JsonUtils_1.JsonUtils.hasModelMeta(val)) {
            return JsonConvert_1.JsonConvert.toJSON(val, settings);
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
            return key.replace(/(_+)(\w)/g, function (full, underscore, letter, i) {
                if (i === 0) {
                    return full;
                }
                return letter.toUpperCase();
            });
        }
        if (type === 'underScore') {
            return key
                .replace(/^([A-Z])/, function (full, letter) { return "" + letter.toLowerCase(); })
                .replace(/([A-Z])/g, function (full, letter, i) {
                if (i === 0) {
                    return full;
                }
                return "_" + letter.toLowerCase();
            });
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
var _src_JsonDeserializer;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
exports.__esModule = true;
var JsonUtils_1 = _src_JsonUtils;
var Types_1 = _src_Types;
var JsonConvert_1 = _src_JsonConvert;
var Serializable_1 = _src_Serializable;
var JsonSerializer_1 = _src_JsonSerializer;
var JsonDeserializer;
(function (JsonDeserializer) {
    function deserialize(json, meta, settings) {
        var model = fromJsonToModel(json, meta, settings);
        if (meta.Type) {
            var Mix = meta.Type;
            if (Mix.fromJSON && Mix.fromJSON !== Serializable_1.Serializable.fromJSON) {
                return Mix.fromJSON(model);
            }
            var instance = new Mix();
            if (instance.fromJSON && instance.fromJSON !== Serializable_1.Serializable.fromJSON) {
                instance.fromJSON(model);
                return instance;
            }
            for (var key in model) {
                instance[key] = model[key];
                ;
            }
            return instance;
        }
        return model;
    }
    JsonDeserializer.deserialize = deserialize;
    function fromJsonToModel(json, meta, settings) {
        var _a;
        var model = Object.create(null);
        for (var key in json) {
            var property = resolveName(key, meta.nameMappings, meta, settings);
            var info = (_a = meta) === null || _a === void 0 ? void 0 : _a.properties[property];
            var value = resolveValue(json[key], info, settings);
            model[property] = value;
        }
        return model;
    }
    JsonDeserializer.fromJsonToModel = fromJsonToModel;
    function resolveValue(val, info, settings) {
        var _a, _b, _c, _d, _e, _f;
        if ((_b = (_a = info) === null || _a === void 0 ? void 0 : _a.Converter) === null || _b === void 0 ? void 0 : _b.fromJSON) {
            return info.Converter.fromJSON(val, settings);
        }
        var Type = (_c = info) === null || _c === void 0 ? void 0 : _c.Type;
        if (Type) {
            if (Type === Number) {
                return typeof val === 'number'
                    ? val
                    : Number(val);
            }
            if (Type === String) {
                return typeof val === 'string'
                    ? val
                    : String(val);
            }
            var converter = null;
            for (var i = 0; i < JsonConvert_1.JsonConverters.length; i++) {
                if (JsonConvert_1.JsonConverters[i].supports(val, Type)) {
                    converter = JsonConvert_1.JsonConverters[i];
                    break;
                }
            }
            if (converter) {
                return converter.fromJSON(val, settings);
            }
            var meta = JsonUtils_1.JsonUtils.pickModelMeta(Type);
            if (meta) {
                return deserialize(val, meta, settings);
            }
            var Ctor = Type;
            return new Ctor(val);
        }
        var Meta = (_d = info) === null || _d === void 0 ? void 0 : _d.Meta;
        if (Meta) {
            return deserialize(val, Meta, settings);
        }
        if (Types_1.Types.isValueType(val)) {
            return val;
        }
        if (Types_1.Types.isArray(val)) {
            var out = new Array(val.length);
            var arrayType = (_e = info) === null || _e === void 0 ? void 0 : _e.ArrayType;
            var converter = (_f = info) === null || _f === void 0 ? void 0 : _f.Converter;
            var itemInfo = {
                Type: arrayType,
                Converter: converter
            };
            for (var i = 0; i < val.length; i++) {
                out[i] = resolveValue(val[i], itemInfo, settings);
            }
            return out;
        }
        return val;
    }
    JsonDeserializer.resolveValue = resolveValue;
    function resolveName(key, mappings, meta, settings) {
        var _a;
        var info = (_a = mappings) === null || _a === void 0 ? void 0 : _a[key];
        if (info != null) {
            return info.property;
        }
        return JsonSerializer_1.JsonSerializer.toJsonName(key, info, settings);
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
var _src_JsonConvert;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
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
        console.warn('Obsolete (static toJson) - use toJSON instead');
        return toJSON(model, settings);
    }
    JsonConvert.toJson = toJson;
    function toJSON(model, settings) {
        var _a;
        if (Types_1.Types.isArray(model)) {
            return model.map(function (x) { return toJSON(x, settings); });
        }
        return JsonSerializer_1.JsonSerializer.serializeObject(model, (_a = settings) === null || _a === void 0 ? void 0 : _a.Type, settings);
    }
    JsonConvert.toJSON = toJSON;
    function fromJson(model, settings) {
        console.warn('Obsolete (static toJson) - use toJSON instead');
        return toJSON(model, settings);
    }
    JsonConvert.fromJson = fromJson;
    function fromJSON(json, settings) {
        var _a, _b;
        if (Types_1.Types.isArray(json)) {
            return json.map(function (x) { return fromJSON(x, settings); });
        }
        var Type = (_a = settings) === null || _a === void 0 ? void 0 : _a.Type;
        var meta = (_b = JsonUtils_1.JsonUtils.pickModelMeta(Type), (_b !== null && _b !== void 0 ? _b : getMetaFor(Type)));
        return JsonDeserializer_1.JsonDeserializer.deserialize(json, meta, settings);
    }
    JsonConvert.fromJSON = fromJSON;
    function stringify(instance, settings) {
        var _a;
        var json = toJSON(instance, settings);
        return JSON.stringify(json, null, (_a = settings) === null || _a === void 0 ? void 0 : _a.space);
    }
    JsonConvert.stringify = stringify;
    function parse(str, settings) {
        var json = JSON.parse(str);
        return fromJSON(json, settings);
    }
    JsonConvert.parse = parse;
})(JsonConvert = exports.JsonConvert || (exports.JsonConvert = {}));
exports.JsonConverters = [
    {
        supports: function (val, type) {
            return type === Date || val instanceof Date;
        },
        toJSON: function (val) {
            return val;
        },
        fromJSON: function (val) {
            return typeof val === 'string'
                ? new Date(val)
                : val;
        }
    },
    {
        supports: function (val, type) {
            return type === RegExp || val instanceof RegExp;
        },
        toJSON: function (val) {
            return val.toString();
        },
        fromJSON: function (val) {
            var pattern = val.substring(1, val.lastIndexOf('/'));
            var flags = val.substring(val.lastIndexOf('/') + 1);
            return new RegExp(pattern, flags);
        }
    }
];
/** Perf: reuse default empty metas */
var DEFAULT_META = {
    Type: null,
    properties: {},
    defaults: null
};
function getMetaFor(Type) {
    DEFAULT_META.Type = Type;
    return DEFAULT_META;
}
//# sourceMappingURL=JsonConvert.js.map
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
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
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


// source ./ModuleSimplified.js
var _src_JsonSchema;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
exports.__esModule = true;
var JsonUtils_1 = _src_JsonUtils;
var obj_1 = _src_utils_obj;
var Pattern_1 = _src_validation_rules_Pattern;
var Required_1 = _src_validation_rules_Required;
var Length_1 = _src_validation_rules_Length;
var Number_1 = _src_validation_rules_Number;
var Custom_1 = _src_validation_rules_Custom;
var String_1 = _src_validation_rules_String;
var JsonSchema;
(function (JsonSchema) {
    function getSchema(Type, schema) {
        var _a, _b, _c, _d;
        if (Type == null) {
            return {
                type: 'any'
            };
        }
        if (((_a = schema) === null || _a === void 0 ? void 0 : _a.type) === 'array') {
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
        var object = {
            type: 'object',
            properties: {}
        };
        var meta = JsonUtils_1.JsonUtils.pickModelMeta(Type);
        if (((_b = meta) === null || _b === void 0 ? void 0 : _b.properties) != null) {
            for (var prop in meta.properties) {
                var propMeta = meta.properties[prop];
                var props = object.properties;
                if (propMeta.ArrayType) {
                    props[prop] = getSchema(propMeta.ArrayType, { type: 'array' });
                    if (propMeta.description) {
                        props[prop].description = propMeta.description;
                    }
                    continue;
                }
                props[prop] = getSchema((_c = propMeta) === null || _c === void 0 ? void 0 : _c.Type, null);
                if (propMeta.rules) {
                    for (var _i = 0, _e = propMeta.rules; _i < _e.length; _i++) {
                        var rule = _e[_i];
                        if (rule instanceof Pattern_1.Pattern) {
                            props[prop].pattern = rule.pattern.toString();
                            continue;
                        }
                        if (rule instanceof Required_1.Required) {
                            if (object.required == null) {
                                object.required = [];
                            }
                            object.required.push(prop);
                            continue;
                        }
                        if (rule instanceof Length_1.MinLength) {
                            props[prop].minLength = rule.count;
                            continue;
                        }
                        if (rule instanceof Length_1.MaxLength) {
                            props[prop].maxLength = rule.count;
                            continue;
                        }
                        if (rule instanceof Number_1.Minimum) {
                            props[prop].minimum = rule.value;
                            continue;
                        }
                        if (rule instanceof Number_1.Maximum) {
                            props[prop].maximum = rule.value;
                            continue;
                        }
                        if (rule instanceof Custom_1.Custom) {
                            props[prop].validation = rule.fn.toString();
                        }
                        if (rule instanceof String_1.StringEnum) {
                            props[prop]["enum"] = rule.values;
                        }
                    }
                }
                if (propMeta["default"] != null) {
                    props[prop]["default"] = propMeta["default"];
                }
                if (propMeta.description) {
                    props[prop].description = propMeta.description;
                }
            }
        }
        if ((_d = meta) === null || _d === void 0 ? void 0 : _d.description) {
            object.description = meta.description;
        }
        var keys = obj_1.obj_getKeys(Type.prototype);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (key in object.properties
                || key === '__json__'
                || key === 'toJSON'
                || key === 'toJson') {
                continue;
            }
            ;
            var val = Type.prototype[key];
            if (typeof val === 'function') {
                continue;
            }
            object.properties[key] = getSchema(val);
        }
        return object;
    }
    JsonSchema.getSchema = getSchema;
})(JsonSchema = exports.JsonSchema || (exports.JsonSchema = {}));
//# sourceMappingURL=export.js.map
//# sourceMappingURL=JsonSchema.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_JsonSchema) && isObject(module.exports)) {
		Object.assign(_src_JsonSchema, module.exports);
		return;
	}
	_src_JsonSchema = module.exports;
}());
// end:source ./ModuleSimplified.js

"use strict";
exports.__esModule = true;
var Json_1 = _src_Json;
exports.Json = Json_1.Json;
var Rule_1 = _src_validation_Rule;
exports.Rule = Rule_1.Rule;
var JsonConvert_1 = _src_JsonConvert;
exports.JsonConvert = JsonConvert_1.JsonConvert;
var JsonValidate_1 = _src_JsonValidate;
exports.JsonValidate = JsonValidate_1.JsonValidate;
var Serializable_1 = _src_Serializable;
exports.Serializable = Serializable_1.Serializable;
var JsonSettings_1 = _src_JsonSettings;
exports.JsonSettings = JsonSettings_1.JsonSettings;
var JsonUtils_1 = _src_JsonUtils;
exports.JsonUtils = JsonUtils_1.JsonUtils;
var JsonSchema_1 = _src_JsonSchema;
exports.JsonSchema = JsonSchema_1.JsonSchema;
//# sourceMappingURL=export.js.map
//# sourceMappingURL=export.ts.map

}));

// end:source ./UMD.js
