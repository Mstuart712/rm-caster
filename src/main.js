import { createApp } from 'vue'
import { createPinia } from 'pinia'
import "bootstrap-dark-5/dist/css/bootstrap-dark.min.css"
//import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

app.use(router)

app.mount('#app')
