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
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "01f9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("2d00");
var $export = __webpack_require__("5ca1");
var redefine = __webpack_require__("2aba");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var $iterCreate = __webpack_require__("41a0");
var setToStringTag = __webpack_require__("7f20");
var getPrototypeOf = __webpack_require__("38fd");
var ITERATOR = __webpack_require__("2b4c")('iterator');
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

/***/ "02f4":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4588");
var defined = __webpack_require__("be13");
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ "036d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_index_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_z_canvas_vue_vue_type_style_index_0_id_fc58c592_prod_lang_sass___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("b5cf");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_index_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_z_canvas_vue_vue_type_style_index_0_id_fc58c592_prod_lang_sass___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_index_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_z_canvas_vue_vue_type_style_index_0_id_fc58c592_prod_lang_sass___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "0390":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var at = __webpack_require__("02f4")(true);

 // `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? at(S, index).length : 1);
};


/***/ }),

/***/ "03dd":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"b70600c0-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/z-canvas.vue?vue&type=template&id=fc58c592&
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

// CONCATENATED MODULE: ./src/components/z-canvas.vue?vue&type=template&id=fc58c592&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.function.name.js
var es6_function_name = __webpack_require__("7f7f");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"b70600c0-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/child-components/z-view-manager.vue?vue&type=template&id=4d70a21d&


var z_view_managervue_type_template_id_4d70a21d_render = function render() {
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

var z_view_managervue_type_template_id_4d70a21d_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/child-components/z-view-manager.vue?vue&type=template&id=4d70a21d&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/child-components/z-view-manager.vue?vue&type=script&lang=js&
/* eslint-disable */
/* harmony default export */ var z_view_managervue_type_script_lang_js_ = ({
  name: 'z-view-manager',
  computed: {
    views: function views() {
      return this.$zircle.getRouterState() === false ? this.$zircle.getHistory().slice(-3) : this.$zircle.getHistory().slice(-3, -1);
    }
  }
});
// CONCATENATED MODULE: ./src/components/child-components/z-view-manager.vue?vue&type=script&lang=js&
 /* harmony default export */ var child_components_z_view_managervue_type_script_lang_js_ = (z_view_managervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/child-components/z-view-manager.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  child_components_z_view_managervue_type_script_lang_js_,
  z_view_managervue_type_template_id_4d70a21d_render,
  z_view_managervue_type_template_id_4d70a21d_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var z_view_manager = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/z-canvas.vue?vue&type=script&lang=js&
/* eslint-disable no-new */

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
    },
    compareAndNotify: function compareAndNotify() {
      this.$zircle.getDimensions();
    },
    addResizeHandlers: function addResizeHandlers() {
      this._resizeObject.contentDocument.defaultView.addEventListener('resize', this.compareAndNotify);

      this.$zircle.getDimensions();
    }
  },
  created: function created() {
    this.$zircle.setComponentList(this.views);
  },
  mounted: function mounted() {
    var _this = this;

    // Get window dimension to set the initial width of ui components such as z-panel
    var object = document.createElement('object');
    this._resizeObject = object;
    object.setAttribute('aria-hidden', 'true');
    object.setAttribute('tabindex', -1);
    object.className = 'z-resizable-object';
    object.onload = this.addResizeHandlers;
    object.type = 'text/html';
    object.data = 'about:blank';
    this.$el.appendChild(object);
    this.$nextTick(function () {
      return _this.compareAndNotify;
    });

    document.onmouseleave = function () {
      return _this.$zircle.setNavigationMode('backward');
    };
  }
});
// CONCATENATED MODULE: ./src/components/z-canvas.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_z_canvasvue_type_script_lang_js_ = (z_canvasvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/z-canvas.vue?vue&type=style&index=0&id=fc58c592&prod&lang=sass&
var z_canvasvue_type_style_index_0_id_fc58c592_prod_lang_sass_ = __webpack_require__("036d");

// CONCATENATED MODULE: ./src/components/z-canvas.vue






/* normalize component */

var z_canvas_component = Object(componentNormalizer["a" /* default */])(
  components_z_canvasvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var z_canvas = __webpack_exports__["a"] = (z_canvas_component.exports);

/***/ }),

/***/ "07a4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("8bbf");
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
    goBackView: '',
    // look & feel
    diameters: {},
    sizes: {
      xxl: 55,
      xl: 32,
      l: 20,
      m: 12,
      s: 8,
      xs: 5,
      xxs: 2
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
  }
});
/* harmony default export */ var store_state = (state);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.assign.js
var es6_object_assign = __webpack_require__("f751");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.replace.js
var es6_regexp_replace = __webpack_require__("a481");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
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
// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.function.name.js
var es6_function_name = __webpack_require__("7f7f");

