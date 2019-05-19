<template>
  <div class="center-bar-footer">
    <div class="msg-writer">
      <h4>Napisz wiadomość....</h4>
    </div>
    <div class="msg-footer"></div>
  </div>
</template>
<script>
export default {
  name: "ChatFooter",
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.center-bar-footer {
  flex: 1 1;
  display: flex;
  flex-direction: column;
  .msg-writer {
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid black;
    flex: 3 1;
  }
  .msg-footer {
    flex: 1 1;
  }
}
</style>