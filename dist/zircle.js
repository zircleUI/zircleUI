/*!
 * zircle v0.2.4
 * (c) 2017 Juan Martin Muda
 * Released under the MIT License.
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.Zircle = global.Zircle || {})));
}(this, (function (exports) { 'use strict';

var store = {
  state: {
    position: {
      X: 0,
      Y: 0,
      scale: 1,
      Xi: 0,
      Yi: 0,
      scalei: 1
    },
    lastView: '',
    currentView: '',
    previousView: '',
    pastView: '',
    history: [],
    cache: [],
    lastViewCache: {
      view: ''
    },
    alert: false,
    mode: 'forward',
    router: false,
    shadowPosition: {
    },
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
    // temporary for pagination
    selectedItem: '',
    currentPage: 0,
    items: [],
    pages: []
  },
  routerHooks: function routerHooks (data) {
    var vm = data;
    data.$zircleStore.setView(vm.initialView);
    data.$zircleStore.state.router = vm.enableRouter;
    data.$router.onReady(function () {
      if (vm.$zircleStore.state.previousView === '' && vm.$router.currentRoute.name !== vm.initialView) {
        vm.$router.push({path: '/'});
      }
    });
    data.$router.beforeEach(function (to, from, next) {
      if (to.name === data.$zircleStore.state.previousView) {
        // caso 1: si a la vista dnd se dirije el router es = a la previa > goback
        // console.log('pa tras')
        data.$zircleStore.state.mode = 'backward';
        data.$zircleStore.goBack();
        next();
      } else if (to.name === data.$zircleStore.state.shadowPosition.go) {
        // caso 2: si a la vista dnd voy es = a la ultima vista en cache
        // navogacion con clicks
        // console.log('pa lante')
        data.$zircleStore.state.mode = 'forward';
        data.$zircleStore.setAppPos(data.$zircleStore.state.shadowPosition);
        data.$zircleStore.state.shadowPosition = {};
        next();
      } else if (to.name === data.$zircleStore.state.lastViewCache.view) {
        // caso 3: si a la vista dnd no esta en cache futuro uso el shadow (vista nueva)
        // navegacion con flechas
        // console.log('pa lante cache')
        data.$zircleStore.state.mode = 'forward';
        data.$zircleStore.setAppPos(data.$zircleStore.state.lastViewCache.position);
        data.$zircleStore.state.lastViewCache = {};
        next();
      } else {
        console.log('error');
        next(from.name);
      }
    });
  },
  setScroll: function setScroll (angle) {
    store.state.scroll = angle;
  },
  killLastView: function killLastView () {
    store.state.lastView = '';
  },
  // no uso media query asi que seteo el ancho de cad circulo aca
  getDimensions: function getDimensions () {
    // small devices
    if (window.matchMedia('(max-width: 319px)').matches) {
      store.state.zircleWidth.xl = 200;
      store.state.zircleWidth.l = 70;
      store.state.zircleWidth.m = 50;
      store.state.zircleWidth.s = 30;
      store.state.zircleWidth.xs = 20;
      store.state.zircleWidth.xxs = 20;
    }
    // medium
    if (window.matchMedia('(min-width: 320px)').matches) {
      store.state.zircleWidth.xl = 230;
      store.state.zircleWidth.l = 85;
      store.state.zircleWidth.m = 65;
      store.state.zircleWidth.s = 45;
      store.state.zircleWidth.xs = 30;
      store.state.zircleWidth.xxs = 20;
    }
    // medium - large devices
    if (window.matchMedia('(min-width: 375px) and (orientation: portrait)').matches) {
      store.state.zircleWidth.xl = 260;
      store.state.zircleWidth.l = 90;
      store.state.zircleWidth.m = 70;
      store.state.zircleWidth.s = 50;
      store.state.zircleWidth.xs = 40;
      store.state.zircleWidth.xxs = 30;
    }
    if (window.matchMedia('(min-width: 375px) and (orientation: landscape)').matches) {
      store.state.zircleWidth.xl = 270;
      store.state.zircleWidth.l = 90;
      store.state.zircleWidth.m = 70;
      store.state.zircleWidth.s = 50;
      store.state.zircleWidth.xs = 40;
      store.state.zircleWidth.xxs = 30;
    }
    // tablets
    if (window.matchMedia('(min-width: 768px) and (orientation: portrait) and (min-pixel-ratio: 2)').matches) {
      store.state.zircleWidth.xl = 340;
      store.state.zircleWidth.l = 120;
      store.state.zircleWidth.m = 100;
      store.state.zircleWidth.s = 80;
      store.state.zircleWidth.xs = 60;
      store.state.zircleWidth.xxs = 40;
    }
    if (window.matchMedia('(min-width: 768px) and (orientation: landscape)').matches) {
      store.state.zircleWidth.xl = 360;
      store.state.zircleWidth.l = 120;
      store.state.zircleWidth.m = 100;
      store.state.zircleWidth.s = 80;
      store.state.zircleWidth.xs = 60;
      store.state.zircleWidth.xxs = 40;
    }
    // desktop or large tablets
    if (window.matchMedia('(min-width: 992px) and (orientation: portrait)').matches) {
      store.state.zircleWidth.xl = 420;
      store.state.zircleWidth.l = 120;
      store.state.zircleWidth.m = 100;
      store.state.zircleWidth.s = 80;
      store.state.zircleWidth.xs = 60;
      store.state.zircleWidth.xxs = 40;
    }
    if (window.matchMedia('(min-width: 992px) and (orientation: landscape)').matches) {
      store.state.zircleWidth.xl = 420;
      store.state.zircleWidth.l = 120;
      store.state.zircleWidth.m = 100;
      store.state.zircleWidth.s = 80;
      store.state.zircleWidth.xs = 60;
      store.state.zircleWidth.xxs = 40;
    }
    // large desktop
    if (window.matchMedia('(min-width: 1200px) and (orientation: portrait)').matches) {
      store.state.zircleWidth.xl = 430;
      store.state.zircleWidth.l = 130;
      store.state.zircleWidth.m = 110;
      store.state.zircleWidth.s = 90;
      store.state.zircleWidth.xs = 70;
      store.state.zircleWidth.xxs = 50;
    }
    // xl desktop
    if (window.matchMedia('(min-width: 1800px)').matches) {
      store.state.zircleWidth.xl = 650;
      store.state.zircleWidth.l = 130;
      store.state.zircleWidth.m = 110;
      store.state.zircleWidth.s = 90;
      store.state.zircleWidth.xs = 70;
      store.state.zircleWidth.xxs = 50;
    }
  },
  point: function point (component) {
    // VARIABLE DECLARATION
    var scale = 1;
    var scalei = 1;
    var currentX = 0;
    var currentY = 0;
    var currentXi = 0;
    var currentYi = 0;
    var parentPosition = {};
    var newPosition = {};
    // EJECUTA FUNCION
    if (component.type === 'panel') {
      if (store.state.currentView === component.viewName) {
        newPosition = {
          X: store.state.cache[store.state.cache.length - 1].position.X,
          Xi: store.state.cache[store.state.cache.length - 1].position.Xi,
          Y: store.state.cache[store.state.cache.length - 1].position.Y,
          Yi: store.state.cache[store.state.cache.length - 1].position.Yi,
          scalei: store.state.cache[store.state.cache.length - 1].position.scalei,
          scale: store.state.cache[store.state.cache.length - 1].position.scale
        };
      } if (store.state.previousView === component.viewName) {
        newPosition = {
          X: store.state.cache[store.state.cache.length - 2].position.X,
          Xi: store.state.cache[store.state.cache.length - 2].position.Xi,
          Y: store.state.cache[store.state.cache.length - 2].position.Y,
          Yi: store.state.cache[store.state.cache.length - 2].position.Yi,
          scalei: store.state.cache[store.state.cache.length - 2].position.scalei,
          scale: store.state.cache[store.state.cache.length - 2].position.scale
        };
      } else if (store.state.pastView === component.viewName) {
        newPosition = {
          X: store.state.cache[store.state.cache.length - 3].position.X,
          Xi: store.state.cache[store.state.cache.length - 3].position.Xi,
          Y: store.state.cache[store.state.cache.length - 3].position.Y,
          Yi: store.state.cache[store.state.cache.length - 3].position.Yi,
          scalei: store.state.cache[store.state.cache.length - 3].position.scalei,
          scale: store.state.cache[store.state.cache.length - 3].position.scale
        };
      } else {
        newPosition = {
          X: store.state.position.X,
          Xi: store.state.position.Xi,
          Y: store.state.position.Y,
          Yi: store.state.position.Yi,
          scalei: store.state.position.scalei,
          scale: store.state.position.scale
        };
      }
    } else {
      var angle = component.angle;
      var distance = component.distance;
      if (component.size === 'xxs') {
        scale = store.state.zircleWidth.xl / store.state.zircleWidth.xxs;
        scalei = store.state.zircleWidth.xxs / store.state.zircleWidth.xl;
      } else if (component.size === 'extrasmall') {
        scale = store.state.zircleWidth.xl / store.state.zircleWidth.xs;
        scalei = store.state.zircleWidth.xs / store.state.zircleWidth.xl;
      } else if (component.size === 'small') {
        scale = store.state.zircleWidth.xl / store.state.zircleWidth.s;
        scalei = store.state.zircleWidth.s / store.state.zircleWidth.xl;
      } else if (component.size === 'medium') {
        scale = store.state.zircleWidth.xl / store.state.zircleWidth.m;
        scalei = store.state.zircleWidth.m / store.state.zircleWidth.xl;
      } else if (component.size === 'large') {
        scale = store.state.zircleWidth.xl / store.state.zircleWidth.l;
        scalei = store.state.zircleWidth.l / store.state.zircleWidth.xl;
      } else if (component.size === 'extralarge') {
        scale = 1;
        scalei = 1;
      }
      if (distance === 0) {
        currentX = 0;
        currentY = 0;
      } else {
        currentX = ((store.state.zircleWidth.xl / 2) * distance / 100) * Math.cos(angle * (Math.PI / 180));
        currentY = ((store.state.zircleWidth.xl / 2) * distance / 100) * Math.sin(angle * (Math.PI / 180));
      }
      if (currentX > 0) {
        currentXi = -Math.abs(Number(currentX));
      } else {
        currentXi = Math.abs(Number(currentX));
      }
      if (currentY > 0) {
        currentYi = -Math.abs(Number(currentY));
      } else {
        currentYi = Math.abs(Number(currentY));
      }
      if (component.$parent.type === 'panel') {
        parentPosition = {
          Xi: component.$parent.position.Xi,
          Yi: component.$parent.position.Yi,
          X: component.$parent.position.X,
          Y: component.$parent.position.Y,
          scalei: component.$parent.position.scalei,
          scale: component.$parent.position.scale
        };
      } else {
        parentPosition = {
          Xi: 0,
          Yi: 0,
          X: 0,
          Y: 0,
          scalei: 1,
          scale: 1
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
    return newPosition
  },
  setView: function setView (view) {
    store.state.currentView = view.toLowerCase();
    store.setHistory(view.toLowerCase());
    if (store.state.history.length === 1) {
      store.state.previousView = '';
      store.state.pastView = '';
    } else if (store.state.history.length > 1) {
      store.state.previousView = store.state.history[store.state.history.length - 2];
      store.state.pastView = store.state.history[store.state.history.length - 3];
    }
  },
  setAppPos: function setAppPos (data) {
    store.state.position = {
      X: data.X,
      Y: data.Y,
      scale: data.scale,
      Xi: data.Xi,
      Yi: data.Yi,
      scalei: data.scalei,
      go: data.go
    };
    store.setView(data.go);
  },
  setHistory: function setHistory (view) {
    // only component with viewName
    var lastView = store.state.history[store.state.history.length - 1];
    if (view !== lastView) {
      store.state.history.push(view);
      var cacheView = {
        view: view,
        position: store.state.position
      };
      store.state.cache.push(cacheView);
    }
  },
  goBack: function goBack () {
    if (store.state.cache.length > 1) {
      store.state.history.pop();
      var current = store.state.history[store.state.history.length - 1];
      store.state.lastViewCache = store.state.cache[store.state.cache.length - 1];
      store.state.lastView = store.state.lastViewCache.view;
      store.state.cache.pop();
      var currentCache = store.state.cache[store.state.cache.length - 1];
      var position = currentCache.position;
      position.go = current;
      store.state.mode = 'backward';
      store.setAppPos(position);
    }
  }
};

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
  data: function data () {
    return {
      state: store.state,
      store: store
    }
  },
  computed: {
    position: function position () {
      return this.store.point(this)
    },
    classes: function classes () {
      // var colorp = this.color
      return {
        // currclass: this.viewName === this.state.currentView,
        // lastclass: this.viewName === this.state.lastView,
        pastclass: this.type === 'panel' && this.viewName === this.state.pastView,
        prevclass: this.type === 'panel' && this.viewName === this.state.previousView,
        hidden: this.$parent.viewName === this.state.previousView,
        zoom: this.type === 'scale' && this.gotoview !== undefined
      }
    },
    colors: function colors () {
      return this.color
    }
  }
};

var zpanel = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"zui main",class:[_vm.classes, _vm.colors],staticStyle:{"overflow":"visible"},style:(_vm.styles.main),attrs:{"title":_vm.viewName,"type":"panel"},on:{"click":function($event){$event.stopPropagation();_vm.move($event);}}},[_c('div',{staticClass:"plate",style:(_vm.styles.plate)}),_vm._v(" "),(_vm.range === true)?_c('z-range',{attrs:{"progress":_vm.progress}}):_vm._e(),_vm._v(" "),(_vm.scrollBar === true)?_c('z-scroll',{staticStyle:{"overflow":"visible"},attrs:{"scrollVal":_vm.scrollVal},on:{"update:scrollVal":function($event){_vm.scrollVal=$event;}}}):_vm._e(),_vm._v(" "),(_vm.slider === true)?_c('z-slider',{attrs:{"progress":_vm.progress}}):_vm._e(),_vm._v(" "),_c('div',{staticClass:"z-contentbox dashed",style:(_vm.styles.background)},[_vm._t("picture"),_vm._v(" "),_c('div',{staticClass:"z-content maindisc",class:[_vm.classesContent],style:(_vm.styles.hideScroll),on:{"scroll":_vm.scroll}},[_c('section',{staticClass:"z-text"},[_vm._t("default"),_vm._v(" "),_c('span',{staticClass:"bottom"})],2)])],2),_vm._v(" "),_vm._t("circles")],2)},staticRenderFns: [],
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
  data: function data () {
    return {
      type: 'panel',
      scrollBar: false,
      alertar: '',
      scrollVal: -45,
      width: 0,
      img: {}
    }
  },
  computed: {
    viewName: function viewName () {
      return this.view.toLowerCase()
    },
    styles: function styles () {
      return {
        main: {
          width: this.state.zircleWidth.xl + 'px',
          height: this.state.zircleWidth.xl + 'px',
          margin: -(this.state.zircleWidth.xl / 2) + 'px 0 0 ' + -(this.state.zircleWidth.xl / 2) + 'px',
          transform: 'translate3d(' + this.position.X + 'px, ' + this.position.Y + 'px, 0px) scale(' + this.position.scalei + ')'
        },
        plate: {
          width: this.state.zircleWidth.xl + 50 + 'px',
          height: this.state.zircleWidth.xl + 50 + 'px',
          margin: -((this.state.zircleWidth.xl + 50) / 2) + 'px 0 0 ' + -((this.state.zircleWidth.xl + 50) / 2) + 'px'
        },
        hideScroll: {
          width: this.state.zircleWidth.xl - 10 + 'px'
        },
        background: {
          // backgroundImage: `url(${this.imgSource})`
        }
      }
    },
    classesContent: function classesContent () {
      return {
        longtext: this.scrollBar === true
      }
    }
  },
  methods: {
    scroll: function scroll () {
      var test1 = this.$el.querySelector('.z-content');
      this.scrollVal = -45 + ((test1.scrollTop * 100 / (test1.scrollHeight - test1.clientHeight)) * 86 / 100);
    },
    move: function move () {
      if (this.state.previousView === this.viewName) {
        if (this.state.router === true && this.state.previousView !== '') {
          this.$router.back();
        } else {
          this.store.goBack();
        }
      }
      if (this.state.pastView === this.viewName) {
        if (this.state.router === true) {
          this.$router.back();
        } else {
          this.store.goBack();
        }
      }
    }
  },
  watch: {
    scrollVal: function scrollVal () {
      var test1 = this.$el.querySelector('.z-content');
      test1.scrollTop = ((45 + this.scrollVal) * 100 / 86) * (test1.scrollHeight - test1.clientHeight) / 100;
    }
  },
  mounted: function mounted () {
    var test = this.$el.querySelector('.z-content > .z-text'); // guarda con esto que no anda bien
    if (test.clientHeight > this.state.zircleWidth.xl) {
      this.scrollBar = true;
    } else {
      this.scrollBar = false;
    }
  }
};

var zscale = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"zui disc",class:[_vm.classes, _vm.colors],style:(_vm.style.main),attrs:{"title":"z-scale","type":_vm.type},on:{"click":function($event){$event.stopPropagation();_vm.move($event);}}},[(_vm.range === true)?_c('z-range',{attrs:{"progress":_vm.progress}}):_vm._e(),_vm._v(" "),(_vm.slider === true)?_c('z-slider',{attrs:{"progress":_vm.progress}}):_vm._e(),_vm._v(" "),_c('section',{staticClass:"z-content label",staticStyle:{"overflow":"visible"},style:(_vm.style.label)},[_vm._t("label")],2),_vm._v(" "),_c('div',{staticClass:"z-content"},[_vm._t("picture"),_vm._v(" "),_c('section',[_vm._t("default")],2)],2),_vm._v(" "),_vm._t("circles")],2)},staticRenderFns: [],
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
  computed: {
    gotoviewName: function gotoviewName () {
      if (this.gotoview !== undefined) {
        return this.gotoview.toLowerCase()
      }
    },
    style: function style () {
      switch (this.size) {
        case 'large':
          var zwidth = this.state.zircleWidth.l;
          break
        case 'medium':
          zwidth = this.state.zircleWidth.m;
          break
        case 'small':
          zwidth = this.state.zircleWidth.s;
          break
        case 'extrasmall':
          zwidth = this.state.zircleWidth.xs;
          break
        case 'xxs':
          zwidth = this.state.zircleWidth.xxs / 3;
          break
      }
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
      }
    }
  },
  methods: {
    move: function move () {
      if (this.$parent.view.toLowerCase() === this.state.previousView) {
        if (this.state.router === true && this.state.previousView !== '') {
          this.$router.back();
        }
        if (this.state.router === false) {
          this.store.goBack();
        }
      } else {
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
            go: go,
            next: true
          };
          // this.state.position = position
          // console.log('go: ' + go)
          if (this.state.history.length < 9) {
            if (this.state.router === true) {
              this.state.shadowPosition = position;
              // this.store.setAppPos(position)
              this.$router.push({name: go});
            } else {
              this.store.state.mode = 'forward';
              this.store.setAppPos(position);
            }
          } else {
            console.log('Max level of deep reached');
          }
          // this.$el.style.opacity = 0
        } else {
          console.log('gotoview is not defined');
        }
      }
    }
  }
};

var zitem = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"zui disc",class:[_vm.classes, _vm.colors],style:(_vm.styles.main),attrs:{"title":"z-item"},on:{"click":function($event){$event.stopPropagation();_vm.move($event);}}},[_c('section',{staticClass:"z-content label",staticStyle:{"overflow":"visible"},style:(_vm.styles.label)},[_c('span',[_vm._v(_vm._s(_vm.label))])]),_vm._v(" "),_c('div',{staticClass:"z-content"},[_c('img',{attrs:{"src":_vm.image,"width":"100%","height":"100%"}}),_vm._v(" "),_c('section')])])},staticRenderFns: [],
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
    gotoview: {
      default: 'item'
    },
    angle: {
      type: Number,
      required: true
    }
  },
  data: function data () {
    return {
      type: 'item',
      state: store.state,
      store: store
    }
  },
  computed: {
    position: function position () {
      return this.store.point(this)
    },
    classes: function classes () {
      // var colorp = this.color
      return {
        // currclass: this.viewName === this.state.currentView,
        // lastclass: this.viewName === this.state.lastView,
        pastclass: this.type === 'panel' && this.viewName === this.state.pastView,
        prevclass: this.type === 'panel' && this.viewName === this.state.previousView,
        hidden: this.$parent.viewName === this.state.previousView,
        zoom: this.type === 'scale' && this.gotoview !== undefined
      }
    },
    colors: function colors () {
      return this.color
    },
    distance: function distance () {
      return this.state.pages[this.state.currentPage].length === 1 ? 0 : 60
    },
    gotoviewName: function gotoviewName () {
      if (this.gotoview !== undefined) {
        return this.gotoview.toLowerCase()
      }
    },
    styles: function styles () {
      switch (this.size) {
        case 'large':
          var zwidth = this.state.zircleWidth.l;
          break
        case 'medium':
          zwidth = this.state.zircleWidth.m;
          break
        case 'small':
          zwidth = this.state.zircleWidth.s;
          break
        case 'extrasmall':
          zwidth = this.state.zircleWidth.xs;
          break
        case 'xxs':
          zwidth = this.state.zircleWidth.xxs;
          break
      }
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
      }
    }
  },
  methods: {
    move: function move () {
      if (this.gotoview !== undefined) {
        var go = this.gotoviewName;
        var item = this.item;
        if (item !== undefined) {
          this.state.selectedItem = item;
        }
        var position = {
          X: this.position.Xabs,
          Y: this.position.Yabs,
          scale: this.position.scale,
          Xi: this.position.Xi,
          Yi: this.position.Yi,
          scalei: this.position.scalei,
          go: go,
          next: true
        };
        if (this.state.router === true) {
          this.state.shadowPosition = position;
          if (item !== undefined) {
            this.$router.push({name: go, params: {id: item}});
          } else {
            this.$router.push({name: go});
          }
        } else {
          this.store.state.mode = 'forward';
          this.store.setAppPos(position);
        }
      } else {
        // no action
      }
    }
  }
};

/* eslint-disable no-new */
var zcanvas = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:[_vm.$zircleStore.state.color, _vm.$zircleStore.state.theme],style:([_vm.state.previousView !== '' ? {cursor: 'zoom-out'} : {}]),attrs:{"id":"z-container"},on:{"click":function($event){$event.stopPropagation();_vm.goback($event);}}},[_c('div',{attrs:{"id":"z-point"}},[_vm._t("default")],2)])},staticRenderFns: [],
  props: {
    isStandalone: {
      type: Boolean,
      default: true
    }
  },
  data: function data () {
    return {
      state: store.state,
      store: store
    }
  },
  methods: {
    goback: function goback () {
      if (this.store.state.router === true && this.store.state.previousView !== '') {
        this.$router.back();
      }
      if (this.store.state.router === false) {
        this.store.goBack();
      }
    }
  },
  mounted: function mounted () {
    var vue = this;
    // seteo inicial de posiciom de circilos responsives pasarlo a store!!!
    this.store.getDimensions();
    // dynamic posiciom de circilos responsives
    window.addEventListener('resize', function (event) {
      vue.store.state.viewport = {x: window.innerWidth, y: window.innerHeight};
      vue.store.getDimensions();
    });
  }
};

