module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "+xUi");
/******/ })
/************************************************************************/
/******/ ({

/***/ "+rLv":
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__("dyZX").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "+xUi":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _setPublicPath__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("HrLf");
/* harmony import */ var _setPublicPath__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_setPublicPath__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _entry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("tjUo");


/* harmony default export */ __webpack_exports__["default"] = (_entry__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]);



/***/ }),

/***/ "/e88":
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),

/***/ "0/R4":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "1TsA":
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "2OiF":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "40yZ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"/Users/tincho/nestorm/node_modules/.cache/vue-loader","cacheIdentifier":"02bea4b2-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/z-dialog.vue?vue&type=template&id=c03b0450
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":"z-dialog-transition"}},[_c('div',{staticClass:"z-shape is-extension primary",class:[_vm.componentType],style:(_vm.styles.main)},[(_vm.timer)?_c('z-slider',{attrs:{"progress":_vm.progress}}):_vm._e(),_c('div',{staticClass:"z-outer-circle",style:(_vm.styles.plate)}),_c('div',{staticClass:"z-content"},[_vm._t("default")],2),_vm._t("extension")],2)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/z-dialog.vue?vue&type=template&id=c03b0450

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.function.name.js
var es6_function_name = __webpack_require__("f3/d");

// EXTERNAL MODULE: ./src/components/child-components/z-slider.vue + 4 modules
var z_slider = __webpack_require__("DokW");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/components/z-dialog.vue?vue&type=script&lang=js

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var z_dialogvue_type_script_lang_js = ({
  name: 'z-dialog',
  props: {
    selfClose: {
      type: Boolean,
      default: false
    }
  },
  components: {
    ZSlider: z_slider["a" /* default */]
  },
  data: function data() {
    return {
      componentType: this.$options.name,
      progress: 0
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
          width: zwidth + 180 + 'px',
          height: zwidth + 180 + 'px',
          margin: -((zwidth + 180) / 2) + 'px 0 0 ' + -((zwidth + 180) / 2) + 'px'
        }
      };
    }
  },
  mounted: function mounted() {
    if (this.selfClose) {
      var vm = this;
      var id = setInterval(function () {
        if (vm.progress >= 101) {
          clearInterval(id);
          vm.$emit('done');
        } else {
          vm.progress += 10;
        }
      }, 300);
    }
  }
});
// CONCATENATED MODULE: ./src/components/z-dialog.vue?vue&type=script&lang=js
 /* harmony default export */ var components_z_dialogvue_type_script_lang_js = (z_dialogvue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("KHd+");

// CONCATENATED MODULE: ./src/components/z-dialog.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_z_dialogvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var z_dialog = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ "4R4u":
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "6FMO":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("0/R4");
var isArray = __webpack_require__("EWmC");
var SPECIES = __webpack_require__("K0xU")('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),

/***/ "91GP":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__("XKFU");

$export($export.S + $export.F, 'Object', { assign: __webpack_require__("czNK") });


/***/ }),

/***/ "A91R":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"/Users/tincho/nestorm/node_modules/.cache/vue-loader","cacheIdentifier":"02bea4b2-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/z-canvas.vue?vue&type=template&id=7e87f6bb
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"z-canvas",class:[_vm.classes, _vm.$zircle.getTheme(), _vm.$zircle.getThemeMode()],style:([_vm.$zircle.getPreviousViewName() !== '' ? {cursor: 'zoom-out'} : {}]),attrs:{"id":"z-container"},on:{"click":function($event){$event.stopPropagation();return _vm.goback($event)}}},[_c('div',{ref:"zoom",style:(_vm.zoom),attrs:{"id":"z-zoomable-layer"},on:{"transitionend":_vm.notify}},[_c('z-view-manager')],1)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/z-canvas.vue?vue&type=template&id=7e87f6bb

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"/Users/tincho/nestorm/node_modules/.cache/vue-loader","cacheIdentifier":"02bea4b2-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/child-components/z-view-manager.vue?vue&type=template&id=4d70a21d
var z_view_managervue_type_template_id_4d70a21d_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition-group',{attrs:{"name":_vm.$zircle.getNavigationMode() === 'forward' ? 'z-next' : 'z-prev',"tag":"section"}},[_vm._l((_vm.views),function(view){return _c(view.component,{key:view.name,tag:"component",class:{
      'is-current-view': _vm.$zircle.getCurrentViewName() === view.name && _vm.$zircle.getRouterState() === false,
      'is-previous-view': _vm.$zircle.getPreviousViewName() === view.name,
      'is-past-view': _vm.$zircle.getPastViewName() === view.name
    }})}),(_vm.$zircle.getRouterState() === true && _vm.$zircle.getHistoryLength() >= 1)?_c('router-view',{key:_vm.$zircle.getCurrentViewName(),staticClass:"is-current-view"}):_vm._e()],2)}
var z_view_managervue_type_template_id_4d70a21d_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/child-components/z-view-manager.vue?vue&type=template&id=4d70a21d

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/components/child-components/z-view-manager.vue?vue&type=script&lang=js
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* eslint-disable */
/* harmony default export */ var z_view_managervue_type_script_lang_js = ({
  name: 'z-view-manager',
  computed: {
    views: function views() {
      return this.$zircle.getRouterState() === false ? this.$zircle.getHistory().slice(-3) : this.$zircle.getHistory().slice(-3, -1);
    }
  }
});
// CONCATENATED MODULE: ./src/components/child-components/z-view-manager.vue?vue&type=script&lang=js
 /* harmony default export */ var child_components_z_view_managervue_type_script_lang_js = (z_view_managervue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("KHd+");

// CONCATENATED MODULE: ./src/components/child-components/z-view-manager.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  child_components_z_view_managervue_type_script_lang_js,
  z_view_managervue_type_template_id_4d70a21d_render,
  z_view_managervue_type_template_id_4d70a21d_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var z_view_manager = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/components/z-canvas.vue?vue&type=script&lang=js
//
//
//
//
//
//
//
//
//
//
//
//

/* eslint-disable no-new */

/* harmony default export */ var z_canvasvue_type_script_lang_js = ({
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
      var pos = {};
      this.$zircle.getHistoryLength() === 0 ? pos = {
        X: 0,
        Y: 0,
        Xi: 0,
        Yi: 0,
        scale: 1,
        scalei: 1
      } : pos = this.$zircle.getCurrentPosition();
      return {
        transform: 'scale(' + pos.scale + ') translate3d(' + pos.Xi + 'px, ' + pos.Yi + 'px, 0px)',
        transition: 'transform 1000ms ease-in 150ms'
      };
    },
    classes: function classes() {
      return {
        'is-full-mode': this.$zircle.getAppMode() === 'full',
        'is-embedded-mode': this.$zircle.getAppMode() === 'embedded'
      };
    }
  },
  methods: {
    notify: function notify() {
      this.$zircle.setNavigationMode('');
    },
    goback: function goback() {
      if (this.$zircle.getPreviousViewName() !== '' && this.$zircle.getBackwardNavigationState() === false) {
        if (this.$zircle.getRouterState() === false) {
          this.$zircle.goBack();
        } else {
          this.$router.back();
        }
      }
    }
  },
  created: function created() {
    this.$zircle.setComponentList(this.views);
  },
  mounted: function mounted() {
    var vm = this; // Get window dimension to set the initial width of ui components such as z-panel

    this.$zircle.getDimensions();
    window.addEventListener('resize', function (event) {
      // On resize change the width of ui components
      vm.$zircle.getDimensions();
    });
  }
});
// CONCATENATED MODULE: ./src/components/z-canvas.vue?vue&type=script&lang=js
 /* harmony default export */ var components_z_canvasvue_type_script_lang_js = (z_canvasvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/components/z-canvas.vue?vue&type=style&index=0&lang=sass
var z_canvasvue_type_style_index_0_lang_sass = __webpack_require__("vUk8");

// CONCATENATED MODULE: ./src/components/z-canvas.vue






/* normalize component */

var z_canvas_component = Object(componentNormalizer["a" /* default */])(
  components_z_canvasvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var z_canvas = __webpack_exports__["a"] = (z_canvas_component.exports);

/***/ }),

