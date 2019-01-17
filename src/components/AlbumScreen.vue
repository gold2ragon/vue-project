<template>
  <div class="rtl photo_album">

    <div id="header">
      <a class="logo"></a>
    </div>

    <div id="content" class="photo_album">

      <div class="capture">
        <router-link :to="{ name: 'albumlist' }">
        <img :src="eventPhoto" alt="MainPhoto">
        </router-link>
        <div></div>
      </div>

      <div class="wrap">

        <h1>{{eventName}}</h1>
        <div class="search">
          <router-link class="button" :to="{ name: 'albumlist' }"><span style="margin-right:5px;">צפה בתמונות</span></router-link>
          <p>{{eventTime}}</p>
          <router-link :to="{ name: 'albumlist' }" class="point">{{eventLocation}}</router-link>
        </div>

        <div class="view">
          <h3>חלק מהתמונות</h3>
          <ul>
            <li v-for="index in 4" :key="index" v-if="landscapePhotos.length > 0">
              <router-link :to="{ name: 'albumlist' }"><img :src="landscapePhotos[index].PhotoURL" :alt="landscapePhotos[index].PhotoTime"></router-link>
            </li>
          </ul>
        </div>

      </div>

    </div>

  </div>
</template>

<script>
  export default {
    name: 'AlbumScreen',
    data() {
      return {
        eventName: '',
        eventLocation: '',
        eventTime: '',
        landscapePhotos: [],
        eventPhoto: null,
        albumPhotos: []

      }
    },
    beforeRouteUpdate(to, from, next) {
      let self = this
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
              this.eventName = FotoMe.EventName
              this.eventLocation = FotoMe.EventLocation
              this.eventTime = FotoMe.EventTime
              this.eventPhoto = FotoMe.EventMainPhoto
              FotoMe.Albums.forEach((album) => {
                album.AlbumPhotosList.forEach((photo) => {
                  this.albumPhotos.push(photo)
                  if (photo.w >= photo.h) {
                    this.landscapePhotos.push(photo)
                  }
                })
              })
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
              this.eventName = FotoMe.EventName
              this.eventLocation = FotoMe.EventLocation
              this.eventTime = FotoMe.EventTime
              this.eventPhoto = FotoMe.EventMainPhoto
              FotoMe.Albums.forEach((album) => {
                album.AlbumPhotosList.forEach((photo) => {
                  this.albumPhotos.push(photo)
                  if (photo.w >= photo.h) {
                    this.landscapePhotos.push(photo)
                  }
                })
              })
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
  .photo_album .capture {
    width: 100%;
    margin: 0 0 -83px 0;
  }

  .photo_album .capture img {
    width: 100%;
  }

  .photo_album .capture div {
    display: inline-block;
    width: 100%;
    min-height: 300px;
    background: url('~@/assets/images/cloud_bg.png') 0 0 no-repeat;
    background-size: cover;
    margin: -300px 0 0 0;
  }

  .photo_album h1 {
    color: #333;
    font-size: 28px;
    margin: 0 0 30px 0;
  }

  @media screen and (max-width: 640px) {
    .photo_album .capture div {
      min-height: 46.88vw;
      margin: -46.88vw 0 0 0;
    }
  }

</style>
