/* eslint-disable */ 
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
    const container = document.getElementById('z-container').getBoundingClientRect().width
    const sizes = store.state.sizes
    const minSizes = store.state.minSizesInPixels
    const diameters = {}
    for (const size in sizes) {
      diameters[size] = container * (sizes[size] / 100)
      if (diameters[size] < minSizes[size]) {
        diameters[size] = minSizes[size]
      }
    }

    store.state.diameters = diameters
    store.actions.setLog('Size change detected on z-canvas')
  }
}
export default responsiveness 
