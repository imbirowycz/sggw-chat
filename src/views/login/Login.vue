<template xmlns:v-model="http://www.w3.org/1999/xhtml">
  <loader :status="status">
    <div class="hello">
      <div class="hello-info">
        <!-- <div class="hello-info__logo"></div> -->
        <div class="hello-info__content" v-if="!param">
          <!-- <h1 class="hello-info__content--name">Twitter _ academic</h1> -->
          <!-- <h3>
            Internetowy portal dla nauczycieli akademickich wspierający komunikację
            ze studentami
          </h3> -->
          <h1 class="hello-info__content--name">jakas nazwa</h1>

          <ul>
            <li class="hello-info__content--description">🧐 Obserwuj co się dzieje na uczelni</li>
            <li class="hello-info__content--description">Komunikuj się ze znajomymi 😜</li>
            <li class="hello-info__content--description">
              Zadawaj pytania
              <i class="material-icons">help</i>
            </li>
            <li class="hello-info__content--description">
              Bądź na bieżąco ...
              <i class="material-icons">autorenew</i>
            </li>
          </ul>
        </div>
        <div v-else class="info-message">{{param}}</div>
      </div>
      <div class="hello-option">
        <div class="hello-option__center">
          <h1>Logowanie</h1>
          <form action="#" class="hello-option__center--form">
            <label for="login">
              <span v-if="email.valid" class="valid-error">{{email.message}}</span>
            </label>
            <input
              type="text"
              placeholder="Email"
              id="login"
              v-model="email.data"
              :class="{error: email.valid}"
              required
            >
            <label for="password">
              <span v-if="password.valid" class="valid-error">{{password.message}}</span>
            </label>
            <input
              type="password"
              placeholder="Hasło"
              id="password"
              v-model="password.data"
              :class="{error: password.valid}"
              required
            >
            <input type="submit" @click.prevent="login()" value="Zaloguj się…" class="btn">
            <button type="button" @click="linkRegister()" class="btn">Załóż konto</button>
            <router-link to="#">Nie pamiętasz hasła?</router-link>
          </form>
        </div>
      </div>
    </div>
  </loader>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Loader from "@/components/Loader";
