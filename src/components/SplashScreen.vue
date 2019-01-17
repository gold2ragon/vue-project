<template>
  <div>
    <div v-if="show" class="splash_screen rtl">
      <div class="logo_block">
        <a class="logo"></a>
        <p>לא מחכים לתמונות</p>
      </div>
    </div>
    <div v-if="!show">
      <router-view />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SplashScreen',
    data() {
      return {
        show: true
      }
    },
    mounted() {
      let redirect = setTimeout(() => {
        this.show = false
        if (this.$route.matched.length === 1) {
          this.$router.push({
            name: 'album'
          })
        }
      }, 3000)
    }
  }

</script>

<style scoped>
  .splash_screen {
    text-align: center;
    background: #32bf9c;
    background: linear-gradient(62deg, #32bf9c 0%, #69da94 100%);
    padding: 0 15px;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }

  .splash_screen .logo_block {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
  }

  .splash_screen .logo {
    display: inline-block;
    width: 100px;
    height: 121px;
    background: url('~@/assets/images/splash_screen_logo.svg') no-repeat;
    background-size: contain;
    margin: 0 0 30px 0;
  }

  .splash_screen .logo_block p {
    color: #fff;
    font-family: proxima-nova-light;
    font-size: 24px;
  }

</style>
