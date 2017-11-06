/*!
 * zircle v0.1.5
 * (c) 2017 zircleUI
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
    currentPage: 0
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
  // no uso media query asi que seteo el ancho de cad circulo aca
  getDimensions: function getDimensions (event) {
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
    // var declarations
    var total = component.total;
    var index = component.index;
    // var arc = component.arc
    var type = component.type;
    var distance = component.distance;
    var angle = component.angle;
    var size = component.size;
    var attachedPosition = store.state.position;
    var X = '';
    var Xi = '';
    var Y = '';
    var Yi = '';
    var currentPosXi = '';
    var currentPosYi = '';
    var scale = '';
    var scalei = '';
    var currentPosX = '';
    var currentPosY = '';
    // EJECUTA FUNCION
    if (component.$parent.type === 'panel') { // pensar en provide/inject
      var parentPosition = {
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
    if (type !== 'panel') {
      // distance prop
      // de 0 a 200%
      // agarra la distancia base en % y la calcula con el diametro css del panel
      // ver tema de valor cero -->
      if (type === 'item' && component.layout === 'radial') {
        angle = (360 / total * index) - 90;
        if (total === 1) {
          distance = 0;
        }
      }
      if (type === 'item' && component.layout === 'lineal') {
        if (index === 0) {
          angle = 180;
          distance = 90;
        } else if (index === 1) {
          angle = 0;
          distance = 0;
        } else {
          angle = 0;
          distance = 90;
        }
        if (total === 1) {
          distance = 0;
        }
      }
      if (type === 'pagination') {
        var arcAngle = 180;
        var range = (arcAngle - (arcAngle - (total * 10)));
        var offset = ((arcAngle - range) - (range / total)) / 2;
        index = total - index;
       /* if (arc === 'quarter') {
          arcAngle = 90
        } else if (arc === 'half') {
          arcAngle = 120
        } else if (arc === 'threequarter') {
          arcAngle = 270
        } else if (arc === 'full') {
          arcAngle = 360
        } */
        angle = range / total * index + offset;
      }
      if (size === 'xxs') {
        scale = store.state.zircleWidth.xl / store.state.zircleWidth.xxs;
        scalei = store.state.zircleWidth.xxs / store.state.zircleWidth.xl;
      } else if (size === 'extrasmall') {
        scale = store.state.zircleWidth.xl / store.state.zircleWidth.xs;
        scalei = store.state.zircleWidth.xs / store.state.zircleWidth.xl;
      } else if (size === 'small') {
        scale = store.state.zircleWidth.xl / store.state.zircleWidth.s;
        scalei = store.state.zircleWidth.s / store.state.zircleWidth.xl;
      } else if (size === 'medium') {
        scale = store.state.zircleWidth.xl / store.state.zircleWidth.m;
        scalei = store.state.zircleWidth.m / store.state.zircleWidth.xl;
      } else if (size === 'large') {
        scale = store.state.zircleWidth.xl / store.state.zircleWidth.l;
        scalei = store.state.zircleWidth.l / store.state.zircleWidth.xl;
      } else if (size === 'extralarge') {
        scale = 1;
        scalei = 1;
      }
      if (distance === 0) {
        currentPosX = 0;
        currentPosY = 0;
      } else {
        // 130 es el diametro del extralarge hay que ver como hacerlo dinamico por si el dev lo cambia
        // quizas meterlo como stylo en zui. o que lo lea al montar
        distance = ((store.state.zircleWidth.xl / 2) * distance / 100);
        // test para hacer responsive
        // tema anglulos : limitar de 0 a 360
        // IMPORTANTE: OJO CON DISTANCIA Y ANGLULO CERO, RESULTADO ERRONEOS AL RESIZE
        currentPosX = (distance) * Math.cos(angle * (Math.PI / 180));
        currentPosY = (distance) * Math.sin(angle * (Math.PI / 180));
      }
      if (currentPosX > 0) {
        currentPosXi = -Math.abs(Number(currentPosX));
      } else {
        currentPosXi = Math.abs(Number(currentPosX));
      }
      if (currentPosY > 0) {
        currentPosYi = -Math.abs(Number(currentPosY));
      } else {
        currentPosYi = Math.abs(Number(currentPosY));
      }
      X = currentPosX;
      Xi = parentPosition.Xi + currentPosXi * parentPosition.scalei;
      Y = currentPosY;
      Yi = parentPosition.Yi + currentPosYi * parentPosition.scalei;
      scalei = parentPosition.scalei * scalei;
      scale = parentPosition.scale * scale;
      var Xabs = parentPosition.X + currentPosX * parentPosition.scalei;
      var Yabs = parentPosition.Y + currentPosY * parentPosition.scalei;
    } else {
      var cacheView = store.state.cache.slice(0).reverse().find(function (cache) {
        return cache.view === component.viewName
      });
      if (cacheView !== undefined) {
        if (cacheView.view === component.viewName) {
          X = cacheView.position.X;
          Xi = cacheView.position.Xi;
          Y = cacheView.position.Y;
          Yi = cacheView.position.Yi;
          scalei = cacheView.position.scalei;
          scale = cacheView.position.scale;
        } else {
          X = attachedPosition.X;
          Xi = attachedPosition.Xi;
          Y = attachedPosition.Y;
          Yi = attachedPosition.Yi;
          scalei = attachedPosition.scalei;
          scale = attachedPosition.scale;
        }
      } else {
        X = attachedPosition.X;
        Xi = attachedPosition.Xi;
        Y = attachedPosition.Y;
        Yi = attachedPosition.Yi;
        scalei = attachedPosition.scalei;
        scale = attachedPosition.scale;
      }
    }
    return {
      X: X,
      Y: Y,
      Xi: Xi,
      Yi: Yi,
      scale: scale,
      scalei: scalei,
      Xabs: Xabs,
      Yabs: Yabs
    }
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
    runView();
    function runView () {
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
    }
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
    if (store.state.history.length > 1) {
      store.state.history.pop();
      var current = store.state.history[store.state.history.length - 1];
      store.state.lastViewCache = store.state.cache[store.state.cache.length - 1];
      store.state.cache.pop();
      var currentCache = store.state.cache[store.state.cache.length - 1];
      var position = currentCache.position;
      position.go = current;
      store.state.mode = 'backward';
      store.setAppPos(position);
    }
  }
};

