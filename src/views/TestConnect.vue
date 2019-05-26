<template>
  <div>
    <button @click="getData">Pobierz</button>
    <input type="text" v-model="message">
    <button @click="sentMessage">Sent Message to server</button>
    <h1>{{dane}}</h1>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Test",
  data() {
    return {
      dane: null,
      message: "",
      socket: null
    };
  },
  sockets: {
    connect() {
      console.log("socket connesdfsdfsdfsfdcted");
    },
    test(val) {
    //   io.emit("customEmit", val);
      console.log(
        'this method was fired by the socket server. eg: io.emit("customEmit", data)', val
      );
    }
  },
  methods: {
    sentMessage() {
      alert("wuwolano");
      this.$socket.emit("customEmit", this.message);
    },
    getData() {
      axios.get("http://localhost:3000/get").then(respnse => {
        this.dane = respnse.data;
      });
    }
  }
};
</script>