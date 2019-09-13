<template>
  <div class="list-likie">
    <div v-for="(item, index) in likeList" :key="index" @click="connect(item)">
      <div v-if="item.type == 'group'" class="list-likie-item">
        <div class="item-icon">
          <span class="user-foto user-foto--group">
            <group-icon></group-icon>
          </span>
        </div>
        <div class="item-description">
          <b class="fild-of-study">{{item.fieldOfStudy}}</b>
          <span>{{item.mode}} / {{item.year}}</span>
        </div>
      </div>
      <div class="list-likie-item" v-else>
        <div class="item-icon">
          <span class="user-foto">
            <user-icon></user-icon>
          </span>
        </div>
        <div class="item-description">
          <b class="item--uppercase">{{item.firstName}} {{item.lastName}}</b>
          <span class="fild-of-study item--lowercase">{{item.fieldOfStudy}}</span>
          <span>{{item.mode}} / {{item.year}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import UserIcon from "@/components/icons/UserIcon";
import GroupIcon from "@/components/icons/GroupIcon";
import http from "@/http/http";
import { mapGetters } from "vuex";
export default {
  name: "ListLikie",
  components: {
    UserIcon,
    GroupIcon
  },
  data() {
    return {
      likeList: []
    };
  },
  computed: {
    ...mapGetters("user", ["userGet"])
  },
  methods: {
    getLikeList() {
      http
        .get(
          `likeList/getAll?type=${this.userGet.status}&id_account=${this.userGet.id_account}`
        )
        .then(response => {
          console.log("listLike: ", response);
          this.likeList = response.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
     connect(value) {
         console.warn('Wywolano metode connect to room')
    //   this.setRoom(value.id_group);
    //   this.setDescriptions({name: value.fieldOfStudy, mode: value.mode, year: value.year, type: 'group' })
    //   this.fetchPosts(value.id_group);
    //   this.$emit('connectToRoom')
    }
  },
  created() {
    this.getLikeList();
  }
};
</script>
<style lang="scss">
.list-likie {
  max-width: 100%;
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
.user-foto.user-foto--group {
  border-top: 1px solid rgba(#9df5e2, 0.8);
  border-bottom: 1px solid rgba(#9df5e2, 0.8);
  svg {
    fill: rgba(#9df5e2, 0.4);
  }
}
.list-likie-item {
  display: flex;
  align-items: center;
  padding: 10px 0;
  max-width: 100%;
  &:hover {
      background: rgb(231, 231, 231);
      cursor: pointer;
  }
  .item-icon {
      margin-left: 10px;
    flex: 1;
    padding: 0 10px;
    .user-foto {
    }
  }

  .item-description {
      padding-right: 10px;
    flex: 5;
    white-space: nowrap;
    overflow: hidden;
    span,
    b {
      display: block;
      font-size: 10px;
    }
    .fild-of-study {
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
      font-size: 10px;
    }
    .item--lowercase {
      text-transform: lowercase;
    }
    .item--uppercase {
      text-transform: uppercase;
    }
  }
}
</style>