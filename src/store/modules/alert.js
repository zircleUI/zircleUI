import store from '../store'
const alert = {
  setAlert (value) {
    store.actions.setLog('setAlert(): ' + value)
    store.state.alert = value
  },
  getAlert () {
    return store.state.alert
  }
}
export default alert