/***/ "Afnz":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("LQAc");
var $export = __webpack_require__("XKFU");
var redefine = __webpack_require__("KroJ");
var hide = __webpack_require__("Mukb");
var Iterators = __webpack_require__("hPIQ");
var $iterCreate = __webpack_require__("QaDb");
var setToStringTag = __webpack_require__("fyDq");
var getPrototypeOf = __webpack_require__("OP3Y");
var ITERATOR = __webpack_require__("K0xU")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "B6RA":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("i7/w");
var external_commonjs_vue_commonjs2_vue_root_Vue_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_vue_commonjs2_vue_root_Vue_);

// CONCATENATED MODULE: ./src/store/state.js

var state = new external_commonjs_vue_commonjs2_vue_root_Vue_default.a({
  data: {
    // app Mode
    appMode: 'full',
    // navigation
    navigationMode: 'forward',
    isRouterEnabled: false,
    router: {},
    history: [],
    backwardNavigation: false,
    componentList: {},
    // look & feel
    diameters: {
      xxl: 200,
      xl: 124,
      l: 76,
      m: 47,
      s: 29,
      xs: 18
    },
    appStyle: {
      theme: 'theme-blue',
      mode: 'mode-dark'
    },
    // pagination components
    currentPage: 0,
    items: [],
    pages: [],
    params: '',
    // debug
    debug: false
  }
});
/* harmony default export */ var store_state = (state);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.assign.js
var es6_object_assign = __webpack_require__("91GP");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.function.name.js
var es6_function_name = __webpack_require__("f3/d");

// CONCATENATED MODULE: ./src/store/modules/router.js


var router = {
  getRouterState: function getRouterState() {
    return store_store.state.isRouterEnabled;
  },
  setRouterHooks: function setRouterHooks() {
    store_store.state.router.beforeEach(function (to, from, next) {
      if (store_store.actions.getNavigationMode() === 'forward' && store_store.state.history.length >= 1) {
        store_store.actions.setLog('VueRouter: zoom-in to ' + to.name);
        next();
      } else {
        if (store_store.state.history.length > 1) {
          store_store.actions.goBack();
          store_store.actions.setLog('VueRouter: zoom-out to ' + to.name);
          next();
        }
      }
    });
  }
};
/* harmony default export */ var modules_router = (router);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.number.constructor.js
var es6_number_constructor = __webpack_require__("xfY5");

// CONCATENATED MODULE: ./src/store/modules/position.js



function calcCoords(distance, angle, parentSize) {
  var X = 0;
  var Y = 0;
  var Xi = 0;
  var Yi = 0;

  if (distance !== 0) {
    X = store_store.actions.getComponentWidth(parentSize) / 2 * distance / 100 * Math.cos(angle * (Math.PI / 180));
    Y = store_store.actions.getComponentWidth(parentSize) / 2 * distance / 100 * Math.sin(angle * (Math.PI / 180));
    X > 0 ? Xi = -Math.abs(Number(X)) : Xi = Math.abs(Number(X));
    Y > 0 ? Yi = -Math.abs(Number(Y)) : Yi = Math.abs(Number(Y));
  }

  return {
    X: X,
    Y: Y,
    Xi: Xi,
    Yi: Yi
  };
}

