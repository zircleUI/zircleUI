import store from '../store'
const themes = {
  getTheme () {
    return store.state.appStyle.theme
  },
  getThemeMode () {
    return store.state.appStyle.mode
  },
  setAppStyle (object) {
    store.state.appStyle.theme = object.theme
    store.state.appStyle.mode = object.mode
  }
}
export default themes
