<template>
    <div class="parent-app">
        <transition name="slide-left">
            <router-view></router-view>
        </transition>
        <md-snackbar md-position="left" :md-duration="5000" :md-active.sync="showNotification" md-persistent>
            <span>{{ notification }}</span>
            <md-button class="md-primary" @click="closeNotification">x</md-button>
        </md-snackbar>
    </div>
</template>
<script>
    import { mapState, mapMutations } from 'vuex';

    export default {
        name: 'App',
        title: ({ title }) => title,
        data(){
            return {
                showNotification: false,
            }
        },
        computed: {
            title(){ return this.$route.meta.title },
            ...mapState({
                notification: state => state.index.statusShowNotification,
            }),
        },
        methods:{
            ...mapMutations({ editState: 'index/EDIT_STATE' }),
            closeNotification(){
                this.editState({ name: 'statusShowNotification', data: '' });
                this.showNotification = false;
            }
        },
        watch: {
            '$route'() {
                this.$title = this.title;
            },
            'notification'() {
                if (this.notification.length > 0 ) this.showNotification = true;
            },
            'showNotification'() {
                if (!this.showNotification) this.$global.showNotification('')
            }
        }
    }
</script>
<style lang="scss">
    .md-snackbar {
        background: #ffffff69;
        backdrop-filter: blur(25px);
    }

    body {
        background: url('assets/authorization/animation-back.jpg') !important;
        background-size: cover;
    }
</style>
<style scoped lang="scss">
    .parent-app {
        height: 100vh;
        display: flex;
        position: relative;
        overflow: hidden;

        & > div {
            width: 100%;
        }
    }
    /*.slide-left-enter-active, .slide-left-leave-active {*/
    /*    */
    /*    !*overflow: hidden;*!*/
    /*}*/
    /*.slide-left-enter, .slide-left-leave-active {*/
    /*    opacity: 0;*/
    /*}*/
    /*.slide-left-enter {*/
    /*    transform: translateX(50px);*/
    /*}*/
    /*.slide-left-leave-active {
        transform: translateX(-50px);
    }*/
    .slide-left-enter-active {
        position: absolute;
        animation: showPage 1.5s;
        z-index: 1;
    }

    .slide-left-leave-active {
        position: absolute;
        animation: hidePage 1.5s;
        z-index: 2;
    }

    @keyframes showPage {
        0% {
            left: 100%;
            width: 80%;
            height: 80%;
            /* transform: translate(-50%, -50%);*/
            transform: translateY(-50%);
            top: 50%;
            border-radius: 20px;
        }
        10% {
            left: 57%;
            width: 80%;
            height: 80%;
            top: 50%;
            transform: translate(-50%, -50%);
            border-radius: 20px;
            /*opacity: .5;*/
        }
        80% {
            left: 57%;
            width: 80%;
            height: 80%;
            top: 50%;
            transform: translate(-50%, -50%);
            border-radius: 20px;
            /*opacity: .5;*/
        }
        90% {
            left: 50%;
            width: 80%;
            height: 80%;
            top: 50%;
            transform: translate(-50%, -50%);
            border-radius: 20px;
            opacity: 1;
        }
        100% {
            width: 100%;
            height: 100%;
            transform: translate(0%, 0%);
            top: 0;
            left: 0;
            right: 0;
            border-radius: 0;
        }
    }

    @keyframes hidePage {
        0% {
            left: 0;
            width: 100%;
            height: 100%;
            top: 0;
            transform: translate(0, 0);
            border-radius: 0;
            opacity: 1;
        }
        10% {
            left: 50%;
            width: 80%;
            height: 80%;
            top: 50%;
            transform: translate(-50%, -50%);
            border-radius: 20px;
            opacity: 1;
        }
        30% {
            left: 50%;
            width: 80%;
            height: 80%;
            top: 50%;
            transform: translate(-50%, -50%);
            border-radius: 20px;
            opacity: 1;
        }
        85% {
            left: 50%;
            width: 80%;
            height: 80%;
            top: -100%;
            transform: translate(-50%, -50%);
            border-radius: 20px;
            /*opacity: .5;*/
        }
        100% {
            left: 50%;
            width: 80%;
            height: 80%;
            top: -100%;
            transform: translate(-50%, -50%);
            border-radius: 20px;
            /*opacity: .5;*/
        }
    }
</style>
