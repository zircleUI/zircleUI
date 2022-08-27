(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"));
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["zircle"] = factory(require("vue"));
	else
		root["zircle"] = factory(root["Vue"]);
})((typeof self !== 'undefined' ? self : this), function(__WEBPACK_EXTERNAL_MODULE__7203__) {
return /******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 7679:
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// addapted from the document.currentScript polyfill by Adam Miller
// MIT license
// source: https://github.com/amiller-gh/currentScript-polyfill

// added support for Firefox https://bugzilla.mozilla.org/show_bug.cgi?id=1620505

(function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(typeof self !== 'undefined' ? self : this, function () {
  function getCurrentScript () {
    var descriptor = Object.getOwnPropertyDescriptor(document, 'currentScript')
    // for chrome
    if (!descriptor && 'currentScript' in document && document.currentScript) {
      return document.currentScript
    }

    // for other browsers with native support for currentScript
    if (descriptor && descriptor.get !== getCurrentScript && document.currentScript) {
      return document.currentScript
    }
  
    // IE 8-10 support script readyState
    // IE 11+ & Firefox support stack trace
    try {
      throw new Error();
    }
    catch (err) {
      // Find the second match for the "at" string to get file src url from stack.
      var ieStackRegExp = /.*at [^(]*\((.*):(.+):(.+)\)$/ig,
        ffStackRegExp = /@([^@]*):(\d+):(\d+)\s*$/ig,
        stackDetails = ieStackRegExp.exec(err.stack) || ffStackRegExp.exec(err.stack),
        scriptLocation = (stackDetails && stackDetails[1]) || false,
        line = (stackDetails && stackDetails[2]) || false,
        currentLocation = document.location.href.replace(document.location.hash, ''),
        pageSource,
        inlineScriptSourceRegExp,
        inlineScriptSource,
        scripts = document.getElementsByTagName('script'); // Live NodeList collection
  
      if (scriptLocation === currentLocation) {
        pageSource = document.documentElement.outerHTML;
        inlineScriptSourceRegExp = new RegExp('(?:[^\\n]+?\\n){0,' + (line - 2) + '}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*', 'i');
        inlineScriptSource = pageSource.replace(inlineScriptSourceRegExp, '$1').trim();
      }
  
      for (var i = 0; i < scripts.length; i++) {
        // If ready state is interactive, return the script tag
        if (scripts[i].readyState === 'interactive') {
          return scripts[i];
        }
  
        // If src matches, return the script tag
        if (scripts[i].src === scriptLocation) {
          return scripts[i];
        }
  
        // If inline source matches, return the script tag
        if (
          scriptLocation === currentLocation &&
          scripts[i].innerHTML &&
          scripts[i].innerHTML.trim() === inlineScriptSource
        ) {
          return scripts[i];
        }
      }
  
      // If no match, return null
      return null;
    }
  };

  return getCurrentScript
}));


/***/ }),

/***/ 9662:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isCallable = __webpack_require__(614);
var tryToString = __webpack_require__(6330);

var $TypeError = TypeError;

// `Assert: IsCallable(argument) is true`
module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw $TypeError(tryToString(argument) + ' is not a function');
};


/***/ }),

/***/ 9483:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isConstructor = __webpack_require__(4411);
var tryToString = __webpack_require__(6330);

var $TypeError = TypeError;

// `Assert: IsConstructor(argument) is true`
module.exports = function (argument) {
  if (isConstructor(argument)) return argument;
  throw $TypeError(tryToString(argument) + ' is not a constructor');
};


/***/ }),

/***/ 6077:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isCallable = __webpack_require__(614);

var $String = String;
var $TypeError = TypeError;

module.exports = function (argument) {
  if (typeof argument == 'object' || isCallable(argument)) return argument;
  throw $TypeError("Can't set " + $String(argument) + ' as a prototype');
};


/***/ }),

/***/ 1223:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(5112);
var create = __webpack_require__(30);
var defineProperty = (__webpack_require__(3070).f);

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  defineProperty(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ 1530:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var charAt = (__webpack_require__(8710).charAt);

// `AdvanceStringIndex` abstract operation
// https://tc39.es/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1);
};


/***/ }),

/***/ 9670:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(111);

var $String = String;
var $TypeError = TypeError;

// `Assert: Type(argument) is Object`
module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw $TypeError($String(argument) + ' is not an object');
};


/***/ }),

/***/ 8533:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $forEach = (__webpack_require__(2092).forEach);
var arrayMethodIsStrict = __webpack_require__(9341);

var STRICT_METHOD = arrayMethodIsStrict('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.foreach
module.exports = !STRICT_METHOD ? function forEach(callbackfn /* , thisArg */) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
// eslint-disable-next-line es-x/no-array-prototype-foreach -- safe
} : [].forEach;


/***/ }),

/***/ 8457:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var bind = __webpack_require__(9974);
var call = __webpack_require__(6916);
var toObject = __webpack_require__(7908);
var callWithSafeIterationClosing = __webpack_require__(3411);
var isArrayIteratorMethod = __webpack_require__(7659);
var isConstructor = __webpack_require__(4411);
var lengthOfArrayLike = __webpack_require__(6244);
var createProperty = __webpack_require__(6135);
var getIterator = __webpack_require__(8554);
var getIteratorMethod = __webpack_require__(1246);

var $Array = Array;

// `Array.from` method implementation
// https://tc39.es/ecma262/#sec-array.from
module.exports = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
  var O = toObject(arrayLike);
  var IS_CONSTRUCTOR = isConstructor(this);
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined);
  var iteratorMethod = getIteratorMethod(O);
  var index = 0;
  var length, result, step, iterator, next, value;
  // if the target is not iterable or it's an array with the default iterator - use a simple case
  if (iteratorMethod && !(this === $Array && isArrayIteratorMethod(iteratorMethod))) {
    iterator = getIterator(O, iteratorMethod);
    next = iterator.next;
    result = IS_CONSTRUCTOR ? new this() : [];
    for (;!(step = call(next, iterator)).done; index++) {
      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
      createProperty(result, index, value);
    }
  } else {
    length = lengthOfArrayLike(O);
    result = IS_CONSTRUCTOR ? new this(length) : $Array(length);
    for (;length > index; index++) {
      value = mapping ? mapfn(O[index], index) : O[index];
      createProperty(result, index, value);
    }
  }
  result.length = index;
  return result;
};


/***/ }),

/***/ 1318:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toIndexedObject = __webpack_require__(5656);
var toAbsoluteIndex = __webpack_require__(1400);
var lengthOfArrayLike = __webpack_require__(6244);

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ 2092:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var bind = __webpack_require__(9974);
var uncurryThis = __webpack_require__(1702);
var IndexedObject = __webpack_require__(8361);
var toObject = __webpack_require__(7908);
var lengthOfArrayLike = __webpack_require__(6244);
var arraySpeciesCreate = __webpack_require__(5417);

var push = uncurryThis([].push);

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var IS_FILTER_REJECT = TYPE == 7;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that);
    var length = lengthOfArrayLike(self);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push(target, value);      // filter
        } else switch (TYPE) {
          case 4: return false;             // every
          case 7: push(target, value);      // filterReject
        }
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

module.exports = {
  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6),
  // `Array.prototype.filterReject` method
  // https://github.com/tc39/proposal-array-filtering
  filterReject: createMethod(7)
};


/***/ }),

/***/ 1194:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);
var wellKnownSymbol = __webpack_require__(5112);
var V8_VERSION = __webpack_require__(7392);

var SPECIES = wellKnownSymbol('species');

module.exports = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};


/***/ }),

/***/ 9341:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(7293);

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call -- required for testing
    method.call(null, argument || function () { return 1; }, 1);
  });
};


/***/ }),

/***/ 1589:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toAbsoluteIndex = __webpack_require__(1400);
var lengthOfArrayLike = __webpack_require__(6244);
var createProperty = __webpack_require__(6135);

var $Array = Array;
var max = Math.max;

module.exports = function (O, start, end) {
  var length = lengthOfArrayLike(O);
  var k = toAbsoluteIndex(start, length);
  var fin = toAbsoluteIndex(end === undefined ? length : end, length);
  var result = $Array(max(fin - k, 0));
  for (var n = 0; k < fin; k++, n++) createProperty(result, n, O[k]);
  result.length = n;
  return result;
};


/***/ }),

/***/ 206:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);

module.exports = uncurryThis([].slice);


/***/ }),

/***/ 7475:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isArray = __webpack_require__(3157);
var isConstructor = __webpack_require__(4411);
var isObject = __webpack_require__(111);
var wellKnownSymbol = __webpack_require__(5112);

var SPECIES = wellKnownSymbol('species');
var $Array = Array;

// a part of `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (isConstructor(C) && (C === $Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? $Array : C;
};


/***/ }),

/***/ 5417:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var arraySpeciesConstructor = __webpack_require__(7475);

// `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
};


/***/ }),

/***/ 3411:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var anObject = __webpack_require__(9670);
var iteratorClose = __webpack_require__(9212);

// call something on iterator step with safe closing on error
module.exports = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  } catch (error) {
    iteratorClose(iterator, 'throw', error);
  }
};


/***/ }),

/***/ 7072:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(5112);

var ITERATOR = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR] = function () {
    return this;
  };
  // eslint-disable-next-line es-x/no-array-from, no-throw-literal -- required for testing
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

module.exports = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};


/***/ }),

/***/ 4326:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);

var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};


/***/ }),

/***/ 648:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__(1694);
var isCallable = __webpack_require__(614);
var classofRaw = __webpack_require__(4326);
var wellKnownSymbol = __webpack_require__(5112);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var $Object = Object;

// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && isCallable(O.callee) ? 'Arguments' : result;
};


/***/ }),

/***/ 7741:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);

var $Error = Error;
var replace = uncurryThis(''.replace);

var TEST = (function (arg) { return String($Error(arg).stack); })('zxcasd');
var V8_OR_CHAKRA_STACK_ENTRY = /\n\s*at [^:]*:[^\n]*/;
var IS_V8_OR_CHAKRA_STACK = V8_OR_CHAKRA_STACK_ENTRY.test(TEST);

module.exports = function (stack, dropEntries) {
  if (IS_V8_OR_CHAKRA_STACK && typeof stack == 'string' && !$Error.prepareStackTrace) {
    while (dropEntries--) stack = replace(stack, V8_OR_CHAKRA_STACK_ENTRY, '');
  } return stack;
};


/***/ }),

/***/ 9920:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var hasOwn = __webpack_require__(2597);
var ownKeys = __webpack_require__(3887);
var getOwnPropertyDescriptorModule = __webpack_require__(1236);
var definePropertyModule = __webpack_require__(3070);

module.exports = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};


/***/ }),

/***/ 8544:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  // eslint-disable-next-line es-x/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});


/***/ }),

/***/ 4994:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var IteratorPrototype = (__webpack_require__(3383).IteratorPrototype);
var create = __webpack_require__(30);
var createPropertyDescriptor = __webpack_require__(9114);
var setToStringTag = __webpack_require__(8003);
var Iterators = __webpack_require__(7497);

var returnThis = function () { return this; };

module.exports = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(+!ENUMERABLE_NEXT, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};


/***/ }),

/***/ 8880:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var definePropertyModule = __webpack_require__(3070);
var createPropertyDescriptor = __webpack_require__(9114);

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ 9114:
/***/ (function(module) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ 6135:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var toPropertyKey = __webpack_require__(4948);
var definePropertyModule = __webpack_require__(3070);
var createPropertyDescriptor = __webpack_require__(9114);

module.exports = function (object, key, value) {
  var propertyKey = toPropertyKey(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};


/***/ }),

/***/ 8052:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isCallable = __webpack_require__(614);
var definePropertyModule = __webpack_require__(3070);
var makeBuiltIn = __webpack_require__(6339);
var defineGlobalProperty = __webpack_require__(3072);

module.exports = function (O, key, value, options) {
  if (!options) options = {};
  var simple = options.enumerable;
  var name = options.name !== undefined ? options.name : key;
  if (isCallable(value)) makeBuiltIn(value, name, options);
  if (options.global) {
    if (simple) O[key] = value;
    else defineGlobalProperty(key, value);
  } else {
    try {
      if (!options.unsafe) delete O[key];
      else if (O[key]) simple = true;
    } catch (error) { /* empty */ }
    if (simple) O[key] = value;
    else definePropertyModule.f(O, key, {
      value: value,
      enumerable: false,
      configurable: !options.nonConfigurable,
      writable: !options.nonWritable
    });
  } return O;
};


/***/ }),

/***/ 3072:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);

// eslint-disable-next-line es-x/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

module.exports = function (key, value) {
  try {
    defineProperty(global, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ 654:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2109);
var call = __webpack_require__(6916);
var IS_PURE = __webpack_require__(1913);
var FunctionName = __webpack_require__(6530);
var isCallable = __webpack_require__(614);
var createIteratorConstructor = __webpack_require__(4994);
var getPrototypeOf = __webpack_require__(9518);
var setPrototypeOf = __webpack_require__(7674);
var setToStringTag = __webpack_require__(8003);
var createNonEnumerableProperty = __webpack_require__(8880);
var defineBuiltIn = __webpack_require__(8052);
var wellKnownSymbol = __webpack_require__(5112);
var Iterators = __webpack_require__(7497);
var IteratorsCore = __webpack_require__(3383);

var PROPER_FUNCTION_NAME = FunctionName.PROPER;
var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (!isCallable(CurrentIteratorPrototype[ITERATOR])) {
          defineBuiltIn(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  }

  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
  if (PROPER_FUNCTION_NAME && DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    if (!IS_PURE && CONFIGURABLE_FUNCTION_NAME) {
      createNonEnumerableProperty(IterablePrototype, 'name', VALUES);
    } else {
      INCORRECT_VALUES_NAME = true;
      defaultIterator = function values() { return call(nativeIterator, this); };
    }
  }

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        defineBuiltIn(IterablePrototype, KEY, methods[KEY]);
      }
    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  // define iterator
  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    defineBuiltIn(IterablePrototype, ITERATOR, defaultIterator, { name: DEFAULT });
  }
  Iterators[NAME] = defaultIterator;

  return methods;
};


/***/ }),

/***/ 7235:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var path = __webpack_require__(857);
var hasOwn = __webpack_require__(2597);
var wrappedWellKnownSymbolModule = __webpack_require__(6061);
var defineProperty = (__webpack_require__(3070).f);

module.exports = function (NAME) {
  var Symbol = path.Symbol || (path.Symbol = {});
  if (!hasOwn(Symbol, NAME)) defineProperty(Symbol, NAME, {
    value: wrappedWellKnownSymbolModule.f(NAME)
  });
};


/***/ }),

/***/ 5117:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var tryToString = __webpack_require__(6330);

var $TypeError = TypeError;

module.exports = function (O, P) {
  if (!delete O[P]) throw $TypeError('Cannot delete property ' + tryToString(P) + ' of ' + tryToString(O));
};


/***/ }),

/***/ 9781:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),

/***/ 317:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var isObject = __webpack_require__(111);

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ 7207:
/***/ (function(module) {

var $TypeError = TypeError;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

module.exports = function (it) {
  if (it > MAX_SAFE_INTEGER) throw $TypeError('Maximum allowed index exceeded');
  return it;
};


/***/ }),

/***/ 8324:
/***/ (function(module) {

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
module.exports = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};


/***/ }),

/***/ 8509:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
var documentCreateElement = __webpack_require__(317);

var classList = documentCreateElement('span').classList;
var DOMTokenListPrototype = classList && classList.constructor && classList.constructor.prototype;

module.exports = DOMTokenListPrototype === Object.prototype ? undefined : DOMTokenListPrototype;


/***/ }),

/***/ 8113:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(5005);

module.exports = getBuiltIn('navigator', 'userAgent') || '';


/***/ }),

/***/ 7392:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var userAgent = __webpack_require__(8113);

var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

module.exports = version;


/***/ }),

/***/ 748:
/***/ (function(module) {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ 2914:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);
var createPropertyDescriptor = __webpack_require__(9114);

module.exports = !fails(function () {
  var error = Error('a');
  if (!('stack' in error)) return true;
  // eslint-disable-next-line es-x/no-object-defineproperty -- safe
  Object.defineProperty(error, 'stack', createPropertyDescriptor(1, 7));
  return error.stack !== 7;
});


/***/ }),

/***/ 2109:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var getOwnPropertyDescriptor = (__webpack_require__(1236).f);
var createNonEnumerableProperty = __webpack_require__(8880);
var defineBuiltIn = __webpack_require__(8052);
var defineGlobalProperty = __webpack_require__(3072);
var copyConstructorProperties = __webpack_require__(9920);
var isForced = __webpack_require__(4705);

/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    defineBuiltIn(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ 7293:
/***/ (function(module) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ 7007:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

// TODO: Remove from `core-js@4` since it's moved to entry points
__webpack_require__(4916);
var uncurryThis = __webpack_require__(1702);
var defineBuiltIn = __webpack_require__(8052);
var regexpExec = __webpack_require__(2261);
var fails = __webpack_require__(7293);
var wellKnownSymbol = __webpack_require__(5112);
var createNonEnumerableProperty = __webpack_require__(8880);

var SPECIES = wellKnownSymbol('species');
var RegExpPrototype = RegExp.prototype;

module.exports = function (KEY, exec, FORCED, SHAM) {
  var SYMBOL = wellKnownSymbol(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {};
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () { execCalled = true; return null; };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    FORCED
  ) {
    var uncurriedNativeRegExpMethod = uncurryThis(/./[SYMBOL]);
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      var uncurriedNativeMethod = uncurryThis(nativeMethod);
      var $exec = regexp.exec;
      if ($exec === regexpExec || $exec === RegExpPrototype.exec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: uncurriedNativeRegExpMethod(regexp, str, arg2) };
        }
        return { done: true, value: uncurriedNativeMethod(str, regexp, arg2) };
      }
      return { done: false };
    });

    defineBuiltIn(String.prototype, KEY, methods[0]);
    defineBuiltIn(RegExpPrototype, SYMBOL, methods[1]);
  }

  if (SHAM) createNonEnumerableProperty(RegExpPrototype[SYMBOL], 'sham', true);
};


/***/ }),

/***/ 2104:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var NATIVE_BIND = __webpack_require__(4374);

var FunctionPrototype = Function.prototype;
var apply = FunctionPrototype.apply;
var call = FunctionPrototype.call;

// eslint-disable-next-line es-x/no-reflect -- safe
module.exports = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call.bind(apply) : function () {
  return call.apply(apply, arguments);
});


/***/ }),

/***/ 9974:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var aCallable = __webpack_require__(9662);
var NATIVE_BIND = __webpack_require__(4374);

var bind = uncurryThis(uncurryThis.bind);

// optional / simple context binding
module.exports = function (fn, that) {
  aCallable(fn);
  return that === undefined ? fn : NATIVE_BIND ? bind(fn, that) : function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ 4374:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);

module.exports = !fails(function () {
  // eslint-disable-next-line es-x/no-function-prototype-bind -- safe
  var test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});


/***/ }),

/***/ 6916:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var NATIVE_BIND = __webpack_require__(4374);

var call = Function.prototype.call;

module.exports = NATIVE_BIND ? call.bind(call) : function () {
  return call.apply(call, arguments);
};


/***/ }),

/***/ 6530:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var hasOwn = __webpack_require__(2597);

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};


/***/ }),

/***/ 1702:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var NATIVE_BIND = __webpack_require__(4374);

var FunctionPrototype = Function.prototype;
var bind = FunctionPrototype.bind;
var call = FunctionPrototype.call;
var uncurryThis = NATIVE_BIND && bind.bind(call, call);

module.exports = NATIVE_BIND ? function (fn) {
  return fn && uncurryThis(fn);
} : function (fn) {
  return fn && function () {
    return call.apply(fn, arguments);
  };
};


/***/ }),

/***/ 5005:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var isCallable = __webpack_require__(614);

var aFunction = function (argument) {
  return isCallable(argument) ? argument : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};


/***/ }),

/***/ 1246:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var classof = __webpack_require__(648);
var getMethod = __webpack_require__(8173);
var Iterators = __webpack_require__(7497);
var wellKnownSymbol = __webpack_require__(5112);

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (it != undefined) return getMethod(it, ITERATOR)
    || getMethod(it, '@@iterator')
    || Iterators[classof(it)];
};


/***/ }),

/***/ 8554:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var call = __webpack_require__(6916);
var aCallable = __webpack_require__(9662);
var anObject = __webpack_require__(9670);
var tryToString = __webpack_require__(6330);
var getIteratorMethod = __webpack_require__(1246);

var $TypeError = TypeError;

module.exports = function (argument, usingIterator) {
  var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
  if (aCallable(iteratorMethod)) return anObject(call(iteratorMethod, argument));
  throw $TypeError(tryToString(argument) + ' is not iterable');
};


/***/ }),

/***/ 8173:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var aCallable = __webpack_require__(9662);

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function (V, P) {
  var func = V[P];
  return func == null ? undefined : aCallable(func);
};


/***/ }),

