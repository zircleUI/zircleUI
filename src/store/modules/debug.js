import store from '../store'
const debug = {
  setLog (msg, type) {
    var bgColor = ''
    var color = ''
    type === 'warn' ? (bgColor = 'yellow', color = 'black') : type === 'error' ? (bgColor = 'red', color = 'white') : (bgColor = 'green', color = 'white') // eslint-disable-line
    if (store.state.debug) {
      console.log('%c z ', 'background: ' + bgColor + '; color:  ' + color + '', msg) // eslint-disable-line no-console
    }
  },
  getState () {
    return store.state.$data
  }
}
export default debug
