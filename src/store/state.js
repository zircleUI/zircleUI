const state = {
  position: {
    X: 0,
    Y: 0,
    scale: 1,
    Xi: 0,
    Yi: 0,
    scalei: 1
  },
  // Navigation
  mode: 'forward',
  isRouterEnabled: false,
  $router: {},
  currentView: '',
  previousView: '',
  pastView: '',
  history: [],
  cache: [],
  lastViewCache: {},
  goBackNav: false,
  component_uid: '',
  // Styles
  zircleWidth: {
    xl: 200,
    l: 70,
    m: 50,
    s: 30,
    xs: 20,
    xxs: 20
  },
  color: 'color--black',
  theme: 'theme--dark',
  // Pagination components
  selectedItem: '',
  currentPage: 0,
  items: [],
  pages: [],
  // z-alert component
  alert: false
}

export default state
