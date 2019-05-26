
<template>
  <div class="register-teacher height-100">
    <loader class="height-100" :status="getStatus">
      <div class="content-block-center">
        <b-row class="justify-content-center p-4">
          <b-col cols="12" class>
            <h4 class="text-center">Proszę wypełnić poniższy formularz:</h4>
            <b-form @submit="onSubmit" @reset="onReset" v-if="show">
              <div class="d-flex flex-wrap">
                <div class="box-form">
                  <b-form-group id="input-group-name" label="Imię:" label-for="input-name">
                    <b-form-input
                      id="input-name"
                      v-model="form.firstName"
                      type="text"
                      required
                      placeholder="Wprowadź imię"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                    id="input-group-last-name"
                    label="Nazwisko:"
                    label-for="input-last-name"
                  >
                    <b-form-input
                      id="input-last-name"
                      v-model="form.lastName"
                      type="text"
                      required
                      placeholder="Wprowadź nazwisko"
                    ></b-form-input>
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
                </div>
                <div class="box-form">
                  <b-form-group id="input-group-3" label="Stopień naukowy:" label-for="degree">
                    <b-form-select
                      id="degree"
                      v-model="form.degree"
                      :options="degreeOptions"
                      required
                    ></b-form-select>
                  </b-form-group>

                  <!-- <b-form-group id="scientific-label" label="Przedmiot:" label-for="scientific">
            <b-form-select
              id="scientific"
              v-model="form.scientific"
              :options="scientificOptions"
              required
            ></b-form-select>
                  </b-form-group>-->
                  <b-form-group label="Przedmiot(y):" label-for="degree">
                    <multi-select
                      id="multi-select"
                      :options="scientificOptions"
                      :selected-options="form.scientific"
                      placeholder="wybierz przedmiot"
                      @select="onSelect"
                    ></multi-select>
                  </b-form-group>

                  <b-form-group id="faculty-input" label="Wydział:" label-for="faculty-input">
                    <b-form-select
                      id="faculty-input"
                      v-model="form.faculty"
                      :options="facultyOptions"
                      required
                    ></b-form-select>
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
    </loader>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import { MultiSelect } from "vue-search-select";
import {
  getDepress,
  getScientifics,
  getFacultys
} from "@/views/registration/api/api";

export default {
  name: "Register-teacher",
  components: {
    MultiSelect,
    
  },
  data() {
    return {
      form: {
        email: "",
        firstName: "",
        lastName: "",
        numberAl: null,
        scientific: [],
        faculty: null,
        degree: ""
      },
      searchText: "", // If value is falsy, reset searchText & searchItem
      lastSelectItem: {},
      show: true,
      degreeOptions: [],
      scientificOptions: [],
      facultyOptions: []
    };
  },
  computed: {
    ...mapGetters("loader", ["getStatus"])
  },
  methods: {
    ...mapMutations("loader", ["setStatus"]),
    onSubmit(evt) {
      evt.preventDefault();
      console.log(this.form);
      this.$emit("bildUser", this.form);
      this.$router.push("/registration/options/teacher/finished");
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.firstName = "";
      this.form.fieldOfStudy = null;
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    onSelect(items, lastSelectItem) {
      this.form.scientific = items;
      this.lastSelectItem = lastSelectItem;
    },
    // deselect option
    reset() {
      this.form.scientific = []; // reset
    },
    // select option from parent component
    selectFromParentComponent() {
      this.form.scientific = _.unionWith(
        this.form.scientific,
        [this.scientificOptions[0]],
        _.isEqual
      );
    },
    emitStatus(value) {
      console.log("wywolano000000000", value);
      let status = value;
      this.$emit("setStatus", status);
    },
    fetchResource() {
      this.setStatus("LOADING");
      Promise.all([getDepress(), getScientifics(), getFacultys()])
        .then(values => {
          this.degreeOptions = values[0];
          this.scientificOptions = values[1];
          this.facultyOptions = values[2];
          this.setStatus("LOADED");
        })
        .catch(err => {
          console.error(err);
          this.setStatus("LOADED");
        });
      // this.$emit("setStatus", "LOADING");
    }
  },
  mounted() {
    this.fetchResource();
  }
};
</script>

<style lang="scss" scoped>
.content-register {
  overflow-y: auto;
}
.block-radio {
  display: flex;
  &__item {
    flex: 1;
    flex-basis: 200px;
    p {
      margin-bottom: 2px;
    }
    &--box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border: 1px solid #ced4da;
      border-radius: 0.25rem;
      padding: 6px 12px;
      label {
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
.register-teacher {
  height: 100%;
  background: $green;
  // min-height: 100%;
  .content-block-center {
    // margin-top: 50px;
  }
  label {
    padding-bottom: 2px !important;
  }
}
</style>