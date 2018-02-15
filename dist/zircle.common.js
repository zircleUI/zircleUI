/**
 * Copyright 2017 Juan Martin Muda <martin.muda@gmail.com>
 *
 * http://zircle.io
 *
 * License MIT
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var state = {
  position: {
    X: 0,
    Y: 0,
    scale: 1,
    Xi: 0,
    Yi: 0,
    scalei: 1
  },
  // Navigation
  mode: 'forward',
  isRouterEnabled: false,
  $router: {},
  currentView: '',
  previousView: '',
  pastView: '',
  history: [],
  cache: [],
  lastViewCache: {},
  goBackNav: false,
  // Styles
  zircleWidth: {
    xl: 200,
    l: 70,
    m: 50,
    s: 30,
    xs: 20,
    xxs: 20
  },
  color: 'color--black',
  theme: 'theme--dark',
  // Pagination components
  selectedItem: '',
  currentPage: 0,
  items: [],
  pages: [],
  // z-alert component
  alert: false
};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _global = createCommonjsModule(function (module) {
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
});

var _core = createCommonjsModule(function (module) {
var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
});

var _core_1 = _core.version;

var _aFunction = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

// optional / simple context binding

var _ctx = function (fn, that, length) {
  _aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var _isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var _anObject = function (it) {
  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

var _fails = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

// Thank's IE8 for his funny defineProperty
var _descriptors = !_fails(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

var document$1 = _global.document;
// typeof document.createElement is 'object' in old IE
var is = _isObject(document$1) && _isObject(document$1.createElement);
var _domCreate = function (it) {
  return is ? document$1.createElement(it) : {};
};

var _ie8DomDefine = !_descriptors && !_fails(function () {
  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
});

// 7.1.1 ToPrimitive(input [, PreferredType])

// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var _toPrimitive = function (it, S) {
  if (!_isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var dP = Object.defineProperty;

var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  _anObject(O);
  P = _toPrimitive(P, true);
  _anObject(Attributes);
  if (_ie8DomDefine) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var _objectDp = {
	f: f
};

var _propertyDesc = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var _hide = _descriptors ? function (object, key, value) {
  return _objectDp.f(object, key, _propertyDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] : (_global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? _ctx(out, _global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) _hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
var _export = $export;

var hasOwnProperty = {}.hasOwnProperty;
var _has = function (it, key) {
  return hasOwnProperty.call(it, key);
};

var toString = {}.toString;

var _cof = function (it) {
  return toString.call(it).slice(8, -1);
};

// fallback for non-array-like ES3 and non-enumerable old V8 strings

// eslint-disable-next-line no-prototype-builtins
var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return _cof(it) == 'String' ? it.split('') : Object(it);
};

// 7.2.1 RequireObjectCoercible(argument)
var _defined = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

// to indexed object, toObject with fallback for non-array-like ES3 strings


var _toIobject = function (it) {
  return _iobject(_defined(it));
};

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
var _toInteger = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

// 7.1.15 ToLength

var min = Math.min;
var _toLength = function (it) {
  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

var max = Math.max;
var min$1 = Math.min;
var _toAbsoluteIndex = function (index, length) {
  index = _toInteger(index);
  return index < 0 ? max(index + length, 0) : min$1(index, length);
};

// false -> Array#indexOf
// true  -> Array#includes



var _arrayIncludes = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = _toIobject($this);
    var length = _toLength(O.length);
    var index = _toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var SHARED = '__core-js_shared__';
var store = _global[SHARED] || (_global[SHARED] = {});
var _shared = function (key) {
  return store[key] || (store[key] = {});
};

var id = 0;
var px = Math.random();
var _uid = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

var shared = _shared('keys');

var _sharedKey = function (key) {
  return shared[key] || (shared[key] = _uid(key));
};

var arrayIndexOf = _arrayIncludes(false);
var IE_PROTO = _sharedKey('IE_PROTO');

var _objectKeysInternal = function (object, names) {
  var O = _toIobject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (_has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

// IE 8- don't enum bug keys
var _enumBugKeys = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

// 19.1.2.14 / 15.2.3.14 Object.keys(O)



var _objectKeys = Object.keys || function keys(O) {
  return _objectKeysInternal(O, _enumBugKeys);
};

var f$1 = Object.getOwnPropertySymbols;

var _objectGops = {
	f: f$1
};

var f$2 = {}.propertyIsEnumerable;

var _objectPie = {
	f: f$2
};

// 7.1.13 ToObject(argument)

var _toObject = function (it) {
  return Object(_defined(it));
};

// 19.1.2.1 Object.assign(target, source, ...)





var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
var _objectAssign = !$assign || _fails(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = _toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = _objectGops.f;
  var isEnum = _objectPie.f;
  while (aLen > index) {
    var S = _iobject(arguments[index++]);
    var keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;

// 19.1.3.1 Object.assign(target, source)


_export(_export.S + _export.F, 'Object', { assign: _objectAssign });

var assign = _core.Object.assign;

var assign$2 = createCommonjsModule(function (module) {
module.exports = { "default": assign, __esModule: true };
});

var _Object$assign = unwrapExports(assign$2);

// most Object methods by ES6 should accept primitives



var _objectSap = function (KEY, exec) {
  var fn = (_core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  _export(_export.S + _export.F * _fails(function () { fn(1); }), 'Object', exp);
};

// 19.1.2.14 Object.keys(O)



_objectSap('keys', function () {
  return function keys(it) {
    return _objectKeys(_toObject(it));
  };
});

var keys = _core.Object.keys;

var keys$2 = createCommonjsModule(function (module) {
module.exports = { "default": keys, __esModule: true };
});

var _Object$keys = unwrapExports(keys$2);

function createRoute(path, name, component, params) {
  store$1.state.$router.addRoutes([{ path: path,
    name: name,
    component: component
  }]);
  store$1.actions.setLog('vue-router: route added: ' + name);
  params !== undefined ? store$1.state.$router.push({ name: name, params: params }) : store$1.state.$router.push({ name: name });
}
function findComponent(list, view) {
  return _Object$keys(list).find(function (k) {
    if (k.toLowerCase() === view) {
      return k;
    }
  });
}
var router = {
  getRouterState: function getRouterState() {
    return store$1.state.isRouterEnabled;
  },

  // RouterHooks() is deprecated and will be deleted on zircle 0.5.0. Use setRouter() instead.
  routerHooks: function routerHooks(data) {
    store$1.actions.setLog('Consider use setRouter() instead', 'warn');
    store$1.actions.setRouter(data);
  },
  setRouter: function setRouter(data) {
    store$1.actions.setLog('vue-router enabled');
    // Auto configuration for vue-router
    store$1.state.$router = data.$router;
    store$1.state.isRouterEnabled = true;
    store$1.actions.setViewName(data.initialView.toLowerCase());
    // Add default redirect route to initialView and go to initialView
    store$1.state.$router.onReady(function () {
      var view = data.initialView.toLowerCase();
      store$1.state.$router.addRoutes([{ path: '/', redirect: '/' + view + '--0' }]);
      // 0.3.3 (fix bug init)
      var key = findComponent(data.$options.components, view);
      createRoute('/' + view + '--0', view + '--0', data.$options.components[key]);
    });
    // Router hooks
    store$1.state.$router.beforeEach(function (to, from, next) {
      if (from.name === store$1.state.cache[store$1.state.cache.length - 1].id && to.name !== store$1.state.lastViewCache.id) {
        // Go backward using both: browser navigation arrows or zircle UI
        store$1.actions.setLog('vue-router: Go backward' + to.name);
        store$1.actions.goBack();
        next();
      } else if (to.name === store$1.state.cache[store$1.state.cache.length - 1].id && to.name !== store$1.state.lastViewCache.id) {
        // Check if the route exists
        if (to.matched.length === 0) {
          // If not, add route
          var component = to.name.split('--');
          var key = findComponent(data.$options.components, component[0]);
          if (to.params.id === undefined) {
            createRoute('/' + to.name, to.name, data.$options.components[key]);
          } else {
            createRoute('/' + to.name + '/:id', to.name, data.$options.components[key], to.params);
          }
        } else {
          // If exists, go forward
          store$1.actions.setLog('vue-router: Go forward: ' + to.name);
          store$1.state.lastViewCache = {};
          next();
        }
      } else if (to.name === store$1.state.lastViewCache.id && to.name === store$1.state.cache[store$1.state.cache.length - 1].id) {
        // Just in case browser navigation forward arrow is clicked
        store$1.actions.setLog('vue-router: browser forward arrow was clicked: ' + to.name);
        store$1.state.lastViewCache = {};
        next();
      } else {
        store$1.actions.setLog('Router Error: unable to resolve routes :(', 'error');
        next(false);
      }
    });
  }
};

var position = {
  getCurrentPosition: function getCurrentPosition() {
    return store$1.state.position;
  },
  calcPosition: function calcPosition(component) {
    store$1.actions.setLog('calcPosition() => ' + component.type);
    // Variable declaration
    var scale = 1;
    var scalei = 1;
    var currentX = 0;
    var currentY = 0;
    var currentXi = 0;
    var currentYi = 0;
    var parentPosition = { Xi: 0, Yi: 0, X: 0, Y: 0, scalei: 1, scale: 1 };
    var newPosition = store$1.state.position;
    // Calc position for z-panel (the main view)
    switch (component.type) {
      case 'panel':
        if (store$1.state.mode === 'backward' && store$1.state.cache.length >= 3 && store$1.state.cache[store$1.state.cache.length - 3].id === component.viewID) {
          newPosition = {
            X: store$1.state.cache[store$1.state.cache.length - 3].position.X,
            Xi: store$1.state.cache[store$1.state.cache.length - 3].position.Xi,
            Y: store$1.state.cache[store$1.state.cache.length - 3].position.Y,
            Yi: store$1.state.cache[store$1.state.cache.length - 3].position.Yi,
            scalei: store$1.state.cache[store$1.state.cache.length - 3].position.scalei,
            scale: store$1.state.cache[store$1.state.cache.length - 3].position.scale
          };
        }
        break;
      default:
        // Cal position for other components such as z-scale
        var angle = component.angle;
        var distance = component.distance;
        scale = store$1.state.zircleWidth.xl / store$1.actions.getComponentWidth(component.size);
        scalei = store$1.actions.getComponentWidth(component.size) / store$1.state.zircleWidth.xl;
        distance === 0 ? (currentX = 0, currentY = 0) : (currentX = store$1.state.zircleWidth.xl / 2 * distance / 100 * Math.cos(angle * (Math.PI / 180)), currentY = store$1.state.zircleWidth.xl / 2 * distance / 100 * Math.sin(angle * (Math.PI / 180)));
        currentX > 0 ? currentXi = -Math.abs(Number(currentX)) : currentXi = Math.abs(Number(currentX));
        currentY > 0 ? currentYi = -Math.abs(Number(currentY)) : currentYi = Math.abs(Number(currentY));
        if (component.$parent.type === 'panel') {
          parentPosition = {
            Xi: component.$parent.position.Xi,
            Yi: component.$parent.position.Yi,
            X: component.$parent.position.X,
            Y: component.$parent.position.Y,
            scalei: component.$parent.position.scalei,
            scale: component.$parent.position.scale
          };
        }
        newPosition = {
          X: currentX,
          Y: currentY,
          Xi: parentPosition.Xi + currentXi * parentPosition.scalei,
          Yi: parentPosition.Yi + currentYi * parentPosition.scalei,
          scale: parentPosition.scale * scale,
          scalei: parentPosition.scalei * scalei,
          Xabs: parentPosition.X + currentX * parentPosition.scalei,
          Yabs: parentPosition.Y + currentY * parentPosition.scalei
        };
    }
    return newPosition;
  },
  setAppPos: function setAppPos(data) {
    store$1.actions.setLog('setAppPos() => ' + data.go);
    store$1.state.position = {
      X: data.X,
      Y: data.Y,
      scale: data.scale,
      Xi: data.Xi,
      Yi: data.Yi,
      scalei: data.scalei,
      go: data.go,
      itemID: data.itemID,
      item: data.item
    };
    store$1.actions.setView(data.go);
  }
};

var navigation = {
  getCurrentViewName: function getCurrentViewName() {
    console.log(store$1.state.currentView);
    return store$1.state.currentView;
  },
  getPreviousViewName: function getPreviousViewName() {
    return store$1.state.previousView;
  },
  getPastViewName: function getPastViewName() {
    return store$1.state.pastView;
  },
  getCurrentViewId: function getCurrentViewId() {
    return store$1.state.cache[store$1.state.cache.length - 1].id;
  },
  getPreviousViewId: function getPreviousViewId() {
    return store$1.state.cache[store$1.state.cache.length - 2].id;
  },
  getPastViewId: function getPastViewId() {
    return store$1.state.cache[store$1.state.cache.length - 3].id;
  },
  getHistoryLength: function getHistoryLength() {
    return store$1.state.history.length;
  },
  setNavigationMode: function setNavigationMode(value) {
    if (value === 'forward' || value === 'backward') {
      store$1.state.mode = value;
      store$1.actions.setLog('Navigation mode is ' + value);
    } else {
      store$1.actions.setLog('setNavigationMode() only acepts forward or backward values', 'error');
    }
  },
  getNavigationMode: function getNavigationMode() {
    return store$1.state.mode;
  },
  getBackNavState: function getBackNavState() {
    return store$1.state.goBackNav;
  },
  setBackNav: function setBackNav(value) {
    if (value !== store$1.state.goBackNav) {
      // let state = ''
      // value === true ? state = 'enabled' : state = 'disabled'
      // store.actions.setLog('BackNav is ' + state)
      store$1.state.goBackNav = value;
    }
  },

  // setView() is deprecated and will be deleted on zircle 0.5.0. Use setViewName() instead.
  setView: function setView(view) {
    store$1.actions.setViewName(view);
    store$1.actions.setLog('Consider use setViewName() instead', 'warn');
  },
  setViewName: function setViewName(view) {
    store$1.actions.setLog('setViewName() => current view: ' + view);
    // check if viewname exists in previous or past and rename '_0' or '_1'
    var viewName = view.toLowerCase();
    store$1.actions.setHistory(viewName);
    switch (store$1.state.history.length) {
      case 1:
        store$1.state.previousView = '';
        store$1.state.pastView = '';
        break;
      case 2:
        store$1.state.previousView = store$1.state.history[store$1.state.history.length - 2];
        store$1.state.pastView = '';
        break;
      default:
        store$1.state.previousView = store$1.state.history[store$1.state.history.length - 2];
        store$1.state.pastView = store$1.state.history[store$1.state.history.length - 3];
        break;
    }
    store$1.state.currentView = viewName;
  },
  setHistory: function setHistory(view) {
    store$1.actions.setLog('setHistory() => new view: ' + view);
    // only component with viewName
    if (store$1.state.mode === 'forward') {
      store$1.state.history.push(view);
      var prevViewName = '';
      var pastViewName = '';
      switch (store$1.state.cache.length) {
        case 0:
          var newID = view + '--0';
          break;
        case 1:
          prevViewName = store$1.state.cache[store$1.state.cache.length - 1].id.split('--');
          view === prevViewName[0] ? newID = view + '--' + (Number(prevViewName[1]) + 1) : newID = view + '--0';
          break;
        case 2:
          prevViewName = store$1.state.cache[store$1.state.cache.length - 1].id.split('--');
          pastViewName = store$1.state.cache[store$1.state.cache.length - 2].id.split('--');
          if (view === prevViewName[0]) {
            newID = view + '--' + (Number(prevViewName[1]) + 1);
          } else {
            view === pastViewName[0] ? newID = view + '--' + (Number(pastViewName[1]) + 1) : newID = view + '--0';
          }
          break;
        default:
          var lastViewName = store$1.state.cache[store$1.state.cache.length - 3].id.split('--');
          view === lastViewName[0] ? newID = view + '--' + (Number(prevViewName[1]) + 1) : newID = view + '--0';
          break;
      }
      var cacheView = {
        view: view,
        id: newID,
        position: store$1.state.position
      };
      store$1.state.cache.push(cacheView);
      switch (store$1.state.isRouterEnabled) {
        case true:
          store$1.state.position.itemID === undefined ? store$1.state.$router.push({ name: newID }) : (store$1.state.selectedItem = store$1.state.position.item, store$1.state.$router.push({ name: newID, params: { id: store$1.state.position.itemID.toLowerCase() } }));
          break;
        case false:
          store$1.state.position.item !== undefined ? store$1.state.selectedItem = store$1.state.position.item : '';
          break;
      }
    }
  },
  goBack: function goBack() {
    if (store$1.state.cache.length > 1) {
      store$1.state.history.pop();
      store$1.state.lastViewCache = store$1.state.cache[store$1.state.cache.length - 1];
      store$1.state.cache.pop();
      store$1.state.cache[store$1.state.cache.length - 1].position.go = store$1.state.history[store$1.state.history.length - 1];
      store$1.state.mode = 'backward';
      store$1.actions.setLog('goBack() => ' + store$1.state.history[store$1.state.history.length - 1]);
      store$1.actions.setAppPos(store$1.state.cache[store$1.state.cache.length - 1].position);
    }
  }
};

var responsiveness = {
  getComponentWidth: function getComponentWidth(size) {
    switch (size) {
      case 'extralarge':
      case 'xxl':
        var width = store$1.state.zircleWidth.xl;
        break;
      case 'large':
        width = store$1.state.zircleWidth.l;
        break;
      case 'medium':
        width = store$1.state.zircleWidth.m;
        break;
      case 'small':
        width = store$1.state.zircleWidth.s;
        break;
      case 'extrasmall':
        width = store$1.state.zircleWidth.xs;
        break;
      case 'xxs':
        width = store$1.state.zircleWidth.xxs;
        break;
    }
    return width;
  },
  getDimensions: function getDimensions() {
    // small devices
    if (window.matchMedia('(max-width: 319px)').matches) store$1.state.zircleWidth = { xl: 200, l: 70, m: 50, s: 30, xs: 20, xxs: 20
      // medium
    };if (window.matchMedia('(min-width: 320px)').matches) store$1.state.zircleWidth = { xl: 230, l: 85, m: 65, s: 45, xs: 30, xxs: 20
      // medium - large devices portrait
    };if (window.matchMedia('(min-width: 375px) and (orientation: portrait)').matches) store$1.state.zircleWidth = { xl: 260, l: 90, m: 70, s: 50, xs: 40, xxs: 30
      // medium - large devices landscape
    };if (window.matchMedia('(min-width: 375px) and (orientation: landscape)').matches) store$1.state.zircleWidth = { xl: 270, l: 90, m: 70, s: 50, xs: 40, xxs: 30
      // tablets portrait
    };if (window.matchMedia('(min-width: 768px) and (orientation: portrait) and (min-pixel-ratio: 2)').matches) store$1.state.zircleWidth = { xl: 340, l: 120, m: 100, s: 80, xs: 60, xxs: 40
      // tablets landscape
    };if (window.matchMedia('(min-width: 768px) and (orientation: landscape)').matches) store$1.state.zircleWidth = { xl: 360, l: 120, m: 100, s: 80, xs: 60, xxs: 40
      // desktop or large tablets portrait
    };if (window.matchMedia('(min-width: 992px) and (orientation: portrait)').matches) store$1.state.zircleWidth = { xl: 420, l: 120, m: 100, s: 80, xs: 60, xxs: 40
      // desktop or large tablets landscape
    };if (window.matchMedia('(min-width: 992px) and (orientation: landscape)').matches) store$1.state.zircleWidth = { xl: 420, l: 120, m: 100, s: 80, xs: 60, xxs: 40
      // large desktop
    };if (window.matchMedia('(min-width: 1200px) and (orientation: portrait)').matches) store$1.state.zircleWidth = { xl: 430, l: 130, m: 110, s: 90, xs: 70, xxs: 50
      // xl desktop
    };if (window.matchMedia('(min-width: 1800px)').matches) store$1.state.zircleWidth = { xl: 650, l: 130, m: 110, s: 90, xs: 70, xxs: 50 };
    store$1.actions.setLog('getDimensions() => viewPort resize: z-panel width = ' + store$1.state.zircleWidth.xl);
  }
};

var themes = {
  getCurrentTheme: function getCurrentTheme() {
    return store$1.state.theme;
  },
  getCurrentColor: function getCurrentColor() {
    return store$1.state.color;
  }
};

var debug = {
  setLog: function setLog(msg, type) {
    switch (type) {
      case 'warn':
        var bgColor = 'yellow';
        var color = 'black';
        break;
      case 'error':
        bgColor = 'red';
        color = 'white';
        break;
      default:
        bgColor = 'green';
        color = 'white';
    }
    if (store$1.debug) {
      return console.log('%c z ', 'background: ' + bgColor + '; color:  ' + color + '', msg);
    }
  },
  isDebugEnabled: function isDebugEnabled(value) {
    if (value === true || value === false) {
      store$1.debug = value;
      var state = '';
      value === true ? state = 'enabled. Options: [all], [warnings], [errors]' : state = 'disabled';
      store$1.actions.setLog('Debug is ' + state);
    } else {
      store$1.actions.setLog('setDebug() only acepts true or false values', 'error');
    }
  }
};

var list = {
  getSelectedItem: function getSelectedItem() {
    return store$1.state.selectedItem;
  },
  setPages: function setPages(value) {
    // armar validator por array
    // mover fx chunk here
    store$1.state.pages = value;
  },
  getPages: function getPages() {
    return store$1.state.pages;
  },
  getNumberOfPages: function getNumberOfPages() {
    return store$1.state.pages.length;
  },
  getCurrentPage: function getCurrentPage() {
    return store$1.state.pages[store$1.state.currentPage];
  },
  getCurrentPageIndex: function getCurrentPageIndex() {
    return store$1.state.currentPage;
  },
  setCurrentPageIndex: function setCurrentPageIndex(value) {
    store$1.state.currentPage = value;
  },
  getNumberOfItemsInCurrentPage: function getNumberOfItemsInCurrentPage() {
    return store$1.state.pages[store$1.state.currentPage].length;
  }
};

var alert = {
  setAlert: function setAlert(value) {
    store$1.actions.setLog('setAlert(): ' + value);
    store$1.state.alert = value;
  },
  getAlert: function getAlert() {
    return store$1.state.alert;
  }
};

var actions = _Object$assign({}, router, position, navigation, responsiveness, themes, list, alert, debug);

var store$1 = {
  debug: false,
  state: state,
  actions: actions
};

(function () {
  if (typeof document !== 'undefined') {
    var head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style'),
        css = "";style.type = 'text/css';if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }head.appendChild(style);
  }
})();
var zmixin = {
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
      default: 'small'
    },
    color: {
      type: String,
      default: 'primary'
    },
    gotoview: {
      type: [String, Number]
    }
  },
  computed: {
    position: function position() {
      return this.$zircle.calcPosition(this);
    },
    classes: function classes() {
      return {
        zoom: this.type === 'scale' && this.gotoview !== undefined
      };
    },
    colors: function colors() {
      return this.color;
    }
  }
};

(function () {
  if (typeof document !== 'undefined') {
    var head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style'),
        css = "";style.type = 'text/css';if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }head.appendChild(style);
  }
})();

var zpanel = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "zui main", class: [_vm.classes, _vm.colors], staticStyle: { "overflow": "visible" }, style: _vm.resize === false ? _vm.styles.main : _vm.zpos.main, attrs: { "title": _vm.viewName, "type": "panel" }, on: { "mouseover": function mouseover($event) {
          _vm.$zircle.setBackNav(true);
        }, "mouseleave": function mouseleave($event) {
          _vm.$zircle.setBackNav(false);
        } } }, [_c('div', { staticClass: "plate", style: _vm.resize === false ? _vm.styles.plate : _vm.zpos.plate }), _vm._v(" "), _vm.range === true ? _c('z-range', { attrs: { "progress": _vm.progress } }) : _vm._e(), _vm._v(" "), _vm.scrollBar === true ? _c('z-scroll', { staticStyle: { "overflow": "visible" }, attrs: { "scrollVal": _vm.scrollVal }, on: { "update:scrollVal": function updateScrollVal($event) {
          _vm.scrollVal = $event;
        } } }) : _vm._e(), _vm._v(" "), _vm.slider === true ? _c('z-slider', { attrs: { "progress": _vm.progress } }) : _vm._e(), _vm._v(" "), _c('div', { staticClass: "z-contentbox dashed", style: _vm.styles.background }, [_vm._t("picture"), _vm._v(" "), _c('div', { staticClass: "z-content maindisc", class: [_vm.classesContent], style: _vm.resize === false ? _vm.styles.hideScroll : _vm.zpos.hideScroll, on: { "scroll": _vm.scroll } }, [_c('section', { staticClass: "z-text" }, [_vm._t("default"), _vm._v(" "), _c('span', { staticClass: "bottom" })], 2)])], 2), _vm._v(" "), _vm._t("circles")], 2);
  }, staticRenderFns: [],
  mixins: [zmixin],
  props: {
    progress: {
      type: Number,
      default: 0
    },
    view: {
      type: [String, Number],
      required: true
    },
    range: {
      type: [Boolean],
      default: false
    },
    slider: {
      type: [Boolean],
      default: false
    },
    imgSource: {
      type: String,
      default: ''
    }
  },
  name: 'z-panel',
  data: function data() {
    return {
      type: 'panel',
      scrollBar: false,
      alertar: '',
      scrollVal: -45,
      width: 0,
      img: {},
      resize: false,
      zpos: {},
      viewID: ''
    };
  },

  computed: {
    viewName: function viewName() {
      return this.view.toLowerCase();
    },
    styles: function styles() {
      var width = this.$zircle.getComponentWidth('xxl');
      return {
        main: {
          width: width + 'px',
          height: width + 'px',
          margin: -(width / 2) + 'px 0 0 ' + -(width / 2) + 'px',
          transform: 'translate3d(' + this.position.X + 'px, ' + this.position.Y + 'px, 0px) scale(' + this.position.scalei + ')'
        },
        plate: {
          width: width + 50 + 'px',
          height: width + 50 + 'px',
          margin: -((width + 50) / 2) + 'px 0 0 ' + -((width + 50) / 2) + 'px'
        },
        hideScroll: {
          width: width - 5 + 'px',
          marginLeft: -width * 0.0392 + 3.08 + 'px'
        }
      };
    },
    classesContent: function classesContent() {
      return {
        longtext: this.scrollBar === true
      };
    }
  },
  methods: {
    scroll: function scroll() {
      var container = this.$el.querySelector('.z-content');
      this.scrollVal = -45 + container.scrollTop * 100 / (container.scrollHeight - container.clientHeight) * 86 / 100;
    }
  },
  watch: {
    scrollVal: function scrollVal() {
      var container = this.$el.querySelector('.z-content');
      container.scrollTop = (45 + this.scrollVal) * 100 / 86 * (container.scrollHeight - container.clientHeight) / 100;
    }
  },
  mounted: function mounted() {
    if (this.$el.classList.contains('pastclass')) {
      this.viewID = this.$zircle.getPastViewId();
    }
    var width = this.$zircle.getComponentWidth('xxl');
    this.zpos = {
      main: {
        width: width + 'px',
        height: width + 'px',
        margin: -(width / 2) + 'px 0 0 ' + -(width / 2) + 'px',
        transform: 'translate3d(' + this.position.X + 'px, ' + this.position.Y + 'px, 0px) scale(' + this.position.scalei + ')'
      },
      plate: {
        width: width + 50 + 'px',
        height: width + 50 + 'px',
        margin: -((width + 50) / 2) + 'px 0 0 ' + -((width + 50) / 2) + 'px'
      },
      hideScroll: {
        width: width - 5 + 'px',
        marginLeft: -width * 0.0392 + 3.08 + 'px'
      }
    };
    var container = this.$el.querySelector('.z-content > .z-text'); // guarda con esto que no anda bien
    if (container.clientHeight > width) {
      this.scrollBar = true;
    } else {
      this.scrollBar = false;
    }
  },
  beforeUpdate: function beforeUpdate() {
    if (this.$el.classList.contains('prevclass') || this.$el.classList.contains('pastclass')) {} else {
      this.zpos = this.styles;
    }
  },
  updated: function updated() {
    this.$nextTick(function () {
      if (this.$el.classList.contains('prevclass') || this.$el.classList.contains('pastclass')) {
        this.resize = true;
      } else {
        this.resize = false;
      }
    });
  }
};

(function () {
  if (typeof document !== 'undefined') {
    var head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style'),
        css = "";style.type = 'text/css';if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }head.appendChild(style);
  }
})();

var zscale = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.hidden === false, expression: "hidden === false" }], staticClass: "zui disc", class: [_vm.classes, _vm.colors], style: _vm.resize === false ? _vm.style.main : _vm.zpos.main, attrs: { "title": "z-scale", "type": _vm.type }, on: { "click": function click($event) {
          $event.stopPropagation();_vm.move($event);
        } } }, [_vm.range === true ? _c('z-range', { attrs: { "progress": _vm.progress } }) : _vm._e(), _vm._v(" "), _vm.slider === true ? _c('z-slider', { attrs: { "progress": _vm.progress } }) : _vm._e(), _vm._v(" "), _c('section', { staticClass: "z-content label", staticStyle: { "overflow": "visible" }, style: _vm.resize === false ? _vm.style.label : _vm.zpos.label }, [_vm._t("label")], 2), _vm._v(" "), _c('div', { staticClass: "z-content" }, [_vm._t("picture"), _vm._v(" "), _c('section', [_vm._t("default")], 2)], 2), _vm._v(" "), _vm._t("circles")], 2);
  }, staticRenderFns: [],
  name: 'z-scale',
  mixins: [zmixin],
  props: {
    progress: {
      type: Number,
      default: 70
    },
    range: {
      type: [Boolean],
      default: false
    },
    slider: {
      type: [Boolean],
      default: false
    },
    type: {
      type: String,
      default: 'scale'
    }
  },
  data: function data() {
    return {
      resize: false,
      zpos: {},
      hidden: false
    };
  },

  computed: {
    gotoviewName: function gotoviewName() {
      if (this.gotoview !== undefined) {
        return this.gotoview.toLowerCase();
      }
    },
    style: function style() {
      var zwidth = this.$zircle.getComponentWidth(this.size);
      return {
        main: {
          width: zwidth + 'px',
          height: zwidth + 'px',
          margin: -(zwidth / 2) + 'px 0 0 ' + -(zwidth / 2) + 'px',
          transform: 'translate3d(' + this.position.X + 'px, ' + this.position.Y + 'px, 0px)'
        },
        label: {
          top: zwidth / 2 + 10 + 'px'
        }
      };
    }
  },
  methods: {
    move: function move() {
      if (this.gotoview !== undefined) {
        // Apply moveApp & setNextView
        // seteo el gotoview aca, xq dsp se borra el "this". OJO ver si usar algun hook
        var go = this.gotoviewName;
        var position = {
          X: this.position.Xabs,
          Y: this.position.Yabs,
          scale: this.position.scale,
          Xi: this.position.Xi,
          Yi: this.position.Yi,
          scalei: this.position.scalei,
          go: go
        };
        if (this.$zircle.getHistoryLength() < 6) {
          this.$zircle.setNavigationMode('forward');
          this.$zircle.setAppPos(position);
          var vm = this;
          setTimeout(function () {
            vm.hidden = true;
          }, 800);
        } else {
          console.log('Max level of deep reached');
        }
      } else {
        console.log('gotoview is not defined');
      }
    }
  },
  mounted: function mounted() {
    var zwidth = this.$zircle.getComponentWidth(this.size);
    this.zpos = {
      main: {
        width: zwidth + 'px',
        height: zwidth + 'px',
        margin: -(zwidth / 2) + 'px 0 0 ' + -(zwidth / 2) + 'px',
        transform: 'translate3d(' + this.position.X + 'px, ' + this.position.Y + 'px, 0px)'
      },
      label: {
        top: zwidth / 2 + 10 + 'px'
      }
    };
  },
  beforeUpdate: function beforeUpdate() {
    if (this.$parent.$el.classList.contains('prevclass') || this.$parent.$el.classList.contains('pastclass')) {} else {
      this.zpos = this.style;
    }
  },
  updated: function updated() {
    this.$nextTick(function () {
      if (this.$parent.$el.classList.contains('prevclass') || this.$parent.$el.classList.contains('pastclass')) {
        this.resize = true;
      } else {
        this.resize = false;
        this.hidden = false;
      }
    });
  }
};

(function () {
  if (typeof document !== 'undefined') {
    var head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style'),
        css = "";style.type = 'text/css';if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }head.appendChild(style);
  }
})();

var zitem = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "zui disc", class: [_vm.classes, _vm.colors], style: _vm.resize === false ? _vm.styles.main : _vm.zpos.main, attrs: { "title": "z-item" }, on: { "click": function click($event) {
          $event.stopPropagation();_vm.move($event);
        } } }, [_c('section', { staticClass: "z-content label", staticStyle: { "overflow": "visible" }, style: _vm.resize === false ? _vm.styles.label : _vm.zpos.label }, [_c('span', [_vm._v(_vm._s(_vm.label))])]), _vm._v(" "), _c('div', { staticClass: "z-content" }, [_c('img', { attrs: { "src": _vm.image, "width": "100%", "height": "100%" } }), _vm._v(" "), _c('section')])]);
  }, staticRenderFns: [],
  name: 'z-item',
  props: {
    size: {
      type: String,
      default: 'medium'
    },
    color: {
      default: 'accent'
    },
    label: {
      default: ''
    },
    image: {
      default: ''
    },
    item: {
      default: ''
    },
    id: {
      default: ''
    },
    gotoview: {
      default: 'item'
    },
    angle: {
      type: Number,
      required: true
    }
  },
  data: function data() {
    return {
      type: 'item',
      resize: false,
      zpos: {}
    };
  },

  computed: {
    position: function position() {
      return this.$zircle.calcPosition(this);
    },
    classes: function classes() {
      return {
        zoom: this.type === 'scale' && this.gotoview !== undefined
      };
    },
    colors: function colors() {
      return this.color;
    },
    distance: function distance() {
      return this.$zircle.getNumberOfItemsInCurrentPage() === 1 ? 0 : 60;
    },
    gotoviewName: function gotoviewName() {
      if (this.gotoview !== undefined) {
        return this.gotoview.toLowerCase();
      }
    },
    styles: function styles() {
      var zwidth = this.$zircle.getComponentWidth(this.size);
      return {
        main: {
          width: zwidth + 'px',
          height: zwidth + 'px',
          margin: -(zwidth / 2) + 'px 0 0 ' + -(zwidth / 2) + 'px',
          transform: 'translate3d(' + this.position.X + 'px, ' + this.position.Y + 'px, 0px)'
        },
        label: {
          top: zwidth / 2 + 10 + 'px'
        }
      };
    }
  },
  methods: {
    move: function move() {
      if (this.gotoview !== undefined) {
        var go = this.gotoviewName;
        var position = {
          X: this.position.Xabs,
          Y: this.position.Yabs,
          scale: this.position.scale,
          Xi: this.position.Xi,
          Yi: this.position.Yi,
          scalei: this.position.scalei,
          go: go,
          itemID: this.id,
          item: this.item
        };
        if (this.$zircle.getHistoryLength() < 6) {
          this.$zircle.setNavigationMode('forward');
          this.$zircle.setAppPos(position);
        } else {
          console.log('Max level of deep reached');
        }
      }
    }
  },
  mounted: function mounted() {
    var zwidth = this.$zircle.getComponentWidth(this.size);
    this.zpos = {
      main: {
        width: zwidth + 'px',
        height: zwidth + 'px',
        margin: -(zwidth / 2) + 'px 0 0 ' + -(zwidth / 2) + 'px',
        transform: 'translate3d(' + this.position.X + 'px, ' + this.position.Y + 'px, 0px)'
      },
      label: {
        top: zwidth / 2 + 10 + 'px'
      }
    };
  },
  beforeUpdate: function beforeUpdate() {
    if (this.$parent.$parent.$el.classList.contains('prevclass') || this.$parent.$parent.$el.classList.contains('pastclass')) {} else {
      this.zpos = this.styles;
    }
  },
  updated: function updated() {
    this.$nextTick(function () {
      if (this.$parent.$parent.$el.classList.contains('prevclass') || this.$parent.$parent.$el.classList.contains('pastclass')) {
        this.resize = false;
      } else {
        this.resize = true;
      }
    });
  }
};

(function () {
  if (typeof document !== 'undefined') {
    var head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style'),
        css = " /* This is the style for zircle. To override it use !important */ :root { --light-blue: #5FC9F3; --black: #283237; --purple: #ee305a; --orange: #f7892f; --yellow: #ffca26; --blue: #3e78bb; --green: #69bf66; --red: #ef3c3b; --gray: #7c7e81; } * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); } ::-webkit-scrollbar { display: none; } .color--light-blue { --background-color: #F1F1F1; --primary-color: #5FC9F3; --accent-color: #0D7FAC; --success-color: #52B781; --warning-color: #CFA749; --danger-color: #C76B6F; } .color--black { --background-color: #859ba6; --primary-color: #283237; --accent-color: #000000; --success-color: #418a49; --warning-color: #bf7911; --danger-color: #b73e36; } .color--purple { --background-color: #fdecf0; --primary-color: #ee305a; --accent-color: #7b0a23; --success-color: #7d8953; --warning-color: #fa791b; --danger-color: #f23d41; } .color--orange { --background-color: #fff8f3; --primary-color: #f7892f; --accent-color: #884005; --success-color: #7fa446; --warning-color: #fd940e; --danger-color: #f55834; } .color--yellow { --background-color: #fffcf2; --primary-color: #ffca26; --accent-color: #8c6a00; --success-color: #82b743; --warning-color: #ffa70b; --danger-color: #f76c31; } .color--blue { --background-color: #d4e1f1; --primary-color: #3e78bb; --accent-color: #182e48; --success-color: #489f70; --warning-color: #c58e38; --danger-color: #bd535e; } .color--green { --background-color: #f6fbf6; --primary-color: #69bf66; --accent-color: #2b6329; --success-color: #55b457; --warning-color: #d2a41f; --danger-color: #ca6844; } .color--red { --background-color: #fef8f8; --primary-color: #ef3c3b; --accent-color: #860c0b; --success-color: #7d8d4a; --warning-color: #fa7c12; --danger-color: #f34138; } .color--gray { --background-color: #e4e4e5; --primary-color: #7c7e81; --accent-color: #313233; --success-color: #5aa05f; --warning-color: #d89027; --danger-color: #d0554d; } .theme--light { --background: var(--background-color); --primary: var(--primary-color); --accent: var(--accent-color); --background-card: var(--background-color); --border-card: var(--primary-color); --primary-text: var(--primary-color); } .theme--bold-light { --background: var(--background-color); --primary: var(--primary-color); --accent: var(--accent-color); --background-card: var(--primary-color); --border-card: var(--background-color); --primary-text: var(--background-color); } .theme--dark { --background: var(--primary-color); --primary: var(--background-color); --accent: var(--accent-color); --background-card: var(--primary-color); --border-card: var(--background-color); --primary-text: var(--background-color); } .theme--bold-dark { --background: var(--primary-color); --primary: var(--background-color); --accent: var(--accent-color); --background-card: var(--background-color); --border-card: var(--primary-color); --primary-text: var(--primary-color); } #z-container { position: fixed; height: 100%; width: 100%; background-color: var(--background); color: var(--primary); transition: background-color 1s; overflow: hidden; } div[type=\"panel\"], div[type=\"scale\"], div[type=\"button\"] { transition: background-color 1s; } #z-point { font-family: 'Source Sans Pro', sans-serif; font-size: calc(14px + 1vmax); font-style: normal; -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; position: absolute; top: 50%; left: 50%; perspective: 1000px; text-decoration: none; } .handlebar:hover { cursor: grab; } .handlebar:active { cursor: grabbing; } .zui { overflow: visible; position: absolute; display: block; border-radius: 50%; top: 50%; left: 50%; text-align: center; } .main { z-index: 40; } .disc { z-index: 80; cursor: default; } .zoom { cursor: zoom-in; } .pop { z-index: 500; } .scroll, .slider { position: absolute; overflow: visible; display: block; z-index: 40; fill: none; stroke-opacity: 0.8; } .accent .slider, .accent .scroll { stroke: var(--primary); } .primary .slider, .primary .scroll { stroke: var(--accent); } .accent .scroll2 { fill: var(--primary); } .primary .scroll2 { fill: var(--accent); } .scroll2 { position: absolute; border-radius: 50%; display: block; width: 40px; height: 40px; top: 50%; left: 50%; margin: -20px 0 0 -20px; z-index: 70; } .dashed { border: 2px solid var(--background-card); } .flow { overflow: visible; } .label { font-size: calc(10px + 1vmax); overflow: visible } .z-contentbox { position: absolute; z-index: 50; top: 2%; left: 2%; width: 96%; height: 96%; display: block; border-radius: 50%; background: none; overflow: hidden; } .z-contentbox > img { border-radius: 50%; overflow: hidden; } .z-content { position: absolute; z-index: 0; top: 1%; left: 1%; width: 98%; height: 98%; display: flex; background: none; flex-direction: column; align-items: center; justify-content: center; overflow: hidden; border-radius: 50%; user-select: none; border: 1px solid transparent; } .maindisc { cursor: default; } .longtext { overflow-y: scroll; padding-right: 20px; margin-right: -20px; /* padding-top: 100px; height: 100%; width: 105%; padding-right: 28px; margin-right: -28px; */ } .bottom { position: relative; display: block; width: 1px; height: 1px } .longtext span.bottom { position: relative; display: block; width: 1px; height: 140px } .nodisplay { display: none; } .button { cursor: pointer; } .button:hover { filter: brightness(0.9); } .button:active { filter: brightness(0.4); } .hidden { cursor: zoom-out; } .current { will-change: opacity; } .pastclass { pointer-events: none; cursor: zoom-out; filter: blur(1.5px); } .prevclass { pointer-events: none; cursor: zoom-out; filter: blur(1.5px); } .currclass { pointer-events: auto; animation: appear 800ms linear forwards; will-change: opacity; } @keyframes appear { 0% { opacity: 0; } 20% { opacity: 0; } 80% { opacity: 1; } 100% { opacity: 1; } } .lastclass { animation: disappear 800ms linear forwards; will-change: opacity; } @keyframes disappear { 0% { opacity: 1; } 20% { opacity: 1; } 80% { opacity: 0; } 100% { opacity: 0; } } @keyframes blur { 0% { filter: blur(0px); } 20% { filter: blur(0px); } 60% { filter: blur(1.5px); } 100% { filter: blur(1.5px); } } .prevclass div { cursor: zoom-out; } .background { background-color: var(--background); border: 3px solid var(--primary); color: var(--primary-text); } .accent { border: 3px solid var(--accent); background-color: var(--accent); color: var(--primary-text); } .accent-secondary { filter: invert(100%); } .accent-secondary-border { filter: invert(100%); background-color: transparent; border-width: 1px; } .primary, .default { border: 3px solid var(--border-card); background-color: var(--background-card); color: var(--primary-text); } .success { background-color: var(--success); border: 3px solid var(--success); color: var(--primary-text); } .warning { background-color: var(--warning); border: 3px solid var(--warning); color: var(--primary-text); } .danger { background-color: var(--danger); border: 3px solid var(--danger); color: var(--primary-text); } .light-blue { background-color: var(--light-blue); border: 3px solid var(--light-blue); color: var(--primary-text); } .black { background-color: var(--black); border: 3px solid var(--black); color: var(--primary-text); } .purple { background-color: var(--purple); border: 3px solid var(--purple); color: var(--primary-text); } .orange { background-color: var(--orange); border: 3px solid var(--orange); color: var(--primary-text); } .yellow { background-color: var(--yellow); border: 3px solid var(--yellow); color: var(--primary-text); } .blue { background-color: var(--blue); border: 3px solid var(--blue); color: var(--primary-text); } .green { background-color: var(--green); border: 3px solid var(--green); color: var(--primary-text); } .red { background-color: var(--red); border: 3px solid var(--red); color: var(--primary-text); } .gray { background-color: var(--gray); border: 3px solid var(--gray); color: var(--primary-text); } .plate, .popup-plate { position: absolute; z-index: 0; top: 50%; left: 50%; border-radius: 50%; border: 1px dashed var(--primary); opacity: 0.3; overflow: hidden; } .navplate { position: absolute; z-index: 90; top: 50%; left: 50%; border-radius: 50%; opacity: 1; overflow: hidden; } .alert { z-index: 100; background: var(--background); border: 1px solid var(--primary); opacity: 0.3; overflow: hidden; } .border { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 50%; border: 3px solid var(--background); } div[title=\"z-item\"], div[title=\"z-dotnav\"] { cursor: zoom-in; } div[title=\"z-dotnav\"]:hover { cursor: grab; } div[title=\"z-dotnav\"]:active { cursor: grabbing; } .prevclass section[title=\"z-list\"] { pointer-events: none; } ::placeholder { color: inherit; } input { font-family: 'Source Sans Pro', sans-serif; font-size: calc(14px + 1vmax); font-style: normal; -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; margin-top: 20px; width: 100%; background: none; appearance: none; box-shadow: none; border: none; color: inherit; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: inherit; background: inherit; outline: none; text-align: center; } .z-alert-enter-active, .z-alert-leave-active { transition: transform 0.3s; position: absolute; top: 50%; left: 50%; z-index: 500; } .z-alert-enter, .z-alert-leave-to { transform: scale(0); } ";style.type = 'text/css';if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }head.appendChild(style);
  }
})();

