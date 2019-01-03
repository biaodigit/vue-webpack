<template>
    <div :class="$style.home">
        <h1>
            home
            <p :class="$style.title">title</p>
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
        font-size: 80px;
    }
</style>