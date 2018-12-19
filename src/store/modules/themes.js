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
  }
}
export default themes
