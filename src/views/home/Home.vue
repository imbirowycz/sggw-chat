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
      {{contentType}}
      <chat-header @connectPostRoom="connectPostRoom" @connectChatRoom="connectChatRoom"></chat-header>
      <post-content ref="posts" v-if="contentType == 'post'"></post-content>
      <chat-content v-if="contentType == 'chat'" :messages="messages" :user="userGet" ref="content"></chat-content>
      <chat-footer
        v-if="userGet.status == 'ticher' || contentType == 'chat'"
        @messageToParent="sentMessage"
      ></chat-footer>
    </div>
    <div class="right-bar">
      <div class="right-bar-header">
        <div class="home-button pd-10" @click="connectHomeRoom()">
          <span>Strona główna</span>
        </div>
        <div class="message-button pd-10" @click="connectChatRoom()">
          <span>Messages</span>
        </div>
      </div>
      <div class="right-bar-options"></div>
      <!-- <div class="right-bar-footer"></div> -->
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
import { mapState, mapGetters, mapMutations } from "vuex";
import UserInfo from "./components/left-panel/UserInfo";
import OptionsMenu from "./components/left-panel/OptionsMenu";
import ChatHeader from "./components/center-panel/ChatHeader";
import PostContent from "./components/center-panel/PostContent";
import ChatContent from "./components/center-panel/ChatContent";
import ChatFooter from "./components/center-panel/ChatFooter";
import ListRooms from "./components/left-panel/ListRooms";
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
    ListRooms
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
    ...mapState("user", { rabit: state => state.user })
  },
  sockets: {
    connect() {
      console.log("socket connect");
    },
    newMessage(value) {
      this.messages.push(value);
    },
    newPost(value) {
      console.log("nwe POst from server");
      console.log(this.$refs.posts);
      this.$refs.posts.posts.push(value);
    },
    usersUpdate(value) {
      this.messages.push(value);
    }
  },
  methods: {
    ...mapMutations("user", ["setUserId"]),
    ...mapMutations("loader", ["setLoaded", "setLoading"]),
    connectToRoom (id) {
      console.log('connectToRoom', id)
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
        const userMsg = {
          content: value,
          ...this.userGet,
          id_group: 1
        };
        this.$socket.emit("newPost", userMsg, err => {
          if (err) console.log(err);
        });
      } else {
        const userMsg = {
          id: this.rabit.id,
          message: value,
          name: this.rabit.firstName,
          id_account: this.userGet.id_account
        };
        this.$socket.emit("newMessage", userMsg, err => {
          alert("co jest");
          if (err) console.log(err);
        });
      }
    },
    getData() {
      axios.get("http://localhost:3000/get").then(respnse => {
        this.dane = respnse.data;
      });
    },
    liveRoom() {
      this.$socket.emit(
        "leave",
        { oldRoom: "112233", currentRoom: "00990099" },
        err => {
          alert("co jest");
          if (err) console.log(err);
        }
      );
      console.log("wywolano connectHomeRoom");
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
      this.contentType = "chat";
      this.liveRoom();
      this.$socket.emit(
        "joinChat",
        {
          name: this.userGet.firstName,
          id_group: this.userGet.id_group,
          id_account: this.userGet.id_account
        },
        data => {
          if (typeof data == "string") console.log(data);
          else {
            this.setUserId(data.id);
          }
        }
      );
    },
    connectPostRoom() {
      this.contentType = "post";
      this.liveRoom();
      this.$socket.emit(
        "joinPost",
        {
          name: this.userGet.firstName,
          id_group: this.userGet.id_group,
          id_account: this.userGet.id_account
        },
        data => {
          if (typeof data == "string") console.log(data);
          else {
            console.log("Podlączono do postRoom");
          }
        }
      );
    },
    initializeConnections() {}
  },
  mounted() {
    this.token = JSON.parse(localStorage.getItem("userChat")).token;
    console.log("id_group : ", this.userGet);
    this.connectPostRoom();
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
    &-header {
      flex: 1 1;
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
  .right-bar {
    width: 450px;
    height: 100%;
  }
}
</style>
