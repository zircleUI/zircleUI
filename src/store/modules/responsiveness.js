import store from '../store'
const responsiveness = {
  getComponentWidth (size) {
    let sizes = size.toLowerCase()
    if (sizes === 'extralarge') sizes = 'xl'
    if (sizes === 'large') sizes = 'l'
    if (sizes === 'medium') sizes = 'm'
    if (sizes === 'small') sizes = 's'
    if (sizes === 'extrasmall') sizes = 'xs'
    return store.state.diameters[sizes]
  },
  getDimensions () {
    let container = document.getElementById('z-container').offsetWidth
    let size = store.state.sizes
    store.state.diameters = {
      xxl: container * (size.xxl / 100),
      xl: container * (size.xl / 100),
      l: container * (size.l / 100),
      m: container * (size.m / 100),
      s: container * (size.s / 100),
      xs: container * (size.xs / 100),
      xxs: container * (size.xxs / 100)
    }
    store.actions.setLog(`Size change detected on z-canvas`)
  }
}
export default responsiveness
