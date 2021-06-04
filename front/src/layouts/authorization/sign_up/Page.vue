<template>
    <div class="parent-page">
        <span class="md-title">Регистрация</span>
        <md-field>
            <label>Почта</label>
            <md-input v-model="params['email']"></md-input>
        </md-field>
        <md-field>
            <label>Пароль</label>
            <md-input v-model="params['password']" type="password"></md-input>
        </md-field>
        <md-button @click="sendSignUn" :disabled="loading"> Зарегаться </md-button>
        <md-button :to="{name: 'sign_in'}" :disabled="loading"> Назад </md-button>
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
                },
                loading: false,
            }
        },
        methods:{
            async sendSignUn(){
                try {
                    this.loading = true;
                    const { message } = await this.$axios.post('/auth/register', {...this.params});
                    if (message === 'ok') {
                        await this.$router.push({ name: 'sign_in' });
                        this.$global.showNotification('А теперь авторизуйся')
                    }
                }catch (e) {

                } finally {
                    this.loading = false;
                }
            }
        },
    }
</script>

<style scoped>

</style>