// import {AXIOS} from '../main'
export default {
  name: "login",
  components: {
    Loader
  },
  props: {
    param: String,
    user: Object
  },
  // props: { hellomsg: { type: String, required: true } },
  data() {
    return {
      status: "LOADED",
      email: {
        data: "",
        valid: false,
        message: ""
      },
      password: {
        data: "",
        valid: false,
        message: ""
      },
      error_list: []
    };
  },
  computed: {
    ...mapGetters("user", ["loginUser", "userGet", "userMock"]),
    /**
     * @return {boolean}
     */
    ValidateEmail() {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
        return true;
      }

      return false;
    }
  },
  methods: {
    ...mapMutations("user", ["userCreate"]),
    login: function() {
      console.log("walidacja danych");
      // check valid email
      this.erroList = [];
      if (!this.email.data == "") {
        if (
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email.data)
        ) {
          this.email.valid = false;
        } else {
          this.email.valid = true;
          this.email.message = "*Nie poprawna forma email!";
        }
      } else {
        this.email.valid = true;
        this.email.message = "*Połe nie morze być puste!";
      }

      //check valid password
      if (!this.password.data == "") {
        if (this.password.data.length > 6 && this.password.data.length < 12) {
          this.password.valid = false;
        } else {
          this.password.message = "*Nie poprawna długość hasła!";
          this.password.valid = true;
        }
      } else {
        this.password.valid = true;
        this.password.message = "*Połe nie morze być puste!";
      }
      if (!this.email.valid && !this.password.valid) {
        let user = {
          email: this.email.data,
          password: this.password.data
        };
        // alert(this.loginUser(user));
        if (this.loginUser(user)) {
          this.status = "LOADING";
          setTimeout(x => {
            if (this.userGet == null) this.userCreate(this.userMock);
            this.status = "LOADED";
            this.$router.push("/");
          }, 2000);
        } else {
          console.log("Użytkownik z takimi danymi nie odnaleziony!");
        }
      } else console.error("validacja nieudana!");
    },
    linkRegister() {
      this.$router.push("/registration");
    }
  },
  created() {
    if (this.user != null) {
      this.email.data = this.user.email;
      this.password.data = this.user.password;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" >
@import url("https://fonts.googleapis.com/css?family=Permanent+Marker");
@import url("https://fonts.googleapis.com/css?family=Roboto");
@import url("https://fonts.googleapis.com/css?family=Mali");

@keyframes rotations {
  0%,
  30%,
  100% {
    transform: rotate(0deg);
  }
  10% {
    transform: rotate(-15deg);
  }
  20% {
    transform: rotate(15deg);
  }
}
@keyframes rotations360 {
  0%,
  30%,
  100% {
    transform: rotate(0deg);
  }
  10% {
    transform: rotate(-360deg);
  }
  20% {
    transform: rotate(360deg);
  }
}
@keyframes error-valid {
  0%,
  30%,
  100% {
    transform: translateX(0);
  }
  10% {
    transform: translateX(-0.5rem);
  }
  20% {
    transform: translateX(0.5rem);
  }
}

.hello {
  width: 100%;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  height: 100vh;
  position: relative;

  .hello-info {
    display: flex;
    justify-content: center;
    align-items: center;
    background: $green;
    width: 50%;
    margin-right: 0.3rem;
    .info-message {
      width: 60%;
      font-size: 2rem;
      font-family: "Roboto", cursive;
      font-weight: 600;
      color: $pink;
    }
    .hello-info__logo {
      position: absolute;
      width: 8rem;
      height: 8rem;
      top: 8%;
      left: calc(50% - 4rem);
      border-radius: 50%;
      display: block;
      // background: $white url("../../assets/sggw.png") center;
      background-size: 120% 120%;
      animation: rotations 3.4s infinite linear;
      overflow: hidden;

      &:hover {
        animation: rotations360 1s infinite linear;
      }
    }
    .hello-info__content {
      ul > li {
        align-items: center;
        display: flex;

        &::before {
          display: inline-block;
          padding: 0.2rem;
          content: "●";
          color: $pink;
          width: 1em;
          margin-left: -1em;
        }
      }
      .hello-info__content--name {
        font-size: 2.5rem;
        font-family: "Permanent Marker", cursive;
        font-weight: 600;
        color: $pink;
        margin-bottom: 0.7rem;
      }
      .hello-info__content--description {
        font-size: 1.5rem;
        font-weight: 500;
        margin-bottom: 0.7rem;
        font-family: "Mali", cursive;
      }
    }
  }

  .hello-option {
    display: flex;
    justify-content: center;
    align-items: center;
    background: $pink;

    width: 50%;
    margin-left: 0.3rem;

    .hello-option__center {
      width: 60%;
      min-height: 6rem;
      /*background: rgba($green, .8);*/
      background: $white;
      margin: 0 auto;
      padding: 1rem 3rem 3rem 3rem;
      box-sizing: border-box;
      border-radius: 0.5rem;
      box-shadow: 0px 0px 31px -12px rgba(0, 0, 0, 0.75);

      h1 {
        text-align: center;
        font-family: "Permanent Marker", cursive;
        color: $green;
        font-size: 2rem;
      }

      .hello-option__center--form {
        width: 100%;

        input {
          width: 100%;
          margin-bottom: 0.5rem;
          display: block;
          padding: 0.4rem;
          border-radius: 0.5rem;

          //background: rgba($green, .8);
          border: solid 0.09rem $blue;
          /*&::placeholder{*/
          /*color: #1da1f2;*/
          /*}*/

          &:focus {
            outline: none;
            box-shadow: inset 0px 0px 50px -22px rgba(0, 0, 0, 0.45);
          }
        }

        input[type="submit"] {
          margin-top: 1.5rem;
          padding: 0.5rem;
          background: $blue;
          color: $white;
          /*font-weight: 600;*/
          transition: background-color 0.2s, color 0.2s;
          border: solid 0.09rem $blue;

          &:hover {
            background: $blue-hover;
            color: $white;
          }
        }
        button {
          box-sizing: border-box;
          background-color: $white;
          color: $blue;
          border: solid 0.09rem $blue;
          margin-bottom: 0.5rem;

          &:hover {
            background: $blue-hover;
            color: $white;
          }
        }
      }
    }
  }
  .btn {
    padding: 0.5rem;
    border-radius: 0.5rem;
    background: $blue;
    color: $white;
    font-weight: 600;
    font-size: 0.8rem;
    transition: background-color 0.2s, color 0.2s;
    border: none;
    width: 100%;
    display: block;
    font-family: "Roboto", sans-serif;

    &:hover {
      outline: none;
      background: #96b094;
      color: $white;
      cursor: pointer;
    }
  }
}
.error {
  border: solid 0.09rem $invalid !important;
  animation: error-valid 0.5s linear;
}
.valid-error {
  color: $invalid;
  font-size: 0.7rem;
}
</style>