/***/ 647:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var toObject = __webpack_require__(7908);

var floor = Math.floor;
var charAt = uncurryThis(''.charAt);
var replace = uncurryThis(''.replace);
var stringSlice = uncurryThis(''.slice);
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

// `GetSubstitution` abstract operation
// https://tc39.es/ecma262/#sec-getsubstitution
module.exports = function (matched, str, position, captures, namedCaptures, replacement) {
  var tailPos = position + matched.length;
  var m = captures.length;
  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
  if (namedCaptures !== undefined) {
    namedCaptures = toObject(namedCaptures);
    symbols = SUBSTITUTION_SYMBOLS;
  }
  return replace(replacement, symbols, function (match, ch) {
    var capture;
    switch (charAt(ch, 0)) {
      case '$': return '$';
      case '&': return matched;
      case '`': return stringSlice(str, 0, position);
      case "'": return stringSlice(str, tailPos);
      case '<':
        capture = namedCaptures[stringSlice(ch, 1, -1)];
        break;
      default: // \d\d?
        var n = +ch;
        if (n === 0) return match;
        if (n > m) {
          var f = floor(n / 10);
          if (f === 0) return match;
          if (f <= m) return captures[f - 1] === undefined ? charAt(ch, 1) : captures[f - 1] + charAt(ch, 1);
          return match;
        }
        capture = captures[n - 1];
    }
    return capture === undefined ? '' : capture;
  });
};


/***/ }),

/***/ 7854:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es-x/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof __webpack_require__.g == 'object' && __webpack_require__.g) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();


/***/ }),

/***/ 2597:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var toObject = __webpack_require__(7908);

var hasOwnProperty = uncurryThis({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es-x/no-object-hasown -- safe
module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};


/***/ }),

/***/ 3501:
/***/ (function(module) {

module.exports = {};


/***/ }),

/***/ 490:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(5005);

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),

/***/ 4664:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var fails = __webpack_require__(7293);
var createElement = __webpack_require__(317);

// Thanks to IE8 for its funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ 8361:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var fails = __webpack_require__(7293);
var classof = __webpack_require__(4326);

var $Object = Object;
var split = uncurryThis(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !$Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split(it, '') : $Object(it);
} : $Object;


/***/ }),

/***/ 9587:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isCallable = __webpack_require__(614);
var isObject = __webpack_require__(111);
var setPrototypeOf = __webpack_require__(7674);

// makes subclassing work correct for wrapped built-ins
module.exports = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    isCallable(NewTarget = dummy.constructor) &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};


/***/ }),

/***/ 2788:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var isCallable = __webpack_require__(614);
var store = __webpack_require__(5465);

var functionToString = uncurryThis(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ 8340:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(111);
var createNonEnumerableProperty = __webpack_require__(8880);

// `InstallErrorCause` abstract operation
// https://tc39.es/proposal-error-cause/#sec-errorobjects-install-error-cause
module.exports = function (O, options) {
  if (isObject(options) && 'cause' in options) {
    createNonEnumerableProperty(O, 'cause', options.cause);
  }
};


/***/ }),

/***/ 9909:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__(8536);
var global = __webpack_require__(7854);
var uncurryThis = __webpack_require__(1702);
var isObject = __webpack_require__(111);
var createNonEnumerableProperty = __webpack_require__(8880);
var hasOwn = __webpack_require__(2597);
var shared = __webpack_require__(5465);
var sharedKey = __webpack_require__(6200);
var hiddenKeys = __webpack_require__(3501);

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = global.TypeError;
var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  var wmget = uncurryThis(store.get);
  var wmhas = uncurryThis(store.has);
  var wmset = uncurryThis(store.set);
  set = function (it, metadata) {
    if (wmhas(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget(store, it) || {};
  };
  has = function (it) {
    return wmhas(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ 7659:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(5112);
var Iterators = __webpack_require__(7497);

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};


/***/ }),

/***/ 3157:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var classof = __webpack_require__(4326);

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es-x/no-array-isarray -- safe
module.exports = Array.isArray || function isArray(argument) {
  return classof(argument) == 'Array';
};


/***/ }),

/***/ 614:
/***/ (function(module) {

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
module.exports = function (argument) {
  return typeof argument == 'function';
};


/***/ }),

/***/ 4411:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var fails = __webpack_require__(7293);
var isCallable = __webpack_require__(614);
var classof = __webpack_require__(648);
var getBuiltIn = __webpack_require__(5005);
var inspectSource = __webpack_require__(2788);

var noop = function () { /* empty */ };
var empty = [];
var construct = getBuiltIn('Reflect', 'construct');
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec = uncurryThis(constructorRegExp.exec);
var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

var isConstructorModern = function isConstructor(argument) {
  if (!isCallable(argument)) return false;
  try {
    construct(noop, empty, argument);
    return true;
  } catch (error) {
    return false;
  }
};

var isConstructorLegacy = function isConstructor(argument) {
  if (!isCallable(argument)) return false;
  switch (classof(argument)) {
    case 'AsyncFunction':
    case 'GeneratorFunction':
    case 'AsyncGeneratorFunction': return false;
  }
  try {
    // we can't check .prototype since constructors produced by .bind haven't it
    // `Function#toString` throws on some built-it function in some legacy engines
    // (for example, `DOMQuad` and similar in FF41-)
    return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
  } catch (error) {
    return true;
  }
};

isConstructorLegacy.sham = true;

// `IsConstructor` abstract operation
// https://tc39.es/ecma262/#sec-isconstructor
module.exports = !construct || fails(function () {
  var called;
  return isConstructorModern(isConstructorModern.call)
    || !isConstructorModern(Object)
    || !isConstructorModern(function () { called = true; })
    || called;
}) ? isConstructorLegacy : isConstructorModern;


/***/ }),

/***/ 4705:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);
var isCallable = __webpack_require__(614);

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : isCallable(detection) ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ 111:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isCallable = __webpack_require__(614);

module.exports = function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};


/***/ }),

/***/ 1913:
/***/ (function(module) {

module.exports = false;


/***/ }),

/***/ 7850:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(111);
var classof = __webpack_require__(4326);
var wellKnownSymbol = __webpack_require__(5112);

var MATCH = wellKnownSymbol('match');

// `IsRegExp` abstract operation
// https://tc39.es/ecma262/#sec-isregexp
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
};


/***/ }),

/***/ 2190:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(5005);
var isCallable = __webpack_require__(614);
var isPrototypeOf = __webpack_require__(7976);
var USE_SYMBOL_AS_UID = __webpack_require__(3307);

var $Object = Object;

module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
};


/***/ }),

/***/ 9212:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var call = __webpack_require__(6916);
var anObject = __webpack_require__(9670);
var getMethod = __webpack_require__(8173);

module.exports = function (iterator, kind, value) {
  var innerResult, innerError;
  anObject(iterator);
  try {
    innerResult = getMethod(iterator, 'return');
    if (!innerResult) {
      if (kind === 'throw') throw value;
      return value;
    }
    innerResult = call(innerResult, iterator);
  } catch (error) {
    innerError = true;
    innerResult = error;
  }
  if (kind === 'throw') throw value;
  if (innerError) throw innerResult;
  anObject(innerResult);
  return value;
};


/***/ }),

/***/ 3383:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(7293);
var isCallable = __webpack_require__(614);
var create = __webpack_require__(30);
var getPrototypeOf = __webpack_require__(9518);
var defineBuiltIn = __webpack_require__(8052);
var wellKnownSymbol = __webpack_require__(5112);
var IS_PURE = __webpack_require__(1913);

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

// `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

/* eslint-disable es-x/no-array-prototype-keys -- safe */
if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

var NEW_ITERATOR_PROTOTYPE = IteratorPrototype == undefined || fails(function () {
  var test = {};
  // FF44- legacy iterators case
  return IteratorPrototype[ITERATOR].call(test) !== test;
});

if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};
else if (IS_PURE) IteratorPrototype = create(IteratorPrototype);

// `%IteratorPrototype%[@@iterator]()` method
// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
if (!isCallable(IteratorPrototype[ITERATOR])) {
  defineBuiltIn(IteratorPrototype, ITERATOR, function () {
    return this;
  });
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};


/***/ }),

/***/ 7497:
/***/ (function(module) {

module.exports = {};


/***/ }),

/***/ 6244:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toLength = __webpack_require__(7466);

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
module.exports = function (obj) {
  return toLength(obj.length);
};


/***/ }),

/***/ 6339:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);
var isCallable = __webpack_require__(614);
var hasOwn = __webpack_require__(2597);
var DESCRIPTORS = __webpack_require__(9781);
var CONFIGURABLE_FUNCTION_NAME = (__webpack_require__(6530).CONFIGURABLE);
var inspectSource = __webpack_require__(2788);
var InternalStateModule = __webpack_require__(9909);

var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get;
// eslint-disable-next-line es-x/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function () {
  return defineProperty(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
});

var TEMPLATE = String(String).split('String');

var makeBuiltIn = module.exports = function (value, name, options) {
  if (String(name).slice(0, 7) === 'Symbol(') {
    name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
  }
  if (options && options.getter) name = 'get ' + name;
  if (options && options.setter) name = 'set ' + name;
  if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
    if (DESCRIPTORS) defineProperty(value, 'name', { value: name, configurable: true });
    else value.name = name;
  }
  if (CONFIGURABLE_LENGTH && options && hasOwn(options, 'arity') && value.length !== options.arity) {
    defineProperty(value, 'length', { value: options.arity });
  }
  try {
    if (options && hasOwn(options, 'constructor') && options.constructor) {
      if (DESCRIPTORS) defineProperty(value, 'prototype', { writable: false });
    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
    } else if (value.prototype) value.prototype = undefined;
  } catch (error) { /* empty */ }
  var state = enforceInternalState(value);
  if (!hasOwn(state, 'source')) {
    state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
  } return value;
};

// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required
Function.prototype.toString = makeBuiltIn(function toString() {
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
}, 'toString');


/***/ }),

/***/ 4758:
/***/ (function(module) {

var ceil = Math.ceil;
var floor = Math.floor;

// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es-x/no-math-trunc -- safe
module.exports = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor : ceil)(n);
};


/***/ }),

/***/ 735:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var NATIVE_SYMBOL = __webpack_require__(133);

/* eslint-disable es-x/no-symbol -- safe */
module.exports = NATIVE_SYMBOL && !!Symbol['for'] && !!Symbol.keyFor;


/***/ }),

/***/ 133:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable es-x/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(7392);
var fails = __webpack_require__(7293);

// eslint-disable-next-line es-x/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});


/***/ }),

/***/ 8536:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var isCallable = __webpack_require__(614);
var inspectSource = __webpack_require__(2788);

var WeakMap = global.WeakMap;

module.exports = isCallable(WeakMap) && /native code/.test(inspectSource(WeakMap));


/***/ }),

/***/ 6277:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toString = __webpack_require__(1340);

module.exports = function (argument, $default) {
  return argument === undefined ? arguments.length < 2 ? '' : $default : toString(argument);
};


/***/ }),

/***/ 1574:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__(9781);
var uncurryThis = __webpack_require__(1702);
var call = __webpack_require__(6916);
var fails = __webpack_require__(7293);
var objectKeys = __webpack_require__(1956);
var getOwnPropertySymbolsModule = __webpack_require__(5181);
var propertyIsEnumerableModule = __webpack_require__(5296);
var toObject = __webpack_require__(7908);
var IndexedObject = __webpack_require__(8361);

// eslint-disable-next-line es-x/no-object-assign -- safe
var $assign = Object.assign;
// eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
var defineProperty = Object.defineProperty;
var concat = uncurryThis([].concat);

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
module.exports = !$assign || fails(function () {
  // should have correct order of operations (Edge bug)
  if (DESCRIPTORS && $assign({ b: 1 }, $assign(defineProperty({}, 'a', {
    enumerable: true,
    get: function () {
      defineProperty(this, 'b', {
        value: 3,
        enumerable: false
      });
    }
  }), { b: 2 })).b !== 1) return true;
  // should work with symbols and should have deterministic property order (V8 bug)
  var A = {};
  var B = {};
  // eslint-disable-next-line es-x/no-symbol -- safe
  var symbol = Symbol();
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
  return $assign({}, A)[symbol] != 7 || objectKeys($assign({}, B)).join('') != alphabet;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
  var T = toObject(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  var propertyIsEnumerable = propertyIsEnumerableModule.f;
  while (argumentsLength > index) {
    var S = IndexedObject(arguments[index++]);
    var keys = getOwnPropertySymbols ? concat(objectKeys(S), getOwnPropertySymbols(S)) : objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || call(propertyIsEnumerable, S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;


/***/ }),

/***/ 30:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* global ActiveXObject -- old IE, WSH */
var anObject = __webpack_require__(9670);
var definePropertiesModule = __webpack_require__(6048);
var enumBugKeys = __webpack_require__(748);
var hiddenKeys = __webpack_require__(3501);
var html = __webpack_require__(490);
var documentCreateElement = __webpack_require__(317);
var sharedKey = __webpack_require__(6200);

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = typeof document != 'undefined'
    ? document.domain && activeXDocument
      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
      : NullProtoObjectViaIFrame()
    : NullProtoObjectViaActiveX(activeXDocument); // WSH
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
// eslint-disable-next-line es-x/no-object-create -- safe
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
};


/***/ }),

/***/ 6048:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(3353);
var definePropertyModule = __webpack_require__(3070);
var anObject = __webpack_require__(9670);
var toIndexedObject = __webpack_require__(5656);
var objectKeys = __webpack_require__(1956);

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es-x/no-object-defineproperties -- safe
exports.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var props = toIndexedObject(Properties);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);
  return O;
};


/***/ }),

/***/ 3070:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var IE8_DOM_DEFINE = __webpack_require__(4664);
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(3353);
var anObject = __webpack_require__(9670);
var toPropertyKey = __webpack_require__(4948);

var $TypeError = TypeError;
// eslint-disable-next-line es-x/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  } return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw $TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ 1236:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var call = __webpack_require__(6916);
var propertyIsEnumerableModule = __webpack_require__(5296);
var createPropertyDescriptor = __webpack_require__(9114);
var toIndexedObject = __webpack_require__(5656);
var toPropertyKey = __webpack_require__(4948);
var hasOwn = __webpack_require__(2597);
var IE8_DOM_DEFINE = __webpack_require__(4664);

// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};


/***/ }),

/***/ 1156:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable es-x/no-object-getownpropertynames -- safe */
var classof = __webpack_require__(4326);
var toIndexedObject = __webpack_require__(5656);
var $getOwnPropertyNames = (__webpack_require__(8006).f);
var arraySlice = __webpack_require__(1589);

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return $getOwnPropertyNames(it);
  } catch (error) {
    return arraySlice(windowNames);
  }
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && classof(it) == 'Window'
    ? getWindowNames(it)
    : $getOwnPropertyNames(toIndexedObject(it));
};


/***/ }),

/***/ 8006:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(6324);
var enumBugKeys = __webpack_require__(748);

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es-x/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ 5181:
/***/ (function(__unused_webpack_module, exports) {

// eslint-disable-next-line es-x/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ 9518:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var hasOwn = __webpack_require__(2597);
var isCallable = __webpack_require__(614);
var toObject = __webpack_require__(7908);
var sharedKey = __webpack_require__(6200);
var CORRECT_PROTOTYPE_GETTER = __webpack_require__(8544);

var IE_PROTO = sharedKey('IE_PROTO');
var $Object = Object;
var ObjectPrototype = $Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
// eslint-disable-next-line es-x/no-object-getprototypeof -- safe
module.exports = CORRECT_PROTOTYPE_GETTER ? $Object.getPrototypeOf : function (O) {
  var object = toObject(O);
  if (hasOwn(object, IE_PROTO)) return object[IE_PROTO];
  var constructor = object.constructor;
  if (isCallable(constructor) && object instanceof constructor) {
    return constructor.prototype;
  } return object instanceof $Object ? ObjectPrototype : null;
};


/***/ }),

/***/ 7976:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);

module.exports = uncurryThis({}.isPrototypeOf);


/***/ }),

/***/ 6324:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var hasOwn = __webpack_require__(2597);
var toIndexedObject = __webpack_require__(5656);
var indexOf = (__webpack_require__(1318).indexOf);
var hiddenKeys = __webpack_require__(3501);

var push = uncurryThis([].push);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn(O, key = names[i++])) {
    ~indexOf(result, key) || push(result, key);
  }
  return result;
};


/***/ }),

/***/ 1956:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(6324);
var enumBugKeys = __webpack_require__(748);

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es-x/no-object-keys -- safe
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),

/***/ 5296:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;


/***/ }),

/***/ 7674:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable no-proto -- safe */
var uncurryThis = __webpack_require__(1702);
var anObject = __webpack_require__(9670);
var aPossiblePrototype = __webpack_require__(6077);

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es-x/no-object-setprototypeof -- safe
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
    setter = uncurryThis(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set);
    setter(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),

/***/ 288:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var TO_STRING_TAG_SUPPORT = __webpack_require__(1694);
var classof = __webpack_require__(648);

// `Object.prototype.toString` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.tostring
module.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};


/***/ }),

/***/ 2140:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var call = __webpack_require__(6916);
var isCallable = __webpack_require__(614);
var isObject = __webpack_require__(111);

var $TypeError = TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw $TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ 3887:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(5005);
var uncurryThis = __webpack_require__(1702);
var getOwnPropertyNamesModule = __webpack_require__(8006);
var getOwnPropertySymbolsModule = __webpack_require__(5181);
var anObject = __webpack_require__(9670);

var concat = uncurryThis([].concat);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ 857:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);

module.exports = global;


/***/ }),

/***/ 2626:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var defineProperty = (__webpack_require__(3070).f);

module.exports = function (Target, Source, key) {
  key in Target || defineProperty(Target, key, {
    configurable: true,
    get: function () { return Source[key]; },
    set: function (it) { Source[key] = it; }
  });
};


/***/ }),

/***/ 7651:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var call = __webpack_require__(6916);
var anObject = __webpack_require__(9670);
var isCallable = __webpack_require__(614);
var classof = __webpack_require__(4326);
var regexpExec = __webpack_require__(2261);

var $TypeError = TypeError;

// `RegExpExec` abstract operation
// https://tc39.es/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (isCallable(exec)) {
    var result = call(exec, R, S);
    if (result !== null) anObject(result);
    return result;
  }
  if (classof(R) === 'RegExp') return call(regexpExec, R, S);
  throw $TypeError('RegExp#exec called on incompatible receiver');
};


/***/ }),

/***/ 2261:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

/* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
/* eslint-disable regexp/no-useless-quantifier -- testing */
var call = __webpack_require__(6916);
var uncurryThis = __webpack_require__(1702);
var toString = __webpack_require__(1340);
var regexpFlags = __webpack_require__(7066);
var stickyHelpers = __webpack_require__(2999);
var shared = __webpack_require__(2309);
var create = __webpack_require__(30);
var getInternalState = (__webpack_require__(9909).get);
var UNSUPPORTED_DOT_ALL = __webpack_require__(9441);
var UNSUPPORTED_NCG = __webpack_require__(7168);

