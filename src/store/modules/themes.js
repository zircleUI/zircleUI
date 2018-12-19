import store from '../store'
const themes = {
  getTheme () {
    return store.state.appStyle.theme
  },
  getThemeMode () {
    return store.state.appStyle.mode
  },
  getThemeShape () {
    return store.state.appStyle.shape
  },
  setThemeShapeToSquare () {
    store.actions.setLog('- Theme shape: square')
    store.state.appStyle.shape = 'square'
    return store.state.appStyle.shape
  },
  setThemeShapeToCircle () {
    store.actions.setLog('- Theme shape: circle')
    store.state.appStyle.shape = 'circle'
    return store.state.appStyle.shape
  }
}
export default themes
