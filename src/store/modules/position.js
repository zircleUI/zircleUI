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
    return store.state.history[store.state.history.length - 1].position
  },
  getPreviousPosition () {
    if (store.state.history[store.state.history.length - 2]) {
      return store.state.history[store.state.history.length - 2].position
    } else {
      return {
        X: 0, Y: 0, Xi: 0, Yi: 0, scale: 0, scalei: 0
      }
    }
  },
  getPastPosition () {
    return store.state.history[store.state.history.length - 3].position
  },
  getLastPosition () {
    return store.state.lastViewHistory.position
  },
  calcPanelPosition (data) {
    store.actions.setLog('calcPanelPosition() => Panel')
    // Variable declaration
    var newPosition = store.state.history[store.state.history.length - 1].position
    if (store.state.history.length > 2 && store.state.history[store.state.history.length - 3].viewName === data) {
      newPosition = store.state.history[store.state.history.length - 3].position
    }
    return newPosition
  },
  calcPosition (component) {
    store.actions.setLog('calcPosition() => ' + component.type)
    // Variable declaration
    var parentPosition = {Xi: 0, Yi: 0, X: 0, Y: 0, scalei: 1, scale: 1}
    var newPosition = store.state.history[store.state.history.length - 1].position
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
  }
}
export default position