var nativeReplace = shared('native-string-replace', String.prototype.replace);
var nativeExec = RegExp.prototype.exec;
var patchedExec = nativeExec;
var charAt = uncurryThis(''.charAt);
var indexOf = uncurryThis(''.indexOf);
var replace = uncurryThis(''.replace);
var stringSlice = uncurryThis(''.slice);

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  call(nativeExec, re1, 'a');
  call(nativeExec, re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y = stickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;

if (PATCH) {
  patchedExec = function exec(string) {
    var re = this;
    var state = getInternalState(re);
    var str = toString(string);
    var raw = state.raw;
    var result, reCopy, lastIndex, match, i, object, group;

    if (raw) {
      raw.lastIndex = re.lastIndex;
      result = call(patchedExec, raw, str);
      re.lastIndex = raw.lastIndex;
      return result;
    }

    var groups = state.groups;
    var sticky = UNSUPPORTED_Y && re.sticky;
    var flags = call(regexpFlags, re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = replace(flags, 'y', '');
      if (indexOf(flags, 'g') === -1) {
        flags += 'g';
      }

      strCopy = stringSlice(str, re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt(str, re.lastIndex - 1) !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = call(nativeExec, sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = stringSlice(match.input, charsAdded);
        match[0] = stringSlice(match[0], charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn't work for /(.?)?/
      call(nativeReplace, match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    if (match && groups) {
      match.groups = object = create(null);
      for (i = 0; i < groups.length; i++) {
        group = groups[i];
        object[group[0]] = match[group[1]];
      }
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ 7066:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(9670);

// `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.hasIndices) result += 'd';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.unicodeSets) result += 'v';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ 2999:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);
var global = __webpack_require__(7854);

// babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
var $RegExp = global.RegExp;

var UNSUPPORTED_Y = fails(function () {
  var re = $RegExp('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

// UC Browser bug
// https://github.com/zloirock/core-js/issues/1008
var MISSED_STICKY = UNSUPPORTED_Y || fails(function () {
  return !$RegExp('a', 'y').sticky;
});

var BROKEN_CARET = UNSUPPORTED_Y || fails(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = $RegExp('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});

module.exports = {
  BROKEN_CARET: BROKEN_CARET,
  MISSED_STICKY: MISSED_STICKY,
  UNSUPPORTED_Y: UNSUPPORTED_Y
};


/***/ }),

/***/ 9441:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);
var global = __webpack_require__(7854);

// babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
var $RegExp = global.RegExp;

module.exports = fails(function () {
  var re = $RegExp('.', 's');
  return !(re.dotAll && re.exec('\n') && re.flags === 's');
});


/***/ }),

/***/ 7168:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);
var global = __webpack_require__(7854);

// babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
var $RegExp = global.RegExp;

module.exports = fails(function () {
  var re = $RegExp('(?<a>b)', 'g');
  return re.exec('b').groups.a !== 'b' ||
    'b'.replace(re, '$<a>c') !== 'bc';
});


/***/ }),

/***/ 4488:
/***/ (function(module) {

var $TypeError = TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw $TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ 8003:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var defineProperty = (__webpack_require__(3070).f);
var hasOwn = __webpack_require__(2597);
var wellKnownSymbol = __webpack_require__(5112);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (target, TAG, STATIC) {
  if (target && !STATIC) target = target.prototype;
  if (target && !hasOwn(target, TO_STRING_TAG)) {
    defineProperty(target, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};


/***/ }),

/***/ 6200:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var shared = __webpack_require__(2309);
var uid = __webpack_require__(9711);

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ 5465:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var defineGlobalProperty = __webpack_require__(3072);

var SHARED = '__core-js_shared__';
var store = global[SHARED] || defineGlobalProperty(SHARED, {});

module.exports = store;


/***/ }),

/***/ 2309:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var IS_PURE = __webpack_require__(1913);
var store = __webpack_require__(5465);

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.24.1',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.24.1/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});


/***/ }),

/***/ 6707:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var anObject = __webpack_require__(9670);
var aConstructor = __webpack_require__(9483);
var wellKnownSymbol = __webpack_require__(5112);

var SPECIES = wellKnownSymbol('species');

// `SpeciesConstructor` abstract operation
// https://tc39.es/ecma262/#sec-speciesconstructor
module.exports = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? defaultConstructor : aConstructor(S);
};


/***/ }),

/***/ 8710:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var toIntegerOrInfinity = __webpack_require__(9303);
var toString = __webpack_require__(1340);
var requireObjectCoercible = __webpack_require__(4488);

var charAt = uncurryThis(''.charAt);
var charCodeAt = uncurryThis(''.charCodeAt);
var stringSlice = uncurryThis(''.slice);

var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = toString(requireObjectCoercible($this));
    var position = toIntegerOrInfinity(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = charCodeAt(S, position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = charCodeAt(S, position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING
          ? charAt(S, position)
          : first
        : CONVERT_TO_STRING
          ? stringSlice(S, position, position + 2)
          : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};


/***/ }),

/***/ 3111:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var requireObjectCoercible = __webpack_require__(4488);
var toString = __webpack_require__(1340);
var whitespaces = __webpack_require__(1361);

var replace = uncurryThis(''.replace);
var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod = function (TYPE) {
  return function ($this) {
    var string = toString(requireObjectCoercible($this));
    if (TYPE & 1) string = replace(string, ltrim, '');
    if (TYPE & 2) string = replace(string, rtrim, '');
    return string;
  };
};

module.exports = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
  start: createMethod(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimend
  end: createMethod(2),
  // `String.prototype.trim` method
  // https://tc39.es/ecma262/#sec-string.prototype.trim
  trim: createMethod(3)
};


/***/ }),

/***/ 6532:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var call = __webpack_require__(6916);
var getBuiltIn = __webpack_require__(5005);
var wellKnownSymbol = __webpack_require__(5112);
var defineBuiltIn = __webpack_require__(8052);

module.exports = function () {
  var Symbol = getBuiltIn('Symbol');
  var SymbolPrototype = Symbol && Symbol.prototype;
  var valueOf = SymbolPrototype && SymbolPrototype.valueOf;
  var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

  if (SymbolPrototype && !SymbolPrototype[TO_PRIMITIVE]) {
    // `Symbol.prototype[@@toPrimitive]` method
    // https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
    // eslint-disable-next-line no-unused-vars -- required for .length
    defineBuiltIn(SymbolPrototype, TO_PRIMITIVE, function (hint) {
      return call(valueOf, this);
    }, { arity: 1 });
  }
};


/***/ }),

/***/ 863:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);

// `thisNumberValue` abstract operation
// https://tc39.es/ecma262/#sec-thisnumbervalue
module.exports = uncurryThis(1.0.valueOf);


/***/ }),

/***/ 1400:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toIntegerOrInfinity = __webpack_require__(9303);

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ 5656:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(8361);
var requireObjectCoercible = __webpack_require__(4488);

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ 9303:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var trunc = __webpack_require__(4758);

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
module.exports = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- NaN check
  return number !== number || number === 0 ? 0 : trunc(number);
};


/***/ }),

/***/ 7466:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toIntegerOrInfinity = __webpack_require__(9303);

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ 7908:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__(4488);

var $Object = Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return $Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ 7593:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var call = __webpack_require__(6916);
var isObject = __webpack_require__(111);
var isSymbol = __webpack_require__(2190);
var getMethod = __webpack_require__(8173);
var ordinaryToPrimitive = __webpack_require__(2140);
var wellKnownSymbol = __webpack_require__(5112);

var $TypeError = TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw $TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};


/***/ }),

/***/ 4948:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toPrimitive = __webpack_require__(7593);
var isSymbol = __webpack_require__(2190);

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};


/***/ }),

/***/ 1694:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(5112);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),

/***/ 1340:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var classof = __webpack_require__(648);

var $String = String;

module.exports = function (argument) {
  if (classof(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
  return $String(argument);
};


/***/ }),

/***/ 6330:
/***/ (function(module) {

var $String = String;

module.exports = function (argument) {
  try {
    return $String(argument);
  } catch (error) {
    return 'Object';
  }
};


/***/ }),

/***/ 9711:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};


/***/ }),

/***/ 3307:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable es-x/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(133);

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ 3353:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var fails = __webpack_require__(7293);

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
module.exports = DESCRIPTORS && fails(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype != 42;
});


/***/ }),

/***/ 6061:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(5112);

exports.f = wellKnownSymbol;


/***/ }),

/***/ 5112:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var shared = __webpack_require__(2309);
var hasOwn = __webpack_require__(2597);
var uid = __webpack_require__(9711);
var NATIVE_SYMBOL = __webpack_require__(133);
var USE_SYMBOL_AS_UID = __webpack_require__(3307);

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var symbolFor = Symbol && Symbol['for'];
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    var description = 'Symbol.' + name;
    if (NATIVE_SYMBOL && hasOwn(Symbol, name)) {
      WellKnownSymbolsStore[name] = Symbol[name];
    } else if (USE_SYMBOL_AS_UID && symbolFor) {
      WellKnownSymbolsStore[name] = symbolFor(description);
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
    }
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ 1361:
/***/ (function(module) {

// a string of all valid unicode whitespaces
module.exports = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
  '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),

/***/ 9191:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var getBuiltIn = __webpack_require__(5005);
var hasOwn = __webpack_require__(2597);
var createNonEnumerableProperty = __webpack_require__(8880);
var isPrototypeOf = __webpack_require__(7976);
var setPrototypeOf = __webpack_require__(7674);
var copyConstructorProperties = __webpack_require__(9920);
var proxyAccessor = __webpack_require__(2626);
var inheritIfRequired = __webpack_require__(9587);
var normalizeStringArgument = __webpack_require__(6277);
var installErrorCause = __webpack_require__(8340);
var clearErrorStack = __webpack_require__(7741);
var ERROR_STACK_INSTALLABLE = __webpack_require__(2914);
var DESCRIPTORS = __webpack_require__(9781);
var IS_PURE = __webpack_require__(1913);

module.exports = function (FULL_NAME, wrapper, FORCED, IS_AGGREGATE_ERROR) {
  var STACK_TRACE_LIMIT = 'stackTraceLimit';
  var OPTIONS_POSITION = IS_AGGREGATE_ERROR ? 2 : 1;
  var path = FULL_NAME.split('.');
  var ERROR_NAME = path[path.length - 1];
  var OriginalError = getBuiltIn.apply(null, path);

  if (!OriginalError) return;

  var OriginalErrorPrototype = OriginalError.prototype;

  // V8 9.3- bug https://bugs.chromium.org/p/v8/issues/detail?id=12006
  if (!IS_PURE && hasOwn(OriginalErrorPrototype, 'cause')) delete OriginalErrorPrototype.cause;

  if (!FORCED) return OriginalError;

  var BaseError = getBuiltIn('Error');

  var WrappedError = wrapper(function (a, b) {
    var message = normalizeStringArgument(IS_AGGREGATE_ERROR ? b : a, undefined);
    var result = IS_AGGREGATE_ERROR ? new OriginalError(a) : new OriginalError();
    if (message !== undefined) createNonEnumerableProperty(result, 'message', message);
    if (ERROR_STACK_INSTALLABLE) createNonEnumerableProperty(result, 'stack', clearErrorStack(result.stack, 2));
    if (this && isPrototypeOf(OriginalErrorPrototype, this)) inheritIfRequired(result, this, WrappedError);
    if (arguments.length > OPTIONS_POSITION) installErrorCause(result, arguments[OPTIONS_POSITION]);
    return result;
  });

  WrappedError.prototype = OriginalErrorPrototype;

  if (ERROR_NAME !== 'Error') {
    if (setPrototypeOf) setPrototypeOf(WrappedError, BaseError);
    else copyConstructorProperties(WrappedError, BaseError, { name: true });
  } else if (DESCRIPTORS && STACK_TRACE_LIMIT in OriginalError) {
    proxyAccessor(WrappedError, OriginalError, STACK_TRACE_LIMIT);
    proxyAccessor(WrappedError, OriginalError, 'prepareStackTrace');
  }

  copyConstructorProperties(WrappedError, OriginalError);

  if (!IS_PURE) try {
    // Safari 13- bug: WebAssembly errors does not have a proper `.name`
    if (OriginalErrorPrototype.name !== ERROR_NAME) {
      createNonEnumerableProperty(OriginalErrorPrototype, 'name', ERROR_NAME);
    }
    OriginalErrorPrototype.constructor = WrappedError;
  } catch (error) { /* empty */ }

  return WrappedError;
};


/***/ }),

/***/ 7327:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2109);
var $filter = (__webpack_require__(2092).filter);
var arrayMethodHasSpeciesSupport = __webpack_require__(1194);

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');

// `Array.prototype.filter` method
// https://tc39.es/ecma262/#sec-array.prototype.filter
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ 9826:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2109);
var $find = (__webpack_require__(2092).find);
var addToUnscopables = __webpack_require__(1223);

var FIND = 'find';
var SKIPS_HOLES = true;

// Shouldn't skip holes
if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

// `Array.prototype.find` method
// https://tc39.es/ecma262/#sec-array.prototype.find
$({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables(FIND);


/***/ }),

/***/ 1038:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(2109);
var from = __webpack_require__(8457);
var checkCorrectnessOfIteration = __webpack_require__(7072);

var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
  // eslint-disable-next-line es-x/no-array-from -- required for testing
  Array.from(iterable);
});

// `Array.from` method
// https://tc39.es/ecma262/#sec-array.from
$({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
  from: from
});


/***/ }),

/***/ 6699:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2109);
var $includes = (__webpack_require__(1318).includes);
var fails = __webpack_require__(7293);
var addToUnscopables = __webpack_require__(1223);

// FF99+ bug
var BROKEN_ON_SPARSE = fails(function () {
  return !Array(1).includes();
});

// `Array.prototype.includes` method
// https://tc39.es/ecma262/#sec-array.prototype.includes
$({ target: 'Array', proto: true, forced: BROKEN_ON_SPARSE }, {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('includes');


/***/ }),

/***/ 6992:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var toIndexedObject = __webpack_require__(5656);
var addToUnscopables = __webpack_require__(1223);
var Iterators = __webpack_require__(7497);
var InternalStateModule = __webpack_require__(9909);
var defineProperty = (__webpack_require__(3070).f);
var defineIterator = __webpack_require__(654);
var IS_PURE = __webpack_require__(1913);
var DESCRIPTORS = __webpack_require__(9781);

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.es/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.es/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.es/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.es/ecma262/#sec-createarrayiterator
module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
// https://tc39.es/ecma262/#sec-createmappedargumentsobject
var values = Iterators.Arguments = Iterators.Array;

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

// V8 ~ Chrome 45- bug
if (!IS_PURE && DESCRIPTORS && values.name !== 'values') try {
  defineProperty(values, 'name', { value: 'values' });
} catch (error) { /* empty */ }


/***/ }),

/***/ 7042:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2109);
var isArray = __webpack_require__(3157);
var isConstructor = __webpack_require__(4411);
var isObject = __webpack_require__(111);
var toAbsoluteIndex = __webpack_require__(1400);
var lengthOfArrayLike = __webpack_require__(6244);
var toIndexedObject = __webpack_require__(5656);
var createProperty = __webpack_require__(6135);
var wellKnownSymbol = __webpack_require__(5112);
var arrayMethodHasSpeciesSupport = __webpack_require__(1194);
var un$Slice = __webpack_require__(206);

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');

var SPECIES = wellKnownSymbol('species');
var $Array = Array;
var max = Math.max;

// `Array.prototype.slice` method
// https://tc39.es/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = lengthOfArrayLike(O);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
    var Constructor, result, n;
    if (isArray(O)) {
      Constructor = O.constructor;
      // cross-realm fallback
      if (isConstructor(Constructor) && (Constructor === $Array || isArray(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject(Constructor)) {
        Constructor = Constructor[SPECIES];
        if (Constructor === null) Constructor = undefined;
      }
      if (Constructor === $Array || Constructor === undefined) {
        return un$Slice(O, k, fin);
      }
    }
    result = new (Constructor === undefined ? $Array : Constructor)(max(fin - k, 0));
    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
    result.length = n;
    return result;
  }
});


/***/ }),

/***/ 561:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2109);
var toObject = __webpack_require__(7908);
var toAbsoluteIndex = __webpack_require__(1400);
var toIntegerOrInfinity = __webpack_require__(9303);
var lengthOfArrayLike = __webpack_require__(6244);
var doesNotExceedSafeInteger = __webpack_require__(7207);
var arraySpeciesCreate = __webpack_require__(5417);
var createProperty = __webpack_require__(6135);
var deletePropertyOrThrow = __webpack_require__(5117);
var arrayMethodHasSpeciesSupport = __webpack_require__(1194);

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('splice');

var max = Math.max;
var min = Math.min;

// `Array.prototype.splice` method
// https://tc39.es/ecma262/#sec-array.prototype.splice
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  splice: function splice(start, deleteCount /* , ...items */) {
    var O = toObject(this);
    var len = lengthOfArrayLike(O);
    var actualStart = toAbsoluteIndex(start, len);
    var argumentsLength = arguments.length;
    var insertCount, actualDeleteCount, A, k, from, to;
    if (argumentsLength === 0) {
      insertCount = actualDeleteCount = 0;
    } else if (argumentsLength === 1) {
      insertCount = 0;
      actualDeleteCount = len - actualStart;
    } else {
      insertCount = argumentsLength - 2;
      actualDeleteCount = min(max(toIntegerOrInfinity(deleteCount), 0), len - actualStart);
    }
    doesNotExceedSafeInteger(len + insertCount - actualDeleteCount);
    A = arraySpeciesCreate(O, actualDeleteCount);
    for (k = 0; k < actualDeleteCount; k++) {
      from = actualStart + k;
      if (from in O) createProperty(A, k, O[from]);
    }
    A.length = actualDeleteCount;
    if (insertCount < actualDeleteCount) {
      for (k = actualStart; k < len - actualDeleteCount; k++) {
        from = k + actualDeleteCount;
        to = k + insertCount;
        if (from in O) O[to] = O[from];
        else deletePropertyOrThrow(O, to);
      }
      for (k = len; k > len - actualDeleteCount + insertCount; k--) deletePropertyOrThrow(O, k - 1);
    } else if (insertCount > actualDeleteCount) {
      for (k = len - actualDeleteCount; k > actualStart; k--) {
        from = k + actualDeleteCount - 1;
        to = k + insertCount - 1;
        if (from in O) O[to] = O[from];
        else deletePropertyOrThrow(O, to);
      }
    }
    for (k = 0; k < insertCount; k++) {
      O[k + actualStart] = arguments[k + 2];
    }
    O.length = len - actualDeleteCount + insertCount;
    return A;
  }
});


/***/ }),

/***/ 1703:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable no-unused-vars -- required for functions `.length` */
var $ = __webpack_require__(2109);
var global = __webpack_require__(7854);
var apply = __webpack_require__(2104);
var wrapErrorConstructorWithCause = __webpack_require__(9191);

var WEB_ASSEMBLY = 'WebAssembly';
var WebAssembly = global[WEB_ASSEMBLY];

var FORCED = Error('e', { cause: 7 }).cause !== 7;

var exportGlobalErrorCauseWrapper = function (ERROR_NAME, wrapper) {
  var O = {};
  O[ERROR_NAME] = wrapErrorConstructorWithCause(ERROR_NAME, wrapper, FORCED);
  $({ global: true, constructor: true, arity: 1, forced: FORCED }, O);
};

var exportWebAssemblyErrorCauseWrapper = function (ERROR_NAME, wrapper) {
  if (WebAssembly && WebAssembly[ERROR_NAME]) {
    var O = {};
    O[ERROR_NAME] = wrapErrorConstructorWithCause(WEB_ASSEMBLY + '.' + ERROR_NAME, wrapper, FORCED);
    $({ target: WEB_ASSEMBLY, stat: true, constructor: true, arity: 1, forced: FORCED }, O);
  }
};

