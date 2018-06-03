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
      if (msg === 'Navigation mode is forward' && store.actions.getHistoryLength() === 0) {
        console.groupCollapsed('%c Z ', 'background: gray; color:  white', 'Initial view')
      } else if (msg === 'Navigation mode is forward' && store.actions.getHistoryLength() >= 1) {
        console.groupCollapsed('%c Z ', 'background: gray; color:  white', 'Go to new view')
      } else if (msg === 'Navigation mode is backward') {
        console.groupCollapsed('%c Z ', 'background: gray; color:  white', 'Return to previous view')
      }
      console.log('%c z ', 'background: ' + bgColor + '; color:  ' + color + '', msg)
      if (msg === 'Navigation mode is iddle' || msg === 'end') {
        console.groupEnd()
      }
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