/* eslint-disable no-new */
var zviewmanager = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('z-transition',[_c(_vm.past,{key:_vm.$zircleStore.state.pastView,tag:"component"}),_vm._v(" "),_c(_vm.previous,{key:_vm.$zircleStore.state.previousView,tag:"component"}),_vm._v(" "),(_vm.$zircleStore.state.router === false)?_c(_vm.current,{key:_vm.$zircleStore.state.currentView,tag:"component"}):_vm._e(),_vm._v(" "),(_vm.$zircleStore.state.router === true)?_c('router-view',{key:_vm.$zircleStore.state.currentView}):_vm._e()],1)},staticRenderFns: [],
  name: 'z-view-manager',
  props: {
    list: {
      type: Object,
      required: true
    }
  },
  computed: {
    current: function current () {
      var vm = this;
      var key = Object.keys(this.list).find(function (k) {
        if (k.toLowerCase() === vm.$zircleStore.state.currentView) {
          return k
        }
      });
      return this.list[key]
    },
    previous: function previous () {
      var vm = this;
      var key = Object.keys(this.list).find(function (k) {
        if (k.toLowerCase() === vm.$zircleStore.state.previousView) {
          return k
        }
      });
      return this.list[key]
    },
    past: function past () {
      var vm = this;
      var key = Object.keys(this.list).find(function (k) {
        if (k.toLowerCase() === vm.$zircleStore.state.pastView) {
          return k
        }
      });
      return this.list[key]
    }
  }
};