// https://github.com/tc39/proposal-error-cause
exportGlobalErrorCauseWrapper('Error', function (init) {
  return function Error(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('EvalError', function (init) {
  return function EvalError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('RangeError', function (init) {
  return function RangeError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('ReferenceError', function (init) {
  return function ReferenceError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('SyntaxError', function (init) {
  return function SyntaxError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('TypeError', function (init) {
  return function TypeError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('URIError', function (init) {
  return function URIError(message) { return apply(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('CompileError', function (init) {
  return function CompileError(message) { return apply(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('LinkError', function (init) {
  return function LinkError(message) { return apply(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('RuntimeError', function (init) {
  return function RuntimeError(message) { return apply(init, this, arguments); };
});


/***/ }),

/***/ 8309:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var FUNCTION_NAME_EXISTS = (__webpack_require__(6530).EXISTS);
var uncurryThis = __webpack_require__(1702);
var defineProperty = (__webpack_require__(3070).f);

var FunctionPrototype = Function.prototype;
var functionToString = uncurryThis(FunctionPrototype.toString);
var nameRE = /function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/;
var regExpExec = uncurryThis(nameRE.exec);
var NAME = 'name';

// Function instances `.name` property
// https://tc39.es/ecma262/#sec-function-instances-name
if (DESCRIPTORS && !FUNCTION_NAME_EXISTS) {
  defineProperty(FunctionPrototype, NAME, {
    configurable: true,
    get: function () {
      try {
        return regExpExec(nameRE, functionToString(this))[1];
      } catch (error) {
        return '';
      }
    }
  });
}


/***/ }),

/***/ 8862:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(2109);
var getBuiltIn = __webpack_require__(5005);
var apply = __webpack_require__(2104);
var call = __webpack_require__(6916);
var uncurryThis = __webpack_require__(1702);
var fails = __webpack_require__(7293);
var isArray = __webpack_require__(3157);
var isCallable = __webpack_require__(614);
var isObject = __webpack_require__(111);
var isSymbol = __webpack_require__(2190);
var arraySlice = __webpack_require__(206);
var NATIVE_SYMBOL = __webpack_require__(133);

var $stringify = getBuiltIn('JSON', 'stringify');
var exec = uncurryThis(/./.exec);
var charAt = uncurryThis(''.charAt);
var charCodeAt = uncurryThis(''.charCodeAt);
var replace = uncurryThis(''.replace);
var numberToString = uncurryThis(1.0.toString);

var tester = /[\uD800-\uDFFF]/g;
var low = /^[\uD800-\uDBFF]$/;
var hi = /^[\uDC00-\uDFFF]$/;

var WRONG_SYMBOLS_CONVERSION = !NATIVE_SYMBOL || fails(function () {
  var symbol = getBuiltIn('Symbol')();
  // MS Edge converts symbol values to JSON as {}
  return $stringify([symbol]) != '[null]'
    // WebKit converts symbol values to JSON as null
    || $stringify({ a: symbol }) != '{}'
    // V8 throws on boxed symbols
    || $stringify(Object(symbol)) != '{}';
});

// https://github.com/tc39/proposal-well-formed-stringify
var ILL_FORMED_UNICODE = fails(function () {
  return $stringify('\uDF06\uD834') !== '"\\udf06\\ud834"'
    || $stringify('\uDEAD') !== '"\\udead"';
});

var stringifyWithSymbolsFix = function (it, replacer) {
  var args = arraySlice(arguments);
  var $replacer = replacer;
  if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
  if (!isArray(replacer)) replacer = function (key, value) {
    if (isCallable($replacer)) value = call($replacer, this, key, value);
    if (!isSymbol(value)) return value;
  };
  args[1] = replacer;
  return apply($stringify, null, args);
};

var fixIllFormed = function (match, offset, string) {
  var prev = charAt(string, offset - 1);
  var next = charAt(string, offset + 1);
  if ((exec(low, match) && !exec(hi, next)) || (exec(hi, match) && !exec(low, prev))) {
    return '\\u' + numberToString(charCodeAt(match, 0), 16);
  } return match;
};

if ($stringify) {
  // `JSON.stringify` method
  // https://tc39.es/ecma262/#sec-json.stringify
  $({ target: 'JSON', stat: true, arity: 3, forced: WRONG_SYMBOLS_CONVERSION || ILL_FORMED_UNICODE }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    stringify: function stringify(it, replacer, space) {
      var args = arraySlice(arguments);
      var result = apply(WRONG_SYMBOLS_CONVERSION ? stringifyWithSymbolsFix : $stringify, null, args);
      return ILL_FORMED_UNICODE && typeof result == 'string' ? replace(result, tester, fixIllFormed) : result;
    }
  });
}


/***/ }),

/***/ 9653:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__(9781);
var global = __webpack_require__(7854);
var uncurryThis = __webpack_require__(1702);
var isForced = __webpack_require__(4705);
var defineBuiltIn = __webpack_require__(8052);
var hasOwn = __webpack_require__(2597);
var inheritIfRequired = __webpack_require__(9587);
var isPrototypeOf = __webpack_require__(7976);
var isSymbol = __webpack_require__(2190);
var toPrimitive = __webpack_require__(7593);
var fails = __webpack_require__(7293);
var getOwnPropertyNames = (__webpack_require__(8006).f);
var getOwnPropertyDescriptor = (__webpack_require__(1236).f);
var defineProperty = (__webpack_require__(3070).f);
var thisNumberValue = __webpack_require__(863);
var trim = (__webpack_require__(3111).trim);

var NUMBER = 'Number';
var NativeNumber = global[NUMBER];
var NumberPrototype = NativeNumber.prototype;
var TypeError = global.TypeError;
var arraySlice = uncurryThis(''.slice);
var charCodeAt = uncurryThis(''.charCodeAt);

// `ToNumeric` abstract operation
// https://tc39.es/ecma262/#sec-tonumeric
var toNumeric = function (value) {
  var primValue = toPrimitive(value, 'number');
  return typeof primValue == 'bigint' ? primValue : toNumber(primValue);
};

// `ToNumber` abstract operation
// https://tc39.es/ecma262/#sec-tonumber
var toNumber = function (argument) {
  var it = toPrimitive(argument, 'number');
  var first, third, radix, maxCode, digits, length, index, code;
  if (isSymbol(it)) throw TypeError('Cannot convert a Symbol value to a number');
  if (typeof it == 'string' && it.length > 2) {
    it = trim(it);
    first = charCodeAt(it, 0);
    if (first === 43 || first === 45) {
      third = charCodeAt(it, 2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (charCodeAt(it, 1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal of /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal of /^0o[0-7]+$/i
        default: return +it;
      }
      digits = arraySlice(it, 2);
      length = digits.length;
      for (index = 0; index < length; index++) {
        code = charCodeAt(digits, index);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

// `Number` constructor
// https://tc39.es/ecma262/#sec-number-constructor
if (isForced(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
  var NumberWrapper = function Number(value) {
    var n = arguments.length < 1 ? 0 : NativeNumber(toNumeric(value));
    var dummy = this;
    // check on 1..constructor(foo) case
    return isPrototypeOf(NumberPrototype, dummy) && fails(function () { thisNumberValue(dummy); })
      ? inheritIfRequired(Object(n), dummy, NumberWrapper) : n;
  };
  for (var keys = DESCRIPTORS ? getOwnPropertyNames(NativeNumber) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES2015 (in case, if modules with ES2015 Number statics required before):
    'EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,' +
    // ESNext
    'fromString,range'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (hasOwn(NativeNumber, key = keys[j]) && !hasOwn(NumberWrapper, key)) {
      defineProperty(NumberWrapper, key, getOwnPropertyDescriptor(NativeNumber, key));
    }
  }
  NumberWrapper.prototype = NumberPrototype;
  NumberPrototype.constructor = NumberWrapper;
  defineBuiltIn(global, NUMBER, NumberWrapper, { constructor: true });
}


/***/ }),

/***/ 9601:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(2109);
var assign = __webpack_require__(1574);

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
// eslint-disable-next-line es-x/no-object-assign -- required for testing
$({ target: 'Object', stat: true, arity: 2, forced: Object.assign !== assign }, {
  assign: assign
});


/***/ }),

/***/ 5003:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(2109);
var fails = __webpack_require__(7293);
var toIndexedObject = __webpack_require__(5656);
var nativeGetOwnPropertyDescriptor = (__webpack_require__(1236).f);
var DESCRIPTORS = __webpack_require__(9781);

var FAILS_ON_PRIMITIVES = fails(function () { nativeGetOwnPropertyDescriptor(1); });
var FORCED = !DESCRIPTORS || FAILS_ON_PRIMITIVES;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
$({ target: 'Object', stat: true, forced: FORCED, sham: !DESCRIPTORS }, {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
    return nativeGetOwnPropertyDescriptor(toIndexedObject(it), key);
  }
});


/***/ }),

/***/ 9337:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(2109);
var DESCRIPTORS = __webpack_require__(9781);
var ownKeys = __webpack_require__(3887);
var toIndexedObject = __webpack_require__(5656);
var getOwnPropertyDescriptorModule = __webpack_require__(1236);
var createProperty = __webpack_require__(6135);

// `Object.getOwnPropertyDescriptors` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
$({ target: 'Object', stat: true, sham: !DESCRIPTORS }, {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIndexedObject(object);
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
    var keys = ownKeys(O);
    var result = {};
    var index = 0;
    var key, descriptor;
    while (keys.length > index) {
      descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
      if (descriptor !== undefined) createProperty(result, key, descriptor);
    }
    return result;
  }
});


/***/ }),

/***/ 9660:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(2109);
var NATIVE_SYMBOL = __webpack_require__(133);
var fails = __webpack_require__(7293);
var getOwnPropertySymbolsModule = __webpack_require__(5181);
var toObject = __webpack_require__(7908);

// V8 ~ Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
var FORCED = !NATIVE_SYMBOL || fails(function () { getOwnPropertySymbolsModule.f(1); });

// `Object.getOwnPropertySymbols` method
// https://tc39.es/ecma262/#sec-object.getownpropertysymbols
$({ target: 'Object', stat: true, forced: FORCED }, {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    var $getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
    return $getOwnPropertySymbols ? $getOwnPropertySymbols(toObject(it)) : [];
  }
});


/***/ }),

/***/ 7941:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(2109);
var toObject = __webpack_require__(7908);
var nativeKeys = __webpack_require__(1956);
var fails = __webpack_require__(7293);

var FAILS_ON_PRIMITIVES = fails(function () { nativeKeys(1); });

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  keys: function keys(it) {
    return nativeKeys(toObject(it));
  }
});


/***/ }),

/***/ 1539:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__(1694);
var defineBuiltIn = __webpack_require__(8052);
var toString = __webpack_require__(288);

// `Object.prototype.toString` method
// https://tc39.es/ecma262/#sec-object.prototype.tostring
if (!TO_STRING_TAG_SUPPORT) {
  defineBuiltIn(Object.prototype, 'toString', toString, { unsafe: true });
}


/***/ }),

/***/ 4916:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2109);
var exec = __webpack_require__(2261);

// `RegExp.prototype.exec` method
// https://tc39.es/ecma262/#sec-regexp.prototype.exec
$({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
  exec: exec
});


/***/ }),

/***/ 7601:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

// TODO: Remove from `core-js@4` since it's moved to entry points
__webpack_require__(4916);
var $ = __webpack_require__(2109);
var call = __webpack_require__(6916);
var uncurryThis = __webpack_require__(1702);
var isCallable = __webpack_require__(614);
var isObject = __webpack_require__(111);

var DELEGATES_TO_EXEC = function () {
  var execCalled = false;
  var re = /[ac]/;
  re.exec = function () {
    execCalled = true;
    return /./.exec.apply(this, arguments);
  };
  return re.test('abc') === true && execCalled;
}();

var $TypeError = TypeError;
var un$Test = uncurryThis(/./.test);

// `RegExp.prototype.test` method
// https://tc39.es/ecma262/#sec-regexp.prototype.test
$({ target: 'RegExp', proto: true, forced: !DELEGATES_TO_EXEC }, {
  test: function (str) {
    var exec = this.exec;
    if (!isCallable(exec)) return un$Test(this, str);
    var result = call(exec, this, str);
    if (result !== null && !isObject(result)) {
      throw new $TypeError('RegExp exec method returned something other than an Object or null');
    }
    return !!result;
  }
});


/***/ }),

/***/ 8783:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var charAt = (__webpack_require__(8710).charAt);
var toString = __webpack_require__(1340);
var InternalStateModule = __webpack_require__(9909);
var defineIterator = __webpack_require__(654);

var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: toString(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return { value: undefined, done: true };
  point = charAt(string, index);
  state.index += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ 5306:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var apply = __webpack_require__(2104);
var call = __webpack_require__(6916);
var uncurryThis = __webpack_require__(1702);
var fixRegExpWellKnownSymbolLogic = __webpack_require__(7007);
var fails = __webpack_require__(7293);
var anObject = __webpack_require__(9670);
var isCallable = __webpack_require__(614);
var toIntegerOrInfinity = __webpack_require__(9303);
var toLength = __webpack_require__(7466);
var toString = __webpack_require__(1340);
var requireObjectCoercible = __webpack_require__(4488);
var advanceStringIndex = __webpack_require__(1530);
var getMethod = __webpack_require__(8173);
var getSubstitution = __webpack_require__(647);
var regExpExec = __webpack_require__(7651);
var wellKnownSymbol = __webpack_require__(5112);

var REPLACE = wellKnownSymbol('replace');
var max = Math.max;
var min = Math.min;
var concat = uncurryThis([].concat);
var push = uncurryThis([].push);
var stringIndexOf = uncurryThis(''.indexOf);
var stringSlice = uncurryThis(''.slice);

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
var REPLACE_KEEPS_$0 = (function () {
  // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
  return 'a'.replace(/./, '$0') === '$0';
})();

// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
  if (/./[REPLACE]) {
    return /./[REPLACE]('a', '$0') === '';
  }
  return false;
})();

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  // eslint-disable-next-line regexp/no-useless-dollar-replacements -- false positive
  return ''.replace(re, '$<a>') !== '7';
});

// @@replace logic
fixRegExpWellKnownSymbolLogic('replace', function (_, nativeReplace, maybeCallNative) {
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

  return [
    // `String.prototype.replace` method
    // https://tc39.es/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible(this);
      var replacer = searchValue == undefined ? undefined : getMethod(searchValue, REPLACE);
      return replacer
        ? call(replacer, searchValue, O, replaceValue)
        : call(nativeReplace, toString(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
    function (string, replaceValue) {
      var rx = anObject(this);
      var S = toString(string);

      if (
        typeof replaceValue == 'string' &&
        stringIndexOf(replaceValue, UNSAFE_SUBSTITUTE) === -1 &&
        stringIndexOf(replaceValue, '$<') === -1
      ) {
        var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
        if (res.done) return res.value;
      }

      var functionalReplace = isCallable(replaceValue);
      if (!functionalReplace) replaceValue = toString(replaceValue);

      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;

        push(results, result);
        if (!global) break;

        var matchStr = toString(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }

      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];

        var matched = toString(result[0]);
        var position = max(min(toIntegerOrInfinity(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) push(captures, maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = concat([matched], captures, position, S);
          if (namedCaptures !== undefined) push(replacerArgs, namedCaptures);
          var replacement = toString(apply(replaceValue, undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += stringSlice(S, nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + stringSlice(S, nextSourcePosition);
    }
  ];
}, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);


/***/ }),

/***/ 3123:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var apply = __webpack_require__(2104);
var call = __webpack_require__(6916);
var uncurryThis = __webpack_require__(1702);
var fixRegExpWellKnownSymbolLogic = __webpack_require__(7007);
var isRegExp = __webpack_require__(7850);
var anObject = __webpack_require__(9670);
var requireObjectCoercible = __webpack_require__(4488);
var speciesConstructor = __webpack_require__(6707);
var advanceStringIndex = __webpack_require__(1530);
var toLength = __webpack_require__(7466);
var toString = __webpack_require__(1340);
var getMethod = __webpack_require__(8173);
var arraySlice = __webpack_require__(1589);
var callRegExpExec = __webpack_require__(7651);
var regexpExec = __webpack_require__(2261);
var stickyHelpers = __webpack_require__(2999);
var fails = __webpack_require__(7293);

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;
var MAX_UINT32 = 0xFFFFFFFF;
var min = Math.min;
var $push = [].push;
var exec = uncurryThis(/./.exec);
var push = uncurryThis($push);
var stringSlice = uncurryThis(''.slice);

// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper
var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
  // eslint-disable-next-line regexp/no-empty-group -- required for testing
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});

// @@split logic
fixRegExpWellKnownSymbolLogic('split', function (SPLIT, nativeSplit, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'.split(/(b)*/)[1] == 'c' ||
    // eslint-disable-next-line regexp/no-empty-group -- required for testing
    'test'.split(/(?:)/, -1).length != 4 ||
    'ab'.split(/(?:ab)*/).length != 2 ||
    '.'.split(/(.?)(.?)/).length != 4 ||
    // eslint-disable-next-line regexp/no-empty-capturing-group, regexp/no-empty-group -- required for testing
    '.'.split(/()()/).length > 1 ||
    ''.split(/.?/).length
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = toString(requireObjectCoercible(this));
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (separator === undefined) return [string];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) {
        return call(nativeSplit, string, separator, lim);
      }
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = call(regexpExec, separatorCopy, string)) {
        lastIndex = separatorCopy.lastIndex;
        if (lastIndex > lastLastIndex) {
          push(output, stringSlice(string, lastLastIndex, match.index));
          if (match.length > 1 && match.index < string.length) apply($push, output, arraySlice(match, 1));
          lastLength = match[0].length;
          lastLastIndex = lastIndex;
          if (output.length >= lim) break;
        }
        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
      }
      if (lastLastIndex === string.length) {
        if (lastLength || !exec(separatorCopy, '')) push(output, '');
      } else push(output, stringSlice(string, lastLastIndex));
      return output.length > lim ? arraySlice(output, 0, lim) : output;
    };
  // Chakra, V8
  } else if ('0'.split(undefined, 0).length) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : call(nativeSplit, this, separator, limit);
    };
  } else internalSplit = nativeSplit;

  return [
    // `String.prototype.split` method
    // https://tc39.es/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = requireObjectCoercible(this);
      var splitter = separator == undefined ? undefined : getMethod(separator, SPLIT);
      return splitter
        ? call(splitter, separator, O, limit)
        : call(internalSplit, toString(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (string, limit) {
      var rx = anObject(this);
      var S = toString(string);
      var res = maybeCallNative(internalSplit, rx, S, limit, internalSplit !== nativeSplit);

      if (res.done) return res.value;

      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (UNSUPPORTED_Y ? 'g' : 'y');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(UNSUPPORTED_Y ? '^(?:' + rx.source + ')' : rx, flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = UNSUPPORTED_Y ? 0 : q;
        var z = callRegExpExec(splitter, UNSUPPORTED_Y ? stringSlice(S, q) : S);
        var e;
        if (
          z === null ||
          (e = min(toLength(splitter.lastIndex + (UNSUPPORTED_Y ? q : 0)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          push(A, stringSlice(S, p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            push(A, z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      push(A, stringSlice(S, p));
      return A;
    }
  ];
}, !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC, UNSUPPORTED_Y);


/***/ }),

/***/ 4032:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2109);
var global = __webpack_require__(7854);
var call = __webpack_require__(6916);
var uncurryThis = __webpack_require__(1702);
var IS_PURE = __webpack_require__(1913);
var DESCRIPTORS = __webpack_require__(9781);
var NATIVE_SYMBOL = __webpack_require__(133);
var fails = __webpack_require__(7293);
var hasOwn = __webpack_require__(2597);
var isPrototypeOf = __webpack_require__(7976);
var anObject = __webpack_require__(9670);
var toIndexedObject = __webpack_require__(5656);
var toPropertyKey = __webpack_require__(4948);
var $toString = __webpack_require__(1340);
var createPropertyDescriptor = __webpack_require__(9114);
var nativeObjectCreate = __webpack_require__(30);
var objectKeys = __webpack_require__(1956);
var getOwnPropertyNamesModule = __webpack_require__(8006);
var getOwnPropertyNamesExternal = __webpack_require__(1156);
var getOwnPropertySymbolsModule = __webpack_require__(5181);
var getOwnPropertyDescriptorModule = __webpack_require__(1236);
var definePropertyModule = __webpack_require__(3070);
var definePropertiesModule = __webpack_require__(6048);
var propertyIsEnumerableModule = __webpack_require__(5296);
var defineBuiltIn = __webpack_require__(8052);
var shared = __webpack_require__(2309);
var sharedKey = __webpack_require__(6200);
var hiddenKeys = __webpack_require__(3501);
var uid = __webpack_require__(9711);
var wellKnownSymbol = __webpack_require__(5112);
var wrappedWellKnownSymbolModule = __webpack_require__(6061);
var defineWellKnownSymbol = __webpack_require__(7235);
var defineSymbolToPrimitive = __webpack_require__(6532);
var setToStringTag = __webpack_require__(8003);
var InternalStateModule = __webpack_require__(9909);
var $forEach = (__webpack_require__(2092).forEach);

var HIDDEN = sharedKey('hidden');
var SYMBOL = 'Symbol';
var PROTOTYPE = 'prototype';

var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(SYMBOL);

var ObjectPrototype = Object[PROTOTYPE];
var $Symbol = global.Symbol;
var SymbolPrototype = $Symbol && $Symbol[PROTOTYPE];
var TypeError = global.TypeError;
var QObject = global.QObject;
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
var push = uncurryThis([].push);

var AllSymbols = shared('symbols');
var ObjectPrototypeSymbols = shared('op-symbols');
var WellKnownSymbolsStore = shared('wks');

// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDescriptor = DESCRIPTORS && fails(function () {
  return nativeObjectCreate(nativeDefineProperty({}, 'a', {
    get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (O, P, Attributes) {
  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
  nativeDefineProperty(O, P, Attributes);
  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
    nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
  }
} : nativeDefineProperty;

var wrap = function (tag, description) {
  var symbol = AllSymbols[tag] = nativeObjectCreate(SymbolPrototype);
  setInternalState(symbol, {
    type: SYMBOL,
    tag: tag,
    description: description
  });
  if (!DESCRIPTORS) symbol.description = description;
  return symbol;
};

var $defineProperty = function defineProperty(O, P, Attributes) {
  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
  anObject(O);
  var key = toPropertyKey(P);
  anObject(Attributes);
  if (hasOwn(AllSymbols, key)) {
    if (!Attributes.enumerable) {
      if (!hasOwn(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
      O[HIDDEN][key] = true;
    } else {
      if (hasOwn(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
      Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
    } return setSymbolDescriptor(O, key, Attributes);
  } return nativeDefineProperty(O, key, Attributes);
};

var $defineProperties = function defineProperties(O, Properties) {
  anObject(O);
  var properties = toIndexedObject(Properties);
  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
  $forEach(keys, function (key) {
    if (!DESCRIPTORS || call($propertyIsEnumerable, properties, key)) $defineProperty(O, key, properties[key]);
  });
  return O;
};

var $create = function create(O, Properties) {
  return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
};

var $propertyIsEnumerable = function propertyIsEnumerable(V) {
  var P = toPropertyKey(V);
  var enumerable = call(nativePropertyIsEnumerable, this, P);
  if (this === ObjectPrototype && hasOwn(AllSymbols, P) && !hasOwn(ObjectPrototypeSymbols, P)) return false;
  return enumerable || !hasOwn(this, P) || !hasOwn(AllSymbols, P) || hasOwn(this, HIDDEN) && this[HIDDEN][P]
    ? enumerable : true;
};

var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
  var it = toIndexedObject(O);
  var key = toPropertyKey(P);
  if (it === ObjectPrototype && hasOwn(AllSymbols, key) && !hasOwn(ObjectPrototypeSymbols, key)) return;
  var descriptor = nativeGetOwnPropertyDescriptor(it, key);
  if (descriptor && hasOwn(AllSymbols, key) && !(hasOwn(it, HIDDEN) && it[HIDDEN][key])) {
    descriptor.enumerable = true;
  }
  return descriptor;
};

var $getOwnPropertyNames = function getOwnPropertyNames(O) {
  var names = nativeGetOwnPropertyNames(toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (!hasOwn(AllSymbols, key) && !hasOwn(hiddenKeys, key)) push(result, key);
  });
  return result;
};

var $getOwnPropertySymbols = function (O) {
  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (hasOwn(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || hasOwn(ObjectPrototype, key))) {
      push(result, AllSymbols[key]);
    }
  });
  return result;
};

// `Symbol` constructor
// https://tc39.es/ecma262/#sec-symbol-constructor
if (!NATIVE_SYMBOL) {
  $Symbol = function Symbol() {
    if (isPrototypeOf(SymbolPrototype, this)) throw TypeError('Symbol is not a constructor');
    var description = !arguments.length || arguments[0] === undefined ? undefined : $toString(arguments[0]);
    var tag = uid(description);
    var setter = function (value) {
      if (this === ObjectPrototype) call(setter, ObjectPrototypeSymbols, value);
      if (hasOwn(this, HIDDEN) && hasOwn(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
    };
    if (DESCRIPTORS && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
    return wrap(tag, description);
  };

  SymbolPrototype = $Symbol[PROTOTYPE];

  defineBuiltIn(SymbolPrototype, 'toString', function toString() {
    return getInternalState(this).tag;
  });

  defineBuiltIn($Symbol, 'withoutSetter', function (description) {
    return wrap(uid(description), description);
  });

  propertyIsEnumerableModule.f = $propertyIsEnumerable;
  definePropertyModule.f = $defineProperty;
  definePropertiesModule.f = $defineProperties;
  getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
  getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
  getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;

  wrappedWellKnownSymbolModule.f = function (name) {
    return wrap(wellKnownSymbol(name), name);
  };

  if (DESCRIPTORS) {
    // https://github.com/tc39/proposal-Symbol-description
    nativeDefineProperty(SymbolPrototype, 'description', {
      configurable: true,
      get: function description() {
        return getInternalState(this).description;
      }
    });
    if (!IS_PURE) {
      defineBuiltIn(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
    }
  }
}

$({ global: true, constructor: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, {
  Symbol: $Symbol
});

$forEach(objectKeys(WellKnownSymbolsStore), function (name) {
  defineWellKnownSymbol(name);
});

$({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {
  useSetter: function () { USE_SETTER = true; },
  useSimple: function () { USE_SETTER = false; }
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS }, {
  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  create: $create,
  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  defineProperty: $defineProperty,
  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  defineProperties: $defineProperties,
  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL }, {
  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  getOwnPropertyNames: $getOwnPropertyNames
});

// `Symbol.prototype[@@toPrimitive]` method
// https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
defineSymbolToPrimitive();

// `Symbol.prototype[@@toStringTag]` property
// https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
setToStringTag($Symbol, SYMBOL);

hiddenKeys[HIDDEN] = true;


/***/ }),

/***/ 1817:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";
// `Symbol.prototype.description` getter
// https://tc39.es/ecma262/#sec-symbol.prototype.description

var $ = __webpack_require__(2109);
var DESCRIPTORS = __webpack_require__(9781);
var global = __webpack_require__(7854);
var uncurryThis = __webpack_require__(1702);
var hasOwn = __webpack_require__(2597);
var isCallable = __webpack_require__(614);
var isPrototypeOf = __webpack_require__(7976);
var toString = __webpack_require__(1340);
var defineProperty = (__webpack_require__(3070).f);
var copyConstructorProperties = __webpack_require__(9920);

var NativeSymbol = global.Symbol;
var SymbolPrototype = NativeSymbol && NativeSymbol.prototype;

if (DESCRIPTORS && isCallable(NativeSymbol) && (!('description' in SymbolPrototype) ||
  // Safari 12 bug
  NativeSymbol().description !== undefined
)) {
  var EmptyStringDescriptionStore = {};
  // wrap Symbol constructor for correct work with undefined description
  var SymbolWrapper = function Symbol() {
    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : toString(arguments[0]);
    var result = isPrototypeOf(SymbolPrototype, this)
      ? new NativeSymbol(description)
      // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
      : description === undefined ? NativeSymbol() : NativeSymbol(description);
    if (description === '') EmptyStringDescriptionStore[result] = true;
    return result;
  };

  copyConstructorProperties(SymbolWrapper, NativeSymbol);
  SymbolWrapper.prototype = SymbolPrototype;
  SymbolPrototype.constructor = SymbolWrapper;

  var NATIVE_SYMBOL = String(NativeSymbol('test')) == 'Symbol(test)';
  var symbolToString = uncurryThis(SymbolPrototype.toString);
  var symbolValueOf = uncurryThis(SymbolPrototype.valueOf);
  var regexp = /^Symbol\((.*)\)[^)]+$/;
  var replace = uncurryThis(''.replace);
  var stringSlice = uncurryThis(''.slice);

  defineProperty(SymbolPrototype, 'description', {
    configurable: true,
    get: function description() {
      var symbol = symbolValueOf(this);
      var string = symbolToString(symbol);
      if (hasOwn(EmptyStringDescriptionStore, symbol)) return '';
      var desc = NATIVE_SYMBOL ? stringSlice(string, 7, -1) : replace(string, regexp, '$1');
      return desc === '' ? undefined : desc;
    }
  });

  $({ global: true, constructor: true, forced: true }, {
    Symbol: SymbolWrapper
  });
}


/***/ }),

/***/ 763:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(2109);
var getBuiltIn = __webpack_require__(5005);
var hasOwn = __webpack_require__(2597);
var toString = __webpack_require__(1340);
var shared = __webpack_require__(2309);
var NATIVE_SYMBOL_REGISTRY = __webpack_require__(735);

var StringToSymbolRegistry = shared('string-to-symbol-registry');
var SymbolToStringRegistry = shared('symbol-to-string-registry');

// `Symbol.for` method
// https://tc39.es/ecma262/#sec-symbol.for
$({ target: 'Symbol', stat: true, forced: !NATIVE_SYMBOL_REGISTRY }, {
  'for': function (key) {
    var string = toString(key);
    if (hasOwn(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
    var symbol = getBuiltIn('Symbol')(string);
    StringToSymbolRegistry[string] = symbol;
    SymbolToStringRegistry[symbol] = string;
    return symbol;
  }
});


/***/ }),

/***/ 2165:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var defineWellKnownSymbol = __webpack_require__(7235);

// `Symbol.iterator` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.iterator
defineWellKnownSymbol('iterator');


/***/ }),

/***/ 2526:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// TODO: Remove this module from `core-js@4` since it's split to modules listed below
__webpack_require__(4032);
__webpack_require__(763);
__webpack_require__(6620);
__webpack_require__(8862);
__webpack_require__(9660);


/***/ }),

/***/ 6620:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(2109);
var hasOwn = __webpack_require__(2597);
var isSymbol = __webpack_require__(2190);
var tryToString = __webpack_require__(6330);
var shared = __webpack_require__(2309);
var NATIVE_SYMBOL_REGISTRY = __webpack_require__(735);

var SymbolToStringRegistry = shared('symbol-to-string-registry');

// `Symbol.keyFor` method
// https://tc39.es/ecma262/#sec-symbol.keyfor
$({ target: 'Symbol', stat: true, forced: !NATIVE_SYMBOL_REGISTRY }, {
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(tryToString(sym) + ' is not a symbol');
    if (hasOwn(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
  }
});


/***/ }),

/***/ 4747:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var DOMIterables = __webpack_require__(8324);
var DOMTokenListPrototype = __webpack_require__(8509);
var forEach = __webpack_require__(8533);
var createNonEnumerableProperty = __webpack_require__(8880);

var handlePrototype = function (CollectionPrototype) {
  // some Chrome versions have non-configurable methods on DOMTokenList
  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
    createNonEnumerableProperty(CollectionPrototype, 'forEach', forEach);
  } catch (error) {
    CollectionPrototype.forEach = forEach;
  }
};

for (var COLLECTION_NAME in DOMIterables) {
  if (DOMIterables[COLLECTION_NAME]) {
    handlePrototype(global[COLLECTION_NAME] && global[COLLECTION_NAME].prototype);
  }
}

handlePrototype(DOMTokenListPrototype);


/***/ }),

