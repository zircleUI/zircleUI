import store from '../store'
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
    // small devices
    if (window.matchMedia('(max-width: 319px)').matches) store.state.zircleWidth = {xl: 200, l: 70, m: 50, s: 30, xs: 20, xxs: 20}
    // medium
    if (window.matchMedia('(min-width: 320px)').matches) store.state.zircleWidth = {xl: 230, l: 85, m: 65, s: 45, xs: 30, xxs: 20}
    // medium - large devices portrait
    if (window.matchMedia('(min-width: 375px) and (orientation: portrait)').matches) store.state.zircleWidth = {xl: 260, l: 90, m: 70, s: 50, xs: 40, xxs: 30}
    // medium - large devices landscape
    if (window.matchMedia('(min-width: 375px) and (orientation: landscape)').matches) store.state.zircleWidth = {xl: 270, l: 90, m: 70, s: 50, xs: 40, xxs: 30}
    // tablets portrait
    if (window.matchMedia('(min-width: 768px) and (orientation: portrait) and (min-pixel-ratio: 2)').matches) store.state.zircleWidth = {xl: 340, l: 120, m: 100, s: 80, xs: 60, xxs: 40}
    // tablets landscape
    if (window.matchMedia('(min-width: 768px) and (orientation: landscape)').matches) store.state.zircleWidth = {xl: 360, l: 120, m: 100, s: 80, xs: 60, xxs: 40}
    // desktop or large tablets portrait
    if (window.matchMedia('(min-width: 992px) and (orientation: portrait)').matches) store.state.zircleWidth = {xl: 420, l: 120, m: 100, s: 80, xs: 60, xxs: 40}
    // desktop or large tablets landscape
    if (window.matchMedia('(min-width: 992px) and (orientation: landscape)').matches) store.state.zircleWidth = {xl: 420, l: 120, m: 100, s: 80, xs: 60, xxs: 40}
    // large desktop
    if (window.matchMedia('(min-width: 1200px) and (orientation: portrait)').matches) store.state.zircleWidth = {xl: 430, l: 130, m: 110, s: 90, xs: 70, xxs: 50}
    // xl desktop
    if (window.matchMedia('(min-width: 1800px)').matches) store.state.zircleWidth = {xl: 650, l: 130, m: 110, s: 90, xs: 70, xxs: 50}
    store.actions.setLog('getDimensions() => viewPort resize: z-panel width = ' + store.state.zircleWidth.xl)
  }
}
export default responsiveness