/* eslint-disable no-new */
var zcanvas = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: [_vm.$zircle.getCurrentTheme(), _vm.$zircle.getCurrentColor()], style: [_vm.$zircle.getPreviousViewName() !== '' ? { cursor: 'zoom-out' } : {}], attrs: { "id": "z-container" }, on: { "click": function click($event) {
          $event.stopPropagation();_vm.goback($event);
        } } }, [_c('div', { attrs: { "id": "z-point" } }, [_vm._t("default")], 2)]);
  }, staticRenderFns: [],
  props: {
    isStandalone: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      store: store$1
    };
  },

  methods: {
    goback: function goback() {
      if (this.$zircle.getPreviousViewName() !== '' && this.$zircle.getBackNavState() === false) {
        if (this.$zircle.getRouterState() === false) {
          this.$zircle.goBack();
        } else {
          this.$router.back();
        }
      }
    }
  },
  mounted: function mounted() {
    var vue = this;
    // Get window dimension to set the initial width of ui components such as z-panel
    this.$zircle.getDimensions();
    window.addEventListener('resize', function (event) {
      // On resize change the width of ui components
      vue.$zircle.getDimensions();
    });
  }
};

(function () {
  if (typeof document !== 'undefined') {
    var head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style'),
        css = "";style.type = 'text/css';if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }head.appendChild(style);
  }
})();