/***/ 3948:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var DOMIterables = __webpack_require__(8324);
var DOMTokenListPrototype = __webpack_require__(8509);
var ArrayIteratorMethods = __webpack_require__(6992);
var createNonEnumerableProperty = __webpack_require__(8880);
var wellKnownSymbol = __webpack_require__(5112);

var ITERATOR = wellKnownSymbol('iterator');
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ArrayValues = ArrayIteratorMethods.values;

var handlePrototype = function (CollectionPrototype, COLLECTION_NAME) {
  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
      createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR] = ArrayValues;
    }
    if (!CollectionPrototype[TO_STRING_TAG]) {
      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
    }
    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
      }
    }
  }
};

for (var COLLECTION_NAME in DOMIterables) {
  handlePrototype(global[COLLECTION_NAME] && global[COLLECTION_NAME].prototype, COLLECTION_NAME);
}

handlePrototype(DOMTokenListPrototype, 'DOMTokenList');


/***/ }),

/***/ 7203:
/***/ (function(module) {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__7203__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		__webpack_require__.p = "";
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ entry_lib; }
});

;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
/* eslint-disable no-var */
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (true) {
    var getCurrentScript = __webpack_require__(7679)
    currentScript = getCurrentScript()

    // for backward compatibility, because previously we directly included the polyfill
    if (!('currentScript' in document)) {
      Object.defineProperty(document, 'currentScript', { get: getCurrentScript })
    }
  }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__(7941);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.js
var es_symbol = __webpack_require__(2526);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
var es_array_filter = __webpack_require__(7327);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__(1539);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.get-own-property-descriptor.js
var es_object_get_own_property_descriptor = __webpack_require__(5003);
// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.for-each.js
var web_dom_collections_for_each = __webpack_require__(4747);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.get-own-property-descriptors.js
var es_object_get_own_property_descriptors = __webpack_require__(9337);
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js









function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}
// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__(7203);
var external_commonjs_vue_commonjs2_vue_root_Vue_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_vue_commonjs2_vue_root_Vue_);
;// CONCATENATED MODULE: ./src/store/state.js


var initialState = {
  // app Mode
  appMode: 'full',
  // navigation
  navigationMode: 'forward',
  isRouterEnabled: false,
  router: {},
  history: [],
  backwardNavigation: false,
  componentList: {},
  goBackView: '',
  // look & feel
  diameters: {},
  usePercentSizes: false,
  percentSizes: {
    xxl: 30,
    xl: 20,
    l: 16,
    m: 8,
    s: 6,
    xs: 4,
    xxs: 2
  },
  minSizesInPixels: {
    xxl: 180,
    xl: 150,
    l: 100,
    m: 80,
    s: 50,
    xs: 30,
    xxs: 20
  },
  appStyle: {
    theme: 'theme-black',
    mode: 'mode-dark',
    shape: 'circle'
  },
  // pagination components
  currentPage: 0,
  items: [],
  pages: [],
  params: {},
  // debug
  debug: false
};
var state = new (external_commonjs_vue_commonjs2_vue_root_Vue_default())({
  data: _objectSpread2({}, initialState)
});
/* harmony default export */ var store_state = (state);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.assign.js
var es_object_assign = __webpack_require__(9601);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__(8309);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__(4916);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.replace.js
var es_string_replace = __webpack_require__(5306);
;// CONCATENATED MODULE: ./src/store/modules/router.js





var router = {
  evaluateRoute: function evaluateRoute(view, position) {
    var match = store_store.state.router.resolve(view.path).route.matched[0];
    var component = match.components.default;
    var name = match.name;
    store_store.actions.setComponentList(_defineProperty({}, name, component));
    store_store.state.history.push({
      name: name,
      position: position,
      params: view.route.params,
      component: component
    });
    store_store.actions.setNavigationMode('forward');

    if (view.name !== name) {
      return store_store.state.router.push({
        name: name,
        params: view.route.params
      });
    } else {
      return store_store.state.router.push(view.route);
    }
  },
  replace: function replace(view) {
    var match = store_store.state.router.resolve(view).route.matched[0];
    var component = match.components.default;
    store_store.state.params = '';
    store_store.state.history = [];
    store_store.actions.setComponentList(_defineProperty({}, view.name, component));
    store_store.state.history.push({
      name: view.name,
      position: {
        X: 0,
        Y: 0,
        scale: 1,
        Xi: 0,
        Yi: 0,
        scalei: 1
      },
      params: view.params,
      component: component
    });
    store_store.actions.setNavigationMode('forward');
    store_store.state.router.replace(view);
    store_store.actions.setLog('replace() => ' + store_store.state.history[store_store.state.history.length - 1].name);
  },
  getRouterState: function getRouterState() {
    return store_store.state.isRouterEnabled;
  },
  isFallbackView: function isFallbackView() {
    if (store_store.actions.getFallbackView() !== store_store.actions.getCurrentViewName() && store_store.actions.getHistoryLength() === 1) return true;
  },
  setFallbackView: function setFallbackView(view) {
    store_store.state.goBackView = view;
  },
  getFallbackView: function getFallbackView() {
    return store_store.state.goBackView;
  },
  setRouterHooks: function setRouterHooks() {
    store_store.state.router.beforeEach(function (to, _from, next) {
      if (store_store.actions.getNavigationMode() === 'forward' && store_store.state.history.length >= 1) {
        store_store.actions.setLog('VueRouter: zoom-in to ' + to.name);
        next();
      } else if (store_store.actions.getNavigationMode() === 'backward' && store_store.state.history.length >= 1) {
        store_store.actions.goBack();
        store_store.actions.setLog('VueRouter: zoom-out to ' + to.name);
        next();
      } else if (store_store.actions.getNavigationMode() === 'iddle' && store_store.state.history.length >= 1) {
        if (window.onhashchange || window.onpopstate) {
          store_store.actions.goBack();
          store_store.actions.setLog('VueRouter: goBack');
        } else {
          store_store.actions.replace({
            name: to.name,
            params: to.params
          });
          store_store.actions.setLog('VueRouter: replace url');
        }

        next();
      }
    });
  }
};
/* harmony default export */ var modules_router = (router);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.includes.js
var es_array_includes = __webpack_require__(6699);
;// CONCATENATED MODULE: ./src/store/modules/position.js



function calcCoords(distance, angle, parentSize) {
  var X = 0;
  var Y = 0;
  var Xi = 0;
  var Yi = 0;

  if (distance !== 0) {
    X = store_store.actions.getComponentWidth(parentSize) / 2 * distance / 100 * Math.cos(angle * (Math.PI / 180));
    Y = store_store.actions.getComponentWidth(parentSize) / 2 * distance / 100 * Math.sin(angle * (Math.PI / 180));
    Xi = -X;
    Yi = -Y;
  }

  return {
    X: X,
    Y: Y,
    Xi: Xi,
    Yi: Yi
  };
}

function determinePosition(pos) {
  if (store_store.state.history[store_store.state.history.length - pos]) {
    return store_store.state.history[store_store.state.history.length - pos].position;
  } else {
    return {
      X: 0,
      Y: 0,
      Xi: 0,
      Yi: 0,
      scale: 0,
      scalei: 0
    };
  }
}

var position = {
  getCurrentPosition: function getCurrentPosition() {
    return determinePosition(1);
  },
  getPreviousPosition: function getPreviousPosition() {
    return determinePosition(2);
  },
  getPastPosition: function getPastPosition() {
    return determinePosition(3);
  },
  calcViewPosition: function calcViewPosition(viewName) {
    store_store.actions.setLog('calcViewPosition() ' + viewName);
    return store_store.actions.getCurrentViewName() === viewName ? store_store.actions.getCurrentPosition() : store_store.actions.getPastPosition();
  },
  calcPosition: function calcPosition(component) {
    var parentPosition = ['z-view', 'z-list', 'z-spot'].includes(component.$parent.componentType) ? {
      Xi: component.$parent.position.Xi,
      Yi: component.$parent.position.Yi,
      X: component.$parent.position.X,
      Y: component.$parent.position.Y,
      scalei: component.$parent.position.scalei,
      scale: component.$parent.position.scale
    } : {
      Xi: 0,
      Yi: 0,
      X: 0,
      Y: 0,
      scalei: 1,
      scale: 1
    };
    var newCoords = calcCoords(component.distance, component.angle, component.$parent.size);
    return {
      X: newCoords.X,
      Y: newCoords.Y,
      Xi: parentPosition.Xi + newCoords.Xi * parentPosition.scalei,
      Yi: parentPosition.Yi + newCoords.Yi * parentPosition.scalei,
      scale: parentPosition.scale * store_store.state.diameters.xxl / store_store.actions.getComponentWidth(component.size),
      scalei: parentPosition.scalei * store_store.actions.getComponentWidth(component.size) / store_store.state.diameters.xxl,
      Xabs: parentPosition.X + newCoords.X * parentPosition.scalei,
      Yabs: parentPosition.Y + newCoords.Y * parentPosition.scalei
    };
  }
};
/* harmony default export */ var modules_position = (position);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.description.js
var es_symbol_description = __webpack_require__(1817);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.iterator.js
var es_symbol_iterator = __webpack_require__(2165);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.iterator.js
var es_array_iterator = __webpack_require__(6992);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.iterator.js
var es_string_iterator = __webpack_require__(8783);
// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__(3948);
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/typeof.js







function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.split.js
var es_string_split = __webpack_require__(3123);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.find.js
var es_array_find = __webpack_require__(9826);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.slice.js
var es_array_slice = __webpack_require__(7042);
;// CONCATENATED MODULE: ./src/store/modules/navigation.js













function retrieveViewName(pos) {
  var viewName = '';

  if (store_store.state.history.length >= pos) {
    viewName = store_store.state.history[store_store.state.history.length - pos].name;
  }

  return viewName;
}

function transformViewName(view) {
  view = view.toLowerCase();
  var count = 0;

  for (var i = 1; i <= store_store.state.history.length; i++) {
    if (store_store.state.history[store_store.state.history.length - i].name.split('--')[0] === view) {
      count += 1;
    }
  }

  if (store_store.state.isRouterEnabled) {
    return view;
  } else {
    return view + '--' + count;
  }
}

function parseView(data) {
  var name;
  var route;
  var paramPath = '';
  var path;

  if (typeof data === 'string') {
    name = transformViewName(data);
    route = {
      name: name
    };
    path = '/' + name;
  } else {
    Object.keys(data.params).forEach(function (key) {
      paramPath += '/:' + key;
    });
    name = transformViewName(data.name);
    route = {
      name: name,
      params: data.params
    };
    path = '/' + name + '' + paramPath;
  }

  return {
    name: name,
    route: route,
    path: path
  };
}

