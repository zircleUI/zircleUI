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
  killLastView () {
    store.state.lastView = ''
  },
  // no uso media query asi que seteo el ancho de cad circulo aca
  getDimensions () {
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
    // VARIABLE DECLARATION
    var scale = 1
    var scalei = 1
    var currentX = 0
    var currentY = 0
    var currentXi = 0
    var currentYi = 0
    var parentPosition = {}
    var newPosition = {}
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
        }
      } if (store.state.previousView === component.viewName) {
        newPosition = {
          X: store.state.cache[store.state.cache.length - 2].position.X,
          Xi: store.state.cache[store.state.cache.length - 2].position.Xi,
          Y: store.state.cache[store.state.cache.length - 2].position.Y,
          Yi: store.state.cache[store.state.cache.length - 2].position.Yi,
          scalei: store.state.cache[store.state.cache.length - 2].position.scalei,
          scale: store.state.cache[store.state.cache.length - 2].position.scale
        }
      } else if (store.state.pastView === component.viewName) {
        newPosition = {
          X: store.state.cache[store.state.cache.length - 3].position.X,
          Xi: store.state.cache[store.state.cache.length - 3].position.Xi,
          Y: store.state.cache[store.state.cache.length - 3].position.Y,
          Yi: store.state.cache[store.state.cache.length - 3].position.Yi,
          scalei: store.state.cache[store.state.cache.length - 3].position.scalei,
          scale: store.state.cache[store.state.cache.length - 3].position.scale
        }
      } else {
        newPosition = {
          X: store.state.position.X,
          Xi: store.state.position.Xi,
          Y: store.state.position.Y,
          Yi: store.state.position.Yi,
          scalei: store.state.position.scalei,
          scale: store.state.position.scale
        }
      }
    } else {
      var angle = component.angle
      var distance = component.distance
      if (component.size === 'xxs') {
        scale = store.state.zircleWidth.xl / store.state.zircleWidth.xxs
        scalei = store.state.zircleWidth.xxs / store.state.zircleWidth.xl
      } else if (component.size === 'extrasmall') {
        scale = store.state.zircleWidth.xl / store.state.zircleWidth.xs
        scalei = store.state.zircleWidth.xs / store.state.zircleWidth.xl
      } else if (component.size === 'small') {
        scale = store.state.zircleWidth.xl / store.state.zircleWidth.s
        scalei = store.state.zircleWidth.s / store.state.zircleWidth.xl
      } else if (component.size === 'medium') {
        scale = store.state.zircleWidth.xl / store.state.zircleWidth.m
        scalei = store.state.zircleWidth.m / store.state.zircleWidth.xl
      } else if (component.size === 'large') {
        scale = store.state.zircleWidth.xl / store.state.zircleWidth.l
        scalei = store.state.zircleWidth.l / store.state.zircleWidth.xl
      } else if (component.size === 'extralarge') {
        scale = 1
        scalei = 1
      }
      if (distance === 0) {
        currentX = 0
        currentY = 0
      } else {
        currentX = ((store.state.zircleWidth.xl / 2) * distance / 100) * Math.cos(angle * (Math.PI / 180))
        currentY = ((store.state.zircleWidth.xl / 2) * distance / 100) * Math.sin(angle * (Math.PI / 180))
      }
      if (currentX > 0) {
        currentXi = -Math.abs(Number(currentX))
      } else {
        currentXi = Math.abs(Number(currentX))
      }
      if (currentY > 0) {
        currentYi = -Math.abs(Number(currentY))
      } else {
        currentYi = Math.abs(Number(currentY))
      }
      if (component.$parent.type === 'panel') {
        parentPosition = {
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
      newPosition = {
        X: currentX,
        Y: currentY,
        Xi: parentPosition.Xi + currentXi * parentPosition.scalei,
        Yi: parentPosition.Yi + currentYi * parentPosition.scalei,
        scale: parentPosition.scale * scale,
        scalei: parentPosition.scalei * scalei,
        Xabs: parentPosition.X + currentX * parentPosition.scalei,
        Yabs: parentPosition.Y + currentY * parentPosition.scalei
      }
    }
    return newPosition
  },
  setView (view) {
    store.state.currentView = view.toLowerCase()
    store.setHistory(view.toLowerCase())
    if (store.state.history.length === 1) {
      store.state.previousView = ''
      store.state.pastView = ''
    } else if (store.state.history.length > 1) {
      store.state.previousView = store.state.history[store.state.history.length - 2]
      store.state.pastView = store.state.history[store.state.history.length - 3]
    }
  },
  setAppPos (data) {
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
    if (store.state.cache.length > 1) {
      store.state.history.pop()
      let current = store.state.history[store.state.history.length - 1]
      store.state.lastViewCache = store.state.cache[store.state.cache.length - 1]
      store.state.lastView = store.state.lastViewCache.view
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