/* eslint-disable no-new */
var zviewmanager = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('z-transition', [_vm.$zircle.getHistoryLength() >= 3 ? _c(_vm.pastView, { key: _vm.$zircle.getPastViewId(), tag: "component", staticClass: "pastclass" }) : _vm._e(), _vm._v(" "), _vm.$zircle.getHistoryLength() >= 2 ? _c(_vm.previousView, { key: _vm.$zircle.getPreviousViewId(), tag: "component", staticClass: "prevclass" }) : _vm._e(), _vm._v(" "), _vm.$zircle.getRouterState() === false && _vm.$zircle.getHistoryLength() >= 1 ? _c(_vm.currentView, { key: _vm.$zircle.getCurrentViewId(), tag: "component", class: _vm.$zircle.getNavigationMode() === 'forward' ? 'currclass' : '' }) : _vm._e(), _vm._v(" "), _vm.$zircle.getRouterState() === true && _vm.$zircle.getHistoryLength() >= 1 ? _c('router-view', { key: _vm.$zircle.getCurrentViewId(), class: _vm.$zircle.getNavigationMode() === 'forward' ? 'currclass' : '' }) : _vm._e()], 1);
  }, staticRenderFns: [],
  name: 'z-view-manager',
  props: {
    list: {
      type: Object,
      required: true
    }
  },
  computed: {
    currentView: function currentView() {
      var vm = this;
      var key = _Object$keys(this.list).find(function (k) {
        if (k.toLowerCase() === vm.$zircle.getCurrentViewName()) {
          return k;
        }
      });
      if (this.$zircle.getRouterState() === false) {
        return this.list[key];
      }
    },
    previousView: function previousView() {
      var vm = this;
      var key = _Object$keys(this.list).find(function (k) {
        if (k.toLowerCase() === vm.$zircle.getPreviousViewName()) {
          return k;
        }
      });
      return this.list[key];
    },
    pastView: function pastView() {
      var vm = this;
      var key = _Object$keys(this.list).find(function (k) {
        if (k.toLowerCase() === vm.$zircle.getPastViewName()) {
          return k;
        }
      });
      return this.list[key];
    }
  },
  mounted: function mounted() {}
};

