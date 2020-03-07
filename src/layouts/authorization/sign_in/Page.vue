<template>
    <div class="parent-page">
      <span class="md-title">Авторизация</span>
      <md-field>
        <label>Логин</label>
        <md-input v-model="params['login']"></md-input>
      </md-field>
      <md-field>
        <label>Пароль</label>
        <md-input v-model="params['password']"></md-input>
      </md-field>

      <md-button>
        Вход
      </md-button>
    </div>
</template>

<script>
    export default {
      name: "Page",
      data() {
        return {
          params: {
            login: null,
            password: null,
          }
        }
      },

    }
</script>

<style scoped lang="scss">
.parent-page{
  .md-field {

    &:after{
      background: #ffffff42;
    }

    label{
      color: #ffffffad;
    }

    .md-input, .md-textarea{
      color: white !important;
    }
  }

  .md-title{
    text-align: center;
    display: block;
  }

  button{
    color: white;
    width: 100%;
    margin: 0;
  }
}
</style>
