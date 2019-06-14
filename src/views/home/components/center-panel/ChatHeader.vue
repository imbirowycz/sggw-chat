<template>
  <div class="center-bar-header">
    <div class="center-bar-header-options">
      <div class="center-bar-header-options-public pd-10">
        <span>Home</span>
      </div>
      <div class="center-bar-header-options-privat pd-10">
        <span>Message</span>
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
    return {};
  }
};
</script>
<style lang="scss" scoped>
.center-bar-header {
      // border: 1px solid black;
      &-options {
        display: flex;
        border-bottom: $border;
        &-public {
          border-right: $border;
          text-align: center;

          flex: 1 1;
        }
        &-privat {
          flex: 1 1;
          text-align: center;
        }
      }
      &-info {
        border-bottom: $border;
        text-align: center;
      }
    }
</style>
