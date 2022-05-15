import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'https://e-zelver-api.herokuapp.com';

createApp(App).use(store).use(router).mount('#app')
