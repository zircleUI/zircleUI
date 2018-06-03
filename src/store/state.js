const state = {
  // App Mode
  appMode: 'full',
  // Navigation
  mode: 'forward',
  isRouterEnabled: false,
  $router: {},
  history: [],
  goBackNav: false,
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
  color: 'color--blue',
  theme: 'theme--dark',
  // Pagination components
  currentPage: 0,
  items: [],
  pages: [],
  // z-alert component
  alert: false
}

export default state
