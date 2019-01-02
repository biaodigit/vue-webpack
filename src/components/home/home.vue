<template>
    <div :class="$style.home">
        <h1>
            home
            <p class="title">title</p>
        </h1>
    </div>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style lang="scss" scoped module>
    @import "../../common/scss/reset";

    .home {
        color:red;
        font-size: 80px;
    }
</style>