var zstyle = {
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
        // previuos view settings
        prevclass: this.viewName === this.state.previousView,
        hidden: this.$parent.viewName === this.state.previousView,
        pastclass: this.type === 'panel' && this.viewName === this.state.pastView && this.viewName === this.state.pastView,
        zoom: this.type === 'scale' && this.gotoview !== undefined
        // responsive animation. solo para current view
        // animation: this.view === this.state.currentView || this.$parent.view === this.state.currentView
      }
    },
    colors: function colors () {
      return this.color
    }
  }
};

var zpanel = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"zui main",class:[_vm.classes, _vm.colors],staticStyle:{"overflow":"visible"},style:(_vm.styles.main),attrs:{"title":_vm.viewName,"type":"panel"},on:{"click":function($event){$event.stopPropagation();_vm.move($event);}}},[_c('div',{staticClass:"plate",style:(_vm.styles.plate)}),_vm._v(" "),(_vm.range === true)?_c('z-range',{attrs:{"progress":_vm.progress}}):_vm._e(),_vm._v(" "),(_vm.scrollBar === true)?_c('z-scroll',{staticStyle:{"overflow":"visible"},attrs:{"scrollVal":_vm.scrollVal},on:{"update:scrollVal":function($event){_vm.scrollVal=$event;}}}):_vm._e(),_vm._v(" "),(_vm.slider === true)?_c('z-slider',{attrs:{"progress":_vm.progress}}):_vm._e(),_vm._v(" "),_c('div',{staticClass:"z-contentbox dashed"},[_vm._t("picture"),_vm._v(" "),_c('div',{staticClass:"z-content maindisc",class:[_vm.classesContent],style:(_vm.styles.hideScroll),on:{"scroll":_vm.scroll}},[_c('section',[_vm._t("default"),_vm._v(" "),_c('span',{staticClass:"bottom"})],2)])],2),_vm._v(" "),_vm._t("circles")],2)},staticRenderFns: [],
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
    }
  },
  name: 'z-panel',
  data: function data () {
    return {
      type: 'panel',
      scrollBar: false,
      alertar: '',
      scrollVal: -45,
      width: 0
    }
  },
  computed: {
    viewName: function viewName () {
      return this.view.toLowerCase()
    },
    styles: function styles () {
      if (this.viewName === this.state.previousView) {
        var W = this.state.zircleWidth.xl;
      } else {
        W = this.state.zircleWidth.xl;
      }
      return {
        main: {
          width: W + 'px',
          height: W + 'px',
          margin: -(W / 2) + 'px 0 0 ' + -(W / 2) + 'px',
          transform: 'translate3d(' + this.position.X + 'px, ' + this.position.Y + 'px, 0px) scale(' + this.position.scalei + ')'
        },
        plate: {
          width: W + 50 + 'px',
          height: W + 50 + 'px',
          margin: -((W + 50) / 2) + 'px 0 0 ' + -((W + 50) / 2) + 'px'
        },
        hideScroll: {
          width: W - 10 + 'px'
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
  mounted: function mounted () {
    this.width = this.state.zircleWidth.xl;
    var test = this.$el.querySelector('.z-content > section'); // guarda con esto que no anda bien
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
    },
    total: {
      type: Number,
      default: 0
    },
    index: {
      type: Number,
      default: 0
    },
    layout: {
      type: String,
      default: 'radial'
    },
    id: {
      type: [Number, String]
    }
  },
  data: function data () {
    return {
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
          if (this.state.history.length < 6) {
            if (this.state.router === true) {
              this.state.shadowPosition = position;
              // this.store.setAppPos(position)
              this.$router.push({name: go});
            } else {
              this.store.state.mode = 'forward';
              this.store.setAppPos(position);
            }
          } else {
            console.log('Max level of deeph reached');
          }
          // this.$el.style.opacity = 0
        } else {
          console.log('gotoview is not defined');
        }
      }
    }
  }
};