var navigation = {
  addToHistory: function addToHistory(view, position, params) {
    return store_store.state.history.push({
      name: view.name,
      position: position,
      params: params,
      component: store_store.actions.resolveComponent(store_store.actions.getComponentList(), view.name)
    });
  },
  resolveComponent: function resolveComponent(list, view) {
    view = view.split('--')[0];
    var key = Object.keys(list).find(function (k) {
      return k.toLowerCase() === view;
    });

    if (key) {
      return list[key];
    } else {
      return external_commonjs_vue_commonjs2_vue_root_Vue_default().component('missing', {
        render: function render(h) {
          return h('z-view', view + ' not found');
        }
      });
    }
  },
  setComponentList: function setComponentList(list) {
    store_store.state.componentList = Object.assign({}, store_store.state.componentList, list);
  },
  getComponentList: function getComponentList() {
    return store_store.state.componentList;
  },
  getCurrentViewName: function getCurrentViewName() {
    return retrieveViewName(1);
  },
  getPreviousViewName: function getPreviousViewName() {
    return retrieveViewName(2);
  },
  getPastViewName: function getPastViewName() {
    return retrieveViewName(3);
  },
  getHistoryLength: function getHistoryLength() {
    return store_store.state.history.length;
  },
  getHistory: function getHistory() {
    return store_store.state.history.slice(0);
  },
  setNavigationMode: function setNavigationMode(value) {
    if (value === 'forward' || value === 'backward' || value === 'iddle' || value === 'replace') {
      store_store.state.navigationMode = value;
    }
  },
  getNavigationMode: function getNavigationMode() {
    return store_store.state.navigationMode;
  },
  getBackwardNavigationState: function getBackwardNavigationState() {
    return store_store.state.backwardNavigation;
  },
  allowBackwardNavigation: function allowBackwardNavigation(value) {
    if (value !== store_store.state.backwardNavigation) {
      store_store.state.backwardNavigation = value;
    }
  },
  toView: function toView(options) {
    if (typeof options === 'string') {
      store_store.actions.setView(options);
      return;
    }

    if (!options.to) store_store.actions.setLog('Programmatic navigation: "to" is required ', 'error');
    if (!options.fromSpot) store_store.actions.setLog('Programmatic navigation: "fromSpot" is required ', 'error');
    if (options.fromSpot && _typeof(options.fromSpot) !== 'object') store_store.actions.setLog('Programmatic navigation: "fromSpot" should be an object ', 'error');
    if (options.params && _typeof(options.params) !== 'object') store_store.actions.setLog('Programmatic navigation: "params" should be an object ', 'error');

    if (options.to && options.fromSpot) {
      store_store.actions.setView({
        name: options.to,
        params: options.params || {}
      }, options.fromSpot.position ? {
        position: {
          X: options.fromSpot.position.Xabs,
          Y: options.fromSpot.position.Yabs,
          scale: options.fromSpot.position.scale,
          Xi: options.fromSpot.position.Xi,
          Yi: options.fromSpot.position.Yi,
          scalei: options.fromSpot.position.scalei
        }
      } : {});
    }
  },
  setView: function setView(data, options) {
    if (store_store.state.history.length >= 6) {
      store_store.actions.setLog('Max zoom level reached');
      return;
    }

    var view = parseView(data);
    var position = !options || !options.position || options.position.scale === 0 ? {
      X: 0,
      Y: 0,
      scale: 1,
      Xi: 0,
      Yi: 0,
      scalei: 1
    } : options.position;

    if (store_store.state.isRouterEnabled === false) {
      store_store.actions.addToHistory(view, position, view.route.params);
      store_store.actions.setNavigationMode('forward');
      if (view.route) store_store.state.params = view.route.params;
    } else {
      store_store.actions.evaluateRoute(view, position);
    }
  },
  goBack: function goBack() {
    if (store_store.state.history.length > 1) {
      store_store.actions.setNavigationMode('backward');
      store_store.state.history.pop();

      if (store_store.state.isRouterEnabled === true) {
        store_store.state.params = '';
      } else {
        store_store.state.params = store_store.state.history[store_store.state.history.length - 1].params;
      }

      store_store.actions.setLog('goBack() => ' + store_store.state.history[store_store.state.history.length - 1].name);
    }
  }
};
/* harmony default export */ var modules_navigation = (navigation);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.error.cause.js
var es_error_cause = __webpack_require__(1703);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.from.js
var es_array_from = __webpack_require__(1038);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.test.js
var es_regexp_test = __webpack_require__(7601);
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js








function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js









function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function F() {};

      return {
        s: F,
        n: function n() {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function s() {
      it = it.call(o);
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it["return"] != null) it["return"]();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}
;// CONCATENATED MODULE: ./src/store/utils/responsiveness.js



var mediaQuery = [{
  // small devices
  media: window.matchMedia('(max-width: 319px)'),
  width: {
    xxl: 200,
    xl: 124,
    l: 76,
    m: 48,
    s: 30,
    xs: 18,
    xxs: 10
  }
}, {
  // medium
  media: window.matchMedia('(min-width: 320px)'),
  width: {
    xxl: 230,
    xl: 142,
    l: 88,
    m: 54,
    s: 34,
    xs: 20,
    xxs: 10
  }
}, {
  // medium - large devices portrait
  media: window.matchMedia('(min-width: 375px) and (orientation: portrait)'),
  width: {
    xxl: 260,
    xl: 160,
    l: 100,
    m: 62,
    s: 38,
    xs: 22,
    xxs: 12
  }
}, {
  // medium - large devices landscape
  media: window.matchMedia('(min-width: 375px) and (orientation: landscape)'),
  width: {
    xxl: 270,
    xl: 168,
    l: 104,
    m: 64,
    s: 40,
    xs: 24,
    xxs: 12
  }
}, {
  // tablets portrait
  media: window.matchMedia('(min-width: 768px) and (orientation: portrait) and (min-pixel-ratio: 2)'),
  width: {
    xxl: 340,
    xl: 210,
    l: 130,
    m: 80,
    s: 52,
    xs: 32,
    xxs: 14
  }
}, {
  // tablets landscape
  media: window.matchMedia('(min-width: 768px) and (orientation: landscape)'),
  width: {
    xxl: 360,
    xl: 222,
    l: 138,
    m: 86,
    s: 54,
    xs: 32,
    xxs: 14
  }
}, {
  // desktop or large tablets portrait
  media: window.matchMedia('(min-width: 992px) and (orientation: portrait)'),
  width: {
    xxl: 420,
    xl: 260,
    l: 160,
    m: 100,
    s: 62,
    xs: 38,
    xxs: 16
  }
}, {
  // desktop or large tablets landscape
  media: window.matchMedia('(min-width: 992px) and (orientation: landscape)'),
  width: {
    xxl: 420,
    xl: 260,
    l: 160,
    m: 100,
    s: 62,
    xs: 38,
    xxs: 16
  }
}, {
  // large desktop
  media: window.matchMedia('(min-width: 1200px) and (orientation: portrait)'),
  width: {
    xxl: 450,
    xl: 278,
    l: 172,
    m: 106,
    s: 66,
    xs: 42,
    xxs: 20
  }
}, {
  // xxl desktop
  media: window.matchMedia('(min-width: 1800px)'),
  width: {
    xxl: 450,
    xl: 278,
    l: 172,
    m: 106,
    s: 66,
    xs: 42,
    xxs: 20
  }
}];
var pixelsGapByPixelRatio = {
  0.25: 24,
  0.3125: 32,
  0.3333: 9,
  0.375: 16,
  0.4166: 24,
  0.5: 4,
  0.625: 16,
  0.6666: 3,
  0.75: 8,
  0.8: 5,
  0.8333: 12,
  0.9: 20,
  0.9375: 32,
  1: 2,
  1.1: 20,
  1.125: 16,
  1.2: 5,
  1.25: 8,
  1.35: 40,
  1.375: 16,
  1.5: 4,
  1.5625: 32,
  1.65: 40,
  1.75: 8,
  1.875: 16,
  2: 2,
  2.1875: 32,
  2.25: 8,
  2.5: 4,
  2.625: 16,
  3: 2,
  3.125: 16,
  3.75: 8,
  4: 1,
  4.5: 4,
  5: 2,
  6: 1,
  6.25: 8,
  7.5: 4
};
function updateDiametersInPercent() {
  var container = document.getElementById('z-container');

  if (!container) {
    store_store.state.diameters = mediaQuery[0].width;
    return;
  }

  var containerWidth = Math.round(container.getBoundingClientRect().width);
  var sizes = store_store.state.percentSizes;
  var minSizes = store_store.state.minSizesInPixels;
  var diameters = {};

  for (var size in sizes) {
    diameters[size] = Math.round(containerWidth * (sizes[size] / 100));

    if (diameters[size] < minSizes[size]) {
      diameters[size] = minSizes[size];
    }
  }

  store_store.state.diameters = diameters;
  store_store.actions.setLog('updateDiameters() using percent. z-view new xxl diameter: ' + store_store.state.diameters.xxl);
}
function updateDiametersInFullMode() {
  var _iterator = _createForOfIteratorHelper(mediaQuery),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var element = _step.value;

      if (element.media.matches) {
        store_store.state.diameters = element.width;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  store_store.actions.setLog('updateDiameters() at appMode full. z-view new xxl diameter: ' + store_store.state.diameters.xxl);
}
function updateDiametersInMixedMode() {
  var container = document.getElementById('z-container');

  if (!container) {
    store_store.state.diameters = mediaQuery[0].width;
    return;
  }

  var vp = container.getBoundingClientRect().width;
  var mediaQueryIndex = 0;

  if (vp >= 1800) {
    mediaQueryIndex = 9;
  } else if (vp >= 1200) {
    mediaQueryIndex = 8;
  } else if (vp >= 992) {
    mediaQueryIndex = 6;
  } else if (vp >= 768) {
    mediaQueryIndex = 4;
  } else if (vp >= 375) {
    mediaQueryIndex = 2;
  } else if (vp >= 320) {
    mediaQueryIndex = 1;
  }

  store_store.state.diameters = mediaQuery[mediaQueryIndex].width;
  store_store.actions.setLog('updateDiameters() at appMode mixed. z-view new xxl diameter: ' + store_store.state.diameters.xxl);
}
function updateDiametersDependsOnPixelRatio() {
  var roundedPixelRatio = Math.round(window.devicePixelRatio * 10000) / 10000;

  if (pixelsGapByPixelRatio[roundedPixelRatio] === undefined) {
    store_store.actions.setLog('updateDiametersDependsOnPixelRatio() not found ' + roundedPixelRatio);
    return;
  }

  var sizes = Object.assign({}, store_store.state.diameters);

  for (var size in sizes) {
    var _pixelsGapByPixelRati;

    sizes[size] -= sizes[size] % ((_pixelsGapByPixelRati = pixelsGapByPixelRatio[roundedPixelRatio]) !== null && _pixelsGapByPixelRati !== void 0 ? _pixelsGapByPixelRati : 1);

    if (sizes[size] <= 0) {
      sizes[size] = pixelsGapByPixelRatio[roundedPixelRatio];
    }
  }

  store_store.state.diameters = sizes;
  store_store.actions.setLog('updateDiametersDependsOnPixelRatio() ' + roundedPixelRatio + ' / z-view new xxl diameter: ' + store_store.state.diameters.xxl);
}
;// CONCATENATED MODULE: ./src/store/modules/responsiveness.js


var responsiveness = {
  getComponentWidth: function getComponentWidth(size) {
    size = size.toLowerCase();
    if (size === 'extralarge') size = 'xl';
    if (size === 'large') size = 'l';
    if (size === 'medium') size = 'm';
    if (size === 'small') size = 's';
    if (size === 'extrasmall') size = 'xs';
    return store_store.state.diameters[size];
  },
  updateDiameters: function updateDiameters() {
    if (store_store.state.usePercentSizes) {
      updateDiametersInPercent();
    } else if (store_store.actions.getAppMode() === 'full') {
      updateDiametersInFullMode();
    } else if (store_store.actions.getAppMode() === 'mixed') {
      updateDiametersInMixedMode();
    }

    updateDiametersDependsOnPixelRatio();
  }
};
/* harmony default export */ var modules_responsiveness = (responsiveness);
;// CONCATENATED MODULE: ./src/store/modules/themes.js

var themes = {
  getTheme: function getTheme() {
    return store_store.state.appStyle.theme;
  },
  getThemeMode: function getThemeMode() {
    return store_store.state.appStyle.mode;
  },
  getThemeShape: function getThemeShape() {
    return store_store.state.appStyle.shape;
  },
  setThemeShapeToSquare: function setThemeShapeToSquare() {
    store_store.actions.setLog('- Theme shape: square');
    store_store.state.appStyle.shape = 'square';
    return store_store.state.appStyle.shape;
  },
  setThemeShapeToCircle: function setThemeShapeToCircle() {
    store_store.actions.setLog('- Theme shape: circle');
    store_store.state.appStyle.shape = 'circle';
    return store_store.state.appStyle.shape;
  }
};
/* harmony default export */ var modules_themes = (themes);
;// CONCATENATED MODULE: ./src/store/modules/debug.js

var debug = {
  setLog: function setLog(msg, type) {
    var bgColor = 'green';

    if (type === 'warn') {
      bgColor = 'yellow';
    } else if (type === 'error') {
      bgColor = 'red';
    }

    var color = type === 'warn' ? 'black' : 'white';

    if (store_store.state.debug) {
      console.log('%c z ', 'background: ' + bgColor + '; color:  ' + color + '', msg); // eslint-disable-line no-console
    }
  },
  getState: function getState() {
    return store_store.state.$data;
  }
};
/* harmony default export */ var modules_debug = (debug);
;// CONCATENATED MODULE: ./src/store/modules/list.js

var list = {
  setPages: function setPages(value) {
    store_store.state.pages = value;
  },
  getPages: function getPages() {
    return store_store.state.pages;
  },
  getNumberOfPages: function getNumberOfPages() {
    return store_store.state.pages.length;
  },
  getCurrentPage: function getCurrentPage() {
    return store_store.state.pages[store_store.state.currentPage];
  },
  getCurrentPageIndex: function getCurrentPageIndex() {
    return store_store.state.currentPage;
  },
  setCurrentPageIndex: function setCurrentPageIndex(value) {
    store_store.state.currentPage = value;
  },
  getNumberOfItemsInCurrentPage: function getNumberOfItemsInCurrentPage() {
    return store_store.state.pages[store_store.state.currentPage].length;
  },
  setParams: function setParams(value) {
    store_store.state.params = value;
  },
  getParams: function getParams() {
    return store_store.state.params;
  }
};
/* harmony default export */ var modules_list = (list);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.json.stringify.js
var es_json_stringify = __webpack_require__(8862);
;// CONCATENATED MODULE: ./src/store/modules/app.js







var app = {
  getAppMode: function getAppMode() {
    return store_store.state.appMode;
  },
  isUsingPercentSizes: function isUsingPercentSizes() {
    return store_store.state.usePercentSizes;
  },
  resetConfig: function resetConfig() {
    Object.keys(initialState).forEach(function (key) {
      store_store.state[key] = JSON.parse(JSON.stringify(initialState[key]));
    });
  },
  config: function config(_config) {
    if (typeof _config.debug === 'boolean') store_store.state.debug = _config.debug;
    if (store_store.state.debug === true) store_store.actions.setLog('- Debug enabled');

    if (_config.mode === 'full' || _config.mode === 'mixed') {
      store_store.state.appMode = _config.mode;
      store_store.actions.setLog('- Mode: ' + _config.mode);
    }

    if (typeof _config.usePercentSizes === 'boolean') {
      store_store.state.usePercentSizes = _config.usePercentSizes;
      store_store.actions.setLog("- Percent sizes ".concat(_config.usePercentSizes ? 'ON' : 'OFF'));
    }

    if (_config.percentSizes) {
      store_store.state.percentSizes = _config.percentSizes;
      store_store.actions.setLog('- Component percentSizes: ' + JSON.stringify(_config.percentSizes));
    }

    if (_config.minSizesInPixels) {
      store_store.state.minSizesInPixels = _config.minSizesInPixels;
      store_store.actions.setLog('- Component minSizesInPixels: ' + JSON.stringify(_config.minSizesInPixels));
    }

    if (_config.style && _config.style.theme) {
      store_store.state.appStyle.theme = 'theme-' + _config.style.theme;
      store_store.actions.setLog('- Theme: ' + _config.style.theme);
    }

    if (_config.style && _config.style.mode) {
      store_store.state.appStyle.mode = 'mode-' + _config.style.mode;
      store_store.actions.setLog('- Theme mode: ' + _config.style.mode);
    }

    if (_config.style && _config.style.shape) {
      store_store.state.appStyle.shape = _config.style.shape;
      store_store.actions.setLog('- Theme shape: ' + _config.style.shape);
    }

    if (_config.router) {
      store_store.state.router = _config.router;
      store_store.state.isRouterEnabled = true;
      store_store.actions.setRouterHooks();
      store_store.actions.setLog('- VueRouter enabled');
      store_store.actions.setView({
        name: store_store.state.router.currentRoute.name,
        params: store_store.state.router.currentRoute.params
      });
      if (store_store.actions.getAppMode() === 'mixed') store_store.actions.setLog('You should not use VueRouter when Zircle is in mixed mode.', 'warn');
    }
  }
};
/* harmony default export */ var modules_app = (app);
;// CONCATENATED MODULE: ./src/store/actions.js









var actions = Object.assign({}, modules_router, modules_position, modules_navigation, modules_responsiveness, modules_themes, modules_list, modules_debug, modules_app);
/* harmony default export */ var store_actions = (actions);
;// CONCATENATED MODULE: ./src/store/store.js


var store = {
  state: store_state,
  actions: store_actions
};
/* harmony default export */ var store_store = (store);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/z-canvas.vue?vue&type=template&id=670e1f73&
var render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c('div', {
    staticClass: "z-canvas",
    class: [_vm.classes, _vm.$zircle.getTheme(), _vm.$zircle.getThemeMode(), _vm.$zircle.getThemeShape()],
    style: [_vm.$zircle.getPreviousViewName() !== '' ? {
      cursor: 'zoom-out'
    } : {}],
    attrs: {
      "id": "z-container"
    },
    on: {
      "click": function click($event) {
        $event.stopPropagation();
        return _vm.goback.apply(null, arguments);
      }
    }
  }, [_c('div', {
    ref: "zoom",
    style: _vm.zoom,
    attrs: {
      "id": "z-zoomable-layer"
    },
    on: {
      "transitionend": _vm.notify
    }
  }, [_c('z-view-manager')], 1)]);
};

var staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/child-components/z-view-manager.vue?vue&type=template&id=60b33bdd&


var z_view_managervue_type_template_id_60b33bdd_render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c('transition-group', {
    attrs: {
      "name": _vm.$zircle.getNavigationMode() === 'forward' ? 'z-next' : 'z-prev',
      "tag": "section"
    }
  }, [_vm._l(_vm.views, function (view) {
    return _c(view.component, {
      key: view.name,
      tag: "component",
      class: {
        'is-current-view': _vm.$zircle.getCurrentViewName() === view.name && _vm.$zircle.getRouterState() === false,
        'is-previous-view': _vm.$zircle.getPreviousViewName() === view.name,
        'is-past-view': _vm.$zircle.getPastViewName() === view.name
      }
    });
  }), _vm.$zircle.getRouterState() === true && _vm.$zircle.getHistoryLength() >= 1 ? _c('router-view', {
    key: _vm.$zircle.getCurrentViewName(),
    staticClass: "is-current-view"
  }) : _vm._e()], 2);
};

var z_view_managervue_type_template_id_60b33bdd_staticRenderFns = [];

;// CONCATENATED MODULE: ./src/components/child-components/z-view-manager.vue?vue&type=template&id=60b33bdd&

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/child-components/z-view-manager.vue?vue&type=script&lang=js&

