import store from '../store'
import {
  updateDiametersInPercent,
  updateDiametersInFullMode,
  updateDiametersInMixedMode,
  updateDiametersDependsOnPixelRatio
} from '@/store/utils/responsiveness'

const responsiveness = {
  getComponentWidth (size) {
    size = size.toLowerCase()
    if (size === 'extralarge') size = 'xl'
    if (size === 'large') size = 'l'
    if (size === 'medium') size = 'm'
    if (size === 'small') size = 's'
    if (size === 'extrasmall') size = 'xs'
    return store.state.diameters[size]
  },
  updateDiameters () {
    if (store.state.usePercentSizes) {
      updateDiametersInPercent()
    } else if (store.actions.getAppMode() === 'full') {
      updateDiametersInFullMode()
    } else if (store.actions.getAppMode() === 'mixed') {
      updateDiametersInMixedMode()
    }

    updateDiametersDependsOnPixelRatio()
  }
}

export default responsiveness