(function () {
  if (typeof document !== 'undefined') {
    var head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style'),
        css = "";style.type = 'text/css';if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }head.appendChild(style);
  }
})();
var ztransition = {
  functional: true,
  render: function render(createElement, context) {
    var data = {
      props: {
        name: 'zuit',
        css: false,
        tag: 'section'
      },
      on: {
        enter: function enter(el, done) {
          var point = document.getElementById('z-point');
          if (context.parent.$zircle.getNavigationMode() === 'forward') {
            point.style.willChange = 'transform';
            point.style.transform = 'scale(' + context.parent.$zircle.getCurrentPosition().scale + ') translate3d(' + context.parent.$zircle.getCurrentPosition().Xi + 'px, ' + context.parent.$zircle.getCurrentPosition().Yi + 'px, 0px)';
            point.style.transition = 'transform 800ms ease-in-out';
            done();
          } else {
            el.style.opacity = 1;
            done();
          }
        },
        afterEnter: function afterEnter(el) {
          var point = document.getElementById('z-point');
          point.style.willChange = '';
        },
        beforeLeave: function beforeLeave(el) {},
        leave: function leave(el, done) {
          var point = document.getElementById('z-point');
          if (context.parent.$zircle.getNavigationMode() === 'forward') {
            done();
          } else {
            point.style.willChange = 'transform';
            point.style.transform = 'scale(' + context.parent.$zircle.getCurrentPosition().scale + ') translate3d(' + context.parent.$zircle.getCurrentPosition().Xi + 'px, ' + context.parent.$zircle.getCurrentPosition().Yi + 'px, 0px)';
            point.style.transition = 'transform 800ms ease-in-out';
            el.classList.add('lastclass');
            setTimeout(function () {
              done();
            }, 600);
          }
        },
        afterLeave: function afterLeave(el) {
          var point = document.getElementById('z-point');
          point.style.willChange = '';
        }
      }
    };
    return createElement('transition-group', data, context.children);
  }
};