// CONCATENATED MODULE: ./src/store/modules/router.js




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
    store_store.state.router.beforeEach(function (to, from, next) {
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
// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.number.constructor.js
var es6_number_constructor = __webpack_require__("c5f6");

// CONCATENATED MODULE: ./src/store/modules/position.js



function calcCoords(distance, angle, parentSize) {
  var X = 0;
  var Y = 0;
  var Xi = 0;
  var Yi = 0;

  if (distance !== 0) {
    X = store_store.actions.getComponentWidth(parentSize) / 2 * distance / 100 * Math.cos(angle * (Math.PI / 180));
    Y = store_store.actions.getComponentWidth(parentSize) / 2 * distance / 100 * Math.sin(angle * (Math.PI / 180));
    Xi = X > 0 ? -Math.abs(Number(X)) : Math.abs(Number(X));
    Yi = Y > 0 ? -Math.abs(Number(Y)) : Math.abs(Number(Y));
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

var position_position = {
  getCurrentPosition: function getCurrentPosition() {
    return store_store.state.history[store_store.state.history.length - 1].position;
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
    // store.actions.setLog('calcPosition() => ' + component.componentType)
    // Variable declaration
    var parentPosition = {
      Xi: 0,
      Yi: 0,
      X: 0,
      Y: 0,
      scalei: 1,
      scale: 1
    };
    var newCoords = calcCoords(component.distance, component.angle, component.$parent.size);

    if (component.$parent.componentType === 'z-view' || component.$parent.componentType === 'z-list' || component.$parent.componentType === 'z-spot') {
      parentPosition = {
        Xi: component.$parent.position.Xi,
        Yi: component.$parent.position.Yi,
        X: component.$parent.position.X,
        Y: component.$parent.position.Y,
        scalei: component.$parent.position.scalei,
        scale: component.$parent.position.scale
      };
    }

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
/* harmony default export */ var modules_position = (position_position);
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/typeof.js
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.find.js
var es6_array_find = __webpack_require__("7514");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.iterator.js
var es6_array_iterator = __webpack_require__("cadf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.keys.js
var es6_object_keys = __webpack_require__("456d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
var web_dom_iterable = __webpack_require__("ac6a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.split.js
var es6_regexp_split = __webpack_require__("28a5");

// CONCATENATED MODULE: ./src/store/modules/navigation.js











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
      if (k.toLowerCase() === view) return k;
    });

    if (key) {
      return list[key];
    } else {
      return external_commonjs_vue_commonjs2_vue_root_Vue_default.a.component('missing', {
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
      if (!options.params) {
        options.params = {};
      }

      var positionParams = options.fromSpot.position ? {
        position: {
          X: options.fromSpot.position.Xabs,
          Y: options.fromSpot.position.Yabs,
          scale: options.fromSpot.position.scale,
          Xi: options.fromSpot.position.Xi,
          Yi: options.fromSpot.position.Yi,
          scalei: options.fromSpot.position.scalei
        }
      } : {};
      store_store.actions.setView({
        name: options.to,
        params: options.params
      }, positionParams);
    }
  },
  setView: function setView(data, options) {
    if (store_store.state.history.length < 6 && store_store.state.isRouterEnabled === false) {
      var view = parseView(data);
      var position = !options || options.position && options.position.scale === 0 ? {
        X: 0,
        Y: 0,
        scale: 1,
        Xi: 0,
        Yi: 0,
        scalei: 1
      } : options.position;
      store_store.actions.addToHistory(view, position, view.route.params);
      store_store.actions.setNavigationMode('forward');
      if (view.route) store_store.state.params = view.route.params;
    } else if (store_store.state.history.length < 6 && store_store.state.isRouterEnabled === true) {
      var _view = parseView(data);

      var _position = !options ? {
        X: 0,
        Y: 0,
        scale: 1,
        Xi: 0,
        Yi: 0,
        scalei: 1
      } : options.position;

      store_store.actions.evaluateRoute(_view, _position);
    } else {
      store_store.actions.setLog('Max zoom level reached');
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
// CONCATENATED MODULE: ./src/store/modules/responsiveness.js

var responsiveness = {
  getComponentWidth: function getComponentWidth(size) {
    var sizes = size.toLowerCase();
    if (sizes === 'extralarge') sizes = 'xl';
    if (sizes === 'large') sizes = 'l';
    if (sizes === 'medium') sizes = 'm';
    if (sizes === 'small') sizes = 's';
    if (sizes === 'extrasmall') sizes = 'xs';
    return store_store.state.diameters[sizes];
  },
  getDimensions: function getDimensions() {
    var container = document.getElementById('z-container').offsetWidth;
    var size = store_store.state.sizes;
    store_store.state.diameters = {
      xxl: container * (size.xxl / 100),
      xl: container * (size.xl / 100),
      l: container * (size.l / 100),
      m: container * (size.m / 100),
      s: container * (size.s / 100),
      xs: container * (size.xs / 100),
      xxs: container * (size.xxs / 100)
    };
    store_store.actions.setLog('Size change detected on z-canvas');
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
// CONCATENATED MODULE: ./src/store/modules/debug.js

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
  resetConfig: function resetConfig() {
    store_store.state.appMode = 'full';
    store_store.state.navigationMode = 'forward';
    store_store.state.isRouterEnabled = false;
    store_store.state.router = {};
    store_store.state.history = [];
    store_store.state.backwardNavigation = false;
    store_store.state.componentList = {};
    store_store.state.goBackView = '';
    store_store.state.lastView = '';
    store_store.state.diameters = {};
    store_store.state.sizes = {
      xxl: 55,
      xl: 32,
      l: 20,
      m: 12,
      s: 8,
      xs: 5,
      xxs: 2
    };
    store_store.state.appStyle = {
      theme: 'theme-black',
      mode: 'mode-dark',
      shape: 'circle'
    };
    store_store.state.currentPage = 0;
    store_store.state.items = [];
    store_store.state.pages = [];
    store_store.state.params = {};
    store_store.state.debug = false;
  },
  config: function config(_config) {
    if (_config.debug === true || _config.debug === false) store_store.state.debug = _config.debug;

    if (store_store.state.debug === true) {
      store_store.actions.setLog('config:');
      store_store.actions.setLog('- Debug enabled');
    }

    if (_config.mode === 'full' || _config.mode === 'mixed') {
      store_store.state.appMode = _config.mode;
      store_store.actions.setLog('- Mode: ' + _config.mode);
    }

    if (_config.sizes) {
      if (_config.sizes.xxl) store_store.state.sizes.xxl = _config.sizes.xxl;
      if (_config.sizes.xl) store_store.state.sizes.xl = _config.sizes.xl;
      if (_config.sizes.l) store_store.state.sizes.l = _config.sizes.l;
      if (_config.sizes.m) store_store.state.sizes.m = _config.sizes.m;
      if (_config.sizes.s) store_store.state.sizes.s = _config.sizes.s;
      if (_config.sizes.xs) store_store.state.sizes.xs = _config.sizes.xs;
      if (_config.sizes.xxs) store_store.state.sizes.xxs = _config.sizes.xxs;
      store_store.actions.setLog('- Component sizes: ' + JSON.stringify(_config.sizes));
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
      store_store.actions.setLog('- VueRouter enabled'); // console.log(store.state.router.currentRoute)

      store_store.actions.setView({
        name: store_store.state.router.currentRoute.name,
        params: store_store.state.router.currentRoute.params
      });
      if (store_store.actions.getAppMode() === 'mixed') store_store.actions.setLog('You should not use VueRouter when Zircle is in mixed mode.', 'warn');
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

/***/ "0a49":
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__("9b43");
var IObject = __webpack_require__("626a");
var toObject = __webpack_require__("4bf8");
var toLength = __webpack_require__("9def");
var asc = __webpack_require__("cd1c");
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

/***/ "0bfb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__("cb7c");
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "0d58":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__("ce10");
var enumBugKeys = __webpack_require__("e11e");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "0dda":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"b70600c0-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/z-spot.vue?vue&type=template&id=39f1356f&
var render = function render() {
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
      "mouseup": _vm.move,
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
  }), _vm.knobEnabled ? _c('z-knob', {
    attrs: {
      "qty": _vm.computedQty,
      "unit": _vm.unit,
      "min": _vm.min,
      "max": _vm.max
    }
  }) : _vm._e(), _vm.sliderEnabled ? _c('z-slider', {
    attrs: {
      "progress": _vm.progress
    }
  }) : _vm._e(), _vm.label ? _c('div', {
    staticClass: "z-label",
    class: [_vm.shape, _vm.labelPos],
    style: _vm.$zircle.getThemeMode() === 'mode-light-filled' ? 'color: var(--accent-text-and-border-color);' : ''
  }, [_c('div', {
    staticClass: "inside"
  }, [_vm._v("\n      " + _vm._s(_vm.label) + " "), _vm.pos === 'outside' ? _c('span', [_vm._v(" " + _vm._s(_vm.progressLabel))]) : _vm._e()])]) : _vm._e(), _c('div', {
    staticClass: "z-content",
    class: [_vm.shape]
  }, [_vm.imagePath ? _c('img', {
    attrs: {
      "src": _vm.imagePath,
      "width": "100%",
      "height": "100%",
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

var staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/z-spot.vue?vue&type=template&id=39f1356f&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.function.name.js
var es6_function_name = __webpack_require__("7f7f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.number.constructor.js
var es6_number_constructor = __webpack_require__("c5f6");

// EXTERNAL MODULE: ./src/components/child-components/z-slider.vue + 4 modules
var z_slider = __webpack_require__("0e89");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"b70600c0-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/child-components/z-knob.vue?vue&type=template&id=aa866fa2&
var z_knobvue_type_template_id_aa866fa2_render = function render() {
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
        $event.preventDefault();
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
        $event.preventDefault();
        return _vm.handleBar.apply(null, arguments);
      },
      "touchend": function touchend($event) {
        _vm.drag = false;
      },
      "mousedown": function mousedown($event) {
        _vm.drag = true;
      },
      "mousemove": function mousemove($event) {
        $event.preventDefault();
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

var z_knobvue_type_template_id_aa866fa2_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/child-components/z-knob.vue?vue&type=template&id=aa866fa2&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/child-components/z-knob.vue?vue&type=script&lang=js&


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
  watch: {
    qty: function qty() {
      this.angle = Math.round((this.qty - this.min) * 360 / (this.max - this.min));
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
      if (tangle < 0) tangle = 360 + tangle;
      var prevAngle = Math.round(this.angle);
      var vm = this;
      var id = setInterval(function () {
        if (prevAngle > tangle) {
          prevAngle--;
        } else if (prevAngle < tangle) {
          prevAngle++;
        } else {
          clearInterval(id);
        }

        vm.angle = prevAngle;
        vm.$emit('update:qty', Math.round(prevAngle / 360 * (vm.max - vm.min)) + vm.min);
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
    this.$emit('update:qty', this.qty);
  }
});
// CONCATENATED MODULE: ./src/components/child-components/z-knob.vue?vue&type=script&lang=js&
 /* harmony default export */ var child_components_z_knobvue_type_script_lang_js_ = (z_knobvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/child-components/z-knob.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  child_components_z_knobvue_type_script_lang_js_,
  z_knobvue_type_template_id_aa866fa2_render,
  z_knobvue_type_template_id_aa866fa2_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var z_knob = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/z-spot.vue?vue&type=script&lang=js&




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
    ZSlider: z_slider["a" /* default */],
    ZKnob: z_knob
  },
  data: function data() {
    return {
      componentType: this.$options.name,
      zpos: {},
      innerpos: {},
      extrainfo: '',
      val: 0
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
      if (this.view === this.$zircle.getCurrentViewName()) {
        // eslint-disable-next-line
        this.zpos = this.styles;
        return true;
      } else {
        return false;
      }
    },
    sliderEnabled: function sliderEnabled() {
      return this.slider === true && this.square === false && this.$zircle.getThemeShape() === 'circle' || this.slider === true && this.circle === true && this.$zircle.getThemeShape() === 'square';
    },
    knobEnabled: function knobEnabled() {
      return this.knob === true && this.square === false && this.$zircle.getThemeShape() === 'circle' || this.knob === true && this.circle === true && this.$zircle.getThemeShape() === 'square';
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
    shape: function shape() {
      if (this.circle) {
        return 'is-circle';
      }

      if (this.square) {
        return 'is-square';
      }

      return '';
    },
    progressLabel: function progressLabel() {
      if (!this.computedQty) {
        return;
      }

      var unit = this.unit ? this.unit : '';
      return this.qty + '' + unit;
    },
    computedQty: {
      get: function get() {
        return this.qty;
      },
      set: function set(newValue) {
        // this.val = newValue
        this.$emit('update:qty', newValue);
      }
    }
  },
  methods: {
    pulse: function pulse() {
      var pulse = this.$refs.pulse;

      if (!pulse) {
        return;
      }

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
// CONCATENATED MODULE: ./src/components/z-spot.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_z_spotvue_type_script_lang_js_ = (z_spotvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/z-spot.vue





/* normalize component */

var z_spot_component = Object(componentNormalizer["a" /* default */])(
  components_z_spotvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var z_spot = __webpack_exports__["a"] = (z_spot_component.exports);

/***/ }),

/***/ "0e89":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"b70600c0-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/child-components/z-slider.vue?vue&type=template&id=ce324454&
var render = function render() {
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

var staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/child-components/z-slider.vue?vue&type=template&id=ce324454&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.function.name.js
var es6_function_name = __webpack_require__("7f7f");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/child-components/z-slider.vue?vue&type=script&lang=js&

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
// CONCATENATED MODULE: ./src/components/child-components/z-slider.vue?vue&type=script&lang=js&
 /* harmony default export */ var child_components_z_slidervue_type_script_lang_js_ = (z_slidervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/child-components/z-slider.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  child_components_z_slidervue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var z_slider = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ "1169":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__("2d95");
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),

/***/ "11e9":
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__("52a7");
var createDesc = __webpack_require__("4630");
var toIObject = __webpack_require__("6821");
var toPrimitive = __webpack_require__("6a99");
var has = __webpack_require__("69a8");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__("9e1e") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "1495":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var anObject = __webpack_require__("cb7c");
var getKeys = __webpack_require__("0d58");

module.exports = __webpack_require__("9e1e") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "214f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__("b0c5");
var redefine = __webpack_require__("2aba");
var hide = __webpack_require__("32e9");
var fails = __webpack_require__("79e5");
var defined = __webpack_require__("be13");
var wks = __webpack_require__("2b4c");
var regexpExec = __webpack_require__("520a");

var SPECIES = wks('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
})();

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;
    re.exec = function () { execCalled = true; return null; };
    if (KEY === 'split') {
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
    }
    re[SYMBOL]('');
    return !execCalled;
  }) : undefined;

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var fns = exec(
      defined,
      SYMBOL,
      ''[KEY],
      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
        if (regexp.exec === regexpExec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
          }
          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
        }
        return { done: false };
      }
    );
    var strfn = fns[0];
    var rxfn = fns[1];

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

/***/ "230e":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var document = __webpack_require__("7726").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "23c6":
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__("2d95");
var TAG = __webpack_require__("2b4c")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ "2621":
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "2877":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return normalizeComponent; });
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


/***/ }),

/***/ "28a5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isRegExp = __webpack_require__("aae3");
var anObject = __webpack_require__("cb7c");
var speciesConstructor = __webpack_require__("ebd6");
var advanceStringIndex = __webpack_require__("0390");
var toLength = __webpack_require__("9def");
var callRegExpExec = __webpack_require__("5f1b");
var regexpExec = __webpack_require__("520a");
var fails = __webpack_require__("79e5");
var $min = Math.min;
var $push = [].push;
var $SPLIT = 'split';
var LENGTH = 'length';
var LAST_INDEX = 'lastIndex';
var MAX_UINT32 = 0xffffffff;

// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
var SUPPORTS_Y = !fails(function () { RegExp(MAX_UINT32, 'y'); });

// @@split logic
__webpack_require__("214f")('split', 2, function (defined, SPLIT, $split, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return $split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? MAX_UINT32 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy[LAST_INDEX];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
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
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
    };
  } else {
    internalSplit = $split;
  }

  return [
    // `String.prototype.split` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = defined(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined
        ? splitter.call(separator, O, limit)
        : internalSplit.call(String(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (regexp, limit) {
      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (SUPPORTS_Y ? 'y' : 'g');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = SUPPORTS_Y ? q : 0;
        var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
        var e;
        if (
          z === null ||
          (e = $min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      A.push(S.slice(p));
      return A;
    }
  ];
});


/***/ }),

/***/ "2aba":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var has = __webpack_require__("69a8");
var SRC = __webpack_require__("ca5a")('src');
var $toString = __webpack_require__("fa5b");
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__("8378").inspectSource = function (it) {
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

/***/ "2aeb":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__("cb7c");
var dPs = __webpack_require__("1495");
var enumBugKeys = __webpack_require__("e11e");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__("230e")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__("fab2").appendChild(iframe);
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

/***/ "2b4c":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("5537")('wks');
var uid = __webpack_require__("ca5a");
var Symbol = __webpack_require__("7726").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "2d00":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "2d95":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "32e9":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var createDesc = __webpack_require__("4630");
module.exports = __webpack_require__("9e1e") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "38fd":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__("69a8");
var toObject = __webpack_require__("4bf8");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "41a0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__("2aeb");
var descriptor = __webpack_require__("4630");
var setToStringTag = __webpack_require__("7f20");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__("32e9")(IteratorPrototype, __webpack_require__("2b4c")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "456d":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__("4bf8");
var $keys = __webpack_require__("0d58");

__webpack_require__("5eda")('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),

/***/ "4588":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "4630":
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

/***/ "4917":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__("cb7c");
var toLength = __webpack_require__("9def");
var advanceStringIndex = __webpack_require__("0390");
var regExpExec = __webpack_require__("5f1b");

// @@match logic
__webpack_require__("214f")('match', 1, function (defined, MATCH, $match, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = defined(this);
      var fn = regexp == undefined ? undefined : regexp[MATCH];
      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
    function (regexp) {
      var res = maybeCallNative($match, regexp, this);
      if (res.done) return res.value;
      var rx = anObject(regexp);
      var S = String(this);
      if (!rx.global) return regExpExec(rx, S);
      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec(rx, S)) !== null) {
        var matchStr = String(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});


/***/ }),

/***/ "4bf8":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "520a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var regexpFlags = __webpack_require__("0bfb");

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var LAST_INDEX = 'lastIndex';

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/,
      re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
})();

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      // eslint-disable-next-line no-loop-func
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ "52a7":
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "5537":
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__("8378");
var global = __webpack_require__("7726");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__("2d00") ? 'pure' : 'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "5ca1":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var core = __webpack_require__("8378");
var hide = __webpack_require__("32e9");
var redefine = __webpack_require__("2aba");
var ctx = __webpack_require__("9b43");
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

/***/ "5dbc":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var setPrototypeOf = __webpack_require__("8b97").set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),

/***/ "5eda":
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__("5ca1");
var core = __webpack_require__("8378");
var fails = __webpack_require__("79e5");
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),

/***/ "5f1b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var classof = __webpack_require__("23c6");
var builtinExec = RegExp.prototype.exec;

 // `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw new TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }
  if (classof(R) !== 'RegExp') {
    throw new TypeError('RegExp#exec called on incompatible receiver');
  }
  return builtinExec.call(R, S);
};


/***/ }),

/***/ "613b":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("5537")('keys');
var uid = __webpack_require__("ca5a");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "626a":
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__("2d95");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "6821":
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__("626a");
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "69a8":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "6a99":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("d3f4");
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

/***/ "7333":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var DESCRIPTORS = __webpack_require__("9e1e");
var getKeys = __webpack_require__("0d58");
var gOPS = __webpack_require__("2621");
var pIE = __webpack_require__("52a7");
var toObject = __webpack_require__("4bf8");
var IObject = __webpack_require__("626a");
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__("79e5")(function () {
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
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || isEnum.call(S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;


/***/ }),

/***/ "7514":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__("5ca1");
var $find = __webpack_require__("0a49")(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__("9c6c")(KEY);


/***/ }),

/***/ "7726":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "77f1":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4588");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "79e5":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "7f20":
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__("86cc").f;
var has = __webpack_require__("69a8");
var TAG = __webpack_require__("2b4c")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "7f7f":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc").f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__("9e1e") && dP(FProto, NAME, {
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

/***/ "807d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"b70600c0-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/z-view.vue?vue&type=template&id=81b452b8&
var render = function render() {
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
      "height": "100%"
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
  }, [_vm._v("\n        " + _vm._s(_vm.label) + "\n      ")])]) : _vm._e(), _c('div', {
    ref: "maincontent",
    staticClass: "z-content maincontent",
    class: [_vm.shape, _vm.longContent, _vm.firefoxScroll],
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

var staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/z-view.vue?vue&type=template&id=81b452b8&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.match.js
var es6_regexp_match = __webpack_require__("4917");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.function.name.js
var es6_function_name = __webpack_require__("7f7f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.number.constructor.js
var es6_number_constructor = __webpack_require__("c5f6");

// EXTERNAL MODULE: ./src/components/child-components/z-slider.vue + 4 modules
var z_slider = __webpack_require__("0e89");

// EXTERNAL MODULE: ./src/components/child-components/z-scroll.vue + 4 modules
var z_scroll = __webpack_require__("9bfd");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/z-view.vue?vue&type=script&lang=js&





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
    ZScroll: z_scroll["a" /* default */],
    ZSlider: z_slider["a" /* default */]
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
      return this.circle ? 'is-circle' : this.square ? 'is-square' : '';
    },
    sliderEnabled: function sliderEnabled() {
      var result;
      this.slider === true && this.square === false && this.$zircle.getThemeShape() === 'circle' ? result = true : this.slider === true && this.circle === true && this.$zircle.getThemeShape() === 'square' ? result = true : result = false;
      return result;
    },
    scrollBarEnabled: function scrollBarEnabled() {
      var result;
      this.scrollBar === true && this.square === false && this.$zircle.getThemeShape() === 'circle' ? result = true : this.scrollBar === true && this.circle === true && this.$zircle.getThemeShape() === 'square' ? result = true : result = false;
      return result;
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
          width: width + 75 + 'px',
          height: width + 75 + 'px',
          margin: -((width + 75) / 2) + 'px 0 0 ' + -((width + 75) / 2) + 'px'
        }
      };
    },
    animation: function animation() {
      if (this.fullView === this.$zircle.getCurrentViewName() && this.$zircle.getNavigationMode() === 'forward') {
        var zstyle = 'opacity: 1; transition: opacity 1000ms linear;';
      } else if (this.fullView === this.$zircle.getCurrentViewName() && this.$zircle.getNavigationMode() !== 'forward') {
        zstyle = 'opacity: 1;';
      } else {
        zstyle = 'opacity: 0; transition: opacity 500ms linear;';
      }

      return zstyle;
    },
    longContent: function longContent() {
      return {
        'long-content': this.scrollBarEnabled === true,
        'overflow-square': this.scrollBarEnabled === false
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
    scrollVal: function scrollVal() {
      if (this.scrollBar === true) {
        var container = this.$refs.maincontent;
        container.scrollTop = (45 + this.scrollVal) * 100 / 86 * (container.scrollHeight - container.clientHeight) / 100;
      }
    }
  },
  mounted: function mounted() {
    if (navigator.userAgent.match('Firefox') && this.scrollBarEnabled) {
      this.$zircle.setLog('Firefox desktop detected. Scroll events disabled');
      this.ffox = true;
    }

    this.zpos = this.styles;
    var vm = this;
    setTimeout(function () {
      vm.isMounted = true;
    }, 1000);
  }
});
// CONCATENATED MODULE: ./src/components/z-view.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_z_viewvue_type_script_lang_js_ = (z_viewvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/z-view.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_z_viewvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var z_view = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ "8378":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.12' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "84f2":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "86cc":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("cb7c");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var toPrimitive = __webpack_require__("6a99");
var dP = Object.defineProperty;

exports.f = __webpack_require__("9e1e") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
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

/***/ "8b97":
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__("d3f4");
var anObject = __webpack_require__("cb7c");
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__("9b43")(Function.call, __webpack_require__("11e9").f(Object.prototype, '__proto__').set, 2);
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

/***/ "8bbf":
/***/ (function(module, exports) {

module.exports = require("vue");

/***/ }),

/***/ "9093":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__("ce10");
var hiddenKeys = __webpack_require__("e11e").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ "9b43":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("d8e8");
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

/***/ "9bfd":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"b70600c0-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/child-components/z-scroll.vue?vue&type=template&id=0e22744f&
var render = function render() {
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

var staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/child-components/z-scroll.vue?vue&type=template&id=0e22744f&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.function.name.js
var es6_function_name = __webpack_require__("7f7f");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/child-components/z-scroll.vue?vue&type=script&lang=js&

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
// CONCATENATED MODULE: ./src/components/child-components/z-scroll.vue?vue&type=script&lang=js&
 /* harmony default export */ var child_components_z_scrollvue_type_script_lang_js_ = (z_scrollvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/child-components/z-scroll.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  child_components_z_scrollvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var z_scroll = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ "9c6c":
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__("2b4c")('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__("32e9")(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "9def":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("4588");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "9e1e":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("79e5")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "a481":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__("cb7c");
var toObject = __webpack_require__("4bf8");
var toLength = __webpack_require__("9def");
var toInteger = __webpack_require__("4588");
var advanceStringIndex = __webpack_require__("0390");
var regExpExec = __webpack_require__("5f1b");
var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
__webpack_require__("214f")('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = defined(this);
      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
      return fn !== undefined
        ? fn.call(searchValue, O, replaceValue)
        : $replace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      var res = maybeCallNative($replace, regexp, this, replaceValue);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);
      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;
        results.push(result);
        if (!global) break;
        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }
      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];
        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

    // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return $replace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});


/***/ }),

/***/ "a517":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"b70600c0-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/z-list.vue?vue&type=template&id=0176a6fe&
var render = function render() {
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
        "distance": 112,
        "angle": (180 - (180 - _vm.$zircle.getNumberOfPages() * 10)) / _vm.$zircle.getNumberOfPages() * (_vm.$zircle.getNumberOfPages() - index) + (180 - (180 - (180 - _vm.$zircle.getNumberOfPages() * 10)) - (180 - (180 - _vm.$zircle.getNumberOfPages() * 10)) / _vm.$zircle.getNumberOfPages()) / 2,
        "active": _vm.$zircle.getCurrentPageIndex()
      },
      on: {
        "mouseover": function mouseover($event) {
          return _vm.$zircle.allowBackwardNavigation(true);
        },
        "mouseleave": function mouseleave($event) {
          return _vm.$zircle.allowBackwardNavigation(false);
        },
        "click": function click($event) {
          return _vm.$zircle.setCurrentPageIndex(index);
        }
      }
    });
  }) : _vm._e()], 2);
};

var staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/z-list.vue?vue&type=template&id=0176a6fe&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.function.name.js
var es6_function_name = __webpack_require__("7f7f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.number.constructor.js
var es6_number_constructor = __webpack_require__("c5f6");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"b70600c0-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/child-components/z-pagination.vue?vue&type=template&id=1601c556&
var z_paginationvue_type_template_id_1601c556_render = function render() {
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

var z_paginationvue_type_template_id_1601c556_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/child-components/z-pagination.vue?vue&type=template&id=1601c556&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/child-components/z-pagination.vue?vue&type=script&lang=js&


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
        active: this.active === this.index,
        deactive: this.active < this.index || this.active > this.index
      };
    },
    shape: function shape() {
      return this.$zircle.getThemeShape() === 'square' ? 'papa' : '';
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
  mounted: function mounted() {
    this.zpos = this.styles;
  }
});
// CONCATENATED MODULE: ./src/components/child-components/z-pagination.vue?vue&type=script&lang=js&
 /* harmony default export */ var child_components_z_paginationvue_type_script_lang_js_ = (z_paginationvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/child-components/z-pagination.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  child_components_z_paginationvue_type_script_lang_js_,
  z_paginationvue_type_template_id_1601c556_render,
  z_paginationvue_type_template_id_1601c556_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var z_pagination = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/z-list.vue?vue&type=script&lang=js&




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
// CONCATENATED MODULE: ./src/components/z-list.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_z_listvue_type_script_lang_js_ = (z_listvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/z-list.vue





/* normalize component */

var z_list_component = Object(componentNormalizer["a" /* default */])(
  components_z_listvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var z_list = __webpack_exports__["a"] = (z_list_component.exports);

/***/ }),

