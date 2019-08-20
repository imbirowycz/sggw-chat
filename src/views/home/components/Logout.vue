<template>
  <button class="logout" @click="logout()">Log out</button>
</template>
<script>
import http from "@/http/http";
export default {
  name: "Logout",
  data() {
    return {
      msg: "Aloha"
    };
  },
  methods: {
    logout() {
      http
        .post("auth/logout")
        .then(respnse => {
          console.log('Użytkownik został wylogowany.');
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
<style lang="scss">
.logout {
}
</style>