<template>
  <div class="center-bar-header">
    <div class="center-bar-header-options">
      <div class="home-button pd-10" :class="{active: isHome}" @click="connectHomeRoom()">
        <span>Strona główna</span>
      </div>
      <div class="message-button pd-10" :class="{active: !isHome}" @click="connectChatRoom()">
        <span>Messages</span>
      </div>
    </div>
    <div class="center-bar-header-info pd-10">
      <span>Aktualny czat</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "ChatHeader",
  data() {
    return {
      isHome: true
    };
  },
  methods: {
    connectHomeRoom() {
      this.isHome = !this.isHome;
      this.$emit("connectToHomeRoom");
    },
    connectChatRoom() {
      this.isHome = !this.isHome;
      this.$emit("connectMessageRoom");
    }
  }
};
</script>
<style lang="scss" scoped>
.active {
  background: rgba(#007bff, 0.3);
  color: white;
  cursor: default !important;
  &:hover {
    background: rgba(#007bff, 0.3) !important;
    color: white !important;
  }
}
.center-bar-header {
  // border: 1px solid black;
  &-options {
    display: flex;
    border-bottom: $border;
    .home-button {
      border-right: $border;
      text-align: center;
      cursor: pointer;
      flex: 1 1;
      transition: color 0.3s, background-color 0.3s;
      &:hover {
        background: rgba(gray, 0.1);
        color: rgb(85, 81, 81);
      }
    }
    .message-button {
      flex: 1 1;
      text-align: center;
      cursor: pointer;
      transition: color 0.3s, background-color 0.3s;

      &:hover {
        background: rgba(gray, 0.1);
        color: rgb(85, 81, 81);
      }
    }
  }
  &-info {
    border-bottom: $border;
    text-align: center;
  }
}
</style>