var zitem = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"zui disc",class:[_vm.classes, _vm.colors],style:(_vm.styles.main),attrs:{"title":"z-item"},on:{"click":function($event){$event.stopPropagation();_vm.move($event);}}},[_c('div',{staticClass:"z-contentbox label",staticStyle:{"overflow":"visible"},style:(_vm.styles.label)},[_c('div',{staticClass:"z-content",staticStyle:{"overflow":"visible"}},[_vm._t("default")],2)])])},staticRenderFns: [],
  name: 'z-item',
  mixins: [zmixin],
  props: ['total', 'index', 'layout', 'item'],
  data: function data () {
    return {
      type: 'item'
    }
  },
  computed: {
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
          if (this.layout === 'lineal' && this.index === 1) {
            zwidth = this.state.zircleWidth.l * 2;
          } else {
            zwidth = this.state.zircleWidth.s;
          }
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
      // se debe pasar el item seleccionado en el campo item
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
      vue.store.getDimensions(event);
    });
  }
};

/* eslint-disable no-new */
var zviewmanager = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',[_c(_vm.past,{tag:"component"}),_vm._v(" "),_c(_vm.previous,{tag:"component"}),_vm._v(" "),_c('z-transition',[(_vm.$zircleStore.state.router === false)?_c(_vm.current,{key:_vm.$zircleStore.state.currentView,tag:"component"}):_vm._e(),_vm._v(" "),(_vm.$zircleStore.state.router === true)?_c('router-view'):_vm._e()],1)],1)},staticRenderFns: [],
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
        css: false
      },
      on: {
        beforeEnter: function beforeEnter (el) {
          el.style.opacity = 0;
        },
        enter: function enter (el, done) {
          var point = document.querySelector('#z-point');
          if (context.parent.$zircleStore.state.mode === 'forward') {
            el.style.animation = 'appear .5s forwards';
            // point.style.transformStyle = 'preserve-3d'
            point.style.transform = 'scale(' + context.parent.$zircleStore.state.position.scale + ') translate3d(' + context.parent.$zircleStore.state.position.Xi + 'px, ' + context.parent.$zircleStore.state.position.Yi + 'px, 0px)';
            point.style.transition = 'transform .5s cubic-bezier(1, .04, .94, .93)';
            done();
            //  PREVIOUS VIEW ==>
          } else {
            el.style.opacity = 1;
            done();
          }
        },
        leave: function leave (el, done) {
          var point = document.querySelector('#z-point');
          if (context.parent.$zircleStore.state.mode === 'forward') {
            done();
          } else {
            // point.style.transformStyle = 'preserve-3d'
            point.style.transform = 'scale(' + context.parent.$zircleStore.state.position.scale + ') translate3d(' + context.parent.$zircleStore.state.position.Xi + 'px, ' + context.parent.$zircleStore.state.position.Yi + 'px, 0px)';
            point.style.transition = 'transform .5s ease-in-out';
            done();
          }
        }
      }
    };
    return createElement('transition', data, context.children)
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
var zpagination = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticStyle:{"z-index":"9000"},attrs:{"title":"z-pagination"}},_vm._l((_vm.pages),function(page,index){return _c('z-dotnav',{key:index,attrs:{"color":"accent","total":_vm.pages.length,"index":index,"active":_vm.active,"size":"xxs","distance":112},nativeOn:{"click":function($event){_vm.changePage(index);}}})}))},staticRenderFns: [],
  name: 'z-pagination',
  mixins: [zmixin],
  props: ['collect', 'per-page'],
  data: function data () {
    return {
      type: 'pagination',
      arc: 'half',
      active: 0
    }
  },
  methods: {
    changePage: function changePage (index) {
      var data = this.pages[index];
      var progress = (index + 1) / this.pages.length * 100;
      this.state.currentPage = index;
      this.active = this.state.currentPage;
      this.$emit('updateItems', {
        data: data,
        progress: progress
      });
    }
  },
  computed: {
    pages: function pages () {
      // console.log(this.collection)
      return chunk(this.collect, this.perPage)
    }
  },
  mounted: function mounted () {
    this.changePage(this.state.currentPage);
  }
};