/***/ "aa77":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("5ca1");
var defined = __webpack_require__("be13");
var fails = __webpack_require__("79e5");
var spaces = __webpack_require__("fdef");
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

/***/ "aae3":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__("d3f4");
var cof = __webpack_require__("2d95");
var MATCH = __webpack_require__("2b4c")('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),

/***/ "ac6a":
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__("cadf");
var getKeys = __webpack_require__("0d58");
var redefine = __webpack_require__("2aba");
var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var wks = __webpack_require__("2b4c");
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

/***/ "b0c5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var regexpExec = __webpack_require__("520a");
__webpack_require__("5ca1")({
  target: 'RegExp',
  proto: true,
  forced: regexpExec !== /./.exec
}, {
  exec: regexpExec
});


/***/ }),

/***/ "b5cf":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "b635":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("07a4");
/* harmony import */ var _components_z_canvas_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("03dd");
/* harmony import */ var _components_z_view_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("807d");
/* harmony import */ var _components_z_list_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("a517");
/* harmony import */ var _components_z_spot_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("0dda");
/* harmony import */ var _components_z_dialog_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("e34c");






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
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "be13":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "c366":
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__("6821");
var toLength = __webpack_require__("9def");
var toAbsoluteIndex = __webpack_require__("77f1");
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

