import store from '@/store/store'

export const createUniqueKey = () => Date.now().toString(36) + Math.random().toString(36).substring(2)

export function retrieveViewName (pos) {
  let viewName = ''
  if (store.state.history.length >= pos) {
    viewName = store.state.history[store.state.history.length - pos].name
  }
  return viewName
}

export function transformViewName (view) {
  view = view.toLowerCase()
  let count = 0
  for (let i = 1; i <= store.state.history.length; i++) {
    if (store.state.history[store.state.history.length - i].name.split('--')[0] === view) {
      count += 1
    }
  }
  if (store.state.isRouterEnabled) {
    return view
  } else {
    return view + '--' + count
  }
}

export function parseView (data) {
  let name
  let route
  let paramPath = ''
  let path
  if (typeof data === 'string') {
    name = transformViewName(data)
    route = { name }
    path = '/' + name
  } else {
    Object.keys(data.params).forEach(function (key) {
      paramPath += '/:' + key
    })
    name = transformViewName(data.name)
    route = { name, params: data.params }
    path = '/' + name + '' + paramPath
  }
  return {
    name,
    route,
    path
  }
}
