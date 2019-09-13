<template>
  <div class="home">
    <div class="left-bar">
      <!-- <button @click="testLoader()">Test loader</button> -->
      <user-info></user-info>
      <options-menu></options-menu>
      <div class="left-bar-wrapper">
        <list-rooms @connectToRoom="connectToRoom"></list-rooms>
      </div>
      <!-- <div class="left-bar-footer"></div> -->
    </div>
    <div class="center-bar">
      <chat-header @connectPostRoom="connectToRoom" @connectChatRoom="connectChatRoom"></chat-header>
      <post-content ref="posts" v-if="contentType == 'post'"></post-content>
      <chat-content v-if="contentType == 'chat'" :messages="messages" :user="userGet" ref="content"></chat-content>
      <chat-footer
        v-if="userGet.status == 'ticher' || contentType == 'chat'"
        @messageToParent="sentMessage"
      ></chat-footer>
    </div>
    <div class="right-bar">
      <div class="right-bar-header">
        <h2>Plubione</h2>
      </div>
      <div class="right-bar-list"></div>
      <list-likie></list-likie>
      <!-- <div class="right-bar-footer"></div> -->
      <!-- <button @click="getLikeList()">Pobierz likieList</button>
      <div v-for="(item, index) in likeList" :key="index">
        <div v-if="item.type == 'group'" class="list-likie-item">
          <div class="user-foto">
            <user-icon></user-icon>
          </div>
          <div class="item-description">
            <span>{{item.fieldOfStudy}}</span>
            <span>{{item.mode}}</span>
            <span>{{item.year}}</span>
          </div>
        </div>
        <div class="list-likie-item" v-else >
          <div class="user-foto">
            <user-icon></user-icon>
          </div>
          <div class="item-description">
            <span>{{item.fieldOfStudy}}</span>
            <span>{{item.firstName}} {{item.lastName}}</span>
            <span>{{item.mode}}</span>
            <span>{{item.year}}</span>
          </div>
        </div>
      </div> -->
    </div>

    <!-- <h3>Hello from Home!</h3>
        <div v-if="userGet">
            <ul v-for="(value, key, index) in userGet" :key="index">
                <li>{{key}}: {{value}}</li>
               

            </ul>
    </div>-->
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import UserInfo from "./components/left-panel/UserInfo";
import OptionsMenu from "./components/left-panel/OptionsMenu";
import ChatHeader from "./components/center-panel/ChatHeader";
import PostContent from "./components/center-panel/PostContent";
import ChatContent from "./components/center-panel/ChatContent";
import ChatFooter from "./components/center-panel/ChatFooter";
import ListRooms from "./components/left-panel/ListRooms";
import ListLikie from "./components/right-panel/ListLikie"
import http from "@/http/http";
export default {
  name: "Home",
  components: {
    UserInfo,
    OptionsMenu,
    ChatHeader,
    PostContent,
    ChatContent,
    ChatFooter,
    ListRooms,
    ListLikie
  },
  data() {
    return {
      messages: [],
      token: null,
      contentType: "post"
    };
  },
  computed: {
    // ...mapState({
    //     user: state => state.user != null ? state.user : 'undefinited'
    // }),
    ...mapGetters("user", ["userGet"]),
    ...mapGetters("room", ["getOldRoom"]),
    ...mapState("user", { rabit: state => state.user }),
    ...mapState("room", {
      room: state => state.currentRoom
    })
  },
  sockets: {
    connect() {
      console.log("socket connect");
    },
    newMessage(value) {
      this.messages.push(value);
    },
    newPostSocket(value) {
      console.log("new POst from server");
      console.log(this.$refs.posts);
      // this.$refs.posts.posts.unshift(value);
      this.addPost(value);
    },
    usersUpdate(value) {
      this.messages.push(value);
    }
  },
  methods: {
    ...mapMutations("user", ["setUserId"]),
    ...mapMutations("post", ["addPost"]),
    ...mapMutations("loader", ["setLoaded", "setLoading"]),
    connectToRoom(id) {
      console.log("connectToRoom", id);
    },
    testLoader() {
      console.log("wowolano metodę testLoader");
      this.setLoading();
      setTimeout(() => {
        this.setLoaded();
      }, 300);
    },
    sentMessage(value) {
      if (this.contentType == "post") {
        console.log("sentMessage");
        const userMsg = {
          content: value,
          ...this.userGet,
          id_group: this.room
        };
        this.$socket.emit("newPost", userMsg, err => {
          if (err) console.log(err);
        });
      } else {
        // const userMsg = {
        //   id: this.rabit.id,
        //   message: value,
        //   name: this.rabit.firstName,
        //   id_account: this.userGet.id_account
        // };
        // this.$socket.emit("newMessage", userMsg, err => {
        //   alert("co jest");
        //   if (err) console.log(err);
        // });
      }
    },
    liveRoom() {
      console.log("wywolano liveRoom");
      this.$socket.emit("leave", { id_room: this.getOldRoom }, err => {
        if (err) console.log(err);
      });
    },
    // connectChatRoom() {
    //   this.contentType = "chat"
    //   console.log("wywolano connectChatRoom");
    //   this.$socket.emit(
    //     "changeRoom",
    //     { oldRoom: "112233", currentRoom: "00990099" },
    //     err => {
    //       alert("co jest");
    //       if (err) console.log(err);
    //     }
    //   );
    // },
    connectChatRoom() {
      //   this.contentType = "chat";
      //   this.liveRoom();
      //   this.$socket.emit(
      //     "joinChat",
      //     {
      //       name: this.userGet.firstName,
      //       id_group: this.userGet.id_group,
      //       id_account: this.userGet.id_account
      //     },
      //     data => {
      //       if (typeof data == "string") console.log(data);
      //       else {
      //         this.setUserId(data.id);
      //       }
      //     }
      //   );
    },
    connectToRoom() {
      console.log("connectPostRoom");
      this.contentType = "post";
      this.liveRoom();
      this.$socket.emit("join", this.room, error => {
        console.error(error);
      });
    },
    initializeConnections() {}
  },
  mounted() {
    this.token = JSON.parse(localStorage.getItem("userChat")).token;
    console.log("id_group : ", this.userGet);
  }
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  display: flex;
  .left-bar {
    width: 450px;

    height: 100%;
    display: flex;
    flex-direction: column;

    &-footer {
      flex: 1 1;
    }
    .left-bar-wrapper {
      flex: 1 1;
      overflow-y: auto;
    }
  }
  .right-bar {
    width: 450px;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    &-header {
      border-bottom: 1px solid $border-color;
      h2 {
        font-size: 20px;
        margin-top: 10px;
        text-align: center;
        font-weight: bold;
      }
    }
    &-options {
      flex: 3 1;
    }
    &-footer {
      flex: 1 1;
    }
  }
  .center-bar {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    border-right: $border;
    border-left: $border;
  }
}
</style>
