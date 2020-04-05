<template>
  <div class="parent" :style="{ backgroundImage: `url('${require('@/assets/authorization/background.jpg')}')` }">
    <div class="child-block">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Cascade"
    }
</script>

<style scoped lang="scss">
.parent{
  min-height: 100vh;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;

  & > .child-block {
    background: #ffffff1a;
    padding: 25px;
    border-radius: 5px;
    backdrop-filter: blur(6px);
    color: white;
  }
}
</style>