var zlist = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{attrs:{"title":"z-list"}},[_vm._l((_vm.items),function(item,index){return _c('z-item',{key:index,attrs:{"color":_vm.color,"size":"small","distance":60,"total":_vm.items.length,"index":index,"layout":"radial","gotoview":"item","item":item}},[_vm._v(" "+_vm._s(item)+" ")])}),_vm._v(" "),_c('z-pagination',{attrs:{"collect":_vm.resdata,"per-page":_vm.perPage},on:{"updateItems":_vm.displayedItems}})],2)},staticRenderFns: [],
  name: 'z-list',
  mixins: [zmixin],
  props: {
    collection: {
      type: Array
    },
    perPage: {
      type: [Number]
    }
  },
  data: function data () {
    return {
      items: [],
      type: 'panel', // esto es para evitar que se compute mal position y escala,
      resdata: this.collection
    }
  },
  methods: {
    displayedItems: function displayedItems (data) {
      this.items = data.data;
      this.$emit('updateProgress', data.progress);
    }
  }
};

var zdotnav = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"zui disc",class:[_vm.classes, _vm.colors, _vm.activated],style:(_vm.styles.main),attrs:{"title":"z-dotnav","type":_vm.type}},[_c('div',{staticClass:"navplate",style:(_vm.styles.plate)})])},staticRenderFns: [],
  name: 'z-scale',
  mixins: [zmixin],
  props: {
    type: {
      type: String,
      default: 'pagination'
    },
    total: {
      type: Number,
      default: 0
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
    Vue.component('z-style', zstyle);
    Vue.component('z-canvas', zcanvas);
    Vue.component('z-view-manager', zviewmanager);
    Vue.component('z-panel', zpanel);
    Vue.component('z-scale', zscale);
    Vue.component('z-dotnav', zdotnav);
    Vue.component('z-pagination', zpagination);
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
