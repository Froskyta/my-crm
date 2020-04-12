<template>
    <div class="parent-page">
      <span class="md-title">Авторизация</span>
      <md-field md-clearable>
        <label>Почта</label>
        <md-input v-model="params['email']"></md-input>
      </md-field>
      <md-field>
        <label>Пароль</label>
        <md-input v-model="params['password']" type="password"></md-input>
      </md-field>
      <md-button @click="sendSignUn" :disabled="loading"> Вход </md-button>
      <md-button :to="{name: 'sign_up'}" :disabled="loading"> Регистрация </md-button>
    </div>
</template>

<script>
    import axios from '@/axios';
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
        methods: {
            async sendSignUn() {
                try {
                    this.loading = true;
                    const { message } = await this.$axios.post('/auth/login', {...this.params});
                    if ( message === 'ok' ) await this.$router.push({ name: 'home' });
                } catch ({ errors }) {
                    // this.$global.showNotification(errors.toString());
                } finally {
                    this.loading = false;
                }
            }
        },
        mounted() {
            // setTimeout(() => { this.$global.showNotification('awddddddddddddddd') }, 2000)
        },
        created() {
            // axios.get('auth/mess age/', { params: { message: 'Мой текст' } })
            // axios.get('/auth/message/', {params:{ message: 'Лохушка' }});
            axios.get('https://jsonplaceholder.typicode.com/todos/1', )
        }
    }
</script>

<style scoped lang="scss">

</style>
