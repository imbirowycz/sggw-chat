import Vue from 'vue'
import Vuex from 'vuex';
Vue.use(Vuex);

import user from '@/store/modules/user'
import registrationUser from '@/store/modules/registrationUser'
import loader from '@/store/modules/loader'

export default new Vuex.Store({
  modules: {
    user,
    registrationUser,
    loader 
  }
})