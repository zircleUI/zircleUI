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
    usePercentSizes: false,
    percentSizes: {
      xxl: 30,
      xl: 20,
      l: 15,
      m: 8,
      s: 5,
      xs: 4,
      xxs: 2
    },
    minSizesInPixels: {
      xxl: 180,
      xl: 150,
      l: 100,
      m: 80,
      s: 50,
      xs: 30,
      xxs: 20
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
