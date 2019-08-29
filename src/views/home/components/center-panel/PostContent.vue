<template>
  <div class="posts-wrapper">
      {{posts}}
    <div v-if="posts.length > 0">
      <div class="posts" v-for="(post ,index) in posts" :key="index" ref="posts">
        <div class="post-header">
          <strong class="faculty">{{post.faculty}}</strong>
          <p>
            <strong class="ticher-name">{{post.firstName}} {{post.lastName}} </strong>
            <small>{{post.email}}</small>
          </p>
        </div>
        <div class="post-content">
          <p>{{post.content}}</p>
        </div>
        <div class="post-footer">
          <span>{{post.date_created | filterDate}}</span>
        </div>
      </div>
    </div>
    <empty v-else msg="Brak postów :("></empty>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Empty from "./Empty";
import http from "@/http/http";
export default {
  name: "PostContent",
  components: {
    Empty
  },
  data() {
    return {
      posts: []
    };
  },
  watch: {
    messages() {
      let div = document.querySelector(".chat");
      setTimeout(() => {
        div.scrollTop = div.scrollHeight;
      });
    }
  },
  computed: {
    ...mapGetters("user", ["userGet"])
  },
  filters: {
    filterDate(value) {
      let date = new Date(value);
      return date.toLocaleDateString("PL-pl");
    }
  },
  methods: {
    getPosts() {
      console.log("this.userGet.id_group: ", this.userGet.id_group);
      http
        .get(`posts/getAll?id_group=${this.userGet.id_group}`)
        .then(respnse => {
          console.log("response:", respnse.data);
          this.posts = respnse.data;
        });
    }
  },
  mounted() {
    this.getPosts();
  }
};
</script>
<style lang="scss" scoped>
.posts-wrapper {
  width: 100%;
  flex: 4 1;
  padding: 20px;
  overflow-y: auto;
  .posts {
    border-bottom: 1px solid $border-color;
    flex: 4 1;
    padding: 10px;
    overflow-y: auto;
    .post-header {
      .ticher-name {
        font-size: 15px;
      }
      .faculty {
        font-size: 20px;
      }
    }
    .post-content {
      font-size: 1.5em;
    }
    .post-footer {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
