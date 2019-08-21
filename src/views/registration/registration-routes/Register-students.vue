<template>
  <div class="register-student">
      <div class="content-block-center">
        <b-row class="justify-content-center p-4">
          <b-col cols="12">
            <h4 class>Proszę wypełnić poniższy formularz:</h4>
            <b-form @submit="onSubmit" @reset="onReset" v-if="show">
              <div class="d-flex flex-wrap">
                <div class="box-form">
                  <b-form-group id="input-group-name" label="Imię:" label-for="input-name" inline>
                    <b-form-input id="input-name" v-model="form.firstName" type="text" required></b-form-input>
                  </b-form-group>

                  <b-form-group
                    id="input-group-last-name"
                    label="Nazwisko:"
                    label-for="input-last-name"
                  >
                    <b-form-input id="input-last-name" v-model="form.lastName" type="text" required></b-form-input>
                  </b-form-group>

                  <b-form-group id="input-group-1" label="Email:" label-for="input-1">
                    <b-form-input
                      id="input-1"
                      v-model="form.email"
                      type="email"
                      required
                      placeholder="Wprowadź email"
                    ></b-form-input>
                  </b-form-group>
                  <b-form-group
                    id="input-group-number"
                    label="Numer albumu:"
                    label-for="input-number"
                  >
                    <b-form-input
                      id="input-number"
                      v-model="form.numberAl"
                      type="number"
                      required
                      placeholder="Wprowadź numer albumu"
                    ></b-form-input>
                  </b-form-group>
                </div>
                <div class="box-form">
                  <b-form-group id="input-group-3" label="Kierunek studiów:" label-for="input-3">
                    <b-form-select
                      id="input-3"
                      v-model="form.fieldOfStudy"
                      :options="fieldsOfStudy"
                      required
                    ></b-form-select>
                  </b-form-group>
                  <b-form-group
                    id="input-group-4"
                    label="Data rozpoczęcia studiów:"
                    label-for="input-rok"
                  >
                    <b-form-select id="input-rok" v-model="form.year" :options="years" required></b-form-select>
                  </b-form-group>

                  <b-form-group id="input-group-4">
                    <div class="block-radio">
                      <div class="block-radio__item">
                        <p>Stopień studiów:</p>
                        <div class="block-radio__item--box">
                          <label for="radio-1">
                            <input v-model="form.degree" value="engineer" type="radio" id="radio-1">
                            Inżynierskie
                          </label>
                          <label for="radio-2">
                            <input
                              v-model="form.degree"
                              value="holderOfUniversityDegree"
                              type="radio"
                              id="radio-2"
                            >
                            Magisterskie
                          </label>
                        </div>
                      </div>

                      <div class="block-radio__item">
                        <p>Tryb studiów:</p>
                        <div class="block-radio__item--box">
                          <label for="radio-mode-1">
                            <input
                              v-model="form.mode"
                              value="stationary"
                              type="radio"
                              id="radio-mode-1"
                            >
                            Stacjonarne
                          </label>
                          <label for="radio-mode-2">
                            <input
                              v-model="form.mode"
                              value="notStationary"
                              type="radio"
                              id="radio-mode-2"
                            >
                            Nie stacjonarne
                          </label>
                        </div>
                      </div>
                    </div>
                  </b-form-group>
                </div>
              </div>
              <div class="box-form" style="widht: 100%;float: right;">
                <b-button type="submit" variant="primary">Dalej</b-button>
              </div>

              <!-- <b-button type="reset" variant="danger">Reset</b-button> -->
            </b-form>
          </b-col>
        </b-row>
      </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import { getFieldsOfStudy, getYears } from "@/views/registration/api/api";
export default {
  name: "Register-students",
  data() {
    return {
      form: {
        email: "",
        firstName: "",
        lastName: "",
        numberAl: null,
        fieldOfStudy: null,
        degree: "",
        mode: "",
        year: null
      },
      fieldsOfStudy: [],
      years: [],
      show: true
    };
  },
  methods: {
    ...mapMutations("loader", ["setLoading","setLoaded"]),
    onSubmit(evt) {
      evt.preventDefault();
      this.$emit("bildUser", this.form);
      this.$router.push("/registration/options/student/finished");
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      this.form.fieldOfStudy = null;
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      }).catch(err => {
        console.log(err);
        this.setLoaded();
      });
    },
    fetchResource() {
      this.setLoading();
      Promise.all([getFieldsOfStudy(), getYears()])
        .then(response => {
          this.fieldsOfStudy = response[0];
          this.years = response[1];
          this.setLoaded();
        })
        .catch(err => {
          console.error(err);
          this.setLoaded();
        });
    }
  },
  mounted() {
    this.fetchResource();
  }
};
</script>

<style lang="scss" scoped>
.content-register {
  min-height: 100%;
  overflow-y: auto;
}
.block-radio {
  display: flex;
  flex-wrap: wrap;
  .block-radio__item {
    flex: 1 1;
    min-width: 130px;
    // flex-basis: 200px;
    p {
      margin-bottom: 2px;
    }
    .block-radio__item--box {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      justify-content: space-between;
      // border: 1px solid #ced4da;
      // border-radius: 0.25rem;
      padding: 6px 0;
      label {
        cursor: pointer;
        margin-bottom: 0 !important;
      }
    }
  }
  &__item:first-child {
    margin-right: 20px;
  }
}
</style>
<style lang="scss">
.register-student {
  min-height: 100%;
  padding-top: 5em;
  background: $pink;
  label {
    padding-bottom: 2px !important;
  }
}
</style>