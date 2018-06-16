const state = {
  // App Mode
  appMode: 'full',
  // Navigation
  mode: 'forward',
  isRouterEnabled: false,
  $router: {},
  history: [],
  backwardNavigation: false,
  componentList: {},
  // Styles
  zircleWidth: {
    xl: 200,
    l: 70,
    m: 50,
    s: 30,
    xs: 20,
    xxs: 20
  },
  appStyle: {
    theme: 'theme-blue',
    mode: 'mode-dark'
  },
  // Pagination components
  currentPage: 0,
  items: [],
  pages: [],
  item: '',
  // z-dialog component
  dialog: false
}

export default state
