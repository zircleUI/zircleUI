import store from '../store'
const themes = {
  getCurrentTheme () {
    return store.state.theme
  },
  getCurrentColor () {
    return store.state.color
  }
}
export default themes
