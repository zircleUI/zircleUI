import store from '../store'

const mediaQuery = [
  { // small devices
    media: window.matchMedia('(max-width: 319px)'),
    width: { xxl: 200, xl: 124, l: 76, m: 47, s: 29, xs: 18, xxs: 9 }
  },
  { // medium
    media: window.matchMedia('(min-width: 320px)'),
    width: { xxl: 230, xl: 142, l: 88, m: 54, s: 34, xs: 21, xxs: 10 }
  },
  { // medium - large devices portrait
    media: window.matchMedia('(min-width: 375px) and (orientation: portrait)'),
    width: { xxl: 260, xl: 161, l: 99, m: 61, s: 38, xs: 23, xxs: 11 }
  },
  { // medium - large devices landscape
    media: window.matchMedia('(min-width: 375px) and (orientation: landscape)'),
    width: { xxl: 270, xl: 167, l: 103, m: 64, s: 39, xs: 24, xxs: 12 }
  },
  { // tablets portrait
    media: window.matchMedia('(min-width: 768px) and (orientation: portrait) and (min-pixel-ratio: 2)'),
    width: { xxl: 340, xl: 210, l: 130, m: 80, s: 50, xs: 31, xxs: 14 }
  },
  { // tablets landscape
    media: window.matchMedia('(min-width: 768px) and (orientation: landscape)'),
    width: { xxl: 360, xl: 222, l: 138, m: 85, s: 53, xs: 32, xxs: 15 }
  },
  { // desktop or large tablets portrait
    media: window.matchMedia('(min-width: 992px) and (orientation: portrait)'),
    width: { xxl: 420, xl: 260, l: 160, m: 99, s: 61, xs: 38, xxs: 16 }
  },
  { // desktop or large tablets landscape
    media: window.matchMedia('(min-width: 992px) and (orientation: landscape)'),
    width: { xxl: 420, xl: 260, l: 160, m: 99, s: 61, xs: 38, xxs: 16 }
  },
  { // large desktop
    media: window.matchMedia('(min-width: 1200px) and (orientation: portrait)'),
    width: { xxl: 450, xl: 278, l: 172, m: 106, s: 66, xs: 41, xxs: 20 }
  },
  { // xxl desktop
    media: window.matchMedia('(min-width: 1800px)'),
    width: { xxl: 450, xl: 278, l: 172, m: 106, s: 66, xs: 41, xxs: 20 }
  }
]
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
  getDimensions () {
    if (store.actions.getAppMode() === 'full') {
      for (const element of mediaQuery) {
        if (element.media.matches) {
          store.state.diameters = element.width
        }
      }
      store.actions.setLog('getDimensions() at appMode full. z-view new diameter: ' + store.state.diameters.xxl)
    } else if (store.actions.getAppMode() === 'mixed') {
      const vp = document.getElementById('z-container').getBoundingClientRect().width

      let mediaQueryIndex = 0
      if (vp >= 1800) {
        mediaQueryIndex = 9
      } else if (vp >= 1200) {
        mediaQueryIndex = 8
      } else if (vp >= 992) {
        mediaQueryIndex = 6
      } else if (vp >= 768) {
        mediaQueryIndex = 4
      } else if (vp >= 375) {
        mediaQueryIndex = 2
      } else if (vp >= 320) {
        mediaQueryIndex = 1
      }

      store.state.diameters = mediaQuery[mediaQueryIndex].width
      store.actions.setLog('getDimensions() at appMode mixed. z-view new diameter: ' + store.state.diameters.xxl)
    }
  }
}

export default responsiveness
