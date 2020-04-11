<template>
    <div class="parent-page">
      <span class="md-title">Авторизация</span>
      <md-field>
        <label>Почта</label>
        <md-input v-model="params['email']"></md-input>
      </md-field>
      <md-field>
        <label>Пароль</label>
        <md-input v-model="params['password']"></md-input>
      </md-field>
      <md-button @click="sendSignUn"> Вход </md-button>
      <md-button :to="{name: 'sign_up'}"> Регистрация </md-button>
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
                }
            }
        },
        methods:{
            async sendSignUn() {
                try {
                    console.log(await this.$axios.post('/auth/login', {...this.params}))
                }catch (e) {

                }
            }
        },
        created() {
            // axios.get('auth/mess age/', { params: { message: 'Мой текст' } })
            axios.get('/auth/message/', {params:{ message: 'Лохушка' }});
            axios.get('https://jsonplaceholder.typicode.com/todos/1', )
        }
    }
</script>

<style scoped lang="scss">

</style>
