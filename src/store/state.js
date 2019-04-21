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
    sizes: { xxl: 70, xl: 50, l: 40, m: 30, s: 15, xs: 10, xxs: 5 },
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
