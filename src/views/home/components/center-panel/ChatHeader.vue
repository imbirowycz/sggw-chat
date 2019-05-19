<template>
  <div class="center-bar-header">
    <div class="center-bar-header-options">
      <div class="center-bar-header-options-public">
        <span>Publiczne</span>
      </div>
      <div class="center-bar-header-options-privat">
        <span>Prywatne</span>
      </div>
    </div>
    <div class="center-bar-header-info">
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
      border: 1px solid black;
      &-options {
        display: flex;
        border: 1px solid black;
        &-public {
          border-right: 1px solid black;
          text-align: center;

          flex: 1 1;
        }
        &-privat {
          flex: 1 1;
          text-align: center;
        }
      }
      &-info {
        border: 1px solid black;
        text-align: center;
      }
    }
</style>
