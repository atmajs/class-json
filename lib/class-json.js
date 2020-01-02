
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
var _src_JsonValidate = {};
var _src_Serializable = {};
var _src_Types = {};
var _src_utils_is = {};
var _src_validation_Rule = {};
var _src_validation_RuleBase = {};
var _src_validation_rules_Custom = {};
var _src_validation_rules_Length = {};
var _src_validation_rules_Pattern = {};
var _src_validation_rules_Required = {};

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
var _src_validation_RuleBase;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
exports.__esModule = true;
var RuleBase = /** @class */ (function () {
    function RuleBase(property) {
        this.property = property;
    }
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
                message: this.property + " is not set"
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
    function MinLength(prop, count) {
        var _this = _super.call(this, prop) || this;
        _this.count = count;
        return _this;
    }
    MinLength.prototype.validate = function (value, root) {
        if (typeof value !== 'string') {
            return {
                name: 'MinLength.Type',
                property: this.property,
                value: value,
                message: this.property + " expected to be string, but got " + typeof value
            };
        }
        if (value.length < this.count) {
            return {
                name: 'MinLength',
                property: this.property,
                value: value,
                message: this.property + " must be mininum of length " + this.count + ", but got " + value.length
            };
        }
    };
    return MinLength;
}(RuleBase_1.RuleBase));
exports.MinLength = MinLength;
var MaxLength = /** @class */ (function (_super) {
    __extends(MaxLength, _super);
    function MaxLength(prop, count) {
        var _this = _super.call(this, prop) || this;
        _this.count = count;
        return _this;
    }
    MaxLength.prototype.validate = function (value, root) {
        if (typeof value !== 'string') {
            return {
                name: 'MaxLength.Type',
                property: this.property,
                value: value,
                message: this.property + " expected to be string, but got " + typeof value
            };
        }
        if (value.length > this.count) {
            return {
                name: 'MaxLength',
                property: this.property,
                value: value,
                message: this.property + " must be maximum of length " + this.count + ", but got " + value.length
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
    function Pattern(prop, pattern) {
        var _this = _super.call(this, prop) || this;
        _this.pattern = pattern;
        return _this;
    }
    Pattern.prototype.validate = function (value, root) {
        if (typeof value !== 'string') {
            return {
                name: 'Pattern.Type',
                property: this.property,
                value: value,
                message: this.property + " expected to be string, but got " + typeof value
            };
        }
        if (this.pattern.test(value) === false) {
            return {
                name: 'Pattern',
                property: this.property,
                value: value,
                message: this.property + " must match the pattern " + String(this.pattern)
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
var _src_validation_Rule;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
exports.__esModule = true;
var JsonUtils_1 = _src_JsonUtils;
var Required_1 = _src_validation_rules_Required;
var Length_1 = _src_validation_rules_Length;
var Pattern_1 = _src_validation_rules_Pattern;
var Custom_1 = _src_validation_rules_Custom;
var Rule;
(function (Rule) {
    function required() {
        return function (target, propertyKey, descriptor) {
            var rules = JsonUtils_1.JsonUtils.resolvePropertyRules(target, propertyKey);
            var rule = new Required_1.Required(propertyKey);
            rules.unshift(rule);
            return descriptor;
        };
    }
    Rule.required = required;
    function minLength(count) {
        return function (target, propertyKey, descriptor) {
            var rules = JsonUtils_1.JsonUtils.resolvePropertyRules(target, propertyKey);
            var rule = new Length_1.MinLength(propertyKey, count);
            rules.unshift(rule);
            return descriptor;
        };
    }
    Rule.minLength = minLength;
    function maxLength(count) {
        return function (target, propertyKey, descriptor) {
            var rules = JsonUtils_1.JsonUtils.resolvePropertyRules(target, propertyKey);
            var rule = new Length_1.MaxLength(propertyKey, count);
            rules.unshift(rule);
            return descriptor;
        };
    }
    Rule.maxLength = maxLength;
    function pattern(pattern) {
        if (typeof pattern === 'string') {
            pattern = new RegExp(pattern);
        }
        return function (target, propertyKey, descriptor) {
            var rules = JsonUtils_1.JsonUtils.resolvePropertyRules(target, propertyKey);
            var rule = new Pattern_1.Pattern(propertyKey, pattern);
            rules.unshift(rule);
            return descriptor;
        };
    }
    Rule.pattern = pattern;
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
var _src_JsonValidate;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
exports.__esModule = true;
var JsonUtils_1 = _src_JsonUtils;
var Types_1 = _src_Types;
var JsonValidate;
(function (JsonValidate) {
    function validate(model, settings) {
        var _a, _b;
        var meta = (_a = JsonUtils_1.JsonUtils.pickModelMeta(model), (_a !== null && _a !== void 0 ? _a : JsonUtils_1.JsonUtils.pickModelMeta((_b = settings) === null || _b === void 0 ? void 0 : _b.Type)));
        var errors = validateByMeta(model, model, meta, '');
        return (errors !== null && errors !== void 0 ? errors : []);
    }
    JsonValidate.validate = validate;
    function validateByMeta(model, root, meta, path) {
        var _a, _b;
        var _c, _d, _e, _f, _g;
        if (meta == null) {
            return null;
        }
        var result = null;
        for (var key in model) {
            var val = model[key];
            var propInfo = meta.properties[key];
            var rules = (_c = propInfo) === null || _c === void 0 ? void 0 : _c.rules;
            if (rules) {
                var error = execRules(val, model, rules, path);
                if (error) {
                    ((result !== null && result !== void 0 ? result : (result = []))).push(error);
                }
            }
            if (Types_1.Types.isValueType(val)) {
                continue;
            }
            if (Types_1.Types.isArray(val)) {
                var arr = val;
                var Type = (_d = propInfo) === null || _d === void 0 ? void 0 : _d.ArrayType;
                var innerMeta = JsonUtils_1.JsonUtils.pickModelMeta(Type);
                for (var i = 0; i < arr.length; i++) {
                    var x = arr[i];
                    var $innerMeta = (_e = JsonUtils_1.JsonUtils.pickModelMeta(x), (_e !== null && _e !== void 0 ? _e : innerMeta));
                    var parentPath = path ? path + "." + i : "" + i;
                    var errors = validateByMeta(x, root, $innerMeta, parentPath);
                    if (errors) {
                        (_a = ((result !== null && result !== void 0 ? result : (result = [])))).push.apply(_a, errors);
                    }
                }
            }
            if (Types_1.Types.isObject(val)) {
                var obj = val;
                var Type = (_f = propInfo) === null || _f === void 0 ? void 0 : _f.Type;
                var innerMeta = (_g = JsonUtils_1.JsonUtils.pickModelMeta(Type), (_g !== null && _g !== void 0 ? _g : JsonUtils_1.JsonUtils.pickModelMeta(obj)));
                var parentPath = path ? path + "." + key : "" + key;
                var errors = validateByMeta(obj, root, innerMeta, parentPath);
                if (errors) {
                    (_b = ((result !== null && result !== void 0 ? result : (result = [])))).push.apply(_b, errors);
                }
            }
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
})(JsonValidate = exports.JsonValidate || (exports.JsonValidate = {}));
//# sourceMappingURL=Serializable.js.map
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
	var exports = {};
	var module = { exports: exports };
	"use strict";
exports.__esModule = true;
var JsonConvert_1 = _src_JsonConvert;
var JsonValidate_1 = _src_JsonValidate;
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
    Serializable.validate = function (x, settings) {
        if (settings === void 0) { settings = {}; }
        if (settings.Type == null) {
            settings.Type = this;
        }
        return JsonValidate_1.JsonValidate.validate(x, settings);
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
var JsonSerializer_1 = _src_JsonSerializer;
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
        return JsonSerializer_1.JsonSerializer.toJsonName(key, info, settings);
        //return key.replace(/(?<=.)_([a-z])/g, (full, letter) => letter.toUpperCase());
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
        var _a, _b, _c;
        if (Types_1.Types.isArray(model)) {
            return model.map(function (x) { return toJson(x, settings); });
        }
        var meta = (_a = JsonUtils_1.JsonUtils.pickModelMeta(model), (_a !== null && _a !== void 0 ? _a : JsonUtils_1.JsonUtils.pickModelMeta((_b = settings) === null || _b === void 0 ? void 0 : _b.Type)));
        var json = Object.create(null);
        for (var key in model) {
            var propertyInfo = (_c = meta) === null || _c === void 0 ? void 0 : _c.properties[key];
            if (propertyInfo != null && propertyInfo.jsonIgnore) {
                continue;
            }
            var modelVal = model[key];
            if (typeof modelVal === 'function') {
                continue;
            }
            var property = JsonSerializer_1.JsonSerializer.toJsonName(key, propertyInfo, settings);
            var val = JsonSerializer_1.JsonSerializer.toJsonValue(modelVal, propertyInfo, settings);
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
//# sourceMappingURL=export.js.map
//# sourceMappingURL=export.ts.map
}));
// end:source ./UMD.js
