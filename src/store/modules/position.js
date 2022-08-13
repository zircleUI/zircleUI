import store from '../store'

function calcCoords (distance, angle, parentSize) {
  let X = 0
  let Y = 0
  let Xi = 0
  let Yi = 0
  if (distance !== 0) {
    X = ((store.actions.getComponentWidth(parentSize) / 2) * distance / 100) * Math.cos(angle * (Math.PI / 180))
    Y = ((store.actions.getComponentWidth(parentSize) / 2) * distance / 100) * Math.sin(angle * (Math.PI / 180))
    Xi = X > 0 ? -Math.abs(Number(X)) : Math.abs(Number(X))
    Yi = Y > 0 ? -Math.abs(Number(Y)) : Math.abs(Number(Y))
  }
  return {
    X,
    Y,
    Xi,
    Yi
  }
}

function determinePosition (pos) {
  if (store.state.history[store.state.history.length - pos]) {
    return store.state.history[store.state.history.length - pos].position
  } else {
    return {
      X: 0, Y: 0, Xi: 0, Yi: 0, scale: 0, scalei: 0
    }
  }
}

const position = {
  getCurrentPosition () {
    return store.state.history[store.state.history.length - 1].position
  },
  getPreviousPosition () {
    return determinePosition(2)
  },
  getPastPosition () {
    return determinePosition(3)
  },
  calcViewPosition (viewName) {
    store.actions.setLog('calcViewPosition() ' + viewName)
    return store.actions.getCurrentViewName() === viewName ? store.actions.getCurrentPosition() : store.actions.getPastPosition()
  },
  calcPosition (component) {
    const parentPosition =
      ['z-view', 'z-list', 'z-spot'].includes(component.$parent.componentType)
        ? {
            Xi: component.$parent.position.Xi,
            Yi: component.$parent.position.Yi,
            X: component.$parent.position.X,
            Y: component.$parent.position.Y,
            scalei: component.$parent.position.scalei,
            scale: component.$parent.position.scale
          }
        : { Xi: 0, Yi: 0, X: 0, Y: 0, scalei: 1, scale: 1 }
    const newCoords = calcCoords(component.distance, component.angle, component.$parent.size)
    return {
      X: newCoords.X,
      Y: newCoords.Y,
      Xi: parentPosition.Xi + newCoords.Xi * parentPosition.scalei,
      Yi: parentPosition.Yi + newCoords.Yi * parentPosition.scalei,
      scale: parentPosition.scale * store.state.diameters.xxl / store.actions.getComponentWidth(component.size),
      scalei: parentPosition.scalei * store.actions.getComponentWidth(component.size) / store.state.diameters.xxl,
      Xabs: parentPosition.X + newCoords.X * parentPosition.scalei,
      Yabs: parentPosition.Y + newCoords.Y * parentPosition.scalei
    }
  }
}
export default position
