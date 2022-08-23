import store from '@/store/store'

const mediaQuery = [
  { // small devices
    media: window.matchMedia('(max-width: 319px)'),
    width: { xxl: 200, xl: 124, l: 76, m: 48, s: 30, xs: 18, xxs: 10 }
  },
  { // medium
    media: window.matchMedia('(min-width: 320px)'),
    width: { xxl: 230, xl: 142, l: 88, m: 54, s: 34, xs: 20, xxs: 10 }
  },
  { // medium - large devices portrait
    media: window.matchMedia('(min-width: 375px) and (orientation: portrait)'),
    width: { xxl: 260, xl: 160, l: 100, m: 62, s: 38, xs: 22, xxs: 12 }
  },
  { // medium - large devices landscape
    media: window.matchMedia('(min-width: 375px) and (orientation: landscape)'),
    width: { xxl: 270, xl: 168, l: 104, m: 64, s: 40, xs: 24, xxs: 12 }
  },
  { // tablets portrait
    media: window.matchMedia('(min-width: 768px) and (orientation: portrait) and (min-pixel-ratio: 2)'),
    width: { xxl: 340, xl: 210, l: 130, m: 80, s: 52, xs: 32, xxs: 14 }
  },
  { // tablets landscape
    media: window.matchMedia('(min-width: 768px) and (orientation: landscape)'),
    width: { xxl: 360, xl: 222, l: 138, m: 86, s: 54, xs: 32, xxs: 14 }
  },
  { // desktop or large tablets portrait
    media: window.matchMedia('(min-width: 992px) and (orientation: portrait)'),
    width: { xxl: 420, xl: 260, l: 160, m: 100, s: 62, xs: 38, xxs: 16 }
  },
  { // desktop or large tablets landscape
    media: window.matchMedia('(min-width: 992px) and (orientation: landscape)'),
    width: { xxl: 420, xl: 260, l: 160, m: 100, s: 62, xs: 38, xxs: 16 }
  },
  { // large desktop
    media: window.matchMedia('(min-width: 1200px) and (orientation: portrait)'),
    width: { xxl: 450, xl: 278, l: 172, m: 106, s: 66, xs: 42, xxs: 20 }
  },
  { // xxl desktop
    media: window.matchMedia('(min-width: 1800px)'),
    width: { xxl: 450, xl: 278, l: 172, m: 106, s: 66, xs: 42, xxs: 20 }
  }
]

const pixelsGapByPixelRatio = {
  0.25: 24,
  0.3125: 32,
  0.3333: 9,
  0.375: 16,
  0.4166: 24,
  0.5: 4,
  0.625: 16,
  0.6666: 3,
  0.75: 8,
  0.8: 5,
  0.8333: 12,
  0.9: 20,
  0.9375: 32,
  1: 2,
  1.1: 20,
  1.125: 16,
  1.2: 5,
  1.25: 8,
  1.35: 40,
  1.375: 16,
  1.5: 4,
  1.5625: 32,
  1.65: 40,
  1.75: 8,
  1.875: 16,
  2: 2,
  2.1875: 32,
  2.25: 8,
  2.5: 4,
  2.625: 16,
  3: 2,
  3.125: 16,
  3.75: 8,
  4: 1,
  4.5: 4,
  5: 2,
  6: 1,
  6.25: 8,
  7.5: 4
}

export function updateDiametersInPercent () {
  const container = document.getElementById('z-container')
  if (!container) {
    store.state.diameters = mediaQuery[0].width
    return
  }
  const containerWidth = Math.round(container.getBoundingClientRect().width)
  const sizes = store.state.percentSizes
  const minSizes = store.state.minSizesInPixels
  const diameters = {}
  for (const size in sizes) {
    diameters[size] = Math.round(containerWidth * (sizes[size] / 100))
    if (diameters[size] < minSizes[size]) {
      diameters[size] = minSizes[size]
    }
  }
  store.state.diameters = diameters
  store.actions.setLog('updateDiameters() using percent. z-view new xxl diameter: ' + store.state.diameters.xxl)
}

export function updateDiametersInFullMode () {
  for (const element of mediaQuery) {
    if (element.media.matches) {
      store.state.diameters = element.width
    }
  }
  store.actions.setLog('updateDiameters() at appMode full. z-view new xxl diameter: ' + store.state.diameters.xxl)
}

export function updateDiametersInMixedMode () {
  const container = document.getElementById('z-container')
  if (!container) {
    store.state.diameters = mediaQuery[0].width
    return
  }
  const vp = container.getBoundingClientRect().width

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
  store.actions.setLog('updateDiameters() at appMode mixed. z-view new xxl diameter: ' + store.state.diameters.xxl)
}

export function updateDiametersDependsOnPixelRatio () {
  const roundedPixelRatio = Math.round(window.devicePixelRatio * 10000) / 10000

  if (pixelsGapByPixelRatio[roundedPixelRatio] === undefined) {
    store.actions.setLog('updateDiametersDependsOnPixelRatio() not found ' + roundedPixelRatio)
    return
  }
  const sizes = Object.assign({}, store.state.diameters)
  for (const size in sizes) {
    sizes[size] -= sizes[size] % (pixelsGapByPixelRatio[roundedPixelRatio] ?? 1)
    if (sizes[size] <= 0) {
      sizes[size] = pixelsGapByPixelRatio[roundedPixelRatio]
    }
  }
  store.state.diameters = sizes

  store.actions.setLog('updateDiametersDependsOnPixelRatio() ' + roundedPixelRatio + ' / z-view new xxl diameter: ' + store.state.diameters.xxl)
}
