<template>
  <div id="app" class="scroll-style height-100">
    <!--nawigacja strony-->
    <header id="nav" v-if="view">
      <h1>Header --> 'Nawigacja strony'</h1>
      <router-link to="/">Hello</router-link>
      <router-link to="/callservice">Service</router-link>
      <router-link to="/bootstrap">Bootstrap</router-link>
      <router-link to="/user">User</router-link>
    </header>

    <section class="main height-100" >
      <sidebar class="sidebar" v-if="view"></sidebar>
      <router-view :hellomsg="msg" class="routerView"></router-view>
    </section>

    <footer class="footer" v-if="view">
      <h2>Footer</h2>
    </footer>
  </div>
</template>

<script>
import sidebar from "./views/Sidebar";

export default {
  name: "app",
  data() {
    return {
      msg: "Welcome to your Vue.js powered Spring Boot App",
      view: false,
      user: {}
    };
  },
  components: {
    sidebar
  },
  computed: {
    empty() {
      if (this.user.length === 0) {
        return (this.view = false);
      } else {
        return (this.view = true);
      }
    }
  },
  mounted: function() {}
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