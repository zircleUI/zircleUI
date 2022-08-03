import store from '@/store/store'

export const createUniqueKey = () => Date.now().toString(36) + Math.random().toString(36).substring(2)

export function retrieveViewName (pos) {
  if (store.state.history.length <= pos) {
    return ''
  }
  return store.state.history[store.state.history.length - pos].name
}

export function transformViewName (view) {
  view = view.toLowerCase()
  let count = 0

  if (!store.state.isRouterEnabled) {
    count = store.state.history.filter((historicView) => historicView.name.startsWith(view)).length
    view += '--' + count
  }
  return view
}

export function parseView (data) {
  const baseName = (typeof data === 'object') ? data.name : data
  const name = transformViewName(baseName)
  const route = { name, params: data.params }
  let path = '/' + name

  if (typeof data === 'object' && typeof data.params === 'object') {
    let paramPath = ''
    Object.keys(data.params).forEach(function (key) {
      paramPath += '/:' + key
    })
    path += paramPath
  }

  return {
    name,
    route,
    path
  }
}
