import store from '../store'
const appMode = {
  getAppMode () {
    return store.state.appMode
  },
  setAppMode (value) {
    store.state.appMode = value
    store.actions.setLog('setAppMode(): ' + value)
  }
}
export default appMode
