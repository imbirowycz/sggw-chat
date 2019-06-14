<template>
      <div class="left-bar-options">
        <b-button variant="outline-primary add-chat" block>Dodaj czat</b-button>
        <input type="text" placeholder="szukaj">
        <b-button block variant="outline-primary add-chat">
          <filter-icon></filter-icon>Filtruj wyszukiwane
        </b-button>
        <b-button variant="outline-primary" block>Dodaj grupę do listy</b-button>
      </div>
</template>
<script>
import FilterIcon from "@/components/icons/FilterIcon";
export default {
  name: "OptionsMenu",
  components: {
      FilterIcon
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.left-bar-options {
      // border: 1px solid black;
      flex: 3 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
      overflow-y: auto;
      .add-chat {
        margin-bottom: 20px;
      }
      input:first-child {
        margin-top: 20px;
      }
      input {
        margin-bottom: 20px;
        width: 100%;
        margin-bottom: 0.5rem;
        display: block;
        padding: 0.4rem;
        border-radius: 0.3rem;
        border: solid 0.09rem #007bff;
      }
    }
</style>
