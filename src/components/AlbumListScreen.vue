<template>
  <div class="rtl select_album">

    <div id="header">
      <router-link class="back" :to="{ name: 'album' }"><span></span>אחורה</router-link>
      <a class="logo"></a>
    </div>

    <div id="content" class="select_album">
      <div class="wrap">
        <h1>בחר אלבום</h1>
        <router-link v-for="(item, index) in albums" :key="index" :to="{ name: 'photolist', query: { id: item.AlbumId } }">
          <div class="block">
            <div class="capture">
              <div>
                <h2>{{item.AlbumName}}</h2>
                <p>{{item.AlbumPhotosList.length}} תמונות</p>
                <p></p>
              </div>
              <img :src="item.AlbumPhoto" alt="AlbumPhoto">
            </div>
            <div class="shadow"></div>
            <div class="shadow2"></div>
          </div>

        </router-link>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'AlbumListScreen',
    data() {
      return {
        albums: [],
      }
    },
    beforeRouteUpdate(to, from, next) {
      fetch('https://fotome.co.il/api/event.php?id=' + to.params.name, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'pragma': 'no-cache',
            'cache-control': 'no-cache',
            'mode': 'no-cors'
          }
        })
        .then((response) => {
          return response.text()
        })
        .then((result) => {
          try {
            let FotoMe = JSON.parse(result)
            if (FotoMe.IsGalleryOn == 1) {
              this.albums = FotoMe.Albums
              next()
            } else {
              this.$router.push({
                name: 'main'
              })
            }
          } catch (err) {
            console.error(err)
            this.$router.push({
              name: '404'
            })
          }
        })
    },
    created() {
      fetch('https://fotome.co.il/api/event.php?id=' + this.$route.params.name, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'pragma': 'no-cache',
            'cache-control': 'no-cache',
            'mode': 'no-cors'
          }
        })
        .then((response) => {
          return response.text()
        })
        .then((result) => {
          try {
            let FotoMe = JSON.parse(result)
            if (FotoMe.IsGalleryOn == 1) {
              this.albums = FotoMe.Albums
            } else {
              this.$router.push({
                name: 'main'
              })
            }
          } catch (err) {
            console.error(err)
            this.$router.push({
              name: '404'
            })
          }
        })
    }
  }

</script>

<style scoped>
  .select_album #content {
    padding: 95px 0 0 0;
  }

  .select_album h1 {
    color: #333;
    font-size: 28px;
    text-align: center;
    margin: 0 0 30px 0;
  }

  .select_album .block {
    margin: 0 0 30px 0;
  }

  .select_album .capture {
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }

  .select_album .capture img {
    width: 100%;
  }

  .select_album .capture div {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    padding: 35px 30px 0 30px;
    cursor: pointer;
  }

  .select_album h2 {
    color: #fff;
    font-size: 21px;
    line-height: 25px;
    /*font-family: proxima-nova-bold;*/
    background: url('~@/assets/images/select_album_icon.svg') 0 no-repeat;
    background-size: 25px;
    padding: 0 0 0 38px;
    margin: 0 0 7px 0;
  }

  .select_album p {
    color: #fff;
    font-size: 16px;
    /*font-family: proxima-nova-regular;*/
    padding: 0 0 0 38px;
    margin: 0 0 20px 0;
  }

  .select_album .shadow {
    height: 7px;
    background: #ccc;
    border-radius: 0 0 4px 4px;
    margin: 0 17px;
  }

  .select_album .shadow2 {
    height: 7px;
    background: #e8e8e8;
    border-radius: 0 0 4px 4px;
    margin: 0 37px;
  }

  .rtl .select_album h2 {
    background: url('~@/assets/images/select_album_icon.svg') 100% 0 no-repeat;
    background-size: 25px;
    padding: 0 38px 0 0;
  }

  .rtl .select_album p {
    padding: 0 38px 0 0;
  }

</style>
