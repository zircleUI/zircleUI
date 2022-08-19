import store from '../store'

const debug = {
  setLog (msg, type) {
    let bgColor = 'green'
    if (type === 'warn') {
      bgColor = 'yellow'
    } else if (type === 'error') {
      bgColor = 'red'
    }

    const color = (type === 'warn') ? 'black' : 'white'

    if (store.state.debug) {
      console.log('%c z ', 'background: ' + bgColor + '; color:  ' + color + '', msg) // eslint-disable-line no-console
    }
  },
  getState () {
    return store.state.$data
  }
}
export default debug