/***/ "c5f6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("7726");
var has = __webpack_require__("69a8");
var cof = __webpack_require__("2d95");
var inheritIfRequired = __webpack_require__("5dbc");
var toPrimitive = __webpack_require__("6a99");
var fails = __webpack_require__("79e5");
var gOPN = __webpack_require__("9093").f;
var gOPD = __webpack_require__("11e9").f;
var dP = __webpack_require__("86cc").f;
var $trim = __webpack_require__("aa77").trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__("2aeb")(proto)) == NUMBER;
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
  for (var keys = __webpack_require__("9e1e") ? gOPN(Base) : (
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
  __webpack_require__("2aba")(global, NUMBER, $Number);
}


/***/ }),

/***/ "c69a":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("9e1e") && !__webpack_require__("79e5")(function () {
  return Object.defineProperty(__webpack_require__("230e")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "c8ba":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "ca5a":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "cadf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__("9c6c");
var step = __webpack_require__("d53b");
var Iterators = __webpack_require__("84f2");
var toIObject = __webpack_require__("6821");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__("01f9")(Array, 'Array', function (iterated, kind) {
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

/***/ "cb7c":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "cd1c":
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__("e853");

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),

/***/ "ce10":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("69a8");
var toIObject = __webpack_require__("6821");
var arrayIndexOf = __webpack_require__("c366")(false);
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');

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


/***/ }),

/***/ "d3f4":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "d53b":
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "d8e8":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "e11e":
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "e34c":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"b70600c0-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/z-dialog.vue?vue&type=template&id=4c2763c8&
var render = function render() {
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
      "height": "100%"
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
    class: [_vm.shape, _vm.longContent, _vm.firefoxScroll],
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

var staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/z-dialog.vue?vue&type=template&id=4c2763c8&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.match.js
var es6_regexp_match = __webpack_require__("4917");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.function.name.js
var es6_function_name = __webpack_require__("7f7f");

// EXTERNAL MODULE: ./src/components/child-components/z-slider.vue + 4 modules
var z_slider = __webpack_require__("0e89");

// EXTERNAL MODULE: ./src/components/child-components/z-scroll.vue + 4 modules
var z_scroll = __webpack_require__("9bfd");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/z-dialog.vue?vue&type=script&lang=js&




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
    ZSlider: z_slider["a" /* default */],
    ZScroll: z_scroll["a" /* default */]
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
      var result;
      this.scrollBar === true && this.square === false && this.$zircle.getThemeShape() === 'circle' ? result = true : this.scrollBar === true && this.circle === true && this.$zircle.getThemeShape() === 'square' ? result = true : result = false;
      return result;
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
        'long-content': this.scrollBarEnabled === true,
        'overflow-square': this.scrollBarEnabled === false
      };
    },
    firefoxScroll: function firefoxScroll() {
      return {
        'z-scroll-disabled-for-firefox': this.scrollBar === true && this.ffox === true
      };
    },
    selfCloseEnabled: function selfCloseEnabled() {
      var result;
      this.selfClose === true && this.square === false && this.$zircle.getThemeShape() === 'circle' ? result = true : this.selfClose === true && this.circle === true && this.$zircle.getThemeShape() === 'square' ? result = true : result = false;
      return result;
    },
    shape: function shape() {
      return this.circle ? 'is-circle' : this.square ? 'is-square' : '';
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

    if (navigator.userAgent.match('Firefox') && this.scrollBarEnabled) {
      this.$zircle.setLog('Firefox desktop detected. Scroll events disabled');
      this.ffox = true;
    }

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
// CONCATENATED MODULE: ./src/components/z-dialog.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_z_dialogvue_type_script_lang_js_ = (z_dialogvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/z-dialog.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_z_dialogvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var z_dialog = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ "e853":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var isArray = __webpack_require__("1169");
var SPECIES = __webpack_require__("2b4c")('species');

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

/***/ "ebd6":
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__("cb7c");
var aFunction = __webpack_require__("d8e8");
var SPECIES = __webpack_require__("2b4c")('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),

/***/ "f6fd":
/***/ (function(module, exports) {

// document.currentScript polyfill by Adam Miller

// MIT license

(function(document){
  var currentScript = "currentScript",
      scripts = document.getElementsByTagName('script'); // Live NodeList collection

  // If browser needs currentScript polyfill, add get currentScript() to the document object
  if (!(currentScript in document)) {
    Object.defineProperty(document, currentScript, {
      get: function(){

        // IE 6-10 supports script readyState
        // IE 10+ support stack trace
        try { throw new Error(); }
        catch (err) {

          // Find the second match for the "at" string to get file src url from stack.
          // Specifically works with the format of stack traces in IE.
          var i, res = ((/.*at [^\(]*\((.*):.+:.+\)$/ig).exec(err.stack) || [false])[1];

          // For all scripts on the page, if src matches or if ready state is interactive, return the script tag
          for(i in scripts){
            if(scripts[i].src == res || scripts[i].readyState == "interactive"){
              return scripts[i];
            }
          }

          // If no match, return null
          return null;
        }
      }
    });
  }
})(document);


/***/ }),

/***/ "f751":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__("5ca1");

$export($export.S + $export.F, 'Object', { assign: __webpack_require__("7333") });


/***/ }),

/***/ "fa5b":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("5537")('native-function-to-string', Function.toString);


/***/ }),

/***/ "fab2":
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__("7726").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  if (true) {
    __webpack_require__("f6fd")
  }

  var i
  if ((i = window.document.currentScript) && (i = i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: ./src/index.js
var src = __webpack_require__("b635");

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (src["a" /* default */]);



/***/ }),

/***/ "fdef":
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ })

/******/ });
//# sourceMappingURL=zircle.common.js.map