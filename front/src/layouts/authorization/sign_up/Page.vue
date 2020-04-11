<template>
    <div class="parent-page">
        <span class="md-title">Регистрация</span>
        <md-field>
            <label>Почта</label>
            <md-input v-model="params['email']"></md-input>
        </md-field>
        <md-field>
            <label>Пароль</label>
            <md-input v-model="params['password']"></md-input>
        </md-field>
        <md-button @click="sendSignUn"> Вход </md-button>
        <md-button :to="{name: 'sign_in'}"> Назад </md-button>
    </div>
</template>

<script>
    export default {
        name: "Page",
        data() {
            return {
                params: {
                    email: null,
                    password: null,
                }
            }
        },
        methods:{
            async sendSignUn(){
                try {
                    console.log(await this.$axios.post('/auth/register', {...this.params}))
                }catch (e) {

                }
            }
        },
    }
</script>

<style scoped>

</style>
