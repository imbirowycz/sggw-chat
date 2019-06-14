<template>
  <div class="center-bar-footer">
    <div class="msg-writer">
      <textarea
        class="text-area-box"
        type="text"
        placeholder="Napisz wiadomość..."
        v-model="message"
        @keypress.enter.prevent="sentMessage"
      ></textarea>
    </div>
    <div class="msg-footer"></div>
  </div>
</template>
<script>
export default {
  name: "ChatFooter",
  data() {
    return {
      message: ""
    };
  },
  methods: {
    sentMessage() {
      this.$emit("messageToParent", this.message);
      this.message = "";
    }
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
    // border-bottom: 1px solid black;
    flex: 3 1;
  }
  .msg-footer {
    flex: 1 1;
  }
}
.text-area-box {
  width: 100%;
  height: 100%;
}
textarea {
  resize: none;
  outline: none;
  border-top: $border;
  border-bottom: $border;
  border-left: none;
  border-right: none;
  padding-left: 10px;
}
</style>