var ztransition = {
  functional: true,
  render: function (createElement, context) {
    var data = {
      props: {
        name: 'zuit',
        css: false,
        tag: 'section'
      },
      on: {
        enter: function enter (el, done) {
          var point = document.getElementById('z-point');
          if (context.parent.$zircleStore.state.mode === 'forward') {
            point.style.willChange = 'transform';
            point.style.transform = 'scale(' + context.parent.$zircleStore.state.position.scale + ') translate3d(' + context.parent.$zircleStore.state.position.Xi + 'px, ' + context.parent.$zircleStore.state.position.Yi + 'px, 0px)';
            point.style.transition = 'transform 800ms ease-in-out';
            el.classList.add('currclass');
            // console.log(el)
            done();
          } else {
            el.style.opacity = 1;
            done();
          }
        },
        afterEnter: function afterEnter (el) {
          var point = document.getElementById('z-point');
          point.style.willChange = '';
        },
        beforeLeave: function beforeLeave (el) {
          el.classList.remove('currclass');
        },
        leave: function leave (el, done) {
          var point = document.getElementById('z-point');
          if (context.parent.$zircleStore.state.mode === 'forward') {
            done();
          } else {
            point.style.willChange = 'transform';
            point.style.transform = 'scale(' + context.parent.$zircleStore.state.position.scale + ') translate3d(' + context.parent.$zircleStore.state.position.Xi + 'px, ' + context.parent.$zircleStore.state.position.Yi + 'px, 0px)';
            point.style.transition = 'transform 800ms ease-in-out';
            el.classList.add('lastclass');
            setTimeout(function () {
              context.parent.$zircleStore.state.lastView = '';
              context.parent.$zircleStore.state.lastViewCache = {};
              done();
            }, 600);
          }
        },
        afterLeave: function afterLeave (el) {
          var point = document.getElementById('z-point');
          point.style.willChange = '';
        }
      }
    };
    return createElement('transition-group', data, context.children)
  }
};

