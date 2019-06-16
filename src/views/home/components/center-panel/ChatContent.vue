<template>
  <div class="chat">
    <div
      class="post"
      v-for="(x,index) in messages"
      :key="index"
      :class="{right: user.id == x.id}"
      ref="posts"
    >
      <div class="msg">
        <small>from: {{x.name}}</small>
        <div>
          <span>{{x.message}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { setTimeout } from "timers";
export default {
  name: "ChatContent",
  props: {
    messages: Array,
    user: Object
  },
  watch: {
    messages() {
      let div = document.querySelector('.chat')
      setTimeout(() => {
        div.scrollTop = div.scrollHeight;
      });
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.chat {
  flex: 4 1;
  padding: 20px;
  overflow-y: auto;
  .post {
    width: 100%;
    margin-bottom: 20px;
    .msg {
      border: $border;
      min-height: 30px;
      min-width: 30px;
      max-width: 60%;
      display: inline-block;
      border-radius: 10px;
      padding: 10px;
    }
  }
}
.right {
  text-align: right;
}
</style>
