import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store/store.js"
import VueSocketio from 'vue-socket.io-extended';
import io from 'socket.io-client';

Vue.use(VueSocketio, io('http://localhost:3000'));

import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


//my-components
import loader from '@/components/Loader'
Vue.component('loader', loader)



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
