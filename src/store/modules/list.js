import store from '../store'
const list = {
  getSelectedItem () {
    return store.state.selectedItem
  },
  setPages (value) {
    // armar validator por array
    // mover fx chunk here
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
  }
}
export default list
