<template>
  <div class="chat">
    <div class="post" v-for="(x,index) in 5" :key="index" :class="{right: index%2 == 0}">
      <div class="msg">
        <div>Post numer: {{index+1}}</div>
        <div>
          <span>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus minima maiores deleniti corrupti earum excepturi, architecto voluptatum aperiam mollitia totam aliquid nesciunt debitis perspiciatis officia aliquam dolores quisquam fugiat dolorem!</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ChatContent",
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.chat {
  border: 1px solid black;
  flex: 4 1;
  padding: 20px;
  overflow-y: auto;
  .post {
    width: 100%;
    margin-bottom: 20px;
    .msg {
      border: 1px solid black;
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
