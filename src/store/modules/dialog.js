import store from '../store'
const dialog = {
  setDialog (value) {
    store.actions.setLog('setdialog(): ' + value)
    store.state.dialog = value
  },
  getDialog () {
    return store.state.dialog
  }
}
export default dialog
