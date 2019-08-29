<template>
  <component class="lists" :is="templateName"   v-on="$listeners"></component>
</template>
<script>
import http from "@/http/http";
import { mapGetters } from "vuex";
import GroupsList from "./lists/GroupsList";
import StudentsList from "./lists/StudentsList";
import TichersList from "./lists/TichersList";
export default {
  name: "ListRoom",
  props: {
    listName: String
  },
  components: {
    GroupsList,
    StudentsList,
    TichersList
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("user", ["userGet"]),
    templateName() {
      let componentName = "";
      console.log('status user: ', this.userGet.status)
      switch (this.userGet.status) {
        case "ticher":
          componentName = "groups-list";
          break;
        case "student":
          componentName = "tichers-list";
          break;
        case "group":
          componentName = "students-list";
          break;
        default:
          console.log("Нет таких значений");
      }
      return componentName;
    }
  },
  methods: {
    getGroups() {
      console.log("try to get groups");
      http.get("groups/getAll").then(response => {
        this.rooms = response.data;
      });
    },
    getTichers() {
      console.log("try to get ticher");
    }
  }
};
</script>
<style lang="scss" scoped>
    .lists {
        // overflow-y: auto;
        padding: 0 10px;
    }
</style>