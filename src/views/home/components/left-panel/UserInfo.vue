<template>
  <div class="user-info">
      <div class="left-bar-header">
        <div class="user-info">
          <div class="user-foto">foto</div>
          <span>Imię nazwisko</span>
        </div>
        <span>Podstawowa informacja</span>
      </div>
  </div>
</template>
<script>
export default {
  name: "UserInfo",
  data() {
    return {};
  }
};
</script>
<style lang="scss" scope>
    .left-bar-header{
      border: 1px solid black;
      flex: 1 1;
      padding: 10px;
      .user-info {
        display: flex;
        align-items: center;
      }
      .user-foto {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: grey;
      }
    }
</style>