var position_position = {
  getCurrentPosition: function getCurrentPosition() {
    return store_store.state.history[store_store.state.history.length - 1].position;
  },
  getPreviousPosition: function getPreviousPosition() {
    if (store_store.state.history[store_store.state.history.length - 2]) {
      return store_store.state.history[store_store.state.history.length - 2].position;
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
  },
  getPastPosition: function getPastPosition() {
    if (store_store.state.history[store_store.state.history.length - 3]) {
      return store_store.state.history[store_store.state.history.length - 3].position;
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
  },
  calcViewPosition: function calcViewPosition(viewName) {
    store_store.actions.setLog('calcViewPosition() ' + viewName);
    return store_store.actions.getCurrentViewName() === viewName ? store_store.actions.getCurrentPosition() : store_store.actions.getPastPosition();
  },
  calcPosition: function calcPosition(component) {
    store_store.actions.setLog('calcPosition() => ' + component.componentType); // Variable declaration

    var parentPosition = {
      Xi: 0,
      Yi: 0,
      X: 0,
      Y: 0,
      scalei: 1,
      scale: 1
    };
    var newCoords = calcCoords(component.distance, component.angle, component.$parent.size);
    if (component.$parent.componentType === 'z-view' || component.$parent.componentType === 'z-list' || component.$parent.componentType === 'z-spot') parentPosition = {
      Xi: component.$parent.position.Xi,
      Yi: component.$parent.position.Yi,
      X: component.$parent.position.X,
      Y: component.$parent.position.Y,
      scalei: component.$parent.position.scalei,
      scale: component.$parent.position.scale
    };
    var newPosition = {
      X: newCoords.X,
      Y: newCoords.Y,
      Xi: parentPosition.Xi + newCoords.Xi * parentPosition.scalei,
      Yi: parentPosition.Yi + newCoords.Yi * parentPosition.scalei,
      scale: parentPosition.scale * store_store.state.diameters.xxl / store_store.actions.getComponentWidth(component.size),
      scalei: parentPosition.scalei * store_store.actions.getComponentWidth(component.size) / store_store.state.diameters.xxl,
      Xabs: parentPosition.X + newCoords.X * parentPosition.scalei,
      Yabs: parentPosition.Y + newCoords.Y * parentPosition.scalei
    };
    return newPosition;
  }
};
/* harmony default export */ var modules_position = (position_position);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.find.js
var es6_array_find = __webpack_require__("dRSK");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.iterator.js
var es6_array_iterator = __webpack_require__("yt8O");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.keys.js
var es6_object_keys = __webpack_require__("RW0V");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
var web_dom_iterable = __webpack_require__("rGqo");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.split.js
var es6_regexp_split = __webpack_require__("KKXr");

// CONCATENATED MODULE: ./src/store/modules/navigation.js









function retrieveViewName(pos) {
  var viewName = '';

  if (store_store.state.history.length >= pos) {
    viewName = store_store.state.history[store_store.state.history.length - pos].name;
  }

  return viewName;
}

function papa(view, position, params) {
  return store_store.state.history.push({
    name: view.name,
    position: position,
    params: params,
    component: store_store.actions.resolveComponent(store_store.actions.getComponentList(), view.name)
  });
}

function transformViewName(view) {
  view = view.toLowerCase();
  var count = 0;

  for (var i = 1; i <= store_store.state.history.length; i++) {
    if (store_store.state.history[store_store.state.history.length - i].name.split('--')[0] === view) {
      count += 1;
    }
  }

  return view + '--' + count;
}

function createRoute(path, name, component) {
  store_store.state.router.addRoutes([{
    path: path,
    name: name,
    component: component
  }]);
  store_store.actions.setLog('VueRouter: route added ' + name, component);
}

function parseView(data) {
  if (typeof data === 'string') {
    var name = transformViewName(data);
    var route = '/' + name;

    if (store_store.state.isRouterEnabled && store_store.state.router.resolve(route).route.matched[0] === undefined) {
      createRoute(route, name, store_store.actions.resolveComponent(store_store.actions.getComponentList(), name));
    }
  } else {
    name = transformViewName(data.name);
    var params = data.params;
    var paramPath = '';
    Object.keys(params).forEach(function (key) {
      paramPath += '/' + key + '/:' + key;
    });
    var path = '/' + name + paramPath;
    route = {
      name: name,
      params: data.params
    };

    if (store_store.state.isRouterEnabled && store_store.state.router.resolve(route).route.matched[0] === undefined) {
      createRoute(path, name, store_store.actions.resolveComponent(store_store.actions.getComponentList(), name));
    }
  }

  return {
    name: name,
    route: route
  };
}

var navigation = {
  resolveComponent: function resolveComponent(list, view) {
    view = view.split('--')[0];
    var key = Object.keys(list).find(function (k) {
      if (k.toLowerCase() === view) return k;
    });

    if (key) {
      return list[key];
    } else {
      // create 404
      return {
        template: "<z-view name=\"".concat(view, "\">\n        <h1>404</h1>\n        '<b>").concat(view, "</b>' not found. <br>\n        Check view's name in your component var or props.name\n        </z-view>")
      };
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
    if (value === 'forward' || value === 'backward' || value === '') {
      store_store.state.navigationMode = value;
      if (value === '') value = 'iddle';
      store_store.actions.setLog('Navigation mode is ' + value);
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
  setView: function setView(data, options) {
    if (store_store.state.history.length < 6) {
      var view = parseView(data);
      var position = {};
      !options ? position = {
        X: 0,
        Y: 0,
        scale: 1,
        Xi: 0,
        Yi: 0,
        scalei: 1
      } : position = options.position;
      papa(view, position, view.route.params);
      store_store.actions.setNavigationMode('forward');
      view.route && store_store.state.isRouterEnabled === true ? store_store.state.router.push(view.route) : store_store.state.params = view.route.params;
    } else {
      store_store.actions.setLog('Max zoom level reached');
    }
  },
  goBack: function goBack() {
    if (store_store.state.history.length > 1) {
      store_store.actions.setNavigationMode('backward');
      store_store.state.history.pop();
      store_store.state.isRouterEnabled === true ? store_store.state.params = '' : store_store.state.params = store_store.state.history[store_store.state.history.length - 1].params;
      store_store.actions.setLog('goBack() => ' + store_store.state.history[store_store.state.history.length - 1].name);
    }
  }
};
/* harmony default export */ var modules_navigation = (navigation);
// CONCATENATED MODULE: ./src/store/modules/responsiveness.js
 // armar document.getElementById('foo').offsetWidth para cuando zrcle este embedded. para que tome por referencia al canvas o %

var mediaQuery = [{
  // small devices
  media: window.matchMedia('(max-width: 319px)'),
  width: {
    xxl: 200,
    xl: 124,
    l: 76,
    m: 47,
    s: 29,
    xs: 18,
    xxs: 9
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
    xs: 21,
    xxs: 10
  }
}, {
  // medium - large devices portrait
  media: window.matchMedia('(min-width: 375px) and (orientation: portrait)'),
  width: {
    xxl: 260,
    xl: 161,
    l: 99,
    m: 61,
    s: 38,
    xs: 23,
    xxs: 11
  }
}, {
  // medium - large devices landscape
  media: window.matchMedia('(min-width: 375px) and (orientation: landscape)'),
  width: {
    xxl: 270,
    xl: 167,
    l: 103,
    m: 64,
    s: 39,
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
    s: 50,
    xs: 31,
    xxs: 14
  }
}, {
  // tablets landscape
  media: window.matchMedia('(min-width: 768px) and (orientation: landscape)'),
  width: {
    xxl: 360,
    xl: 222,
    l: 138,
    m: 85,
    s: 53,
    xs: 32,
    xxs: 15
  }
}, {
  // desktop or large tablets portrait
  media: window.matchMedia('(min-width: 992px) and (orientation: portrait)'),
  width: {
    xxl: 420,
    xl: 260,
    l: 160,
    m: 99,
    s: 61,
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
    m: 99,
    s: 61,
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
    xs: 41,
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
    xs: 41,
    xxs: 20
  }
}];
var responsiveness = {
  getComponentWidth: function getComponentWidth(size) {
    var sizes = size.toLowerCase();

    switch (sizes) {
      case 'xxl':
        var width = store_store.state.diameters.xxl;
        break;

      case 'extralarge':
      case 'xl':
        width = store_store.state.diameters.xl;
        break;

      case 'large':
      case 'l':
        width = store_store.state.diameters.l;
        break;

      case 'medium':
      case 'm':
        width = store_store.state.diameters.m;
        break;

      case 'small':
      case 's':
        width = store_store.state.diameters.s;
        break;

      case 'extrasmall':
      case 'xs':
        width = store_store.state.diameters.xs;
        break;

      case 'xxs':
        width = store_store.state.diameters.xxs;
        break;
    }

    return width;
  },
  getDimensions: function getDimensions() {
    if (store_store.actions.getAppMode() === 'full') {
      for (var i = 0; i < mediaQuery.length; i++) {
        if (mediaQuery[i].media.matches) store_store.state.diameters = mediaQuery[i].width;
      }

      store_store.actions.setLog('getDimensions() at appMode full. z-view new diameter: ' + store_store.state.diameters.xxl);
    } else if (store_store.actions.getAppMode() === 'embedded') {
      var vp = document.getElementById('z-container').offsetWidth;

      if (vp <= 319) {
        store_store.state.diameters = mediaQuery[0].width;
      } else if (vp >= 320 && vp <= 374) {
        store_store.state.diameters = mediaQuery[1].width;
      } else if (vp >= 375 && vp <= 767) {
        store_store.state.diameters = mediaQuery[2].width;
      } else if (vp >= 768 && vp <= 991) {
        store_store.state.diameters = mediaQuery[4].width;
      } else if (vp >= 992 && vp <= 1199) {
        store_store.state.diameters = mediaQuery[6].width;
      } else if (vp >= 1200 && vp <= 1799) {
        store_store.state.diameters = mediaQuery[8].width;
      } else if (vp >= 1800) {
        store_store.state.diameters = mediaQuery[9].width;
      }

      store_store.actions.setLog('getDimensions() at appMode embedded. z-view new diameter: ' + store_store.state.diameters.xxl);
    }
  }
};
/* harmony default export */ var modules_responsiveness = (responsiveness);
// CONCATENATED MODULE: ./src/store/modules/themes.js

var themes = {
  getTheme: function getTheme() {
    return store_store.state.appStyle.theme;
  },
  getThemeMode: function getThemeMode() {
    return store_store.state.appStyle.mode;
  }
};
/* harmony default export */ var modules_themes = (themes);
// CONCATENATED MODULE: ./src/store/modules/debug.js

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

    if (store_store.state.debug) {
      if (msg === 'Navigation mode is forward' && store_store.actions.getHistoryLength() === 1) {
        console.groupCollapsed('%c Z ', 'background: gray; color:  white', 'Initial view'); // eslint-disable-line no-console
      } else if (msg === 'Navigation mode is forward' && store_store.actions.getHistoryLength() >= 1) {
        console.groupCollapsed('%c Z ', 'background: gray; color:  white', 'Zoom-in to new view'); // eslint-disable-line no-console
      } else if (msg === 'Navigation mode is backward') {
        console.groupCollapsed('%c Z ', 'background: gray; color:  white', 'Zoom-out to previous view'); // eslint-disable-line no-console
      }

      console.log('%c z ', 'background: ' + bgColor + '; color:  ' + color + '', msg); // eslint-disable-line no-console

      if (msg === 'Navigation mode is iddle') {
        console.groupEnd(); // eslint-disable-line no-console
      }
    }
  },
  getState: function getState() {
    return store_store.state.$data;
  }
};
/* harmony default export */ var modules_debug = (debug);
// CONCATENATED MODULE: ./src/store/modules/list.js

var list_list = {
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
/* harmony default export */ var modules_list = (list_list);
// CONCATENATED MODULE: ./src/store/modules/app.js

var app = {
  getAppMode: function getAppMode() {
    return store_store.state.appMode;
  },
  config: function config(_config) {
    if (_config.debug === true || _config.debug === false) {
      store_store.state.debug = _config.debug;
    }

    if (store_store.state.debug === true) {
      store_store.actions.setLog('config:');
      store_store.actions.setLog('- Debug enabled');
    }

    if (_config.mode === 'full' || _config.mode === 'embedded') {
      store_store.state.appMode = _config.mode;
      store_store.actions.setLog('- Mode: ' + _config.mode);
    }

    if (_config.style.theme) {
      store_store.state.appStyle.theme = 'theme-' + _config.style.theme;
      store_store.actions.setLog('- Theme: ' + _config.style.theme);
    }

    if (_config.style.mode) {
      store_store.state.appStyle.mode = 'mode-' + _config.style.mode;
      store_store.actions.setLog('- Theme mode: ' + _config.style.mode);
    }

    if (_config.router) {
      store_store.state.router = _config.router;
      store_store.state.isRouterEnabled = true;
      store_store.actions.setRouterHooks();
      store_store.actions.setLog('- VueRouter enabled');
      if (store_store.actions.getAppMode() === 'embedded') store_store.actions.setLog('You should not use VueRouter when Zircle is in embedded mode.', 'warn');
    }
  }
};
/* harmony default export */ var modules_app = (app);
// CONCATENATED MODULE: ./src/store/actions.js









var actions = Object.assign({}, modules_router, modules_position, modules_navigation, modules_responsiveness, modules_themes, modules_list, modules_debug, modules_app);
/* harmony default export */ var store_actions = (actions);
// CONCATENATED MODULE: ./src/store/store.js


var store = {
  state: store_state,
  actions: store_actions
};
/* harmony default export */ var store_store = __webpack_exports__["a"] = (store);

/***/ }),

/***/ "CkkT":
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__("m0Pp");
var IObject = __webpack_require__("Ymqv");
var toObject = __webpack_require__("S/j/");
var toLength = __webpack_require__("ne8i");
var asc = __webpack_require__("zRwo");
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),

/***/ "DVgA":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__("zhAb");
var enumBugKeys = __webpack_require__("4R4u");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "Ddqa":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"/Users/tincho/nestorm/node_modules/.cache/vue-loader","cacheIdentifier":"02bea4b2-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/z-spot.vue?vue&type=template&id=1397d3bb
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"z-shape is-extension",class:[_vm.componentType, _vm.classes],style:(_vm.responsive === true ? _vm.styles.main : _vm.zpos.main),attrs:{"role":_vm.button === true ? 'button' : ''},on:{"mouseover":_vm.spotin,"mouseout":_vm.spotout,"mousedown":_vm.pulse,"touchstart":_vm.pulse,"mouseup":_vm.move}},[(!_vm.button)?_c('div',{ref:"spot",staticClass:"z-outer-spot",style:(_vm.styles.plate)}):_vm._e(),_c('div',{ref:"pulse",staticClass:"z-pulse"}),(_vm.knob)?_c('z-knob',{attrs:{"progress":_vm.progress},on:{"rangeVal":_vm.extraInfo}}):_vm._e(),(_vm.slider === true)?_c('z-slider',{attrs:{"progress":_vm.progress}}):_vm._e(),(_vm.label || _vm.$slots['label'])?_c('section',{staticClass:"z-label",class:_vm.labelPos,style:(_vm.$zircle.getThemeMode() === 'mode-light-filled' ? 'color: var(--accent-text-and-border-color);' : '')},[_vm._v("\n      "+_vm._s(_vm.label)+"\n      "),(!_vm.label)?_vm._t("label"):_vm._e(),(_vm.progress.pos === 'label')?_c('span',[_vm._v(_vm._s(_vm.progressLabel))]):_vm._e()],2):_vm._e(),_c('div',{staticClass:"z-content"},[(_vm.imageSrc)?_c('img',{attrs:{"src":_vm.imageSrc,"width":"100%","height":"100%"}}):_vm._e(),(!_vm.imageSrc)?_vm._t("image"):_vm._e()],2),_c('div',{staticClass:"z-content",staticStyle:{"z-index":"10"}},[_c('span',{staticClass:"overflow"},[(_vm.progress.pos === 'inside' || _vm.progress.pos === undefined )?_c('span',[_vm._v(_vm._s(_vm.progressLabel))]):_vm._e(),_vm._t("default")],2)]),_vm._t("extension")],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/z-spot.vue?vue&type=template&id=1397d3bb

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/builtin/es6/typeof.js
function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.function.name.js
var es6_function_name = __webpack_require__("f3/d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.number.constructor.js
var es6_number_constructor = __webpack_require__("xfY5");

// EXTERNAL MODULE: ./src/components/child-components/z-slider.vue + 4 modules
var z_slider = __webpack_require__("DokW");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"/Users/tincho/nestorm/node_modules/.cache/vue-loader","cacheIdentifier":"02bea4b2-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/child-components/z-knob.vue?vue&type=template&id=ab67cb3e
var z_knobvue_type_template_id_ab67cb3e_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',[_c('svg',{ref:"bar",staticClass:"z-range-bar",attrs:{"viewBox":"0 0 100 100","xmlns":"http://www.w3.org/2000/svg"},on:{"click":_vm.bar}},[_c('circle',{style:([_vm.styles]),attrs:{"r":"52","cx":"50","cy":"50"}})]),_c('svg',{staticClass:"z-range-bar-bar",style:(_vm.circleStyle),attrs:{"xmlns":"http://www.w3.org/2000/svg"},on:{"touchstart":function($event){_vm.drag = true},"touchmove":function($event){$event.preventDefault();return _vm.handleBar($event)},"touchend":function($event){_vm.drag = false},"mousedown":function($event){_vm.drag = true},"mousemove":function($event){$event.preventDefault();return _vm.handleBar($event)},"mouseup":function($event){_vm.drag = false}}},[_c('circle',{staticClass:"z-range-bar-handlebar",attrs:{"r":"8","cx":"20","cy":"20"}})])])}
var z_knobvue_type_template_id_ab67cb3e_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/child-components/z-knob.vue?vue&type=template&id=ab67cb3e

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/components/child-components/z-knob.vue?vue&type=script&lang=js


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var z_knobvue_type_script_lang_js = ({
  name: 'z-knob',
  props: ['progress'],
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
      var dimension = this.$zircle.getComponentWidth(this.$parent.size) / 2;
      return {
        X: (dimension - 3) * Math.cos(this.angle * (Math.PI / 180)),
        Y: (dimension - 3) * Math.sin(this.angle * (Math.PI / 180)),
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
    },
    computedProgress: function computedProgress() {
      if (_typeof(this.progress) === 'object') {
        var max = 100;
        this.progress.max === undefined ? max = 100 : max = this.progress.max;
        return this.progress.value * 360 / max;
      } else {
        return this.progress * 360 / 100;
      }
    }
  },
  methods: {
    bar: function bar(e) {
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

      if (tangle < 0) {
        tangle = 360 + tangle;
      }

      var prevAngle = Math.round(this.angle);
      var vm = this;
      var id = setInterval(frame, 0);

      function frame() {
        if (prevAngle > tangle) {
          prevAngle--;
        } else if (prevAngle < tangle) {
          prevAngle++;
        } else {
          clearInterval(id);
        }

        vm.angle = prevAngle;
        var max = 100;

        if (_typeof(vm.progress) === 'object') {
          vm.progress.max === undefined ? max = 100 : max = vm.progress.max;
        }

        vm.$emit('rangeVal', Math.round(prevAngle / 360 * max));
      }
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

        if (tangle < 0) {
          tangle = 360 + tangle;
        }

        this.angle = tangle;
        var max = 100;

        if (_typeof(this.progress) === 'object') {
          this.progress.max === undefined ? max = 100 : max = this.progress.max;
        }

        this.$emit('rangeVal', Math.round(tangle / 360 * max));
      }
    }
  },
  mounted: function mounted() {
    _typeof(this.progress) === 'object' ? (this.$emit('rangeVal', this.progress.value), this.angle = this.progress.value * 360 / this.progress.max) : (this.$emit('rangeVal', this.progress), this.angle = this.progress * 360 / 100);
  }
});
// CONCATENATED MODULE: ./src/components/child-components/z-knob.vue?vue&type=script&lang=js
 /* harmony default export */ var child_components_z_knobvue_type_script_lang_js = (z_knobvue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("KHd+");

// CONCATENATED MODULE: ./src/components/child-components/z-knob.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  child_components_z_knobvue_type_script_lang_js,
  z_knobvue_type_template_id_ab67cb3e_render,
  z_knobvue_type_template_id_ab67cb3e_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var z_knob = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/components/z-spot.vue?vue&type=script&lang=js



//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var z_spotvue_type_script_lang_js = ({
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
    label: {
      type: [String]
    },
    labelPos: {
      type: [String],
      default: 'bottom'
    },
    imageSrc: {
      type: [String]
    },
    progress: {
      type: [Number, Object],
      default: 0
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
    ZSlider: z_slider["a" /* default */],
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
        $parent: this.$parent
      };
      return this.$zircle.calcPosition(component);
    },
    angleItem: function angleItem() {
      return 360 / this.$zircle.getNumberOfItemsInCurrentPage() * this.index - 90;
    },
    distanceItem: function distanceItem() {
      return this.$zircle.getNumberOfItemsInCurrentPage() === 1 ? 0 : 60;
    },
    responsive: function responsive() {
      if (this.view === this.$zircle.getCurrentViewName()) {
        // eslint-disable-next-line
        this.zpos = this.styles;
        return true;
      } else {
        return false;
      }
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
        'z-zoom-in-cursor': this.componentType === 'z-spot' && this.toView !== undefined,
        primary: this.$parent.componentType !== 'z-list',
        accent: this.$parent.componentType === 'z-list'
      };
    },
    progressLabel: function progressLabel() {
      if (_typeof(this.progress) === 'object' && this.extrainfo !== '') {
        return this.extrainfo + '' + this.progress.unit;
      } else {
        return this.extrainfo;
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
    },
    extraInfo: function extraInfo(data) {
      this.extrainfo = data;
    }
  },
  mounted: function mounted() {
    this.zpos = this.styles;
  }
});
// CONCATENATED MODULE: ./src/components/z-spot.vue?vue&type=script&lang=js
 /* harmony default export */ var components_z_spotvue_type_script_lang_js = (z_spotvue_type_script_lang_js); 