(function () {
  if (typeof document !== 'undefined') {
    var head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style'),
        css = "";style.type = 'text/css';if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }head.appendChild(style);
  }
})();

var zalert = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('transition', { attrs: { "name": "z-alert" } }, [_c('div', { staticClass: "zui pop", class: [_vm.classes, _vm.colors], style: _vm.styles.main, attrs: { "type": "alert" } }, [_c('z-slider', { attrs: { "progress": _vm.progress } }), _vm._v(" "), _c('div', { staticClass: "z-popup-plate", style: _vm.styles.plate }), _vm._v(" "), _c('div', { staticClass: "z-contentbox dashed" }, [_c('div', { staticClass: "z-content" }, [_c('section', [_vm._t("default")], 2)])]), _vm._v(" "), _vm._t("circles")], 2)]);
  }, staticRenderFns: [],
  mixins: [zmixin],
  name: 'z-alert',
  data: function data() {
    return {
      type: 'alert',
      scrollBar: false,
      progress: 1
    };
  },

  computed: {
    styles: function styles() {
      var zwidth = this.$zircle.getComponentWidth('xxl');
      return {
        main: {
          width: zwidth + 50 + 'px',
          height: zwidth + 50 + 'px',
          margin: -((zwidth + 50) / 2) + 'px 0 0 ' + -((zwidth + 50) / 2) + 'px'
        },
        plate: {
          width: zwidth + 150 + 'px',
          height: zwidth + 150 + 'px',
          margin: -((zwidth + 150) / 2) + 'px 0 0 ' + -((zwidth + 150) / 2) + 'px'
        }
      };
    }
  },
  methods: {
    close: function close() {
      this.progress = 100;
      this.$zircle.setAlert(false);
    }
  },
  mounted: function mounted() {
    var id = setInterval(frame, 100);
    var vm = this;
    function frame() {
      if (vm.progress >= 100) {
        clearInterval(id);
        vm.progress = 1;
        vm.close();
      } else {
        vm.progress++;
      }
    }
  }
};

