<template>
    <div class="registration" style="height: 100%;">
      <div class="main-progress">
        <!-- {{$route.path}} -->
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
      </div>
      <router-view v-on:setStatus="setStatus" v-on:bildUser="bildUser" @finishedBildUser="finishedBildUser">
      </router-view>
    </div>
</template>
<script>
import Loader from "@/components/Loader";
import {mapGetters, mapMutations} from "vuex"
export default {
  name: "Registration",

  data() {
    return {
      status: "LOADED",
      user: {},
      links: [
        {
          url_1: "/registration/options",
          url_2: null,
          isActive: false,
          isSubLink: false
        },
        {
          url_1: "/registration/options/teacher",
          url_2: "/registration/options/student",
          isActive: false,
          isSubLink: false
        },
        {
          url_1: "/registration/options/student/finished",
          url_2: "/registration/options/teacher/finished",
          isActive: false,
          isSubLink: false
        }
      ]
    };
  },
  computed: {
    ...mapGetters('loader', ['getStatus']),
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
    }
  },
  methods: {
    ...mapMutations('registrationUser', ['createdUser']),
    ...mapMutations('user', ['userCreate']),
    steDecorator(value) {
      this.links.forEach(x => {
        if (x.url_1 == value || x.url_2 == value) x.isActive = true;
        else x.isActive = false;
        if (value.includes(x.url_1) || value.includes(x.url_2))
          x.isSubLink = true;
        else x.isSubLink = false;
      });
    },
    setStatus(status) {
      console.log("wywolano setStatus");
      this.status = status;
    },
    bildUser(payload) {
      // this.createdUser(payload);
      this.user = Object.assign(this.user, payload);
      console.log(this.user, "wywolano metode bildUser");
    },
    finishedBildUser() {
      console.log('wywolano finishedBuildUser', this.user)
      this.userCreate(this.user)
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.steDecorator(to.path);
    next();
  },
  mounted() {
    this.steDecorator(this.$route.path);
  }
};
</script>
<style lang="scss" scoped>
.main-progress {
  display: flex;
  justify-content: center;
  width: 100%;
  text-align: center;

  .main-progress-bar {
    position: absolute;
    border-bottom-left-radius: 35px;
    border-bottom-right-radius: 35px;
    z-index: 10;
    width: 50%;
    padding: 5px 0 10px 0;
    justify-content: center;
    background: $white;
    box-shadow: 0px 10px 5px 0px rgba(0, 0, 0, 0.05) !important;
    //   margin-bottom: 10px;
    display: flex;
    .main-progress-bar__line {
      text-align: center;
      flex-basis: 15%;
      margin: 0 25px;
      // color: rgba(191, 191, 191, 0.5);
      color: $green;
      font-size: 12px;
      font-weight: 600;
      // border-bottom: 4px solid rgba(191, 191, 191, 0.5);
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
}
</style>
<style lang="scss">
.registration {
  width: 100%;
  .content-block-center {
    width: 80%;
    margin: 0 auto;
    //  padding: 20px;
    background: $white;
    box-shadow: 0px 10px 5px 0px rgba(0, 0, 0, 0.15);
  }
  .box-form {
    padding: 0 10px;
    flex: 1;
  }
}
</style>

