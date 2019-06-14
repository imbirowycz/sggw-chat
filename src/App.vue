<template>
  <div id="app" class="scroll-style height-100">
    <section class="main height-100" >
      <router-view :hellomsg="msg" class="routerView"></router-view>
    </section>
  </div>
</template>

<script>
// import sidebar from "./views/Sidebar";

export default {
  name: "app",
  data() {
    return {
      msg: "Welcome to your Vue.js powered Spring Boot App",
      view: false,
      user: {}
    };
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