import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import {BASE_URL} from "./API";

axios.defaults.withCredentials = true
axios.defaults.baseURL = BASE_URL;

createApp(App).use(store).use(router).mount('#app')
