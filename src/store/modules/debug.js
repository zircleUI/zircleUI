import store from '../store'
const debug = {
  setLog (msg, type) {
    switch (type) {
      case 'warn':
        var bgColor = 'yellow'
        var color = 'black'
        break
      case 'error':
        bgColor = 'red'
        color = 'white'
        break
      default:
        bgColor = 'green'
        color = 'white'
    }
    if (store.debug) {
      return console.log('%c z ', 'background: ' + bgColor + '; color:  ' + color + '', msg)
    }
  },
  isDebugEnabled (value) {
    if (value === true || value === false) {
      store.debug = value
      let state = ''
      value === true ? state = 'enabled. Options: [all], [warnings], [errors]' : state = 'disabled'
      store.actions.setLog('Debug is ' + state)
    } else {
      store.actions.setLog('setDebug() only acepts true or false values', 'error')
    }
  }
}
export default debug