/* harmony default export */ var z_view_managervue_type_script_lang_js_ = ({
  name: 'z-view-manager',
  computed: {
    views: function views() {
      return this.$zircle.getRouterState() === false ? this.$zircle.getHistory().slice(-3) : this.$zircle.getHistory().slice(-3, -1);
    }
  }
});
;// CONCATENATED MODULE: ./src/components/child-components/z-view-manager.vue?vue&type=script&lang=js&
 /* harmony default export */ var child_components_z_view_managervue_type_script_lang_js_ = (z_view_managervue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent(
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */,
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options =
    typeof scriptExports === 'function' ? scriptExports.options : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) {
    // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
          injectStyles.call(
            this,
            (options.functional ? this.parent : this).$root.$options.shadowRoot
          )
        }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

;// CONCATENATED MODULE: ./src/components/child-components/z-view-manager.vue





/* normalize component */
;
var component = normalizeComponent(
  child_components_z_view_managervue_type_script_lang_js_,
  z_view_managervue_type_template_id_60b33bdd_render,
  z_view_managervue_type_template_id_60b33bdd_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var z_view_manager = (component.exports);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/z-canvas.vue?vue&type=script&lang=js&

/* harmony default export */ var z_canvasvue_type_script_lang_js_ = ({
  name: 'z-canvas',
  props: {
    views: {
      type: [Object],
      required: true
    }
  },
  components: {
    ZViewManager: z_view_manager
  },
  computed: {
    zoom: function zoom() {
      var pos = this.$zircle.getHistoryLength() === 0 ? {
        X: 0,
        Y: 0,
        Xi: 0,
        Yi: 0,
        scale: 1,
        scalei: 1
      } : this.$zircle.getCurrentPosition();
      return {
        transform: 'scale(' + pos.scale + ') translate3d(' + pos.Xi + 'px, ' + pos.Yi + 'px, 0px)',
        transition: 'transform 1000ms ease-in-out'
      };
    },
    classes: function classes() {
      return {
        'is-full-mode': this.$zircle.getAppMode() === 'full',
        'is-mixed-mode': this.$zircle.getAppMode() === 'mixed'
      };
    }
  },
  methods: {
    notify: function notify() {
      this.$zircle.setNavigationMode('iddle');
    },
    goback: function goback() {
      if (this.$zircle.getPreviousViewName() !== '' && this.$zircle.getBackwardNavigationState() === false && this.$zircle.getRouterState() === false) {
        this.$zircle.goBack();
      } else if (this.$zircle.getPreviousViewName() !== '' && this.$zircle.getBackwardNavigationState() === false && this.$zircle.getRouterState() === true) {
        this.$zircle.setNavigationMode('backward');
        this.$router.back();
      }
    }
  },
  created: function created() {
    this.$zircle.setComponentList(this.views);
  },
  mounted: function mounted() {
    var _this = this;

    // Get window dimension to set the initial width of ui components such as z-panel
    this.$nextTick().then(function () {
      return _this.$zircle.updateDiameters();
    });
    window.addEventListener('resize', function () {
      return _this.$zircle.updateDiameters();
    });
  }
});
;// CONCATENATED MODULE: ./src/components/z-canvas.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_z_canvasvue_type_script_lang_js_ = (z_canvasvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-69.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-69.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-69.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-69.use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/z-canvas.vue?vue&type=style&index=0&id=670e1f73&prod&lang=sass&
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/components/z-canvas.vue?vue&type=style&index=0&id=670e1f73&prod&lang=sass&

;// CONCATENATED MODULE: ./src/components/z-canvas.vue



;


/* normalize component */

var z_canvas_component = normalizeComponent(
  components_z_canvasvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var z_canvas = (z_canvas_component.exports);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/z-view.vue?vue&type=template&id=d334001c&
var z_viewvue_type_template_id_d334001c_render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c('div', {
    staticClass: "z-shape primary",
    class: [_vm.componentType, _vm.shape],
    staticStyle: {
      "overflow": "visible"
    },
    style: _vm.responsive === true ? _vm.styles.main : _vm.zpos.main,
    on: {
      "animationend": _vm.notify,
      "mouseover": function mouseover($event) {
        return _vm.$zircle.allowBackwardNavigation(true);
      },
      "mouseleave": function mouseleave($event) {
        return _vm.$zircle.allowBackwardNavigation(false);
      }
    }
  }, [_vm.$slots['image'] || _vm.imagePath ? _c('div', {
    staticClass: "z-content",
    attrs: {
      "id": _vm.fullView
    }
  }, [_vm.imagePath ? _c('img', {
    attrs: {
      "src": _vm.imagePath,
      "width": "100%",
      "alt": "content custom image"
    }
  }) : _vm._e(), !_vm.imagePath ? _vm._t("image") : _vm._e()], 2) : _vm._e(), _c('section', {
    staticStyle: {
      "opacity": "0"
    },
    style: _vm.animation
  }, [_c('div', {
    staticClass: "z-outer-circle",
    class: [_vm.shape],
    style: _vm.responsive === true ? _vm.styles.plate : _vm.zpos.plate
  }), _vm.scrollBarEnabled ? _c('z-scroll', {
    staticStyle: {
      "overflow": "visible"
    },
    attrs: {
      "scrollVal": _vm.scrollVal
    },
    on: {
      "update:scrollVal": function updateScrollVal($event) {
        _vm.scrollVal = $event;
      },
      "update:scroll-val": function updateScrollVal($event) {
        _vm.scrollVal = $event;
      }
    }
  }) : _vm._e(), _vm.sliderEnabled ? _c('z-slider', {
    attrs: {
      "progress": _vm.progress
    }
  }) : _vm._e(), _vm.label ? _c('div', {
    staticClass: "z-label",
    class: [_vm.shape, _vm.labelPos]
  }, [_c('div', {
    staticClass: "inside"
  }, [_vm._v(" " + _vm._s(_vm.label) + " ")])]) : _vm._e(), _c('div', {
    ref: "maincontent",
    staticClass: "z-content maincontent",
    class: [_vm.shape, _vm.longContent],
    on: {
      "&scroll": function scroll($event) {
        return _vm.scroll.apply(null, arguments);
      }
    }
  }, [_c('div', {
    ref: "ztext"
  }, [_vm._t("default")], 2)]), _vm.$slots['media'] ? _c('div', {
    staticClass: "z-content",
    class: [_vm.shape],
    staticStyle: {
      "z-index": "60"
    }
  }, [_vm._t("media")], 2) : _vm._e(), _vm._t("extension")], 2)]);
};

var z_viewvue_type_template_id_d334001c_staticRenderFns = [];

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.constructor.js
var es_number_constructor = __webpack_require__(9653);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/child-components/z-slider.vue?vue&type=template&id=b74ee264&
var z_slidervue_type_template_id_b74ee264_render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c('svg', {
    staticClass: "z-slider",
    attrs: {
      "viewBox": "0 0 100 100",
      "xmlns": "http://www.w3.org/2000/svg"
    }
  }, [_c('circle', {
    style: [_vm.styles],
    attrs: {
      "r": "51",
      "cx": "50",
      "cy": "50"
    }
  })]);
};

var z_slidervue_type_template_id_b74ee264_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/child-components/z-slider.vue?vue&type=script&lang=js&

/* harmony default export */ var z_slidervue_type_script_lang_js_ = ({
  name: 'z-slider',
  props: ['progress'],
  data: function data() {
    return {
      componentType: this.$options.name
    };
  },
  computed: {
    styles: function styles() {
      var zwidth = this.$parent.size;
      var strokeWidth = 8;

      if (zwidth === 'xxl') {
        strokeWidth = 3;
      } else if (zwidth === 'large' || zwidth === 'xl') {
        strokeWidth = 7;
      } else if (zwidth === 'small') {
        strokeWidth = 9;
      } else if (zwidth === 'xs' || zwidth === 'extrasmall') {
        strokeWidth = 10;
      } else if (zwidth === 'xxs') {
        strokeWidth = 11;
      }

      var circleLength = 2 * Math.PI * 51;
      return {
        transformOrigin: '50% 50%',
        transform: 'rotate(-90deg)',
        strokeDasharray: circleLength,
        strokeDashoffset: circleLength - this.progress * circleLength / 100,
        strokeWidth: strokeWidth
      };
    }
  }
});
;// CONCATENATED MODULE: ./src/components/child-components/z-slider.vue?vue&type=script&lang=js&
 /* harmony default export */ var child_components_z_slidervue_type_script_lang_js_ = (z_slidervue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./src/components/child-components/z-slider.vue





/* normalize component */
;
var z_slider_component = normalizeComponent(
  child_components_z_slidervue_type_script_lang_js_,
  z_slidervue_type_template_id_b74ee264_render,
  z_slidervue_type_template_id_b74ee264_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var z_slider = (z_slider_component.exports);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/child-components/z-scroll.vue?vue&type=template&id=9db4b322&
var z_scrollvue_type_template_id_9db4b322_render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c('section', {
    staticStyle: {
      "border-radius": "50%"
    }
  }, [_c('svg', {
    staticClass: "z-scroll",
    attrs: {
      "viewBox": "0 0 100 100",
      "xmlns": "http://www.w3.org/2000/svg"
    },
    on: {
      "click": function click($event) {
        $event.preventDefault();
        return _vm.point.apply(null, arguments);
      }
    }
  }, [_c('circle', {
    style: _vm.arcStyle,
    attrs: {
      "r": "51",
      "cx": "50",
      "cy": "50"
    }
  })]), _c('svg', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.hidden === false,
      expression: "hidden === false"
    }],
    staticClass: "z-scroll-bar",
    style: _vm.circleStyle,
    attrs: {
      "xmlns": "http://www.w3.org/2000/svg"
    },
    on: {
      "touchstart": function touchstart($event) {
        _vm.drag = true;
      },
      "touchmove": function touchmove($event) {
        $event.preventDefault();
        return _vm.slide.apply(null, arguments);
      },
      "touchend": function touchend($event) {
        _vm.drag = false;
      },
      "mousedown": function mousedown($event) {
        _vm.drag = true;
      },
      "mousemove": function mousemove($event) {
        $event.preventDefault();
        return _vm.slide.apply(null, arguments);
      },
      "mouseup": function mouseup($event) {
        _vm.drag = false;
      }
    }
  }, [_c('circle', {
    staticClass: "z-scroll-handlebar",
    attrs: {
      "r": "10",
      "cx": "20",
      "cy": "20"
    }
  })])]);
};

var z_scrollvue_type_template_id_9db4b322_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/child-components/z-scroll.vue?vue&type=script&lang=js&

/* harmony default export */ var z_scrollvue_type_script_lang_js_ = ({
  props: ['scrollVal'],
  name: 'z-scroll',
  data: function data() {
    return {
      componentType: this.$options.name,
      drag: false,
      hidden: false
    };
  },
  computed: {
    arcStyle: function arcStyle() {
      var circleLength = 2 * Math.PI * 50;
      return {
        transformOrigin: '50% 50%',
        transform: 'rotate(-45deg)',
        strokeDasharray: circleLength - 2,
        strokeDashoffset: -(Math.PI * 100) * ((90 - 360) / 360),
        strokeWidth: '3px',
        fill: 'none'
      };
    },
    position: function position() {
      var zwidth = this.$zircle.getComponentWidth(this.$parent.size) / 2;
      return {
        X: zwidth * Math.cos(this.scrollVal * (Math.PI / 180)),
        Y: zwidth * Math.sin(this.scrollVal * (Math.PI / 180))
      };
    },
    circleStyle: function circleStyle() {
      return {
        transformOrigin: '50% 50%',
        transform: 'translate3d(' + this.position.X + 'px, ' + this.position.Y + 'px, 0px)'
      };
    }
  },
  methods: {
    point: function point(e) {
      var dimensions = this.$el.querySelector('.z-scroll').getBoundingClientRect();
      var centerx = dimensions.width / 2 + dimensions.left;
      var centery = dimensions.height / 2 + dimensions.top;
      var posx = e.x;
      var posy = e.y;
      var deltay = centery - posy;
      var deltax = centerx - posx;
      var tangle = Math.atan2(deltay, deltax) * (180 / Math.PI);
      tangle -= 135;
      if (tangle < 0) tangle = 360 + tangle;
      if (tangle >= 135) tangle = 0;
      if (tangle > 90) tangle = 90;
      tangle = Math.round(tangle) - 45;
      this.$emit('update:scrollVal', tangle);
    },
    slide: function slide(e) {
      if (this.drag === true) {
        e = e.changedTouches ? e.changedTouches[0] : e;
        var dimensions = this.$el.querySelector('.z-scroll').getBoundingClientRect();
        var centerx = dimensions.width / 2 + dimensions.left;
        var centery = dimensions.height / 2 + dimensions.top;
        var posx = e.pageX;
        var posy = e.pageY;
        var deltay = centery - posy;
        var deltax = centerx - posx;
        var tangle = Math.atan2(deltay, deltax) * (180 / Math.PI);
        tangle -= 135;
        if (tangle < 0) tangle = 360 + tangle;
        if (tangle >= 135) tangle = 0;
        if (tangle > 90) tangle = 90;
        tangle = Math.round(tangle) - 45;
        this.$emit('update:scrollVal', tangle);
      }
    }
  }
});
;// CONCATENATED MODULE: ./src/components/child-components/z-scroll.vue?vue&type=script&lang=js&
 /* harmony default export */ var child_components_z_scrollvue_type_script_lang_js_ = (z_scrollvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./src/components/child-components/z-scroll.vue





/* normalize component */
;
var z_scroll_component = normalizeComponent(
  child_components_z_scrollvue_type_script_lang_js_,
  z_scrollvue_type_template_id_9db4b322_render,
  z_scrollvue_type_template_id_9db4b322_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var z_scroll = (z_scroll_component.exports);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/z-view.vue?vue&type=script&lang=js&




/* harmony default export */ var z_viewvue_type_script_lang_js_ = ({
  name: 'z-view',
  props: {
    distance: {
      type: Number,
      default: 0
    },
    angle: {
      type: Number,
      default: 0
    },
    size: {
      type: String,
      default: 'xxl'
    },
    circle: {
      type: [Boolean],
      default: false
    },
    square: {
      type: [Boolean],
      default: false
    },
    label: {
      type: [String, Number]
    },
    labelPos: {
      type: [String],
      default: 'bottom'
    },
    imagePath: {
      type: [String]
    },
    progress: {
      type: Number,
      default: 0
    },
    slider: {
      type: [Boolean],
      default: false
    }
  },
  components: {
    ZScroll: z_scroll,
    ZSlider: z_slider
  },
  data: function data() {
    return {
      componentType: this.$options.name,
      scrollVal: -45,
      zpos: {},
      isMounted: false,
      ffox: false,
      fullView: this.$zircle.getNavigationMode() === 'forward' ? this.$zircle.getCurrentViewName() : this.$zircle.getPastViewName()
    };
  },
  provide: function provide() {
    return {
      view: this.fullView
    };
  },
  computed: {
    shape: function shape() {
      if (this.square) {
        return 'is-square';
      }

      return 'is-circle';
    },
    sliderEnabled: function sliderEnabled() {
      return this.slider === true && this.shape === 'is-circle';
    },
    scrollBarEnabled: function scrollBarEnabled() {
      return this.scrollBar === true && this.shape === 'is-circle';
    },
    position: function position() {
      return this.$zircle.calcViewPosition(this.fullView);
    },
    scrollBar: function scrollBar() {
      var isScrollNeeded = false;

      if (this.isMounted === true && this.fullView === this.$zircle.getCurrentViewName() && this.$refs.ztext.clientHeight > this.$zircle.getComponentWidth(this.size)) {
        isScrollNeeded = true;
      }

      return isScrollNeeded;
    },
    responsive: function responsive() {
      return this.fullView === this.$zircle.getCurrentViewName();
    },
    styles: function styles() {
      var width = this.$zircle.getComponentWidth(this.size);
      return {
        main: {
          width: width + 'px',
          height: width + 'px',
          margin: -width / 2 + 'px 0 0 ' + -width / 2 + 'px',
          transform: 'translate3d(' + this.position.X + 'px, ' + this.position.Y + 'px, 0px) scale(' + this.position.scalei + ')'
        },
        plate: {
          width: width + 74 + 'px',
          height: width + 74 + 'px',
          margin: -((width + 74) / 2) + 'px 0 0 ' + -((width + 74) / 2) + 'px'
        }
      };
    },
    animation: function animation() {
      if (this.fullView === this.$zircle.getCurrentViewName() && this.$zircle.getNavigationMode() === 'forward') {
        return 'opacity: 1; transition: opacity 1000ms linear;';
      } else if (this.fullView === this.$zircle.getCurrentViewName() && this.$zircle.getNavigationMode() !== 'forward') {
        return 'opacity: 1;';
      }

      return 'opacity: 0; transition: opacity 500ms linear;';
    },
    longContent: function longContent() {
      return {
        'overflow-square': this.scrollBar === true && this.shape === 'is-square'
      };
    }
  },
  methods: {
    notify: function notify() {
      if (this.$zircle.getHistoryLength() === 1) this.$zircle.setNavigationMode('iddle');
    },
    scroll: function scroll() {
      if (this.scrollBar === true) {
        var container = this.$refs.maincontent;
        this.scrollVal = -45 + container.scrollTop * 100 / (container.scrollHeight - container.clientHeight) * 86 / 100;
      }
    }
  },
  watch: {
    responsive: function responsive(isResponsive) {
      if (isResponsive) {
        this.zpos = this.styles;
      }
    },
    scrollVal: function scrollVal() {
      if (this.scrollBar === true) {
        var container = this.$refs.maincontent;
        container.scrollTop = (45 + this.scrollVal) * 100 / 86 * (container.scrollHeight - container.clientHeight) / 100;
      }
    }
  },
  mounted: function mounted() {
    this.zpos = this.styles;
    var vm = this;
    setTimeout(function () {
      vm.isMounted = true;
    }, 1000);
  }
});
;// CONCATENATED MODULE: ./src/components/z-view.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_z_viewvue_type_script_lang_js_ = (z_viewvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./src/components/z-view.vue





/* normalize component */
;
var z_view_component = normalizeComponent(
  components_z_viewvue_type_script_lang_js_,
  z_viewvue_type_template_id_d334001c_render,
  z_viewvue_type_template_id_d334001c_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var z_view = (z_view_component.exports);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/z-list.vue?vue&type=template&id=27793ef4&
var z_listvue_type_template_id_27793ef4_render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c('section', {
    staticClass: "z-list"
  }, [_vm._l(_vm.$zircle.getCurrentPage(), function (item, index) {
    return _c('div', {
      key: item[0] + '-' + index
    }, [_vm._t("default", null, {
      "index": index
    }, item)], 2);
  }), _vm.$zircle.getThemeShape() === 'circle' && _vm.$zircle.getNumberOfPages() > 1 ? _vm._l(_vm.$zircle.getNumberOfPages(), function (page, index) {
    return _c('z-pagination', {
      key: index + '_page',
      attrs: {
        "index": index,
        "distance": _vm.distance,
        "angle": (180 - (180 - _vm.$zircle.getNumberOfPages() * 10)) / _vm.$zircle.getNumberOfPages() * (_vm.$zircle.getNumberOfPages() - index) + (180 - (180 - (180 - _vm.$zircle.getNumberOfPages() * 10)) - (180 - (180 - _vm.$zircle.getNumberOfPages() * 10)) / _vm.$zircle.getNumberOfPages()) / 2,
        "active": _vm.$zircle.getCurrentPageIndex()
      },
      on: {
        "mouseover": function mouseover($event) {
          return _vm.$zircle.allowBackwardNavigation(true);
        },
        "mouseleave": function mouseleave($event) {
          return _vm.$zircle.allowBackwardNavigation(false);
        }
      },
      nativeOn: {
        "click": function click($event) {
          return _vm.$zircle.setCurrentPageIndex(index);
        }
      }
    });
  }) : _vm._e()], 2);
};

var z_listvue_type_template_id_27793ef4_staticRenderFns = [];

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.splice.js
var es_array_splice = __webpack_require__(561);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/child-components/z-pagination.vue?vue&type=template&id=2d1af9c4&
var z_paginationvue_type_template_id_2d1af9c4_render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.hidden === false,
      expression: "hidden === false"
    }],
    staticClass: "z-shape is-extension",
    class: [_vm.componentType, _vm.activated, _vm.shape],
    style: _vm.responsive === true ? _vm.styles.main : _vm.zpos.main
  }, [_c('div', {
    staticClass: "z-outer-point",
    class: [_vm.shape],
    style: _vm.responsive === true ? _vm.styles.plate : _vm.zpos.plate
  })]);
};

var z_paginationvue_type_template_id_2d1af9c4_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/child-components/z-pagination.vue?vue&type=script&lang=js&