(function () {
  if (typeof document !== 'undefined') {
    var head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style'),
        css = "";style.type = 'text/css';if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }head.appendChild(style);
  }
})();

var zbutton = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "zui disc button", class: [_vm.classes, _vm.colors], style: _vm.style.main, attrs: { "title": "z-button", "type": "button" } }, [_c('div', { staticClass: "z-content" }, [_vm._t("default")], 2), _vm._v(" "), _c('section', { staticClass: "z-content label", style: _vm.style.label }, [_vm._t("label")], 2), _vm._v(" "), _vm._t("circles")], 2);
  }, staticRenderFns: [],
  mixins: [zmixin],
  name: 'z-button',
  data: function data() {
    return {
      type: 'button'
    };
  },

  computed: {
    style: function style() {
      var zwidth = this.$zircle.getComponentWidth(this.size);
      return {
        main: {
          width: zwidth + 'px',
          height: zwidth + 'px',
          margin: -(zwidth / 2) + 'px 0 0 ' + -(zwidth / 2) + 'px',
          transform: 'translate3d(' + this.position.X + 'px, ' + this.position.Y + 'px, 0px)'
        },
        label: {
          top: zwidth / 2 + 10 + 'px',
          fontSize: '14px',
          overflow: 'visible'
        }
      };
    }
  }
};

