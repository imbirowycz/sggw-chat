import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from "./store/store.js"

import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


//my-components
import loader from '@/components/Loader'
Vue.component('loader', loader)

export const AXIOS = axios.create({
  baseURL: `/api`
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
