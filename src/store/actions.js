import router from './modules/router'
import position from './modules/position'
import navigation from './modules/navigation'
import responsiveness from './modules/responsiveness'
import themes from './modules/themes'
import debug from './modules/debug'
import list from './modules/list'
import app from './modules/app'

const actions = Object.assign({}, router, position, navigation, responsiveness, themes, list, debug, app)

export default actions
