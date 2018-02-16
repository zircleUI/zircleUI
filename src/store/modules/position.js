import store from '../store'
function calcCoords (distance, angle) {
  var X = 0
  var Y = 0
  var Xi = 0
  var Yi = 0
  if (distance !== 0) {
    X = ((store.state.zircleWidth.xl / 2) * distance / 100) * Math.cos(angle * (Math.PI / 180))
    Y = ((store.state.zircleWidth.xl / 2) * distance / 100) * Math.sin(angle * (Math.PI / 180))
    X > 0 ? Xi = -Math.abs(Number(X)) : Xi = Math.abs(Number(X))
    Y > 0 ? Yi = -Math.abs(Number(Y)) : Yi = Math.abs(Number(Y))
  }
  return {
    X: X,
    Y: Y,
    Xi: Xi,
    Yi: Yi
  }
}
const position = {
  getCurrentPosition () {
    return store.state.position
  },
  calcPanelPosition (component) {
    store.actions.setLog('calcPanelPosition() => ' + component.type)
    // Variable declaration
    var newPosition = store.state.position
    if (store.state.mode === 'backward' && store.state.cache.length >= 3 && store.state.cache[store.state.cache.length - 3].id === component.viewID) {
      newPosition = {
        X: store.state.cache[store.state.cache.length - 3].position.X,
        Xi: store.state.cache[store.state.cache.length - 3].position.Xi,
        Y: store.state.cache[store.state.cache.length - 3].position.Y,
        Yi: store.state.cache[store.state.cache.length - 3].position.Yi,
        scalei: store.state.cache[store.state.cache.length - 3].position.scalei,
        scale: store.state.cache[store.state.cache.length - 3].position.scale
      }
    }
    return newPosition
  },
  calcPosition (component) {
    store.actions.setLog('calcPosition() => ' + component.type)
    // Variable declaration
    var parentPosition = {Xi: 0, Yi: 0, X: 0, Y: 0, scalei: 1, scale: 1}
    var newPosition = store.state.position
    var newCoords = calcCoords(component.distance, component.angle)
    if (component.$parent.type === 'panel') parentPosition = { Xi: component.$parent.position.Xi, Yi: component.$parent.position.Yi, X: component.$parent.position.X, Y: component.$parent.position.Y, scalei: component.$parent.position.scalei, scale: component.$parent.position.scale }
    newPosition = {
      X: newCoords.X,
      Y: newCoords.Y,
      Xi: parentPosition.Xi + newCoords.Xi * parentPosition.scalei,
      Yi: parentPosition.Yi + newCoords.Yi * parentPosition.scalei,
      scale: parentPosition.scale * store.state.zircleWidth.xl / store.actions.getComponentWidth(component.size),
      scalei: parentPosition.scalei * store.actions.getComponentWidth(component.size) / store.state.zircleWidth.xl,
      Xabs: parentPosition.X + newCoords.X * parentPosition.scalei,
      Yabs: parentPosition.Y + newCoords.Y * parentPosition.scalei
    }
    return newPosition
  },
  setAppPos (data) {
    store.actions.setLog('setAppPos() => ' + data.go)
    store.state.position = {
      X: data.X,
      Y: data.Y,
      scale: data.scale,
      Xi: data.Xi,
      Yi: data.Yi,
      scalei: data.scalei,
      go: data.go,
      itemID: data.itemID,
      item: data.item
    }
    store.actions.setView(data.go)
  }
}
export default position
