<template>
  <div class="group-list">
      <div class="group-block" v-for="(item,index) in rooms" :key="index" @click="$emit('connectToRoom', item.id_group )">
          <p>{{item.fieldOfStudy}}</p>
          <p>{{item.year}}</p>
          <p>{{item.mode}}</p>
      </div>
  </div>
</template>
<script>
import http from "@/http/http";
import { mapGetters } from "vuex";
export default {
  name: "ListRoom",
  data() {
    return {
      rooms: []
    };
  },
  computed: {
    ...mapGetters("user", ["userGet"])
  },
  methods: {
    getGroups () {
      console.log('try to get groups')
      http.get('groups/getAll').then(response => {
        this.rooms = response.data;
      })
    }
  },
  mounted () {
    this.getGroups()
  }
};
</script>
<style lang="scss" scoped>
.group-list {
    .group-block {
        padding: 10px 0;
        border-bottom: 1px solid $border-color;
        cursor: pointer;
        &:hover {
            color: $blue;
        }
        p{
            margin: 0;
        }
    }
}
</style>