// CONCATENATED MODULE: ./src/components/z-spot.vue





/* normalize component */

var z_spot_component = Object(componentNormalizer["a" /* default */])(
  components_z_spotvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var z_spot = __webpack_exports__["a"] = (z_spot_component.exports);

/***/ }),

/***/ "DokW":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"/Users/tincho/nestorm/node_modules/.cache/vue-loader","cacheIdentifier":"02bea4b2-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/child-components/z-slider.vue?vue&type=template&id=ce324454
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"z-slider",attrs:{"viewBox":"0 0 100 100","xmlns":"http://www.w3.org/2000/svg"}},[_c('circle',{style:([_vm.styles]),attrs:{"r":"51","cx":"50","cy":"50"}})])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/child-components/z-slider.vue?vue&type=template&id=ce324454

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.function.name.js
var es6_function_name = __webpack_require__("f3/d");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/components/child-components/z-slider.vue?vue&type=script&lang=js

//
//
//
//
//
//
/* harmony default export */ var z_slidervue_type_script_lang_js = ({
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

      if (zwidth === 'xxl') {
        var strokeWidth = 3;
      } else if (zwidth === 'large' || zwidth === 'xl') {
        strokeWidth = 7;
      } else if (zwidth === 'medium') {
        strokeWidth = 8;
      } else if (zwidth === 'small') {
        strokeWidth = 9;
      } else if (zwidth === 'xs' || zwidth === 'extrasmall') {
        strokeWidth = 10;
      } else if (zwidth === 'xxs') {}

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
// CONCATENATED MODULE: ./src/components/child-components/z-slider.vue?vue&type=script&lang=js
 /* harmony default export */ var child_components_z_slidervue_type_script_lang_js = (z_slidervue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("KHd+");

// CONCATENATED MODULE: ./src/components/child-components/z-slider.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  child_components_z_slidervue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var z_slider = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ "EWmC":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__("LZWt");
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),

/***/ "EemH":
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__("UqcF");
var createDesc = __webpack_require__("RjD/");
var toIObject = __webpack_require__("aCFj");
var toPrimitive = __webpack_require__("apmT");
var has = __webpack_require__("aagx");
var IE8_DOM_DEFINE = __webpack_require__("xpql");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__("nh4g") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "FJW5":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("hswa");
var anObject = __webpack_require__("y3w9");
var getKeys = __webpack_require__("DVgA");

module.exports = __webpack_require__("nh4g") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "HrLf":
/***/ (function(module, exports, __webpack_require__) {

// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  let i
  if ((i = window.document.currentScript) && (i = i.src.match(/(.+\/)[^/]+\.js$/))) {
    __webpack_require__.p = i[1] // eslint-disable-line
  }
}


/***/ }),

/***/ "IU+Z":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var hide = __webpack_require__("Mukb");
var redefine = __webpack_require__("KroJ");
var fails = __webpack_require__("eeVq");
var defined = __webpack_require__("vhPU");
var wks = __webpack_require__("K0xU");

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);
  var fns = exec(defined, SYMBOL, ''[KEY]);
  var strfn = fns[0];
  var rxfn = fns[1];
  if (fails(function () {
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  })) {
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),

