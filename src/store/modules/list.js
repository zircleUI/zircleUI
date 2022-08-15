import store from '../store'

const list = {
  setPages (value) {
    store.state.pages = value
  },
  getPages () {
    return store.state.pages
  },
  getNumberOfPages () {
    return store.state.pages.length
  },
  getCurrentPage () {
    return store.state.pages[store.state.currentPage]
  },
  getCurrentPageIndex () {
    return store.state.currentPage
  },
  setCurrentPageIndex (value) {
    store.state.currentPage = value
  },
  getNumberOfItemsInCurrentPage () {
    return store.state.pages[store.state.currentPage].length
  },
  setParams (value) {
    store.state.params = value
  },
  getParams () {
    return store.state.params
  }
}
export default list
