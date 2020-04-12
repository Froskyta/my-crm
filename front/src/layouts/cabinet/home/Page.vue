<template>
    <div>
        Hime page
    </div>
</template>

<script>
    export default {
        name: "Page",
        data: () => ({
            menuVisible: false
        }),
        methods: {
            toggleMenu () {
                this.menuVisible = !this.menuVisible
            }
        }
    }
</script>

<style scoped>

</style>
