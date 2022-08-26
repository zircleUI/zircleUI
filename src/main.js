import { createApp } from 'vue'
import App from './App.vue'
import zircle from './index.js'

const app = createApp(App)
app.use(zircle)
app.mount('#app')
