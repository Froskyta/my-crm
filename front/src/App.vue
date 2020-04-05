<template>
  <router-view/>
</template>
<script>
  export default {
    name: 'App',
    title: ({ title }) => title,
    computed:{
      title(){ return this.$route.meta.title },
    },
    watch:{
      '$route'(){
        this.$title = this.title;
      }
    }
  }
</script>
