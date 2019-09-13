<template>
  <div id="app" class="scroll-style height-100">
    <section class="main height-100" v-show="status == 'LOADED'">
      <router-view :hellomsg="msg" class="routerView"></router-view>
    </section>
    <loader v-show="status == 'LOADING'"></loader>
  </div>
</template>

<script>
// import sidebar from "./views/Sidebar";
import http from "@/http/http"
import {mapState} from "vuex"
import Loader from "@/components/Loader"

export default {
  name: "app",
  components: {
    Loader
  },
  data() {
    return {
      msg: "Welcome to your Vue.js powered Spring Boot App"
    };
  },
  computed: {
   ...mapState("loader", { status: state => state.status })
  },
  methods: {
    init () {
       http.post('auth/init').then(res => {
      console.log(res.data)
    }).catch(err => {
      console.log(err.response)
    })
    }
  },
  mounted: function() {
    this.init()
  }
};
</script>

 <style lang="scss">
 html,body {
   height: 100vh;
 }
 .height-100 {
   height: 100%;
 }
 .ui.multiple.search.dropdown, .ui.multiple.search.dropdown {
    min-height: 38px!important;
}
 
::-webkit-scrollbar
{
  width: 8px;  /* for vertical scrollbars */
  height: 8px; /* for horizontal scrollbars */
}

::-webkit-scrollbar-track
{
  background: rgba(0, 0, 0, 0.1);
}

::-webkit-scrollbar-thumb
{
  background: rgba(0, 0, 0, 0.3);
  border-radius: 2px;
}

</style>