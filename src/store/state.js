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
    // look & feel
    diameters: {xxl: 200, xl: 124, l: 76, m: 47, s: 29, xs: 18},
    appStyle: {
      theme: 'theme-black',
      mode: 'mode-dark'
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
