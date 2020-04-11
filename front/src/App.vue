<template>
    <div>
        <router-view/>
        <md-snackbar md-position="left" :md-duration="5000" v-if="notification" md-persistent>
            <span>Connection timeout. Showing limited messages!</span>
            <md-button class="md-primary" @click="editState({ name: 'statusShowNotification', data: false })">Retry</md-button>
        </md-snackbar>
    </div>
</template>
<script>
    import { mapState, mapMutations } from 'vuex';

    export default {
        name: 'App',
        title: ({ title }) => title,
        computed:{
            title(){ return this.$route.meta.title },
            ...mapState({
                notification: state => state.index.statusShowNotification,
            }),
        },
        methods:{
            ...mapMutations({ editState: 'index/EDIT_STATE' }),
        },
        watch:{
            '$route'(){
                this.$title = this.title;
            }
        }
    }
</script>
<style lang="scss">
    .md-snackbar{
        background: white;
    }
</style>
