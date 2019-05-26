<template>
  <div class="home">
    <div class="left-bar">
      <user-info></user-info>
      <options-menu></options-menu>
      <div class="left-bar-footer"></div>
    </div>
    <div class="center-bar">
      <chat-header></chat-header>
      <chat-content :messages="messages" :user="userGet"></chat-content>
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
export default {
  name: "Home",
  components: {
    UserInfo,
    OptionsMenu,
    ChatHeader,
    ChatContent,
    ChatFooter
  },
  data () {
    return {
      messages: []
    }
  },
  computed: {
    // ...mapState({
    //     user: state => state.user != null ? state.user : 'undefinited'
    // }),
    ...mapGetters("user", ["userGet"]),
    ...mapState('user', {rabit: state => state.user})
  },
  sockets: {
    connect() {
      console.log("socket connect");
    },
    newMessage (value) {
      this.messages.push(value);
    }
  },
  methods: {
    ...mapMutations('user', ["setUserId"]),
    sentMessage(value) {
      const userMsg = {
        id: this.rabit.id,
        message: value,
        name: this.rabit.firstName
      }
      console.log("wuwolano sentMessage");
      this.$socket.emit("newMessage", userMsg, err => {
        if (err) console.log(err)
      });
    },
    getData() {
      axios.get("http://localhost:3000/get").then(respnse => {
        this.dane = respnse.data;
      });
    },
    initializeConnections () {
      
    }
  },
  mounted() {
    this.$socket.emit("join", this.userGet, data => {
        if (typeof data == 'string') console.log(data)
        else {
          this.setUserId(data.id);
        }
      });
  },
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  //   background-color: $pink;
  display: flex;
  .left-bar {
    width: 450px;
    border: 1px solid black;
    height: 100%;
    display: flex;
    flex-direction: column;

    &-footer {
      flex: 1 1;
    }
  }
  .right-bar {
    width: 450px;
    border: 1px solid black;
    height: 100%;
    display: flex;
    flex-direction: column;
    &-header {
      border: 1px solid black;
      flex: 1 1;
    }
    &-options {
      border: 1px solid black;
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
  }
  .right-bar {
    width: 450px;
    border: 1px solid black;
    height: 100%;
  }
}
</style>