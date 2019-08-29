<template>
    <div class="empty">
        <h3>{{msg}}</h3>
    </div>
</template>
<script>
export default {
    name: 'Empty',
    props: {
        msg: {
            type: String,
            default: 'Empty!'
        }
    }
}
</script>
<style lang="scss" scoped>
.empty {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>