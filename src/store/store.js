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
  routerHooks (data) {
    let vm = data
    data.$zircleStore.setView(vm.initialView)
    data.$zircleStore.state.router = vm.enableRouter
    data.$router.onReady(function () {
      if (vm.$zircleStore.state.previousView === '' && vm.$router.currentRoute.name !== vm.initialView) {
        vm.$router.push({path: '/'})
      }
    })
    data.$router.beforeEach((to, from, next) => {
      if (to.name === data.$zircleStore.state.previousView) {
        // caso 1: si a la vista dnd se dirije el router es = a la previa > goback
        // console.log('pa tras')
        data.$zircleStore.state.mode = 'backward'
        data.$zircleStore.goBack()
        next()
      } else if (to.name === data.$zircleStore.state.shadowPosition.go) {
        // caso 2: si a la vista dnd voy es = a la ultima vista en cache
        // navogacion con clicks
        // console.log('pa lante')
        data.$zircleStore.state.mode = 'forward'
        data.$zircleStore.setAppPos(data.$zircleStore.state.shadowPosition)
        data.$zircleStore.state.shadowPosition = {}
        next()
      } else if (to.name === data.$zircleStore.state.lastViewCache.view) {
        // caso 3: si a la vista dnd no esta en cache futuro uso el shadow (vista nueva)
        // navegacion con flechas
        // console.log('pa lante cache')
        data.$zircleStore.state.mode = 'forward'
        data.$zircleStore.setAppPos(data.$zircleStore.state.lastViewCache.position)
        data.$zircleStore.state.lastViewCache = {}
        next()
      } else {
        console.log('error')
        next(from.name)
      }
    })
  },
  setScroll (angle) {
    store.state.scroll = angle
  },
  // no uso media query asi que seteo el ancho de cad circulo aca
  getDimensions (event) {
    // small devices
    if (window.matchMedia('(max-width: 319px)').matches) {
      store.state.zircleWidth.xl = 200
      store.state.zircleWidth.l = 70
      store.state.zircleWidth.m = 50
      store.state.zircleWidth.s = 30
      store.state.zircleWidth.xs = 20
      store.state.zircleWidth.xxs = 20
    }
    // medium
    if (window.matchMedia('(min-width: 320px)').matches) {
      store.state.zircleWidth.xl = 230
      store.state.zircleWidth.l = 85
      store.state.zircleWidth.m = 65
      store.state.zircleWidth.s = 45
      store.state.zircleWidth.xs = 30
      store.state.zircleWidth.xxs = 20
    }
    // medium - large devices
    if (window.matchMedia('(min-width: 375px) and (orientation: portrait)').matches) {
      store.state.zircleWidth.xl = 260
      store.state.zircleWidth.l = 90
      store.state.zircleWidth.m = 70
      store.state.zircleWidth.s = 50
      store.state.zircleWidth.xs = 40
      store.state.zircleWidth.xxs = 30
    }
    if (window.matchMedia('(min-width: 375px) and (orientation: landscape)').matches) {
      store.state.zircleWidth.xl = 270
      store.state.zircleWidth.l = 90
      store.state.zircleWidth.m = 70
      store.state.zircleWidth.s = 50
      store.state.zircleWidth.xs = 40
      store.state.zircleWidth.xxs = 30
    }
    // tablets
    if (window.matchMedia('(min-width: 768px) and (orientation: portrait) and (min-pixel-ratio: 2)').matches) {
      store.state.zircleWidth.xl = 340
      store.state.zircleWidth.l = 120
      store.state.zircleWidth.m = 100
      store.state.zircleWidth.s = 80
      store.state.zircleWidth.xs = 60
      store.state.zircleWidth.xxs = 40
    }
    if (window.matchMedia('(min-width: 768px) and (orientation: landscape)').matches) {
      store.state.zircleWidth.xl = 360
      store.state.zircleWidth.l = 120
      store.state.zircleWidth.m = 100
      store.state.zircleWidth.s = 80
      store.state.zircleWidth.xs = 60
      store.state.zircleWidth.xxs = 40
    }
    // desktop or large tablets
    if (window.matchMedia('(min-width: 992px) and (orientation: portrait)').matches) {
      store.state.zircleWidth.xl = 420
      store.state.zircleWidth.l = 120
      store.state.zircleWidth.m = 100
      store.state.zircleWidth.s = 80
      store.state.zircleWidth.xs = 60
      store.state.zircleWidth.xxs = 40
    }
    if (window.matchMedia('(min-width: 992px) and (orientation: landscape)').matches) {
      store.state.zircleWidth.xl = 420
      store.state.zircleWidth.l = 120
      store.state.zircleWidth.m = 100
      store.state.zircleWidth.s = 80
      store.state.zircleWidth.xs = 60
      store.state.zircleWidth.xxs = 40
    }
    // large desktop
    if (window.matchMedia('(min-width: 1200px) and (orientation: portrait)').matches) {
      store.state.zircleWidth.xl = 430
      store.state.zircleWidth.l = 130
      store.state.zircleWidth.m = 110
      store.state.zircleWidth.s = 90
      store.state.zircleWidth.xs = 70
      store.state.zircleWidth.xxs = 50
    }
    // xl desktop
    if (window.matchMedia('(min-width: 1800px)').matches) {
      store.state.zircleWidth.xl = 650
      store.state.zircleWidth.l = 130
      store.state.zircleWidth.m = 110
      store.state.zircleWidth.s = 90
      store.state.zircleWidth.xs = 70
      store.state.zircleWidth.xxs = 50
    }
  },
  point (component) {
    // var declarations
    var total = component.total
    var index = component.index
    // var arc = component.arc
    var type = component.type
    var distance = component.distance
    var angle = component.angle
    var size = component.size
    var attachedPosition = store.state.position
    var X = ''
    var Xi = ''
    var Y = ''
    var Yi = ''
    var currentPosXi = ''
    var currentPosYi = ''
    var scale = ''
    var scalei = ''
    var currentPosX = ''
    var currentPosY = ''
    // EJECUTA FUNCION
    if (component.$parent.type === 'panel') { // pensar en provide/inject
      var parentPosition = {
        Xi: component.$parent.position.Xi,
        Yi: component.$parent.position.Yi,
        X: component.$parent.position.X,
        Y: component.$parent.position.Y,
        scalei: component.$parent.position.scalei,
        scale: component.$parent.position.scale
      }
    } else {
      parentPosition = {
        Xi: 0,
        Yi: 0,
        X: 0,
        Y: 0,
        scalei: 1,
        scale: 1
      }
    }
    if (type !== 'panel') {
      // distance prop
      // de 0 a 200%
      // agarra la distancia base en % y la calcula con el diametro css del panel
      // ver tema de valor cero -->
      if (type === 'item' && component.layout === 'radial') {
        angle = (360 / total * index) - 90
        if (total === 1) {
          distance = 0
        }
      }
      if (type === 'item' && component.layout === 'lineal') {
        if (index === 0) {
          angle = 180
          distance = 90
        } else if (index === 1) {
          angle = 0
          distance = 0
        } else {
          angle = 0
          distance = 90
        }
        if (total === 1) {
          distance = 0
        }
      }
      if (type === 'pagination') {
        var arcAngle = 180
        var range = (arcAngle - (arcAngle - (total * 10)))
        var offset = ((arcAngle - range) - (range / total)) / 2
        index = total - index
       /* if (arc === 'quarter') {
          arcAngle = 90
        } else if (arc === 'half') {
          arcAngle = 120
        } else if (arc === 'threequarter') {
          arcAngle = 270
        } else if (arc === 'full') {
          arcAngle = 360
        } */
        angle = range / total * index + offset
      }
      if (size === 'xxs') {
        scale = store.state.zircleWidth.xl / store.state.zircleWidth.xxs
        scalei = store.state.zircleWidth.xxs / store.state.zircleWidth.xl
      } else if (size === 'extrasmall') {
        scale = store.state.zircleWidth.xl / store.state.zircleWidth.xs
        scalei = store.state.zircleWidth.xs / store.state.zircleWidth.xl
      } else if (size === 'small') {
        scale = store.state.zircleWidth.xl / store.state.zircleWidth.s
        scalei = store.state.zircleWidth.s / store.state.zircleWidth.xl
      } else if (size === 'medium') {
        scale = store.state.zircleWidth.xl / store.state.zircleWidth.m
        scalei = store.state.zircleWidth.m / store.state.zircleWidth.xl
      } else if (size === 'large') {
        scale = store.state.zircleWidth.xl / store.state.zircleWidth.l
        scalei = store.state.zircleWidth.l / store.state.zircleWidth.xl
      } else if (size === 'extralarge') {
        scale = 1
        scalei = 1
      }
      if (distance === 0) {
        currentPosX = 0
        currentPosY = 0
      } else {
        // 130 es el diametro del extralarge hay que ver como hacerlo dinamico por si el dev lo cambia
        // quizas meterlo como stylo en zui. o que lo lea al montar
        distance = ((store.state.zircleWidth.xl / 2) * distance / 100)
        // test para hacer responsive
        // tema anglulos : limitar de 0 a 360
        // IMPORTANTE: OJO CON DISTANCIA Y ANGLULO CERO, RESULTADO ERRONEOS AL RESIZE
        currentPosX = (distance) * Math.cos(angle * (Math.PI / 180))
        currentPosY = (distance) * Math.sin(angle * (Math.PI / 180))
      }
      if (currentPosX > 0) {
        currentPosXi = -Math.abs(Number(currentPosX))
      } else {
        currentPosXi = Math.abs(Number(currentPosX))
      }
      if (currentPosY > 0) {
        currentPosYi = -Math.abs(Number(currentPosY))
      } else {
        currentPosYi = Math.abs(Number(currentPosY))
      }
      X = currentPosX
      Xi = parentPosition.Xi + currentPosXi * parentPosition.scalei
      Y = currentPosY
      Yi = parentPosition.Yi + currentPosYi * parentPosition.scalei
      scalei = parentPosition.scalei * scalei
      scale = parentPosition.scale * scale
      var Xabs = parentPosition.X + currentPosX * parentPosition.scalei
      var Yabs = parentPosition.Y + currentPosY * parentPosition.scalei
    } else {
      var cacheView = store.state.cache.slice(0).reverse().find(function (cache) {
        return cache.view === component.view
      })
      if (cacheView !== undefined) {
        if (cacheView.view === component.view) {
          X = cacheView.position.X
          Xi = cacheView.position.Xi
          Y = cacheView.position.Y
          Yi = cacheView.position.Yi
          scalei = cacheView.position.scalei
          scale = cacheView.position.scale
        } else {
          X = attachedPosition.X
          Xi = attachedPosition.Xi
          Y = attachedPosition.Y
          Yi = attachedPosition.Yi
          scalei = attachedPosition.scalei
          scale = attachedPosition.scale
        }
      } else {
        X = attachedPosition.X
        Xi = attachedPosition.Xi
        Y = attachedPosition.Y
        Yi = attachedPosition.Yi
        scalei = attachedPosition.scalei
        scale = attachedPosition.scale
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
  setView (view) {
    store.state.currentView = view
    store.setHistory(view)
    if (store.state.history.length === 1) {
      store.state.previousView = ''
      store.state.pastView = ''
    } else if (store.state.history.length > 1) {
      store.state.previousView = store.state.history[store.state.history.length - 2]
      store.state.pastView = store.state.history[store.state.history.length - 3]
    }
  },
  setAppPos (data) {
    runView()
    function runView () {
      store.state.position = {
        X: data.X,
        Y: data.Y,
        scale: data.scale,
        Xi: data.Xi,
        Yi: data.Yi,
        scalei: data.scalei,
        go: data.go
      }
      store.setView(data.go)
    }
  },
  setHistory (view) {
    // only component with viewName
    var lastView = store.state.history[store.state.history.length - 1]
    if (view !== lastView) {
      store.state.history.push(view)
      var cacheView = {
        view: view,
        position: store.state.position
      }
      store.state.cache.push(cacheView)
    }
  },
  goBack () {
    if (store.state.history.length > 1) {
      store.state.history.pop()
      let current = store.state.history[store.state.history.length - 1]
      store.state.lastViewCache = store.state.cache[store.state.cache.length - 1]
      store.state.cache.pop()
      let currentCache = store.state.cache[store.state.cache.length - 1]
      let position = currentCache.position
      position.go = current
      store.state.mode = 'backward'
      store.setAppPos(position)
    }
  }
}

export default store
