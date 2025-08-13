// import './assets/main.css'

import {
  createApp
} from 'vue'
import App from './App.vue'
import router from './router'

// 匯入 Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'
// 匯入 Bootstrap JS（需要互動功能時才加）
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

const app = createApp(App)

app.use(router)

app.mount('#app')