var zalert = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":"z-alert"}},[_c('div',{staticClass:"zui pop",class:[_vm.classes, _vm.colors],style:(_vm.styles.main),attrs:{"type":"alert"}},[_c('z-slider',{attrs:{"progress":_vm.progress}}),_vm._v(" "),_c('div',{staticClass:"z-popup-plate",style:(_vm.styles.plate)}),_vm._v(" "),_c('div',{staticClass:"z-contentbox dashed"},[_c('div',{staticClass:"z-content"},[_c('section',[_vm._t("default")],2)])]),_vm._v(" "),_vm._t("circles")],2)])},staticRenderFns: [],
  mixins: [zmixin],
  name: 'z-alert',
  mounted: function mounted () {
    var id = setInterval(frame, 100);
    var vm = this;
    function frame () {
      if (vm.progress >= 100) {
        clearInterval(id);
        vm.progress = 1;
        vm.close();
      } else {
        vm.progress++;
      }
    }
  },
  data: function data () {
    return {
      type: 'alert',
      scrollBar: false,
      progress: 1
    }
  },
  computed: {
    styles: function styles () {
      return {
        main: {
          width: this.state.zircleWidth.xl + 50 + 'px',
          height: this.state.zircleWidth.xl + 50 + 'px',
          margin: -((this.state.zircleWidth.xl + 50) / 2) + 'px 0 0 ' + -((this.state.zircleWidth.xl + 50) / 2) + 'px'
        },
        plate: {
          width: this.state.zircleWidth.xl + 150 + 'px',
          height: this.state.zircleWidth.xl + 150 + 'px',
          margin: -((this.state.zircleWidth.xl + 150) / 2) + 'px 0 0 ' + -((this.state.zircleWidth.xl + 150) / 2) + 'px'
        }
      }
    }
  },
  methods: {
    close: function close () {
      this.progress = 100;
      this.state.alert = false;
    }
  }
};