/***/ "Iw71":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("0/R4");
var document = __webpack_require__("dyZX").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "JiEa":
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "K0xU":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("VTer")('wks');
var uid = __webpack_require__("ylqs");
var Symbol = __webpack_require__("dyZX").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "KHd+":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

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
  if (moduleIdentifier) { // server build
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
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "KKXr":
/***/ (function(module, exports, __webpack_require__) {

// @@split logic
__webpack_require__("IU+Z")('split', 2, function (defined, SPLIT, $split) {
  'use strict';
  var isRegExp = __webpack_require__("quPj");
  var _split = $split;
  var $push = [].push;
  var $SPLIT = 'split';
  var LENGTH = 'length';
  var LAST_INDEX = 'lastIndex';
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it
    $split = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i;
      // Doesn't need flags gy, but they don't hurt
      if (!NPCG) separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
      while (match = separatorCopy.exec(string)) {
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          // eslint-disable-next-line no-loop-func
          if (!NPCG && match[LENGTH] > 1) match[0].replace(separator2, function () {
            for (i = 1; i < arguments[LENGTH] - 2; i++) if (arguments[i] === undefined) match[i] = undefined;
          });
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    $split = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  }
  // 21.1.3.17 String.prototype.split(separator, limit)
  return [function split(separator, limit) {
    var O = defined(this);
    var fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});


/***/ }),

/***/ "KroJ":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("dyZX");
var hide = __webpack_require__("Mukb");
var has = __webpack_require__("aagx");
var SRC = __webpack_require__("ylqs")('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__("g3g5").inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ "Kuth":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__("y3w9");
var dPs = __webpack_require__("FJW5");
var enumBugKeys = __webpack_require__("4R4u");
var IE_PROTO = __webpack_require__("YTvA")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__("Iw71")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__("+rLv").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "LQAc":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "LZWt":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "Mukb":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("hswa");
var createDesc = __webpack_require__("RjD/");
module.exports = __webpack_require__("nh4g") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "OP3Y":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__("aagx");
var toObject = __webpack_require__("S/j/");
var IE_PROTO = __webpack_require__("YTvA")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "QaDb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__("Kuth");
var descriptor = __webpack_require__("RjD/");
var setToStringTag = __webpack_require__("fyDq");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__("Mukb")(IteratorPrototype, __webpack_require__("K0xU")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "RW0V":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__("S/j/");
var $keys = __webpack_require__("DVgA");

__webpack_require__("Xtr8")('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),

/***/ "RYi7":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "RjD/":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "S/j/":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__("vhPU");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "SRfc":
/***/ (function(module, exports, __webpack_require__) {

// @@match logic
__webpack_require__("IU+Z")('match', 1, function (defined, MATCH, $match) {
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});


/***/ }),

/***/ "UqcF":
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "VTer":
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__("g3g5");
var global = __webpack_require__("dyZX");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__("LQAc") ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "XKFU":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("dyZX");
var core = __webpack_require__("g3g5");
var hide = __webpack_require__("Mukb");
var redefine = __webpack_require__("KroJ");
var ctx = __webpack_require__("m0Pp");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "Xbzi":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("0/R4");
var setPrototypeOf = __webpack_require__("i5dc").set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),

/***/ "Xtr8":
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__("XKFU");
var core = __webpack_require__("g3g5");
var fails = __webpack_require__("eeVq");
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),

/***/ "YTvA":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("VTer")('keys');
var uid = __webpack_require__("ylqs");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "Ymqv":
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__("LZWt");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "aCFj":
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__("Ymqv");
var defined = __webpack_require__("vhPU");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "aagx":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "apmT":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("0/R4");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "czNK":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__("DVgA");
var gOPS = __webpack_require__("JiEa");
var pIE = __webpack_require__("UqcF");
var toObject = __webpack_require__("S/j/");
var IObject = __webpack_require__("Ymqv");
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__("eeVq")(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),

/***/ "d/Gc":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("RYi7");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "dRSK":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__("XKFU");
var $find = __webpack_require__("CkkT")(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__("nGyu")(KEY);


/***/ }),

/***/ "dyZX":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "eeVq":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "f3/d":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("hswa").f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__("nh4g") && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});


/***/ }),