/* harmony default export */ var z_paginationvue_type_script_lang_js_ = ({
  name: 'z-pagination',
  props: {
    distance: {
      type: Number,
      default: 100
    },
    angle: {
      type: Number,
      default: 0
    },
    size: {
      type: String,
      default: 'xs'
    },
    index: {
      type: Number,
      default: 0
    },
    active: {
      type: Number,
      default: 0
    }
  },
  inject: ['view'],
  data: function data() {
    return {
      componentType: this.$options.name,
      hidden: false,
      zpos: {}
    };
  },
  computed: {
    responsive: function responsive() {
      return this.view === this.$zircle.getCurrentViewName();
    },
    position: function position() {
      return this.$zircle.calcPosition(this);
    },
    activated: function activated() {
      return {
        active: this.active === this.index,
        deactive: this.active < this.index || this.active > this.index
      };
    },
    shape: function shape() {
      if (this.square) {
        return 'is-square';
      }

      return 'is-circle';
    },
    styles: function styles() {
      var zwidth = this.$zircle.getComponentWidth(this.size) / 2;
      return {
        main: {
          width: zwidth + 'px',
          height: zwidth + 'px',
          margin: this.$zircle.getThemeShape() === 'square' ? '' : -(zwidth / 2) + 'px 0 0 ' + -(zwidth / 2) + 'px',
          transform: this.$zircle.getThemeShape() === 'square' ? '' : 'translate3d(' + this.position.X + 'px, ' + this.position.Y + 'px, 0px)'
        },
        plate: {
          width: zwidth + 12 + 'px',
          height: zwidth + 12 + 'px',
          margin: this.$zircle.getThemeShape() === 'square' ? '' : -((zwidth + 12) / 2) + 'px 0 0 ' + -((zwidth + 12) / 2) + 'px'
        }
      };
    }
  },
  watch: {
    responsive: function responsive(isResponsive) {
      if (isResponsive) {
        this.zpos = this.styles;
      }
    }
  },
  mounted: function mounted() {
    this.zpos = this.styles;
  }
});
;// CONCATENATED MODULE: ./src/components/child-components/z-pagination.vue?vue&type=script&lang=js&
 /* harmony default export */ var child_components_z_paginationvue_type_script_lang_js_ = (z_paginationvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./src/components/child-components/z-pagination.vue





/* normalize component */
;
var z_pagination_component = normalizeComponent(
  child_components_z_paginationvue_type_script_lang_js_,
  z_paginationvue_type_template_id_2d1af9c4_render,
  z_paginationvue_type_template_id_2d1af9c4_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var z_pagination = (z_pagination_component.exports);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/z-list.vue?vue&type=script&lang=js&






function chunk(myArray, chunkSize) {
  var res = [];

  while (myArray.length) {
    res.push(myArray.splice(0, chunkSize));
  }

  return res;
}

/* harmony default export */ var z_listvue_type_script_lang_js_ = ({
  name: 'z-list',
  props: {
    size: {
      type: String,
      default: 'xxl'
    },
    items: {
      type: Array,
      required: true
    },
    square: {
      type: Boolean,
      default: false
    },
    perPage: {
      type: [Number],
      default: 5
    }
  },
  inject: ['view'],
  components: {
    ZPagination: z_pagination
  },
  data: function data() {
    return {
      componentType: this.$options.name // fix

    };
  },
  computed: {
    position: function position() {
      return this.$zircle.calcViewPosition(this.$parent.fullView);
    },
    distance: function distance() {
      var distanceInPixels = this.$zircle.getComponentWidth(this.size) + this.$zircle.getComponentWidth('xs') + 10;
      return distanceInPixels * 100 / this.$zircle.getComponentWidth(this.size);
    },
    collectionCopy: function collectionCopy() {
      return this.items.slice(0);
    }
  },
  mounted: function mounted() {
    this.$zircle.setPages(chunk(this.collectionCopy, this.perPage));
  },
  created: function created() {
    this.$zircle.setCurrentPageIndex(0);
  }
});
;// CONCATENATED MODULE: ./src/components/z-list.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_z_listvue_type_script_lang_js_ = (z_listvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./src/components/z-list.vue





/* normalize component */
;
var z_list_component = normalizeComponent(
  components_z_listvue_type_script_lang_js_,
  z_listvue_type_template_id_27793ef4_render,
  z_listvue_type_template_id_27793ef4_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var z_list = (z_list_component.exports);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/z-spot.vue?vue&type=template&id=c53ead30&
var z_spotvue_type_template_id_c53ead30_render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c('div', {
    staticClass: "z-shape is-extension",
    class: [_vm.componentType, _vm.shape, _vm.classes],
    style: _vm.responsive === true ? _vm.styles.main : _vm.zpos.main,
    attrs: {
      "role": _vm.button === true ? 'button' : ''
    },
    on: {
      "mouseover": _vm.spotin,
      "mouseout": _vm.spotout,
      "mousedown": _vm.pulse,
      "touchstart": _vm.pulse,
      "mouseup": function mouseup($event) {
        $event.stopPropagation();
        return _vm.move.apply(null, arguments);
      },
      "click": function click($event) {
        return _vm.$emit('click', $event);
      }
    }
  }, [!_vm.button ? _c('div', {
    ref: "spot",
    staticClass: "z-outer-spot",
    class: [_vm.shape],
    style: _vm.styles.plate
  }) : _vm._e(), _c('div', {
    ref: "pulse",
    staticClass: "z-pulse",
    class: [_vm.shape]
  }), _vm.knob ? _c('z-knob', {
    attrs: {
      "qty": _vm.computedQty,
      "unit": _vm.unit,
      "min": _vm.min,
      "max": _vm.max
    },
    on: {
      "update:qty": function updateQty($event) {
        _vm.computedQty = $event;
      }
    }
  }) : _vm._e(), _vm.slider ? _c('z-slider', {
    attrs: {
      "progress": _vm.progress
    }
  }) : _vm._e(), _vm.label ? _c('div', {
    staticClass: "z-label",
    class: [_vm.shape, _vm.labelPos],
    style: _vm.$zircle.getThemeMode() === 'mode-light-filled' ? 'color: var(--accent-text-and-border-color);' : ''
  }, [_c('div', {
    staticClass: "inside"
  }, [_vm._v(" " + _vm._s(_vm.label) + " "), _vm.pos === 'outside' ? _c('span', [_vm._v(" " + _vm._s(_vm.progressLabel))]) : _vm._e()])]) : _vm._e(), _c('div', {
    staticClass: "z-content",
    class: [_vm.shape]
  }, [_vm.imagePath ? _c('img', {
    attrs: {
      "src": _vm.imagePath,
      "width": "100%",
      "alt": "content custom image"
    }
  }) : _vm._e(), !_vm.imagePath ? _vm._t("image") : _vm._e()], 2), _c('div', {
    staticClass: "z-content",
    class: [_vm.shape],
    staticStyle: {
      "z-index": "10"
    }
  }, [_c('span', {
    staticClass: "overflow"
  }, [_vm.pos === 'inside' || _vm.pos === undefined ? _c('span', [_vm._v(_vm._s(_vm.progressLabel))]) : _vm._e(), _vm._t("default")], 2)]), _vm._t("extension")], 2);
};

var z_spotvue_type_template_id_c53ead30_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/child-components/z-knob.vue?vue&type=template&id=0659ea6d&
var z_knobvue_type_template_id_0659ea6d_render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c('section', [_c('svg', {
    ref: "bar",
    staticClass: "z-range-bar",
    attrs: {
      "viewBox": "0 0 100 100",
      "xmlns": "http://www.w3.org/2000/svg"
    },
    on: {
      "click": function click($event) {
        $event.stopPropagation();
        return _vm.bar.apply(null, arguments);
      }
    }
  }, [_c('circle', {
    style: [_vm.styles],
    attrs: {
      "r": "52",
      "cx": "50",
      "cy": "50"
    }
  })]), _c('svg', {
    staticClass: "z-range-bar-bar",
    style: _vm.circleStyle,
    attrs: {
      "xmlns": "http://www.w3.org/2000/svg"
    },
    on: {
      "touchstart": function touchstart($event) {
        _vm.drag = true;
      },
      "touchmove": function touchmove($event) {
        $event.stopPropagation();
        return _vm.handleBar.apply(null, arguments);
      },
      "touchend": function touchend($event) {
        _vm.drag = false;
      },
      "mousedown": function mousedown($event) {
        _vm.drag = true;
      },
      "mousemove": function mousemove($event) {
        $event.stopPropagation();
        return _vm.handleBar.apply(null, arguments);
      },
      "mouseup": function mouseup($event) {
        _vm.drag = false;
      }
    }
  }, [_c('circle', {
    staticClass: "z-range-bar-handlebar",
    attrs: {
      "r": "8",
      "cx": "20",
      "cy": "20"
    }
  })])]);
};

var z_knobvue_type_template_id_0659ea6d_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/child-components/z-knob.vue?vue&type=script&lang=js&


/* harmony default export */ var z_knobvue_type_script_lang_js_ = ({
  name: 'z-knob',
  props: {
    qty: {
      type: [Number]
    },
    min: {
      type: [Number]
    },
    max: {
      type: [Number]
    },
    pos: {
      type: [String]
    }
  },
  data: function data() {
    return {
      componentType: this.$options.name,
      drag: false,
      angle: 0,
      prevAngle: 0
    };
  },
  computed: {
    position: function position() {
      var diameter = this.$zircle.getComponentWidth(this.$parent.size) / 2;
      return {
        X: (diameter - 3) * Math.cos(this.angle * (Math.PI / 180)),
        Y: (diameter - 3) * Math.sin(this.angle * (Math.PI / 180)),
        arc: Math.PI * 100 * ((this.angle - 360) / 360)
      };
    },
    styles: function styles() {
      var circleLength = 2 * Math.PI * 50;
      return {
        transformOrigin: '50% 50%',
        transform: 'rotate(0deg)',
        strokeDasharray: circleLength,
        strokeDashoffset: -this.position.arc,
        strokeWidth: 11
      };
    },
    circleStyle: function circleStyle() {
      return {
        transformOrigin: '50% 50%',
        transform: 'translate3d(' + this.position.X + 'px, ' + this.position.Y + 'px, 0px)'
      };
    }
  },
  methods: {
    bar: function bar(e) {
      var _this = this;

      e = e.changedTouches ? e.changedTouches[0] : e;
      var dimensions = this.$refs.bar.getBoundingClientRect();
      var centerx = dimensions.width / 2 + dimensions.left;
      var centery = dimensions.height / 2 + dimensions.top;
      var posx = e.pageX;
      var posy = e.pageY;
      var deltay = centery - posy;
      var deltax = centerx - posx;
      var tangle = Math.atan2(deltay, deltax) * (180 / Math.PI);
      tangle -= 180;
      tangle = Math.round(tangle);
      if (tangle < 0) tangle = 360 + tangle;
      var prevAngle = Math.round(this.angle);
      var id = setInterval(function () {
        if (prevAngle > tangle) {
          prevAngle--;
        } else if (prevAngle < tangle) {
          prevAngle++;
        } else {
          clearInterval(id);
        }

        _this.angle = prevAngle;

        _this.$emit('update:qty', Math.round(prevAngle / 360 * (_this.max - _this.min)) + _this.min);
      }, 0);
    },
    handleBar: function handleBar(e) {
      if (this.drag === true) {
        e = e.changedTouches ? e.changedTouches[0] : e;
        var dimensions = this.$refs.bar.getBoundingClientRect();
        var centerx = dimensions.width / 2 + dimensions.left;
        var centery = dimensions.height / 2 + dimensions.top;
        var posx = e.pageX;
        var posy = e.pageY;
        var deltay = centery - posy;
        var deltax = centerx - posx;
        var tangle = Math.atan2(deltay, deltax) * (180 / Math.PI);
        tangle -= 180;
        tangle = Math.round(tangle);
        if (tangle < 0) tangle = 360 + tangle;
        this.angle = tangle;
        this.$emit('update:qty', Math.round(tangle / 360 * (this.max - this.min)) + this.min);
      }
    }
  },
  mounted: function mounted() {
    this.angle = Math.round((this.qty - this.min) * 360 / (this.max - this.min));
  }
});
;// CONCATENATED MODULE: ./src/components/child-components/z-knob.vue?vue&type=script&lang=js&
 /* harmony default export */ var child_components_z_knobvue_type_script_lang_js_ = (z_knobvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./src/components/child-components/z-knob.vue





/* normalize component */
;
var z_knob_component = normalizeComponent(
  child_components_z_knobvue_type_script_lang_js_,
  z_knobvue_type_template_id_0659ea6d_render,
  z_knobvue_type_template_id_0659ea6d_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var z_knob = (z_knob_component.exports);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/z-spot.vue?vue&type=script&lang=js&




/* harmony default export */ var z_spotvue_type_script_lang_js_ = ({
  name: 'z-spot',
  props: {
    distance: {
      type: Number,
      default: 100
    },
    angle: {
      type: Number,
      default: 0
    },
    index: {
      type: Number
    },
    size: {
      type: String,
      default: 'medium'
    },
    circle: {
      type: [Boolean],
      default: false
    },
    square: {
      type: [Boolean],
      default: false
    },
    label: {
      type: [String, Number]
    },
    labelPos: {
      type: [String],
      default: 'bottom'
    },
    imagePath: {
      type: [String]
    },
    progress: {
      type: [Number, Object],
      default: 0
    },
    qty: {
      type: [Number],
      default: 0
    },
    unit: {
      type: [String]
    },
    min: {
      type: [Number],
      default: 0
    },
    max: {
      type: [Number],
      default: 100
    },
    pos: {
      type: [String]
    },
    slider: {
      type: [Boolean],
      default: false
    },
    button: {
      type: [Boolean],
      default: false
    },
    knob: {
      type: [Boolean],
      default: false
    },
    toView: {
      type: [String, Object]
    }
  },
  inject: ['view'],
  components: {
    ZSlider: z_slider,
    ZKnob: z_knob
  },
  data: function data() {
    return {
      componentType: this.$options.name,
      zpos: {},
      innerpos: {},
      extrainfo: ''
    };
  },
  computed: {
    position: function position() {
      var component = {
        componentType: this.componentType,
        distance: this.$parent.componentType === 'z-list' ? this.distanceItem : this.distance,
        angle: this.$parent.componentType === 'z-list' ? this.angleItem : this.angle,
        size: this.size,
        $parent: this.$parent,
        shape: this.$zircle.getThemeShape()
      };
      return this.$zircle.calcPosition(component);
    },
    angleItem: function angleItem() {
      return 360 / this.$zircle.getNumberOfItemsInCurrentPage() * this.index - 90;
    },
    distanceItem: function distanceItem() {
      return this.$zircle.getNumberOfItemsInCurrentPage() === 1 ? 0 : this.distance;
    },
    responsive: function responsive() {
      return this.view === this.$zircle.getCurrentViewName();
    },
    shape: function shape() {
      if (this.square) {
        return 'is-square';
      }

      return 'is-circle';
    },
    sliderEnabled: function sliderEnabled() {
      return this.slider === true && this.shape === 'is-circle';
    },
    knobEnabled: function knobEnabled() {
      return this.knob === true && this.shape === 'is-circle';
    },
    styles: function styles() {
      var width = this.$zircle.getComponentWidth(this.size);
      return {
        main: {
          width: width + 'px',
          height: width + 'px',
          margin: -(width / 2) + 'px 0 0 ' + -(width / 2) + 'px',
          transform: 'translate3d(' + this.position.X + 'px, ' + this.position.Y + 'px, 0px)'
        },
        plate: {
          width: width + 15 + 'px',
          height: width + 15 + 'px',
          margin: -((width + 15) / 2) + 'px 0 0 ' + -((width + 15) / 2) + 'px'
        }
      };
    },
    classes: function classes() {
      return {
        primary: this.$parent.componentType !== 'z-list',
        accent: this.$parent.componentType === 'z-list',
        'z-no-zoom-cursor': this.componentType === 'z-spot' && this.toView === undefined
      };
    },
    progressLabel: function progressLabel() {
      if (this.computedQty) {
        var unit = '';
        unit = this.unit ? this.unit : '';
        return this.qty + '' + unit;
      }

      return '';
    },
    computedQty: {
      get: function get() {
        return this.qty;
      },
      set: function set(newValue) {
        this.$emit('update:qty', newValue);
      }
    }
  },
  watch: {
    responsive: function responsive(isResponsive) {
      if (isResponsive) {
        this.zpos = this.styles;
      }
    }
  },
  methods: {
    pulse: function pulse() {
      var pulse = this.$refs.pulse;
      pulse.classList.add('pulse-animation');
      pulse.addEventListener('animationend', function () {
        pulse.classList.remove('pulse-animation');
      }, false);
    },
    spotin: function spotin() {
      if (this.button === false && this.view === this.$zircle.getCurrentViewName() && this.toView) this.$refs.spot.classList.add('spot-animation');
    },
    spotout: function spotout() {
      if (this.button === false && this.view === this.$zircle.getCurrentViewName() && this.toView) this.$refs.spot.classList.remove('spot-animation');
    },
    move: function move() {
      if (this.toView) {
        this.$zircle.setView(this.toView, {
          position: {
            X: this.position.Xabs,
            Y: this.position.Yabs,
            scale: this.position.scale,
            Xi: this.position.Xi,
            Yi: this.position.Yi,
            scalei: this.position.scalei
          }
        });
      }
    }
  },
  mounted: function mounted() {
    this.zpos = this.styles;
  }
});
;// CONCATENATED MODULE: ./src/components/z-spot.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_z_spotvue_type_script_lang_js_ = (z_spotvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./src/components/z-spot.vue





/* normalize component */
;
var z_spot_component = normalizeComponent(
  components_z_spotvue_type_script_lang_js_,
  z_spotvue_type_template_id_c53ead30_render,
  z_spotvue_type_template_id_c53ead30_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var z_spot = (z_spot_component.exports);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/z-dialog.vue?vue&type=template&id=3cb73980&
var z_dialogvue_type_template_id_3cb73980_render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c('transition', {
    attrs: {
      "name": "z-dialog-transition"
    }
  }, [_c('div', {
    staticClass: "z-shape is-extension primary",
    class: [_vm.componentType, _vm.shape],
    style: _vm.styles.main
  }, [_vm.$slots['image'] || _vm.imagePath ? _c('div', {
    staticClass: "z-content"
  }, [_vm.imagePath ? _c('img', {
    attrs: {
      "src": _vm.imagePath,
      "width": "100%",
      "height": "100%",
      "alt": "content custom image"
    }
  }) : _vm._e(), !_vm.imagePath ? _vm._t("image") : _vm._e()], 2) : _vm._e(), _c('div', {
    staticClass: "z-outer-circle",
    class: [_vm.shape],
    style: _vm.styles.plate
  }), _vm.selfCloseEnabled ? _c('z-slider', {
    attrs: {
      "progress": _vm.progress
    }
  }) : _vm._e(), _vm.scrollBarEnabled ? _c('z-scroll', {
    staticStyle: {
      "overflow": "visible"
    },
    attrs: {
      "scrollVal": _vm.scrollVal
    },
    on: {
      "update:scrollVal": function updateScrollVal($event) {
        _vm.scrollVal = $event;
      },
      "update:scroll-val": function updateScrollVal($event) {
        _vm.scrollVal = $event;
      }
    }
  }) : _vm._e(), _c('div', {
    ref: "maincontent",
    staticClass: "z-content maincontent",
    class: [_vm.shape, _vm.longContent],
    on: {
      "&scroll": function scroll($event) {
        return _vm.scroll.apply(null, arguments);
      }
    }
  }, [_c('div', {
    ref: "ztext"
  }, [_vm._t("default")], 2)]), _vm.$slots['media'] ? _c('div', {
    staticClass: "z-content",
    class: [_vm.shape],
    staticStyle: {
      "z-index": "60"
    }
  }, [_vm._t("media")], 2) : _vm._e(), _vm._t("extension")], 2)]);
};

var z_dialogvue_type_template_id_3cb73980_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/z-dialog.vue?vue&type=script&lang=js&



/* harmony default export */ var z_dialogvue_type_script_lang_js_ = ({
  name: 'z-dialog',
  props: {
    selfClose: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'xxl'
    },
    circle: {
      type: [Boolean],
      default: false
    },
    imagePath: {
      type: [String]
    },
    square: {
      type: [Boolean],
      default: false
    }
  },
  components: {
    ZSlider: z_slider,
    ZScroll: z_scroll
  },
  data: function data() {
    return {
      componentType: this.$options.name,
      progress: 0,
      scrollVal: -45,
      isMounted: false,
      ffox: false
    };
  },
  computed: {
    scrollBarEnabled: function scrollBarEnabled() {
      return this.scrollBar === true && (this.square === false && this.$zircle.getThemeShape() === 'circle' || this.circle === true && this.$zircle.getThemeShape() === 'square');
    },
    scrollBar: function scrollBar() {
      var isScrollNeeded = false;

      if (this.isMounted === true && this.$refs.ztext.clientHeight > this.$zircle.getComponentWidth(this.size)) {
        isScrollNeeded = true;
      }

      return isScrollNeeded;
    },
    longContent: function longContent() {
      return {
        'overflow-square': this.scrollBar === true && this.shape === 'is-square'
      };
    },
    selfCloseEnabled: function selfCloseEnabled() {
      return this.selfClose === true && (this.square === false && this.$zircle.getThemeShape() === 'circle' || this.circle === true && this.$zircle.getThemeShape() === 'square');
    },
    shape: function shape() {
      if (this.square) {
        return 'is-square';
      }

      return 'is-circle';
    },
    styles: function styles() {
      var zwidth = this.$zircle.getComponentWidth(this.size);
      return {
        main: {
          width: zwidth + 50 + 'px',
          height: zwidth + 50 + 'px',
          margin: -((zwidth + 50) / 2) + 'px 0 0 ' + -((zwidth + 50) / 2) + 'px'
        },
        plate: {
          width: zwidth + 180 + 'px',
          height: zwidth + 180 + 'px',
          margin: -((zwidth + 180) / 2) + 'px 0 0 ' + -((zwidth + 180) / 2) + 'px'
        }
      };
    }
  },
  methods: {
    scroll: function scroll() {
      if (this.scrollBar === true) {
        var container = this.$refs.maincontent;
        this.scrollVal = -45 + container.scrollTop * 100 / (container.scrollHeight - container.clientHeight) * 86 / 100;
      }
    }
  },
  watch: {
    scrollVal: function scrollVal() {
      if (this.scrollBar === true) {
        var container = this.$refs.maincontent;
        container.scrollTop = (45 + this.scrollVal) * 100 / 86 * (container.scrollHeight - container.clientHeight) / 100;
      }
    }
  },
  mounted: function mounted() {
    var _this = this;

    setTimeout(function () {
      _this.isMounted = true;
    }, 1000);

    if (this.selfClose) {
      var vm = this;
      this.progress = 5;
      var id = setInterval(function () {
        if (vm.progress >= 100) {
          clearInterval(id);
          vm.$emit('done');
        } else {
          vm.progress++;
        }
      }, 100);
    }
  }
});
;// CONCATENATED MODULE: ./src/components/z-dialog.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_z_dialogvue_type_script_lang_js_ = (z_dialogvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./src/components/z-dialog.vue





/* normalize component */
;
var z_dialog_component = normalizeComponent(
  components_z_dialogvue_type_script_lang_js_,
  z_dialogvue_type_template_id_3cb73980_render,
  z_dialogvue_type_template_id_3cb73980_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var z_dialog = (z_dialog_component.exports);
;// CONCATENATED MODULE: ./src/index.js






var zircle = {
  install: function install(Vue) {
    Object.defineProperty(Vue.prototype, '$zircle', {
      get: function get() {
        return store_store.actions;
      }
    });
    Vue.component('z-canvas', z_canvas);
    Vue.component('z-view', z_view);
    Vue.component('z-list', z_list);
    Vue.component('z-spot', z_spot);
    Vue.component('z-dialog', z_dialog);
  }
};
var GlobalVue = null;

if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof __webpack_require__.g !== 'undefined') {
  GlobalVue = __webpack_require__.g.Vue;
}

if (GlobalVue) {
  GlobalVue.use(zircle);
}

/* harmony default export */ var src_0 = (zircle);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = (src_0);


}();
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=zircle.umd.js.map