var zbutton = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"zui disc button",class:[_vm.classes, _vm.colors],style:(_vm.style.main),attrs:{"title":"z-button","type":"button"}},[_c('div',{staticClass:"z-content"},[_vm._t("default")],2),_vm._v(" "),_c('section',{staticClass:"z-content label",style:(_vm.style.label)},[_vm._t("label")],2),_vm._v(" "),_vm._t("circles")],2)},staticRenderFns: [],
  mixins: [zmixin],
  name: 'z-button',
  data: function data () {
    return {
      type: 'button'
    }
  },
  computed: {
    style: function style () {
      switch (this.size) {
        case 'large':
          var zwidth = this.state.zircleWidth.l;
          break
        case 'medium':
          zwidth = this.state.zircleWidth.m;
          break
        case 'small':
          zwidth = this.state.zircleWidth.s;
          break
        case 'extrasmall':
          zwidth = this.state.zircleWidth.xs;
          break
        case 'xxs':
          zwidth = this.state.zircleWidth.xxs;
          break
      }
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
      }
    }
  }
};

var zslider = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"slider",attrs:{"viewBox":"0 0 100 100","xmlns":"http://www.w3.org/2000/svg"}},[_c('circle',{style:([_vm.styles]),attrs:{"r":"50","cx":"50","cy":"50"}})])},staticRenderFns: [],
  mixins: [zmixin],
  props: ['progress'],
  name: 'z-slider',
  data: function data () {
    return {
      type: 'slider',
      drag: false,
      anglex: 0,
      duration: 0.05
    }
  },
  computed: {
    styles: function styles () {
      if (this.$parent.size === 'extralarge') {
        var strokeWidth = 3;
      } else if (this.$parent.size === 'large') {
        strokeWidth = 7;
      } else if (this.$parent.size === 'medium') {
        strokeWidth = 8;
      } else if (this.$parent.size === 'small') {
        strokeWidth = 9;
      } else if (this.$parent.size === 'xs' || this.$parent.size === 'extrasmall') {
        strokeWidth = 10;
      } else if (this.$parent.size === 'xxs') {
      }
      if (this.$parent.type === 'panel' || this.$parent.type === 'popup') {
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
      }
    }
  }
};

