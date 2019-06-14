<template>
  <div class="user-info border-bt">
    <div class="left-bar-header">
      <div class="user-info">
        <div class="user-foto">
          <user-icon></user-icon>
        </div>
        <div class="user-info">
          <span><b>{{userGet.firstName}}</b></span>
          <span>&nbsp;<b>{{userGet.lastName}}</b></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import UserIcon from "@/components/icons/UserIcon";
export default {
  name: "UserInfo",
  components: {
    UserIcon
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("user", ["userGet"])
  }
};
</script>

<style lang="scss" scope>
.border-bt {
border-bottom: $border;
}
.left-bar-header {
  
  flex: 1 1;
  padding: 10px;
  .user-info {
    display: flex;
    align-items: center;
    margin-left: 10px;
    letter-spacing: 1px;
  }
  .user-foto {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border-top: 1px solid rgba(#007bff, 0.8);
    border-bottom: 1px solid rgba(#007bff, 0.8);
    // background-color: rgba(gray, 0.1);
    svg {
      height: 30px;
      width: 30px;
      fill: rgba(#007bff, 0.4);
    }
  }
}
</style>