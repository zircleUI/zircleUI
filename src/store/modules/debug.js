import store from '../store'
const debug = {
  setLog (msg, type) {
    var bgColor = ''
    var color = ''
    type === 'warn' ? (bgColor = 'yellow', color = 'black') : type === 'error' ? (bgColor = 'red', color = 'white') : (bgColor = 'green', color = 'white') // eslint-disable-line
    if (store.state.debug && msg === 'Navigation mode is forward' && store.actions.getHistoryLength() === 1) {
      console.groupCollapsed('%c Z ', 'background: gray; color:  white', 'Initial view') // eslint-disable-line no-console
    } else if (store.state.debug && msg === 'Navigation mode is forward' && store.actions.getHistoryLength() >= 1) {
      console.groupCollapsed('%c Z ', 'background: gray; color:  white', 'Zoom-in to new view') // eslint-disable-line no-console
    } else if (store.state.debug && msg === 'Navigation mode is backward') {
      console.groupCollapsed('%c Z ', 'background: gray; color:  white', 'Zoom-out to previous view') // eslint-disable-line no-console
    } else if (store.state.debug && msg === 'Navigation mode is iddle') {
      console.groupEnd() // eslint-disable-line no-console
    } else if (store.state.debug) {
      console.log('%c z ', 'background: ' + bgColor + '; color:  ' + color + '', msg) // eslint-disable-line no-console
    }
  },
  getState () {
    return store.state.$data
  }
}
export default debug