/***/ "fyDq":
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__("hswa").f;
var has = __webpack_require__("aagx");
var TAG = __webpack_require__("K0xU")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "g3g5":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.7' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "gH12":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"/Users/tincho/nestorm/node_modules/.cache/vue-loader","cacheIdentifier":"02bea4b2-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/z-view.vue?vue&type=template&id=4b31cd96
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"z-shape primary",class:[_vm.componentType],staticStyle:{"overflow":"visible"},style:(_vm.responsive === true ? _vm.styles.main : _vm.zpos.main),on:{"animationend":_vm.notify,"mouseover":function($event){_vm.$zircle.allowBackwardNavigation(true)},"mouseleave":function($event){_vm.$zircle.allowBackwardNavigation(false)}}},[_c('section',{staticStyle:{"opacity":"0"},style:(_vm.fullView === _vm.$zircle.getCurrentViewName() ? 'animation: appear 1000ms 500ms linear forwards;' : 'animation: disappear 1s;')},[_c('div',{staticClass:"z-outer-circle",style:(_vm.responsive === true ? _vm.styles.plate : _vm.zpos.plate)}),(_vm.scrollBar)?_c('z-scroll',{staticStyle:{"overflow":"visible"},attrs:{"scrollVal":_vm.scrollVal},on:{"update:scrollVal":function($event){_vm.scrollVal=$event}}}):_vm._e(),(_vm.slider === true)?_c('z-slider',{attrs:{"progress":_vm.progress}}):_vm._e(),(_vm.label || _vm.$slots['label'])?_c('section',{staticClass:"z-label",class:_vm.labelPos},[_vm._v("\n      "+_vm._s(_vm.label)+"\n      "),(!_vm.label)?_vm._t("label"):_vm._e()],2):_vm._e(),(_vm.$slots['image'] || _vm.imageSrc)?_c('div',{staticClass:"z-content"},[(_vm.imageSrc)?_c('img',{attrs:{"src":_vm.imageSrc,"width":"100%","height":"100%"}}):_vm._e(),(!_vm.imageSrc)?_vm._t("image"):_vm._e()],2):_vm._e(),_c('div',{ref:"maincontent",staticClass:"z-content maincontent",class:[_vm.longContent, _vm.firefoxScroll],on:{"&scroll":function($event){return _vm.scroll($event)}}},[_c('div',{ref:"ztext"},[_vm._t("default")],2)]),(_vm.$slots['media'])?_c('div',{staticClass:"z-content",staticStyle:{"z-index":"60"}},[_vm._t("media")],2):_vm._e(),_vm._t("extension")],2)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/z-view.vue?vue&type=template&id=4b31cd96

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.match.js
var es6_regexp_match = __webpack_require__("SRfc");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.function.name.js
var es6_function_name = __webpack_require__("f3/d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.number.constructor.js
var es6_number_constructor = __webpack_require__("xfY5");

// EXTERNAL MODULE: ./src/components/child-components/z-slider.vue + 4 modules
var z_slider = __webpack_require__("DokW");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"/Users/tincho/nestorm/node_modules/.cache/vue-loader","cacheIdentifier":"02bea4b2-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/child-components/z-scroll.vue?vue&type=template&id=ddfff3d2
var z_scrollvue_type_template_id_ddfff3d2_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',[_c('svg',{staticClass:"z-scroll",attrs:{"viewBox":"0 0 100 100","xmlns":"http://www.w3.org/2000/svg"},on:{"click":function($event){$event.preventDefault();return _vm.point($event)}}},[_c('circle',{style:(_vm.arcStyle),attrs:{"r":"51","cx":"50","cy":"50"}})]),_c('svg',{directives:[{name:"show",rawName:"v-show",value:(_vm.hidden === false),expression:"hidden === false"}],staticClass:"z-scroll-bar",style:(_vm.circleStyle),attrs:{"xmlns":"http://www.w3.org/2000/svg"},on:{"touchstart":function($event){_vm.drag = true},"touchmove":function($event){$event.preventDefault();return _vm.slide($event)},"touchend":function($event){_vm.drag = false},"mousedown":function($event){_vm.drag = true},"mousemove":function($event){$event.preventDefault();return _vm.slide($event)},"mouseup":function($event){_vm.drag = false}}},[_c('circle',{staticClass:"z-scroll-handlebar",attrs:{"r":"10","cx":"20","cy":"20"}})])])}
var z_scrollvue_type_template_id_ddfff3d2_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/child-components/z-scroll.vue?vue&type=template&id=ddfff3d2

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/components/child-components/z-scroll.vue?vue&type=script&lang=js

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var z_scrollvue_type_script_lang_js = ({
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
        // strokeDashoffset: circleLength,
        strokeDashoffset: -(Math.PI * 100) * ((90 - 360) / 360),
        strokeWidth: '3px'
      };
    },
    position: function position() {
      var zwidth = this.$zircle.getComponentWidth('xxl') / 2;
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
        var dimensions = this.$el.querySelector('.z-scroll').getBoundingClientRect();
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
  }
});
// CONCATENATED MODULE: ./src/components/child-components/z-scroll.vue?vue&type=script&lang=js
 /* harmony default export */ var child_components_z_scrollvue_type_script_lang_js = (z_scrollvue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("KHd+");

// CONCATENATED MODULE: ./src/components/child-components/z-scroll.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  child_components_z_scrollvue_type_script_lang_js,
  z_scrollvue_type_template_id_ddfff3d2_render,
  z_scrollvue_type_template_id_ddfff3d2_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var z_scroll = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/components/z-view.vue?vue&type=script&lang=js



//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var z_viewvue_type_script_lang_js = ({
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
    label: {
      type: [String]
    },
    labelPos: {
      type: [String],
      default: 'bottom'
    },
    imageSrc: {
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
    ZSlider: z_slider["a" /* default */]
  },
  data: function data() {
    return {
      componentType: this.$options.name,
      scrollVal: -45,
      zpos: {},
      isMounted: false,
      ffox: false,
      ok: false,
      fullView: this.$zircle.getNavigationMode() === 'forward' ? this.$zircle.getCurrentViewName() : this.$zircle.getPastViewName()
    };
  },
  provide: function provide() {
    return {
      view: this.fullView
    };
  },
  computed: {
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
      if (this.fullView === this.$zircle.getCurrentViewName()) {
        // eslint-disable-next-line
        this.zpos = this.styles;
        return true;
      } else {
        return false;
      }
    },
    styles: function styles() {
      var width = this.$zircle.getComponentWidth(this.size);
      return {
        main: {
          width: width + 'px',
          height: width + 'px',
          margin: -(width / 2) + 'px 0 0 ' + -(width / 2) + 'px',
          transform: 'translate3d(' + this.position.X + 'px, ' + this.position.Y + 'px, 0px) scale(' + this.position.scalei + ')'
        },
        plate: {
          width: width + 60 + 'px',
          height: width + 60 + 'px',
          margin: -((width + 60) / 2) + 'px 0 0 ' + -((width + 60) / 2) + 'px'
        }
      };
    },
    longContent: function longContent() {
      return {
        'long-content': this.scrollBar === true
      };
    },
    firefoxScroll: function firefoxScroll() {
      return {
        'z-scroll-disabled-for-firefox': this.scrollBar === true && this.ffox === true
      };
    }
  },
  methods: {
    notify: function notify() {
      if (this.$zircle.getHistoryLength() === 1) this.$zircle.setNavigationMode('');
    },
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
    if (navigator.userAgent.match('Firefox')) {
      this.$zircle.setLog('Firefox desktop detected. Scroll events disabled');
      this.ffox = true;
    }

    this.zpos = this.styles;
    this.isMounted = true; // var vm = this
    // setTimeout(function () {
    //   return vm.ok = true
    // }, 2330)
  }
});
// CONCATENATED MODULE: ./src/components/z-view.vue?vue&type=script&lang=js
 /* harmony default export */ var components_z_viewvue_type_script_lang_js = (z_viewvue_type_script_lang_js); 
