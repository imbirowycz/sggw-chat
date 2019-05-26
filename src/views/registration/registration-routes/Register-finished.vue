<template>
  <div class="register-finished">
    <loader class="height-100 loader" :status="getStatus">
      <div class="content-block-center">
        <b-row class="d-flex align-items-center justify-content-center row-block">
          <div v-if="error" class="alert alert-danger alert-block" role="alert">{{msg}}</div>
          <b-col>
            <b-form @submit.prevent="onSubmit">
              <div class="box-form">
                <b-form-group id="input-group-pass" label="Hasło:" label-for="input-pass" inline>
                  <b-form-input id="input-pass" v-model="password" type="password" required></b-form-input>
                </b-form-group>
              </div>
              <div class="box-form">
                <b-form-group
                  id="input-group-pass2"
                  label="Powtórz hasło:"
                  label-for="input-pass2"
                  inline
                >
                  <b-form-input id="input-pass2" v-model="confirmPassword" type="password" required></b-form-input>
                </b-form-group>
              </div>
              <div class="box-form">
                <b-button type="submit" variant="primary">Zapisz</b-button>
              </div>
            </b-form>
          </b-col>
          <b-col style="text-align: center;">
            <h4>Proszę wprowadzić hasło.</h4>
            <p>
              Hasło nie może być krótsze niż 6 znaków,
              <br>możesz użyć zarówno duże, jak i małe litery.
              <br>Hasło musi zawierać cyfry, jak i znaki specjalne!
            </p>
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
              ></path>
            </svg>
          </b-col>
        </b-row>
      </div>
    </loader>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import { createUser } from "@/views/registration/api/api";
import Loader from "@/components/Loader";
export default {
  name: "Register-finished",
  data() {
    return {
      password: null,
      confirmPassword: null,
      error: false,
      msg: ""
    };
  },
  computed: {
    ...mapGetters("loader", ["getStatus"]),
    ...mapGetters("registrationUser", ["getUser"])
    
  },
  methods: {
    ...mapMutations("loader", ["setStatus"]),
    ...mapMutations('user', ['createdUser']),
    onSubmit() {
      if (this.password == this.confirmPassword) {
        this.error = false;
        this.$emit("bildUser", { password: this.password });
        this.createdUser({email: this.getUser.email, password: this.getUser.password})
        this.setStatus("LOADING");
        createUser()
          .then(response => {
            this.setStatus("LOADED");
            this.$router.push({
              name: "Login",
              params: {
                param: response,
                user: { email: this.getUser.email, password: this.getUser.password }
              }
            });
          })
          .catch(err => {
            console.error(err);
            this.setStatus("LOADED");
          });
      } else {
        this.error = true;
        this.msg = "Hasła muszą się zgadzać!";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.register-finished {
  display: flex;
  width: 100%;
  flex-direction: column;
  min-height: 100%;
  padding-top: 5em;
  background: $pink;
  .loader {
    flex: 1 1;
  }
}
.content-block-center {
  display: flex;
  align-items: center;
  position: relative;
  min-height: 360px;
  height: 80% !important;
}
.alert-block {
  position: absolute;
  top: 10px;
  left: 10px;
  width: calc(100% - 20px);
}
.row-block {
  height: 100%;
  margin: 0;
  width: 100%;
}
</style>
