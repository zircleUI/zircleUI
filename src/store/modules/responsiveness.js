import store from '../store'
// armar document.getElementById('foo').offsetWidth para cuando zrcle este embedded. para que tome por referencia al canvas o %
var mediaQuery = [
  { // small devices
    media: window.matchMedia('(max-width: 319px)'),
    width: {xl: 200, l: 70, m: 50, s: 30, xs: 20, xxs: 20}
  },
  { // medium
    media: window.matchMedia('(min-width: 320px)'),
    width: {xl: 230, l: 85, m: 65, s: 45, xs: 30, xxs: 20}
  },
  { // medium - large devices portrait
    media: window.matchMedia('(min-width: 375px) and (orientation: portrait)'),
    width: {xl: 260, l: 90, m: 70, s: 50, xs: 40, xxs: 30}
  },
  { // medium - large devices landscape
    media: window.matchMedia('(min-width: 375px) and (orientation: landscape)'),
    width: {xl: 270, l: 90, m: 70, s: 50, xs: 40, xxs: 30}
  },
  { // tablets portrait
    media: window.matchMedia('(min-width: 768px) and (orientation: portrait) and (min-pixel-ratio: 2)'),
    width: {xl: 340, l: 120, m: 100, s: 80, xs: 60, xxs: 40}
  },
  { // tablets landscape
    media: window.matchMedia('(min-width: 768px) and (orientation: landscape)'),
    width: {xl: 360, l: 120, m: 100, s: 80, xs: 60, xxs: 40}
  },
  { // desktop or large tablets portrait
    media: window.matchMedia('(min-width: 992px) and (orientation: portrait)'),
    width: {xl: 420, l: 120, m: 100, s: 80, xs: 60, xxs: 40}
  },
  { // desktop or large tablets landscape
    media: window.matchMedia('(min-width: 992px) and (orientation: landscape)'),
    width: {xl: 420, l: 120, m: 100, s: 80, xs: 60, xxs: 40}
  },
  { // large desktop
    media: window.matchMedia('(min-width: 1200px) and (orientation: portrait)'),
    width: {xl: 430, l: 130, m: 110, s: 90, xs: 70, xxs: 50}
  },
  { // xl desktop
    media: window.matchMedia('(min-width: 1800px)'),
    width: {xl: 650, l: 130, m: 110, s: 90, xs: 70, xxs: 50}
  }
]
const responsiveness = {
  getComponentWidth (size) {
    switch (size) {
      case 'extralarge':
      case 'xxl':
        var width = store.state.zircleWidth.xl
        break
      case 'large':
        width = store.state.zircleWidth.l
        break
      case 'medium':
        width = store.state.zircleWidth.m
        break
      case 'small':
        width = store.state.zircleWidth.s
        break
      case 'extrasmall':
        width = store.state.zircleWidth.xs
        break
      case 'xxs':
        width = store.state.zircleWidth.xxs
        break
    }
    return width
  },
  getDimensions () {
    if (store.actions.getAppMode() === 'full') {
      for (var i = 0; i < mediaQuery.length; i++) {
        if (mediaQuery[i].media.matches) store.state.zircleWidth = mediaQuery[i].width
      }
      store.actions.setLog('getDimensions() AppMode full => viewPort resize: z-panel width = ' + store.state.zircleWidth.xl)
    } else if (store.actions.getAppMode() === 'embedded') {
      let vp = document.getElementById('z-container').offsetWidth
      if (vp <= 319) {
        store.state.zircleWidth = mediaQuery[0].width
      } else if (vp >= 320 && vp <= 374) {
        store.state.zircleWidth = mediaQuery[1].width
      } else if (vp >= 375 && vp <= 767) {
        store.state.zircleWidth = mediaQuery[2].width
      } else if (vp >= 768 && vp <= 991) {
        store.state.zircleWidth = mediaQuery[4].width
      } else if (vp >= 992 && vp <= 1199) {
        store.state.zircleWidth = mediaQuery[6].width
      } else if (vp >= 1200 && vp <= 1799) {
        store.state.zircleWidth = mediaQuery[8].width
      } else if (vp >= 1800) {
        store.state.zircleWidth = mediaQuery[9].width
      }
      store.actions.setLog('getDimensions() AppMode embedded => viewPort resize: z-panel width = ' + store.state.zircleWidth.xl)
    }
  }
}
export default responsiveness
