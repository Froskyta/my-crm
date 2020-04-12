<template>
    <md-app>
        <md-app-toolbar class="md-primary" md-elevation="0">
            <md-button class="md-icon-button" @click="toggleMenu" v-if="!menuVisible">
                <md-icon>menu</md-icon>
            </md-button>
            <span class="md-title">{{ $route.meta.title }}</span>
        </md-app-toolbar>

        <md-app-drawer :md-active.sync="menuVisible" md-persistent="mini">
            <md-toolbar class="md-transparent" md-elevation="0">
                <span>Меню</span>

                <div class="md-toolbar-section-end">
                    <md-button class="md-icon-button md-dense" @click="toggleMenu">
                        <md-icon>keyboard_arrow_left</md-icon>
                    </md-button>
                </div>
            </md-toolbar>

            <md-list class="menu-app">
                <md-list-item>
                    <md-button>
                        <md-icon>move_to_inbox</md-icon>
                        <span class="md-list-item-text">Inbox</span>
                    </md-button>
                </md-list-item>
                <md-list-item>
                    <md-button @click="logout">
                        <md-icon>delete</md-icon>
                        <span class="md-list-item-text">Выйти</span>
                    </md-button>
                </md-list-item>
            </md-list>
        </md-app-drawer>

        <md-app-content>
            <router-view></router-view>
        </md-app-content>
    </md-app>
</template>

<script>
    export default {
        name: "Cascade",
        data: () => ({
            menuVisible: false
        }),
        methods: {
            toggleMenu () {
                this.menuVisible = !this.menuVisible
            },
            async logout(){
                try {
                    const { message } = await this.$axios.get('auth/logout');
                    if ( message === 'ok' ) this.$router.push({ name: 'sign_in' });
                } catch (e) { }
            }
        }
    }
</script>

<style scoped lang="scss">
    .menu-app{
        &::v-deep button {
            margin: 0;
            width: 100%;

            .md-ripple {
                padding: 0;

                .md-button-content {
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    width: 100%;
                    padding: 0;

                    .md-icon {
                        margin-right: 32px;
                    }
                }
            }
        }
    }
</style>