var zrange = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{attrs:{"type":_vm.type}},[_c('svg',{staticClass:"scroll",attrs:{"viewBox":"0 0 100 100","xmlns":"http://www.w3.org/2000/svg"},on:{"click":_vm.point}},[_c('circle',{style:([_vm.styles]),attrs:{"r":"50","cx":"50","cy":"50"}})]),_vm._v(" "),_c('svg',{staticClass:"scroll2",style:([_vm.classesContent3]),attrs:{"xmlns":"http://www.w3.org/2000/svg"},on:{"touchstart":function($event){_vm.drag = true;},"touchmove":function($event){$event.preventDefault();_vm.slide1($event);},"touchend":function($event){_vm.drag = false;},"mousedown":function($event){_vm.drag = true;},"mousemove":_vm.slide1,"mouseup":function($event){_vm.drag = false;}}},[_c('circle',{staticClass:"handlebar",attrs:{"r":"8","cx":"20","cy":"20"}})]),_vm._v(" "),_c('div',{staticClass:"z-content"},[_vm._v(" "+_vm._s(Math.round((_vm.anglex / 360) * 100, 0))+" ")])])},staticRenderFns: [],
  mixins: [zmixin],
  props: ['progress'],
  name: 'z-range',
  data: function data () {
    return {
      type: 'range',
      drag: false,
      anglex: (this.progress * 360) / 100,
      duration: '0s',
      previousAngle: 0
    }
  },
  computed: {
    positionr: function positionr () {
      if (this.$parent.size === 'extralarge') {
        var dimension = this.state.zircleWidth.xl;
        var strokeWidth = 3;
      } else if (this.$parent.size === 'large') {
        dimension = this.state.zircleWidth.l;
        strokeWidth = 7;
      } else if (this.$parent.size === 'medium') {
        dimension = this.state.zircleWidth.m;
        strokeWidth = 8;
      } else if (this.$parent.size === 'small') {
        dimension = this.state.zircleWidth.s;
        strokeWidth = 9;
      } else if (this.$parent.size === 'xs' || this.$parent.size === 'extrasmall') {
        dimension = this.state.zircleWidth.xs;
        strokeWidth = 10;
      } else if (this.$parent.size === 'xxs') {
        dimension = this.state.zircleWidth.xxs;
      }
      if (this.$parent.type === 'panel') {
        dimension = this.state.zircleWidth.xl;
        strokeWidth = 3;
      }
      return {
        X: (dimension / 2) * Math.cos(this.anglex * (Math.PI / 180)),
        Y: (dimension / 2) * Math.sin(this.anglex * (Math.PI / 180)),
        arc: (Math.PI * 100) * ((this.anglex - 360) / 360),
        strokeWidth: strokeWidth
      }
    },
    styles: function styles () {
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
      }
    },
    classesContent3: function classesContent3 () {
      return {
        transformOrigin: '50% 50%',
        transform: 'translate3d(' + this.positionr.X + 'px, ' + this.positionr.Y + 'px, 0px)'
      }
    }
  },
  methods: {
    point: function point (e) {
      e = e.changedTouches ? e.changedTouches[0] : e;
      var dimensions = this.$el.querySelector('.scroll').getBoundingClientRect();
      var centerx = (dimensions.width / 2) + dimensions.left;
      var centery = (dimensions.height / 2) + dimensions.top;
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
      function frame () {
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
    slide1: function slide1 (e) {
      if (this.drag === true) {
        e = e.changedTouches ? e.changedTouches[0] : e;
        var dimensions = this.$el.querySelector('.scroll').getBoundingClientRect();
        var centerx = (dimensions.width / 2) + dimensions.left;
        var centery = (dimensions.height / 2) + dimensions.top;
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
  }
};

var zscroll = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',[_c('svg',{staticClass:"scroll",attrs:{"viewBox":"0 0 100 100","xmlns":"http://www.w3.org/2000/svg"},on:{"click":_vm.point}},[_c('circle',{style:([_vm.styles2]),attrs:{"r":"50","cx":"50","cy":"50"}})]),_vm._v(" "),_c('svg',{staticClass:"scroll2",style:([_vm.classesContent3]),attrs:{"xmlns":"http://www.w3.org/2000/svg"},on:{"touchstart":function($event){_vm.drag = true;},"touchmove":function($event){$event.preventDefault();_vm.slide($event);},"touchend":function($event){_vm.drag = false;},"mousedown":function($event){_vm.drag = true;},"mousemove":_vm.slide,"mouseup":function($event){_vm.drag = false;}}},[_c('circle',{staticClass:"handlebar",attrs:{"r":"10","cx":"20","cy":"20"}})])])},staticRenderFns: [],
  mixins: [zmixin],
  props: ['scrollVal'],
  name: 'z-scroll',
  data: function data () {
    return {
      type: 'scroll',
      drag: false
    }
  },
  computed: {
    styles2: function styles2 () {
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
      }
    },
    position: function position () {
      return {
        X: ((this.state.zircleWidth.xl / 2) - 3) * Math.cos(this.scrollVal * (Math.PI / 180)),
        Y: ((this.state.zircleWidth.xl / 2) - 3) * Math.sin(this.scrollVal * (Math.PI / 180))
      }
    },
    classesContent3: function classesContent3 () {
      return {
        transformOrigin: '50% 50%',
        transform: 'translate3d(' + this.position.X + 'px, ' + this.position.Y + 'px, 0px)'
      }
    }
  },
  methods: {
    point: function point (e) {
      var dimensions = this.$el.querySelector('.scroll').getBoundingClientRect();
      var centerx = (dimensions.width / 2) + dimensions.left;
      var centery = (dimensions.height / 2) + dimensions.top;
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
    slide: function slide (e) {
      if (this.drag === true) {
        e = e.changedTouches ? e.changedTouches[0] : e;
        var dimensions = this.$el.querySelector('.scroll').getBoundingClientRect();
        var centerx = (dimensions.width / 2) + dimensions.left;
        var centery = (dimensions.height / 2) + dimensions.top;
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
};

function chunk (myArray, chunkSize) {
  var res = [];
  while (myArray.length) {
    res.push(myArray.splice(0, chunkSize));
  }
  return res
}
var zlist = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{attrs:{"title":"z-list"}},[_vm._l((_vm.state.pages[_vm.state.currentPage]),function(item,index){return _vm._t("default",null,{item:item,angle:(360 / _vm.state.pages[_vm.state.currentPage].length * index) - 90})}),_vm._v(" "),_vm._l((_vm.$zircleStore.state.pages),function(page,index){return _c('z-dotnav',{key:index,attrs:{"size":"xxs","color":"accent","index":index,"distance":112,"angle":(180 - (180 - (_vm.$zircleStore.state.pages.length * 10))) / _vm.$zircleStore.state.pages.length * (_vm.$zircleStore.state.pages.length - index) + ((180 - (180 - (180 - (_vm.$zircleStore.state.pages.length * 10)))) - ((180 - (180 - (_vm.$zircleStore.state.pages.length * 10))) / _vm.$zircleStore.state.pages.length)) / 2,"active":_vm.$zircleStore.state.currentPage},nativeOn:{"click":function($event){_vm.$zircleStore.state.currentPage = index;}}})})],2)},staticRenderFns: [],
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
  data: function data () {
    return {
      type: 'panel',
      viewName: 'test'
    }
  },
  mounted: function mounted () {
    this.$zircleStore.state.pages = chunk(this.collection, this.perPage);
  }
};

var zdotnav = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"zui disc",class:[_vm.classes, _vm.colors, _vm.activated],style:(_vm.styles.main),attrs:{"title":"z-dotnav","type":_vm.type}},[_c('div',{staticClass:"navplate",style:(_vm.styles.plate)})])},staticRenderFns: [],
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
  computed: {
    position: function position () {
      return this.store.point(this)
    },
    activated: function activated () {
      return {
        'accent-secondary': this.active === this.index,
        'accent-secondary-border': this.active < this.index || this.active > this.index
      }
    },
    styles: function styles () {
      switch (this.size) {
        case 'large':
          var zwidth = this.state.zircleWidth.l;
          break
        case 'medium':
          zwidth = this.state.zircleWidth.m;
          break
        case 'small':
          zwidth = this.state.zircleWidth.s;
          break
        case 'extrasmall':
          zwidth = this.state.zircleWidth.xs;
          break
        case 'xxs':
          zwidth = this.state.zircleWidth.xxs / 3;
          break
      }
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
      }
    }
  }
};

var zircle = {
  install: function install (Vue, options) {
    Object.defineProperty(Vue.prototype, '$zircleStore', {
      get: function get () {
        return store
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

Object.defineProperty(exports, '__esModule', { value: true });

})));
