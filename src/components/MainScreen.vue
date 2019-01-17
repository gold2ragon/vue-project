<template>
  <div class="rtl main_screen">

    <div class="logo_block">
      <a class="logo"></a>
      <p>לא מחכים לתמונות</p>
    </div>

    <h1>עוד אין תמונות</h1>
    <p>בדוק עם הצלם מתי יעלו התמונות</p>

  </div>
</template>

<script>
  export default {
    name: 'MainScreen'
  }

</script>

<style scoped>
  .main_screen {
    width: 100vw;
    height: 100vh;
    text-align: center;
    background: #fafafa url('~@/assets/images/main_screen_bg.svg') 0 100% no-repeat;
    background-size: 640px auto;
    padding: 0 15px;
  }

  .main_screen .logo_block {
    display: inline-block;
    width: 172px;
    padding: 30px 0 20px 0;
    border-bottom: 1px solid #e1e1e1;
    margin: 0 0 57px 0;
  }

  .main_screen .logo {
    display: inline-block;
    width: 69px;
    height: 81px;
    background: url('~@/assets/images/main_screen_logo.svg') no-repeat;
    background-size: contain;
    margin: 0 0 10px 0;
  }

  .main_screen .logo_block p {
    width: 320px;
    color: #010302;
    font-family: proxima-nova-light;
    font-size: 16px;
    margin: 0 -74px;
  }

  .main_screen h1 {
    color: #010302;
    font-size: 30px;
    margin: 0 0 30px 0;
  }

  .main_screen p {
    color: #010302;
    font-size: 16px;
    font-family: proxima-nova-regular;
  }

  @media screen and (max-width: 640px) {
    .main_screen {
      background-size: contain;
    }
  }

</style>
