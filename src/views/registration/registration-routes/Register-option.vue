<template>
  <div class="hello">
    <div class="hello-info">
      <!-- <div class="hello-info__logo"></div> -->
      <router-link @mousedown.native="$emit('setStatus', 'ticher')" to="/registration/options/teacher">
        <div class="hello-eg">
          <h1 class="bolster">Teacher</h1>
          <business-icon class="material-icons"></business-icon>
          <!-- <i class="material-icons">business_center</i> -->
        </div>
      </router-link>
    </div>
    <div class="hello-option">
      <router-link @mousedown.native="$emit('setStatus', 'students')" to="/registration/options/student">
        <div class="hello-eg">
          <h1 class="bolster">Student</h1>
          <school-icon class="material-icons"></school-icon>
          <!-- <i class="material-icons">school</i> -->
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import BusinessIcon from "@/components/icons/BusinessIcon";
import SchoolIcon from "@/components/icons/SchoolIcon";
export default {
  name: "Register-option",
  components: {
    BusinessIcon,
    SchoolIcon
  },
  methods: {
    // setStatus(value) {
     
    //     this.$emit('setStatus', value)
     
    // }
  }
};
</script>

<style scoped lang="scss">
.bolster {
  position: absolute;
  display: inline-block;
  top: -4rem;
  left: 0;
  color: $white;
  font-size: 3rem;
  font-family: "Permanent Marker", cursive;
  transition: color 0.2s;
}
.hello-eg {
  position: relative;
  background: $white;
  padding: 3rem;
  border-radius: 50%;
  transition: background-color 0.2s;
}
.material-icons {
  transition: color 0.2s;
  width: 5rem;
  height: 5rem;
}

.hello-info {
  .hello-eg {
    flex-direction: column;
    background: $pink;
    .bolster {
      color: $pink;
    }

    .material-icons {
      fill: $green;
    }

    &:hover {
      background: $white;
      cursor: pointer;

      .bolster {
        color: $white;
      }
      .material-icons {
        fill: $pink;
      }
    }
  }
}

.hello-option {
  flex-direction: column;

  .material-icons {
    fill: $pink;
  }

  .hello-eg {
    background-color: $green;
    .bolster {
      color: $green;
    }
    &:hover {
      background: $white;
      cursor: pointer;

      .bolster {
        color: $white;
      }
      .material-icons {
        fill: $green;
      }
    }
  }
}
</style>