// CONCATENATED MODULE: ./src/components/z-view.vue





/* normalize component */

var z_view_component = Object(componentNormalizer["a" /* default */])(
  components_z_viewvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var z_view = __webpack_exports__["a"] = (z_view_component.exports);

/***/ }),

/***/ "hPIQ":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "hswa":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("y3w9");
var IE8_DOM_DEFINE = __webpack_require__("xpql");
var toPrimitive = __webpack_require__("apmT");
var dP = Object.defineProperty;

exports.f = __webpack_require__("nh4g") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "i5dc":
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__("0/R4");
var anObject = __webpack_require__("y3w9");
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__("m0Pp")(Function.call, __webpack_require__("EemH").f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),

/***/ "i7/w":
/***/ (function(module, exports) {

module.exports = require("vue");

/***/ }),

/***/ "kJMx":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__("zhAb");
var hiddenKeys = __webpack_require__("4R4u").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ "m0Pp":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("2OiF");
module.exports = function (fn, that, length) {
  aFunction(fn);
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


/***/ }),

/***/ "nGyu":
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__("K0xU")('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__("Mukb")(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "ne8i":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("RYi7");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "nh4g":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("eeVq")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "pRdH":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"/Users/tincho/nestorm/node_modules/.cache/vue-loader","cacheIdentifier":"02bea4b2-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/z-list.vue?vue&type=template&id=331df32d
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{attrs:{"title":"z-list"}},[_vm._l((_vm.$zircle.getCurrentPage()),function(item,index){return _vm._t("default",null,{index:index},item)}),_vm._l((_vm.$zircle.getNumberOfPages()),function(page,index){return (_vm.$zircle.getNumberOfPages() > 1)?_c('z-pagination',{key:index + '_page',attrs:{"index":index,"distance":108,"angle":(180 - (180 - (_vm.$zircle.getNumberOfPages() * 10))) / _vm.$zircle.getNumberOfPages() * (_vm.$zircle.getNumberOfPages() - index) + ((180 - (180 - (180 - (_vm.$zircle.getNumberOfPages() * 10)))) - ((180 - (180 - (_vm.$zircle.getNumberOfPages() * 10))) / _vm.$zircle.getNumberOfPages())) / 2,"active":_vm.$zircle.getCurrentPageIndex()},nativeOn:{"mouseover":function($event){_vm.$zircle.allowBackwardNavigation(true)},"mouseleave":function($event){_vm.$zircle.allowBackwardNavigation(false)},"click":function($event){_vm.$zircle.setCurrentPageIndex(index)}}}):_vm._e()})],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/z-list.vue?vue&type=template&id=331df32d

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.function.name.js
var es6_function_name = __webpack_require__("f3/d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.number.constructor.js
var es6_number_constructor = __webpack_require__("xfY5");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"/Users/tincho/nestorm/node_modules/.cache/vue-loader","cacheIdentifier":"02bea4b2-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/child-components/z-pagination.vue?vue&type=template&id=481fce92
var z_paginationvue_type_template_id_481fce92_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.hidden === false),expression:"hidden === false"}],staticClass:"z-shape is-extension",class:[_vm.componentType, _vm.activated],style:(_vm.responsive === true ? _vm.styles.main : _vm.zpos.main)},[_c('div',{staticClass:"z-outer-point",style:(_vm.responsive === true ? _vm.styles.plate : _vm.zpos.plate)})])}
var z_paginationvue_type_template_id_481fce92_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/child-components/z-pagination.vue?vue&type=template&id=481fce92

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/components/child-components/z-pagination.vue?vue&type=script&lang=js


