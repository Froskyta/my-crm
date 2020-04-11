<template>
  <div class="parent" :style="{ backgroundImage: `url('${require('@/assets/authorization/background.jpg')}')` }">
    <div class="child-block">
      <transition name="slide-left" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Cascade",
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
        overflow: hidden;
    }

    &::v-deep button,
    &::v-deep a {
        color: white;
        width: 100%;
        margin: 0;
    }

    &::v-deep .parent-page{
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
    }




    .slide-left-enter-active, .slide-left-leave-active {
        transition: all .3s;
    }
    .slide-left-enter, .slide-left-leave-active {
        opacity: 0;
    }
    .slide-left-enter {
        transform: translateX(50px);
    }
    .slide-left-leave-active {
        transform: translateX(-50px);
    }
}
</style>
