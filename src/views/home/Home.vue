<template>
  <div class="home">
    <div class="left-bar">
      <button @click="checkConnect()">Connect</button>
      <user-info></user-info>
      <options-menu></options-menu>
      <!-- <div class="left-bar-footer"></div> -->
    </div>
    <div class="center-bar">
      <chat-header @connectToHomeRoom="connectToHomeRoom" @connectMessageRoom="connectMessageRoom"></chat-header>
      <chat-content :messages="messages" :user="userGet" ref="content"></chat-content>
      <chat-footer @messageToParent="sentMessage"></chat-footer>
    </div>
    <div class="right-bar">
      <div class="right-bar-header"></div>
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
import ChatContent from "./components/center-panel/ChatContent";
import ChatFooter from "./components/center-panel/ChatFooter";
import http from '@/http/http'
export default {
  name: "Home",
  components: {
    UserInfo,
    OptionsMenu,
    ChatHeader,
    ChatContent,
    ChatFooter
  },
  data() {
    return {
      messages: [],
      token: null
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
    usersUpdate(value) {
      this.messages.push(value);
    }
  },
  methods: {
    ...mapMutations("user", ["setUserId"]),
    checkConnect () {
       http.post("http://localhost:3000/auth/test").then(respnse => {
        // this.userCreate(respnse.data);
        // this.$router.push("/");
        console.log('home checkConnect: ', respnse.data)
      }).catch(error => {
        console.log(error)
      })
    },
    sentMessage(value) {
      const userMsg = {
        id: this.rabit.id,
        message: value,
        name: this.rabit.firstName
      };
      this.$socket.emit("newMessage", userMsg, err => {
        alert("co jest");
        if (err) console.log(err);
      });
    },
    getData() {
      axios.get("http://localhost:3000/get").then(respnse => {
        this.dane = respnse.data;
      });
    },
    connectToHomeRoom () {
      console.log("wywolano connectHomeRoom");
    },
    connectMessageRoom () {
      console.log("wywolano connectChatRoom");
      this.$socket.emit("changeRoom", {oldRoom: '112233', currentRoom: '00990099'}, err => {
        alert("co jest");
        if (err) console.log(err);
      });

    },
    initializeConnections() {}
  },
  mounted() {
    this.token = JSON.parse(localStorage.getItem("userChat")).token
    this.$socket.emit("join", { name: this.userGet.firstName }, data => {
      if (typeof data == "string") console.log(data);
      else {
        this.setUserId(data.id);
      }
    });
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