//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var z_paginationvue_type_script_lang_js = ({
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
      if (this.view === this.$zircle.getCurrentViewName()) {
        // eslint-disable-next-line
        this.zpos = this.styles;
        return true;
      } else {
        return false;
      }
    },
    position: function position() {
      return this.$zircle.calcPosition(this);
    },
    activated: function activated() {
      return {
        'active': this.active === this.index,
        'deactive': this.active < this.index || this.active > this.index
      };
    },
    styles: function styles() {
      var zwidth = this.$zircle.getComponentWidth(this.size) / 2;
      return {
        main: {
          width: zwidth + 'px',
          height: zwidth + 'px',
          margin: -(zwidth / 2) + 'px 0 0 ' + -(zwidth / 2) + 'px',
          transform: 'translate3d(' + this.position.X + 'px, ' + this.position.Y + 'px, 0px)'
        },
        plate: {
          width: zwidth + 12 + 'px',
          height: zwidth + 12 + 'px',
          margin: -((zwidth + 12) / 2) + 'px 0 0 ' + -((zwidth + 12) / 2) + 'px'
        }
      };
    }
  },
  mounted: function mounted() {
    this.zpos = this.styles;
  }
});
// CONCATENATED MODULE: ./src/components/child-components/z-pagination.vue?vue&type=script&lang=js
 /* harmony default export */ var child_components_z_paginationvue_type_script_lang_js = (z_paginationvue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("KHd+");

// CONCATENATED MODULE: ./src/components/child-components/z-pagination.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  child_components_z_paginationvue_type_script_lang_js,
  z_paginationvue_type_template_id_481fce92_render,
  z_paginationvue_type_template_id_481fce92_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var z_pagination = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/components/z-list.vue?vue&type=script&lang=js



//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
function chunk(myArray, chunkSize) {
  var res = [];

  while (myArray.length) {
    res.push(myArray.splice(0, chunkSize));
  }

  return res;
}


/* harmony default export */ var z_listvue_type_script_lang_js = ({
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
// CONCATENATED MODULE: ./src/components/z-list.vue?vue&type=script&lang=js
 /* harmony default export */ var components_z_listvue_type_script_lang_js = (z_listvue_type_script_lang_js); 
// CONCATENATED MODULE: ./src/components/z-list.vue





/* normalize component */

var z_list_component = Object(componentNormalizer["a" /* default */])(
  components_z_listvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var z_list = __webpack_exports__["a"] = (z_list_component.exports);

/***/ }),

/***/ "qncB":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("XKFU");
var defined = __webpack_require__("vhPU");
var fails = __webpack_require__("eeVq");
var spaces = __webpack_require__("/e88");
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),

/***/ "quPj":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__("0/R4");
var cof = __webpack_require__("LZWt");
var MATCH = __webpack_require__("K0xU")('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),

/***/ "rGqo":
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__("yt8O");
var getKeys = __webpack_require__("DVgA");
var redefine = __webpack_require__("KroJ");
var global = __webpack_require__("dyZX");
var hide = __webpack_require__("Mukb");
var Iterators = __webpack_require__("hPIQ");
var wks = __webpack_require__("K0xU");
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),

/***/ "tjUo":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("B6RA");
/* harmony import */ var _components_z_canvas_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("A91R");
/* harmony import */ var _components_z_view_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("gH12");
/* harmony import */ var _components_z_list_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("pRdH");
/* harmony import */ var _components_z_spot_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("Ddqa");
/* harmony import */ var _components_z_dialog_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("40yZ");






var zircle = {
  install: function install(Vue, options) {
    Object.defineProperty(Vue.prototype, '$zircle', {
      get: function get() {
        return _store_store__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].actions;
      }
    });
    Vue.component('z-canvas', _components_z_canvas_vue__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]);
    Vue.component('z-view', _components_z_view_vue__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"]);
    Vue.component('z-list', _components_z_list_vue__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"]);
    Vue.component('z-spot', _components_z_spot_vue__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"]);
    Vue.component('z-dialog', _components_z_dialog_vue__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"]);
  }
};
/* harmony default export */ __webpack_exports__["a"] = (zircle);
var GlobalVue = null;

if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}

if (GlobalVue) {
  GlobalVue.use(zircle);
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("yLpj")))

/***/ }),

/***/ "vUk8":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_z_canvas_vue_vue_type_style_index_0_lang_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("zCc5");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_z_canvas_vue_vue_type_style_index_0_lang_sass__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_z_canvas_vue_vue_type_style_index_0_lang_sass__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_z_canvas_vue_vue_type_style_index_0_lang_sass__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "vhPU":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "w2a5":
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__("aCFj");
var toLength = __webpack_require__("ne8i");
var toAbsoluteIndex = __webpack_require__("d/Gc");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
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


/***/ }),

/***/ "xfY5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("dyZX");
var has = __webpack_require__("aagx");
var cof = __webpack_require__("LZWt");
var inheritIfRequired = __webpack_require__("Xbzi");
var toPrimitive = __webpack_require__("apmT");
var fails = __webpack_require__("eeVq");
var gOPN = __webpack_require__("kJMx").f;
var gOPD = __webpack_require__("EemH").f;
var dP = __webpack_require__("hswa").f;
var $trim = __webpack_require__("qncB").trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__("Kuth")(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__("nh4g") ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__("KroJ")(global, NUMBER, $Number);
}


/***/ }),

/***/ "xpql":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("nh4g") && !__webpack_require__("eeVq")(function () {
  return Object.defineProperty(__webpack_require__("Iw71")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "y3w9":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("0/R4");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "yLpj":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "ylqs":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "yt8O":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__("nGyu");
var step = __webpack_require__("1TsA");
var Iterators = __webpack_require__("hPIQ");
var toIObject = __webpack_require__("aCFj");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__("Afnz")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "zCc5":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "zRwo":
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__("6FMO");

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),

/***/ "zhAb":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("aagx");
var toIObject = __webpack_require__("aCFj");
var arrayIndexOf = __webpack_require__("w2a5")(false);
var IE_PROTO = __webpack_require__("YTvA")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ })

/******/ });
//# sourceMappingURL=zircle.common.js.map