<template>
    <div class="sidebar">
        <h2>Hey from sidebar!</h2>
        <h3>Hello from sidebar!</h3>
    </div>
</template>

<script>
  export default {

  }
</script>

<style lang="scss" scoped>
    .sidebar{

        min-height: 80vh;
        background: #dfdfdf;
        min-width: 8rem;

        &:hover{
            background: blue;
        }
    }
</style>