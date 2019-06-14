<template>
  <div class="user-info">
      <div class="left-bar-header">
        <div class="user-info">
          <div class="user-foto">
            <user-icon></user-icon>
          </div>
          <div></div>
          <b>{{userGet.firstName}} {{userGet.lastName}}</b>
        </div>
        <span>Podstawowa informacja</span>
      </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import UserIcon from "@/components/icons/UserIcon"
export default {
  name: "UserInfo",
  components: {
    UserIcon
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters('user', ['userGet'])
  }
};
</script>
<style lang="scss" scope>
    .left-bar-header{
      border: 1px solid black;
      flex: 1 1;
      padding: 10px;
      .user-info {
        display: flex;
        align-items: center;
      }
      .user-foto {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        // background-color: rgba(gray, 0.1);
        border: 2px solid rgba(#007bff, .4);
        svg {
          height: 30px;
          width: 30px;
          fill: rgba(#007bff, .4);
        }
      }
    }
</style>