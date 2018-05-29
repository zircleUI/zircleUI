import store from '../store'
const appMode = {
  getAppMode () {
    return store.state.appMode
  },
  setAppMode (value) {
    store.state.appMode = value
  }
}
export default appMode
