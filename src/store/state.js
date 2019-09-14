import Vue from 'vue'
const state = new Vue({
  data: {
    // app Mode
    appMode: 'full',
    // navigation
    navigationMode: 'forward',
    isRouterEnabled: false,
    router: {},
    history: [],
    backwardNavigation: false,
    componentList: {},
    goBackView: '',
    // look & feel
    diameters: {},
    sizes: {
      xxl: 55,
      xl: 32,
      l: 20,
      m: 12,
      s: 8,
      xs: 5,
      xxs: 2
    },
    appStyle: {
      theme: 'theme-black',
      mode: 'mode-dark',
      shape: 'circle'
    },
    // pagination components
    currentPage: 0,
    items: [],
    pages: [],
    params: {},
    // debug
    debug: false
  }
})

export default state
