import store from '../store'
function calcCoords (distance, angle, parentSize) {
  var X = 0
  var Y = 0
  var Xi = 0
  var Yi = 0
  if (distance !== 0) {
    X = ((store.actions.getComponentWidth(parentSize) / 2) * distance / 100) * Math.cos(angle * (Math.PI / 180))
    Y = ((store.actions.getComponentWidth(parentSize) / 2) * distance / 100) * Math.sin(angle * (Math.PI / 180))
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
    if (store.state.history[store.state.history.length - 3]) {
      return store.state.history[store.state.history.length - 3].position
    } else {
      return {
        X: 0, Y: 0, Xi: 0, Yi: 0, scale: 0, scalei: 0
      }
    }
  },
  calcViewPosition (viewName) {
    store.actions.setLog('calcViewPosition() ' + viewName)
    return store.actions.getCurrentViewName() === viewName ? store.actions.getCurrentPosition() : store.actions.getPastPosition()
  },
  calcPosition (component) {
    store.actions.setLog('calcPosition() => ' + component.componentType)
    // Variable declaration
    var parentPosition = {Xi: 0, Yi: 0, X: 0, Y: 0, scalei: 1, scale: 1}
    var newCoords = calcCoords(component.distance, component.angle, component.$parent.size)
    if (component.$parent.componentType === 'z-view' || component.$parent.componentType === 'z-list' || component.$parent.componentType === 'z-spot') parentPosition = { Xi: component.$parent.position.Xi, Yi: component.$parent.position.Yi, X: component.$parent.position.X, Y: component.$parent.position.Y, scalei: component.$parent.position.scalei, scale: component.$parent.position.scale }
    var newPosition = {
      X: newCoords.X,
      Y: newCoords.Y,
      Xi: parentPosition.Xi + newCoords.Xi * parentPosition.scalei,
      Yi: parentPosition.Yi + newCoords.Yi * parentPosition.scalei,
      scale: parentPosition.scale * store.state.diameters.xxl / store.actions.getComponentWidth(component.size),
      scalei: parentPosition.scalei * store.actions.getComponentWidth(component.size) / store.state.diameters.xxl,
      Xabs: parentPosition.X + newCoords.X * parentPosition.scalei,
      Yabs: parentPosition.Y + newCoords.Y * parentPosition.scalei
    }
    return newPosition
  }
}
export default position
