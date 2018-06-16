import router from './modules/router'
import position from './modules/position'
import navigation from './modules/navigation'
import responsiveness from './modules/responsiveness'
import themes from './modules/themes'
import debug from './modules/debug'
import list from './modules/list'
import dialog from './modules/dialog'
import appMode from './modules/appMode'

const actions = Object.assign({}, router, position, navigation, responsiveness, themes, list, dialog, debug, appMode)

export default actions
