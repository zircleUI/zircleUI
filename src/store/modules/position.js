import store from '../store'
const position = {
  getCurrentPosition () {
    return store.state.position
  },
  calcPosition (component) {
    store.actions.setLog('calcPosition() => ' + component.type)
    // Variable declaration
    var scale = 1
    var scalei = 1
    var currentX = 0
    var currentY = 0
    var currentXi = 0
    var currentYi = 0
    var parentPosition = {Xi: 0, Yi: 0, X: 0, Y: 0, scalei: 1, scale: 1}
    var newPosition = store.state.position
    // Calc position for z-panel (the main view)
    switch (component.type) {
      case 'panel':
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
        break
      default:
      // Cal position for other components such as z-scale
        var angle = component.angle
        var distance = component.distance
        scale = store.state.zircleWidth.xl / store.actions.getComponentWidth(component.size)
        scalei = store.actions.getComponentWidth(component.size) / store.state.zircleWidth.xl
        distance === 0 ? (
          currentX = 0,
          currentY = 0
          ) : (
          currentX = ((store.state.zircleWidth.xl / 2) * distance / 100) * Math.cos(angle * (Math.PI / 180)),
          currentY = ((store.state.zircleWidth.xl / 2) * distance / 100) * Math.sin(angle * (Math.PI / 180))
          )
        currentX > 0 ? currentXi = -Math.abs(Number(currentX)) : currentXi = Math.abs(Number(currentX))
        currentY > 0 ? currentYi = -Math.abs(Number(currentY)) : currentYi = Math.abs(Number(currentY))
        if (component.$parent.type === 'panel') {
          parentPosition = {
            Xi: component.$parent.position.Xi,
            Yi: component.$parent.position.Yi,
            X: component.$parent.position.X,
            Y: component.$parent.position.Y,
            scalei: component.$parent.position.scalei,
            scale: component.$parent.position.scale
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
