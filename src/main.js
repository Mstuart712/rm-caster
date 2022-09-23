import { createApp } from 'vue'
import { createPinia } from 'pinia'
import "bootstrap-dark-5/dist/css/bootstrap-dark.min.css"
//import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import App from './App.vue'
import router from './router'
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

app.use(router)

const options = {
    // You can set your default options here
};

app.use(Toast, options);

app.mount('#app')
