<template>
  <div class="registration" style="height: 100%;" :style="{'background-color': contentBlockBg }">
    <div v-if="getStatus != 'LOADING' " class="main-progress-bar">
      <div
        v-for="(step, index) in links"
        :key="index"
        class="main-progress-bar__line"
        :class="{isSubLink: step.isSubLink, isActive: step.isActive}"
      >
        <span>Krok {{index+1}}</span>
      </div>
    </div>
    <div class="content-block-center">
      <router-view
        v-on:setStatus="setStatus"
        v-on:bildUser="bildUser"
        @finishedBildUser="finishedBildUser"
      ></router-view>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import http from "@/http/http";
export default {
  name: "Registration",

  data() {
    return {
      user: {},
      links: [
        {
          url_1: "/registration/options",
          url_2: null,
          isActive: false,
          isSubLink: false,
        },
        {
          url_1: "/registration/options/teacher",
          url_2: "/registration/options/student",
          isActive: false,
          isSubLink: false,
        },
        {
          url_1: "/registration/options/student/finished",
          url_2: "/registration/options/teacher/finished",
          isActive: false,
          isSubLink: false,
        },
      ],
    };
  },
  computed: {
    ...mapGetters("loader", ["getStatus"]),
    currentRoutPathOptions() {
      if (this.$route.path.includes("/registration/options")) return true;
      else return false;
    },
    currentRoutPathTeSt() {
      if (
        this.$route.path.includes("/registration/options/student") ||
        this.$route.path.includes("/registration/options/teacher")
      )
        return true;
      else return false;
    },
    currentRoutPathSuccess() {
      if (this.$route.path.includes("/registration/options/finished-register"))
        return true;
      else return false;
    },
    contentBlockBg() {
      if (this.$route.path == "/registration/options") return "white";
      else if (this.$route.path == "/registration/options/teacher")
        return "#c7ffc6";
      else if (this.$route.path == "/registration/options/student")
        return "#f29b9b";
      else return "#f29b9b";
    },
  },
  methods: {
    ...mapMutations("registrationUser", ["createdUser"]),
    ...mapMutations("user", ["userCreate"]),
    steDecorator(value) {
      this.links.forEach((x) => {
        if (x.url_1 == value || x.url_2 == value) x.isActive = true;
        else x.isActive = false;
        if (value.includes(x.url_1) || value.includes(x.url_2))
          x.isSubLink = true;
        else x.isSubLink = false;
      });
    },
    setStatus(status) {
      this.user.accountType = status;
    },
    bildUser(payload) {
      // this.createdUser(payload);
      console.log("payload: ", payload);
      this.user = Object.assign(this.user, payload);
    },
    finishedBildUser() {
      // this.userCreate(this.user)
      http
        .post("auth/register", this.user)
        .then((res) => {
          console.log("rejestracja użytkownika przebiegła pomyślnie");
          this.$router.push({
            name: "Login",
            params: {
              param:
                "Konto zostało pomyślenie utworzone. Proszę się zalogować.",
              user: { email: this.user.email, password: this.user.password },
            },
          });
        })
        .catch((err) => console.log("rejestracja nie udana :("));
    },
  },
  beforeRouteUpdate(to, from, next) {
    this.steDecorator(to.path);
    next();
  },
  mounted() {
    console.log("path: ", this.$route.path);
    this.steDecorator(this.$route.path);
  },
};
</script>
<style lang="scss" scoped>
.main-progress-bar {
  position: absolute;
  top: 0;
  left: 50%;
  right: 0;
  transform: translateX(-50%);
  display: flex;
  border-bottom-left-radius: 35px;
  border-bottom-right-radius: 35px;
  z-index: 10;
  width: 50%;
  padding: 5px 0 10px 0;
  justify-content: center;
  background: $white;
  box-shadow: 0px 10px 5px 0px rgba(0, 0, 0, 0.05) !important;
  border-bottom: 1px solid #ced4da;
  .main-progress-bar__line {
    text-align: center;
    flex-basis: 15%;
    margin: 0 25px;
    color: $green;
    font-size: 12px;
    font-weight: 600;
    border-bottom: 3px solid $green;
  }
  .active-tab {
    border-bottom-color: $blue;
    color: $blue;
  }
  .isActive {
    span {
      color: $pink !important;
    }

    border-bottom-color: $pink !important;
  }
  .isSubLink {
    border-bottom-color: $pink;
    span {
      color: rgb(230, 230, 230);
    }
  }
}
</style>
<style lang="scss">
.registration {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow: auto;
  
  .content-block-center {
    width: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    .register-item {
      box-shadow: 0px 10px 5px 0px rgba(0, 0, 0, 0.15);
      border-radius: 8px;
      width: 70%;
      margin: 60px auto;
      padding: 40px 30px;
      background: $white;
      min-width: 360px;
      .text-center{
        margin-bottom: 40px;
        color: #9ea0a1;
        font-weight: bold;
      }
    }
  }
  .box-form {
    padding: 0 10px;
    flex: 1;
  }
}
.box-form-st{
  min-width: 300px;
}
</style>