(function () {
  if (typeof document !== 'undefined') {
    var head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style'),
        css = "";style.type = 'text/css';if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }head.appendChild(style);
  }
})();

var zslider = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('svg', { staticClass: "slider", attrs: { "viewBox": "0 0 100 100", "xmlns": "http://www.w3.org/2000/svg" } }, [_c('circle', { style: [_vm.styles], attrs: { "r": "50", "cx": "50", "cy": "50" } })]);
  }, staticRenderFns: [],
  mixins: [zmixin],
  props: ['progress'],
  name: 'z-slider',
  data: function data() {
    return {
      type: 'slider',
      drag: false,
      anglex: 0,
      duration: 0.05
    };
  },

  computed: {
    // getComponentWidth(this.size)
    styles: function styles() {
      var zwidth = this.$parent.size;
      if (zwidth === 'extralarge') {
        var strokeWidth = 3;
      } else if (zwidth === 'large') {
        strokeWidth = 7;
      } else if (zwidth === 'medium') {
        strokeWidth = 8;
      } else if (zwidth === 'small') {
        strokeWidth = 9;
      } else if (zwidth === 'xs' || zwidth === 'extrasmall') {
        strokeWidth = 10;
      } else if (zwidth === 'xxs') {}
      if (this.$parent.type === 'panel' || this.$parent.type === 'alert') {
        strokeWidth = 3;
      }
      var circleLength = 2 * Math.PI * 50;
      return {
        transformOrigin: '50% 50%',
        transform: 'rotate(-90deg)',
        // transition: 'stroke-dashoffset .3s ease-in-out',
        strokeDasharray: circleLength,
        // strokeDashoffset: circleLength,
        strokeDashoffset: -(Math.PI * 100) * ((this.progress - 100) / 100), // ((100 - this.progress) / 100) * circleLength,
        strokeWidth: strokeWidth
      };
    }
  }
};

(function () {
  if (typeof document !== 'undefined') {
    var head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style'),
        css = "";style.type = 'text/css';if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }head.appendChild(style);
  }
})();

var zrange = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('section', { attrs: { "type": _vm.type } }, [_c('svg', { staticClass: "scroll", attrs: { "viewBox": "0 0 100 100", "xmlns": "http://www.w3.org/2000/svg" }, on: { "click": _vm.point } }, [_c('circle', { style: [_vm.styles], attrs: { "r": "50", "cx": "50", "cy": "50" } })]), _vm._v(" "), _c('svg', { directives: [{ name: "show", rawName: "v-show", value: _vm.hidden === false, expression: "hidden === false" }], staticClass: "scroll2", style: [_vm.classesContent3], attrs: { "xmlns": "http://www.w3.org/2000/svg" }, on: { "touchstart": function touchstart($event) {
          _vm.drag = true;
        }, "touchmove": function touchmove($event) {
          $event.preventDefault();_vm.slide1($event);
        }, "touchend": function touchend($event) {
          _vm.drag = false;
        }, "mousedown": function mousedown($event) {
          _vm.drag = true;
        }, "mousemove": _vm.slide1, "mouseup": function mouseup($event) {
          _vm.drag = false;
        } } }, [_c('circle', { staticClass: "handlebar", attrs: { "r": "8", "cx": "20", "cy": "20" } })]), _vm._v(" "), _c('div', { staticClass: "z-content" }, [_vm._v(" " + _vm._s(Math.round(_vm.anglex / 360 * 100, 0)) + " ")])]);
  }, staticRenderFns: [],
  mixins: [zmixin],
  props: ['progress'],
  name: 'z-range',
  data: function data() {
    return {
      type: 'range',
      drag: false,
      anglex: this.progress * 360 / 100,
      duration: '0s',
      previousAngle: 0,
      hidden: false
    };
  },

  computed: {
    positionr: function positionr() {
      var zwidth = this.$zircle.getComponentWidth(this.$parent.size);
      if (zwidth === 'extralarge') {
        var dimension = this.state.zircleWidth.xl;
        var strokeWidth = 3;
      } else if (zwidth === 'large') {
        dimension = this.state.zircleWidth.l;
        strokeWidth = 7;
      } else if (zwidth === 'medium') {
        dimension = this.state.zircleWidth.m;
        strokeWidth = 8;
      } else if (zwidth === 'small') {
        dimension = this.state.zircleWidth.s;
        strokeWidth = 9;
      } else if (zwidth === 'xs' || zwidth === 'extrasmall') {
        dimension = this.state.zircleWidth.xs;
        strokeWidth = 10;
      } else if (zwidth === 'xxs') {
        dimension = this.state.zircleWidth.xxs;
      }
      if (this.$parent.type === 'panel') {
        dimension = this.state.zircleWidth.xl;
        strokeWidth = 3;
      }
      return {
        X: dimension / 2 * Math.cos(this.anglex * (Math.PI / 180)),
        Y: dimension / 2 * Math.sin(this.anglex * (Math.PI / 180)),
        arc: Math.PI * 100 * ((this.anglex - 360) / 360),
        strokeWidth: strokeWidth
      };
    },
    styles: function styles() {
      // progress circle
      var circleLength = 2 * Math.PI * 50;
      // progress circle
      return {
        transformOrigin: '50% 50%',
        transform: 'rotate(0deg)',
        strokeDasharray: circleLength,
        // strokeDashoffset: circleLength,
        strokeDashoffset: -this.positionr.arc,
        strokeWidth: this.positionr.strokeWidth
      };
    },
    classesContent3: function classesContent3() {
      return {
        transformOrigin: '50% 50%',
        transform: 'translate3d(' + this.positionr.X + 'px, ' + this.positionr.Y + 'px, 0px)'
      };
    }
  },
  methods: {
    point: function point(e) {
      e = e.changedTouches ? e.changedTouches[0] : e;
      var dimensions = this.$el.querySelector('.scroll').getBoundingClientRect();
      var centerx = dimensions.width / 2 + dimensions.left;
      var centery = dimensions.height / 2 + dimensions.top;
      var posx = e.pageX;
      var posy = e.pageY;
      var deltay = centery - posy;
      var deltax = centerx - posx;
      var tangle = Math.atan2(deltay, deltax) * (180 / Math.PI);
      tangle -= 180;
      tangle = Math.round(tangle);
      // console.log(tangle)
      if (tangle < 0) {
        tangle = 360 + tangle;
      }
      var previousAngle = this.anglex;
      var vm = this;
      var id = setInterval(frame, 0);
      function frame() {
        if (previousAngle === tangle) {
          clearInterval(id);
        } else {
          if (previousAngle > tangle) {
            previousAngle--;
          } else {
            previousAngle++;
          }
          vm.anglex = previousAngle;
        }
      }
    },
    slide1: function slide1(e) {
      if (this.drag === true) {
        e = e.changedTouches ? e.changedTouches[0] : e;
        var dimensions = this.$el.querySelector('.scroll').getBoundingClientRect();
        var centerx = dimensions.width / 2 + dimensions.left;
        var centery = dimensions.height / 2 + dimensions.top;
        var posx = e.pageX;
        var posy = e.pageY;
        var deltay = centery - posy;
        var deltax = centerx - posx;
        var tangle = Math.atan2(deltay, deltax) * (180 / Math.PI);
        tangle -= 180;
        tangle = Math.round(tangle);
        if (tangle < 0) {
          tangle = 360 + tangle;
        }
        this.anglex = tangle;
      }
    }
  },
  updated: function updated() {
    this.$nextTick(function () {
      if (this.$parent.$el.classList.contains('prevclass') || this.$parent.$el.classList.contains('pastclass')) {
        this.hidden = true;
      } else {
        this.hidden = false;
      }
    });
  }
};

(function () {
  if (typeof document !== 'undefined') {
    var head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style'),
        css = "";style.type = 'text/css';if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }head.appendChild(style);
  }
})();

