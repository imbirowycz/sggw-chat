import Vue from 'vue'
import Vuex from 'vuex';
Vue.use(Vuex);

import user from '@/store/modules/user'
import registrationUser from '@/store/modules/registrationUser'
import loader from '@/store/modules/loader'
import room from "@/store/modules/room"
import post from "@/store/modules/post"

export default new Vuex.Store({
  modules: {
    user,
    registrationUser,
    loader,
    room,
    post
  }
})