var zscroll = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('section', [_c('svg', { staticClass: "scroll", attrs: { "viewBox": "0 0 100 100", "xmlns": "http://www.w3.org/2000/svg" }, on: { "click": _vm.point } }, [_c('circle', { style: [_vm.styles2], attrs: { "r": "50", "cx": "50", "cy": "50" } })]), _vm._v(" "), _c('svg', { directives: [{ name: "show", rawName: "v-show", value: _vm.hidden === false, expression: "hidden === false" }], staticClass: "scroll2", style: _vm.classesContent3, attrs: { "xmlns": "http://www.w3.org/2000/svg" }, on: { "touchstart": function touchstart($event) {
          _vm.drag = true;
        }, "touchmove": function touchmove($event) {
          $event.preventDefault();_vm.slide($event);
        }, "touchend": function touchend($event) {
          _vm.drag = false;
        }, "mousedown": function mousedown($event) {
          _vm.drag = true;
        }, "mousemove": _vm.slide, "mouseup": function mouseup($event) {
          _vm.drag = false;
        } } }, [_c('circle', { staticClass: "handlebar", attrs: { "r": "10", "cx": "20", "cy": "20" } })])]);
  }, staticRenderFns: [],
  mixins: [zmixin],
  props: ['scrollVal'],
  name: 'z-scroll',
  data: function data() {
    return {
      type: 'scroll',
      drag: false,
      hidden: false
    };
  },

  computed: {
    styles2: function styles2() {
      // progress circle
      var circleLength = 2 * Math.PI * 50;
      // progress circle
      return {
        transformOrigin: '50% 50%',
        transform: 'rotate(-45deg)',
        strokeDasharray: circleLength,
        // strokeDashoffset: circleLength,
        strokeDashoffset: -(Math.PI * 100) * ((90 - 360) / 360),
        strokeWidth: 3
      };
    },
    position: function position() {
      var zwidth = this.$zircle.getComponentWidth('xxl') / 2;
      return {
        X: (zwidth - 3) * Math.cos(this.scrollVal * (Math.PI / 180)),
        Y: (zwidth - 3) * Math.sin(this.scrollVal * (Math.PI / 180))
      };
    },
    classesContent3: function classesContent3() {
      return {
        transformOrigin: '50% 50%',
        transform: 'translate3d(' + this.position.X + 'px, ' + this.position.Y + 'px, 0px)'
      };
    }
  },
  methods: {
    point: function point(e) {
      var dimensions = this.$el.querySelector('.scroll').getBoundingClientRect();
      var centerx = dimensions.width / 2 + dimensions.left;
      var centery = dimensions.height / 2 + dimensions.top;
      var posx = e.x;
      var posy = e.y;
      var deltay = centery - posy;
      var deltax = centerx - posx;
      var tangle = Math.atan2(deltay, deltax) * (180 / Math.PI);
      tangle -= 135;
      if (tangle < 0) {
        tangle = 360 + tangle;
      }
      if (tangle >= 135) {
        tangle = 0;
      }
      if (tangle > 90) {
        tangle = 90;
      }
      tangle = Math.round(tangle) - 45;
      this.$emit('update:scrollVal', tangle);
    },
    slide: function slide(e) {
      if (this.drag === true) {
        e = e.changedTouches ? e.changedTouches[0] : e;
        var dimensions = this.$el.querySelector('.scroll').getBoundingClientRect();
        var centerx = dimensions.width / 2 + dimensions.left;
        var centery = dimensions.height / 2 + dimensions.top;
        var posx = e.pageX;
        var posy = e.pageY;
        var deltay = centery - posy;
        var deltax = centerx - posx;
        var tangle = Math.atan2(deltay, deltax) * (180 / Math.PI);
        tangle -= 135;
        if (tangle < 0) {
          tangle = 360 + tangle;
        }
        if (tangle >= 135) {
          tangle = 0;
        }
        if (tangle > 90) {
          tangle = 90;
        }
        tangle = Math.round(tangle) - 45;
        this.$emit('update:scrollVal', tangle);
      }
    }
  },
  updated: function updated() {
    this.$nextTick(function () {
      if (this.$parent.$el.classList.contains('prevclass') || this.$parent.$el.classList.contains('pastclass')) {
        this.hidden = true;
      } else {
        this.hidden = false;
      }
    });
  }
};

(function () {
  if (typeof document !== 'undefined') {
    var head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style'),
        css = "";style.type = 'text/css';if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }head.appendChild(style);
  }
})();

function chunk(myArray, chunkSize) {
  var res = [];
  while (myArray.length) {
    res.push(myArray.splice(0, chunkSize));
  }
  return res;
}
var zlist = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('section', { attrs: { "title": "z-list" } }, [_vm._l(_vm.$zircle.getCurrentPage(), function (item, index) {
      return _vm._t("default", null, { item: item, angle: 360 / _vm.$zircle.getNumberOfItemsInCurrentPage() * index - 90 });
    }), _vm._v(" "), _vm._l(_vm.$zircle.getPages(), function (page, index) {
      return _c('z-dotnav', { key: index, attrs: { "size": "xxs", "color": "accent", "index": index, "distance": 112, "angle": (180 - (180 - _vm.$zircle.getNumberOfPages() * 10)) / _vm.$zircle.getNumberOfPages() * (_vm.$zircle.getNumberOfPages() - index) + (180 - (180 - (180 - _vm.$zircle.getNumberOfPages() * 10)) - (180 - (180 - _vm.$zircle.getNumberOfPages() * 10)) / _vm.$zircle.getNumberOfPages()) / 2, "active": _vm.$zircle.getCurrentPageIndex() }, nativeOn: { "mouseover": function mouseover($event) {
            _vm.$zircle.setBackNav(true);
          }, "mouseleave": function mouseleave($event) {
            _vm.$zircle.setBackNav(false);
          }, "click": function click($event) {
            _vm.$zircle.setCurrentPageIndex(index);
          } } });
    })], 2);
  }, staticRenderFns: [],
  name: 'z-list',
  mixins: [zmixin],
  props: {
    collection: {
      type: Array
    },
    perPage: {
      type: [Number]
    },
    color: {
      type: String
    }
  },
  data: function data() {
    return {
      type: 'panel',
      viewName: 'test'
    };
  },
  mounted: function mounted() {
    // this.$zircle.setNumberOfPages(chunk(this.collection, this.perPage))
    this.$zircle.setPages(chunk(this.collection, this.perPage));
  }
};

(function () {
  if (typeof document !== 'undefined') {
    var head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style'),
        css = "";style.type = 'text/css';if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }head.appendChild(style);
  }
})();

var zdotnav = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.hidden === false, expression: "hidden === false" }], staticClass: "zui disc", class: [_vm.classes, _vm.colors, _vm.activated], style: _vm.styles.main, attrs: { "title": "z-dotnav", "type": _vm.type } }, [_c('div', { staticClass: "navplate", style: _vm.styles.plate })]);
  }, staticRenderFns: [],
  name: 'z-page',
  mixins: [zmixin],
  props: {
    type: {
      type: String,
      default: 'pagination'
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
  data: function data() {
    return {
      hidden: false
    };
  },

  computed: {
    position: function position() {
      return this.$zircle.calcPosition(this);
    },
    activated: function activated() {
      return {
        'accent-secondary': this.active === this.index,
        'accent-secondary-border': this.active < this.index || this.active > this.index
      };
    },
    styles: function styles() {
      var zwidth = this.$zircle.getComponentWidth(this.size) / 3;
      return {
        main: {
          width: zwidth + 'px',
          height: zwidth + 'px',
          margin: -(zwidth / 2) + 'px 0 0 ' + -(zwidth / 2) + 'px',
          transform: 'translate3d(' + this.position.X + 'px, ' + this.position.Y + 'px, 0px)'
        },
        plate: {
          width: zwidth + 10 + 'px',
          height: zwidth + 10 + 'px',
          margin: -((zwidth + 10) / 2) + 'px 0 0 ' + -((zwidth + 10) / 2) + 'px'
        }
      };
    }
  },
  updated: function updated() {
    this.$nextTick(function () {
      if (this.$parent.$parent.$el.classList.contains('prevclass') || this.$parent.$parent.$el.classList.contains('pastclass')) {
        this.hidden = true;
      } else {
        this.hidden = false;
      }
    });
  }
};

var zircle = {
  install: function install(Vue, options) {
    Object.defineProperty(Vue.prototype, '$zircle', {
      get: function get() {
        return store$1.actions;
      }
    });
    Vue.component('z-canvas', zcanvas);
    Vue.component('z-view-manager', zviewmanager);
    Vue.component('z-panel', zpanel);
    Vue.component('z-scale', zscale);
    Vue.component('z-dotnav', zdotnav);
    Vue.component('z-list', zlist);
    Vue.component('z-slider', zslider);
    Vue.component('z-item', zitem);
    Vue.component('z-range', zrange);
    Vue.component('z-scroll', zscroll);
    Vue.component('z-transition', ztransition);
    Vue.component('z-alert', zalert);
    Vue.component('z-button', zbutton);
  }
};

var GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(zircle);
}

exports['default'] = zircle;
