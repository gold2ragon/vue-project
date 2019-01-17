<template>
  <div class="rtl" v-bind:class="{ photolist: isGrid, photolist_list: !isGrid}">
    <div id="header" style="z-index:10000;">
      <a class="back" @click="routeBack"><span></span>אחורה</a>
      <a class="logo"></a>
      <a v-if="!iOS && singleView" :href="'http://fotome.co.il/api/download.php?img=' + photoswipe.currItem.src"
        class="save"><span></span>שמור</a>
      <a v-if="iOS && singleView" class="save" @click="iOSDownload = true"><span></span>שמור</a>
    </div>
    <div id="content" v-bind:class="{ photolist: isGrid, photolist_list: !isGrid}">
      <transition name="fade">
        <div v-if="showMessage" class="desc" style="z-index:9999;">
          <p>לחץ לחיצה ארוכה על התמונה ואז לחץ ׳שמור תמונה׳</p>
          <a class="desc_save"></a>
        </div>
      </transition>
      <div class="wrap">
        <h1>
          {{albumName}}
          <a class="grid" @click="changeGrid($event,true)"></a>
          <a class="list" @click="changeGrid($event,false)"></a>
        </h1>

        <waterfall :line-gap="lineGap" :watch="images" :interval="0" :grow="grow">
          <waterfall-slot v-for="(item, index) in images" :width="item.w" :height="item.h" :order="index" :key="index"
            move-class="image-item-move">
            <div class="image-item">
              <img :src="item.PhotoURL" @click="openGallery(item.index)">
              <a v-if="isGrid === false && iOS === false" :href="'http://fotome.co.il/api/download.php?img=' + item.PhotoURL" class="save">
                <span>שמור</span>
              </a>
              <span v-if="isGrid === false && iOS === true" @click="downloadImage($event, item.index)">שמור</span>
            </div>
          </waterfall-slot>
        </waterfall>
        <infinite-loading :identifier="infiniteId" @infinite="infiniteHandler" spinner="waveDots">
          <template slot="spinner">
            <div class="dots-spinner">
              <div class="bounce1"></div>
              <div class="bounce2"></div>
              <div class="bounce3"></div>
            </div>
          </template>
          <div slot="no-more"></div>
          <div slot="no-results"></div>
        </infinite-loading>
        <div v-if="filterLabel" class="filterLabel">
          <p>{{timeOptions.value[1]}} -
            {{timeOptions.value[0]}}</p>
        </div>
        <div class="filter" v-bind:class="{ open_filter: openFilter }">
          <a class="time_link" @click="openFilter = !openFilter">
            <span class="timer" dir="ltr"></span>
            סנן לפי זמן
            <span class="arrow"></span>
          </a>
          <div class="time_block" v-if="openFilter">
            {{filterLabel}}
            <vue-slider ref="timeSlider" v-model="timeOptions.value" v-bind="timeOptions" @callback="filterPhotos"
              @drag-start="filterLabel = true" @drag-end="filterLabel = false"></vue-slider>
            <p class="start">{{timeOptions.value[0]}}</p>
            <p class="end">{{timeOptions.value[1]}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="pswp__bg"></div>
      <div class="pswp__scroll-wrap">
        <div class="pswp__container">
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import vueSlider from 'vue-slider-component'
  import PhotoSwipe from 'photoswipe-modified/photoswipe.js'
  import InfiniteLoading from 'vue-infinite-loading'
  import Waterfall from 'vue-waterfall/lib/waterfall'
  import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'

  export default {
    name: 'PhotoList',
    props: ['album'],
    data() {
      return {
        FotoMe: null,
        loadedAPI: [],
        images: [],
        photoSwipeImages: [],
        openFilter: true,
        filterLabel: false,
        albumName: '',
        singleView: false,
        photoswipe: null,
        isGrid: true,
        iOS: false,
        iOSDownload: false,
        lineGap: 203,
        grow: [1, 1, 1],
        infiniteId: 0,
        timeOptions: {
          data: [""],
          value: ["", ""],
          eventType: 'auto',
          width: '100%',
          height: 5,
          dotSize: 24,
          dotHeight: null,
          dotWidth: null,
          min: 0,
          max: 100,
          interval: 1,
          show: true,
          speed: 0.5,
          disabled: false,
          piecewise: false,
          usdKeyboard: false,
          enableCross: true,
          piecewiseStyle: null,
          piecewiseLabel: false,
          tooltip: 'always',
          tooltipDir: 'top',
          reverse: false,
          clickable: true,
          realTime: false,
          lazy: false,
          formatter: null,
          bgStyle: {
            "height": "5px",
            "backgroundColor": "#d7d7d7"
          },
          sliderStyle: [{
              "backgroundColor": "#2ba687",
              "borderColor": "#ebebeb",
              "borderWidth": "2px",
              "borderStyle": "solid",
              "boxShadow": "none"
            },
            {
              "backgroundColor": "#2ba687",
              "borderColor": "#ebebeb",
              "borderWidth": "2px",
              "borderStyle": "solid",
              "boxShadow": "none"
            }
          ],
          processStyle: {
            "backgroundColor": "#43c899",
            "borderRadius": "5px"
          },
          piecewiseActiveStyle: null,
          labelStyle: null,
          labelActiveStyle: null
        }
      }
    },
    computed: {
      showMessage: function () {
        let result = false
        if (this.iOS && this.iOSDownload) {
          result = true
        } else {
          result = false
        }
        return result
      }
    },
    components: {
      vueSlider,
      InfiniteLoading,
      Waterfall,
      WaterfallSlot
    },
    methods: {
      changeGrid(event, value) {
        let self = this
        self.isGrid = value
        if (value) {
          self.lineGap = 203
          self.grow = [1, 1, 1]
        } else {
          self.lineGap = 610
          self.grow = [1]
        }
      },
      routeBack() {
        let self = this
        if (self.singleView) {
          self.singleView = false
          self.photoswipe.close()
          self.iOSDownload = false
        } else {
          self.$router.push({
            name: 'albumlist'
          })
        }
      },
      downloadImage(event, index) {
        let self = this
        self.openGallery(index)
        self.iOSDownload = true
      },
      openGallery(imageIndex) {
        let pswpElement = document.querySelectorAll('.pswp')[0]
        let self = this
        const options = {
          history: false,
          hideAnimationDuration: 0,
          showAnimationDuration: 0,
          index: imageIndex
        }
        self.photoswipe = new PhotoSwipe(pswpElement, false, self.photoSwipeImages, options)
        self.photoswipe.init()
        self.singleView = true
        self.iOSDownload = false
        self.photoswipe.listen('afterChange', function () {
          self.iOSDownload = false
        });
        self.photoswipe.listen('close', function () {
          self.iOSDownload = false
          self.singleView = false
        });
      },
      infiniteHandler($state) {
        let self = this,
          cl = self.images.length
        for (let i = 0; i < 20; i++) {
          if (self.images.length < self.loadedAPI.length) {
            let object = self.loadedAPI[self.images.length]
            object.index = self.images.length
            self.images.push(object)
          }
        }
        if (cl < self.images.length) {
          setTimeout(function () {
            $state.loaded()
          }, 1000)
        } else {
          $state.complete()
        }
      },
      filterPhotos() {
        let self = this
        let min = self.stfToSeconds(self.timeOptions.value[0]),
          max = self.stfToSeconds(self.timeOptions.value[1]),
          imagesArr = this.FotoMe.Albums[this.$route.query.id].AlbumPhotosList,
          timgarr = [],
          eq = false
        imagesArr.forEach(function (image) {
          let imageTime = self.stfToSeconds(self.shortlandTimeFormat(image.PhotoTime))
          if (imageTime >= min && imageTime <= max) {
            timgarr.push(image)
          }
        })
        timgarr = self.sortPhotos(timgarr)

        function arraysEqual(arr1, arr2) {
          if (arr1.length !== arr2.length)
            return false;
          for (var i = arr1.length; i--;) {
            if (arr1[i] !== arr2[i])
              return false;
          }

          return true;
        }

        if (!arraysEqual(timgarr, self.loadedAPI)) {
          self.loadedAPI = timgarr
          self.photoSwipeImages = []
          for (let i = 0; i < self.loadedAPI.length; i++) {
            let tObj = {
              src: self.loadedAPI[i].PhotoURL,
              w: self.loadedAPI[i].w,
              h: self.loadedAPI[i].h
            }
            self.photoSwipeImages.push(tObj)
          }
        }
        self.images = []
        let vd = self.loadedAPI.length >= 20 ? 20 : self.loadedAPI.length
        for (let i = 0; i < vd; i++) {
          let object = self.loadedAPI[i]
          object.index = i
          self.images.push(object)
        }
        if (self.images.length > 0) {
          setTimeout(function () {
            self.infiniteId += 1
          }, 3000);

        }
      },
      sortPhotos(photos) {
        let self = this,
          result = []

        function compare(a, b) {
          if (self.stfToSeconds(self.shortlandTimeFormat(a.PhotoTime)) < self.stfToSeconds(self.shortlandTimeFormat(b.PhotoTime)))
            return -1;
          if (self.stfToSeconds(self.shortlandTimeFormat(a.PhotoTime)) > self.stfToSeconds(self.shortlandTimeFormat(b.PhotoTime)))
            return 1;
          return 0;
        }
        result = photos.sort(compare)
        return result
      },
      shortlandTimeFormat(time) {
        return time.slice(time.lastIndexOf(" ") + 1, time.length - 3)
      },
      stfToSeconds(stf) {
        let tt = stf.split(":")
        let seconds = tt[0] * 3600 + tt[1] * 60
        return seconds
      },
      secondsToStf(seconds) {
        var hours = Math.floor(seconds / 3600) % 24
        var minutes = Math.floor(seconds / 60) % 60
        return [hours, minutes]
          .map(v => v < 10 ? "0" + v : v)
          .filter((v, i) => v !== "00" || i > 0)
          .join(":")
      },
      createRangeInterval(min, max, steps, stf) {
        let sr = (max - min) / steps,
          r = [],
          self = this
        for (let i = 1; i <= steps; i++) {
          if (stf) {
            r.push(self.secondsToStf(min + (sr * i)))
          } else {
            r.push(min + (sr * i))
          }
        }
        return r
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
            this.FotoMe = JSON.parse(result)
            if (this.FotoMe.IsGalleryOn == 1) {
              this.FotoMe.Albums.forEach((album) => {
                if (album.AlbumId === to.query.id) {
                  this.loadedAPI = album.AlbumPhotosList
                  console.log(this.loadedAPI)
                  this.albumName = album.AlbumName
                  this.loadedAPI = this.sortPhotos(this.loadedAPI)
                  for (let i = 0; i < this.loadedAPI.length; i++) {
                    let tObj = {
                      src: this.loadedAPI[i].PhotoURL,
                      w: this.loadedAPI[i].w,
                      h: this.loadedAPI[i].h
                    }
                    this.photoSwipeImages.push(tObj)
                  }
                  console.log(this.photoSwipeImages)
                }
              })

              let queryId = Number(to.query.id)
              let sliderRangeInterval = this.createRangeInterval(this.stfToSeconds(this.shortlandTimeFormat(this.FotoMe
                  .Albums[
                    queryId].AlbumBeginningTime)),
                this.stfToSeconds(this.shortlandTimeFormat(this.FotoMe.Albums[queryId].AlbumEndingTime)), 100, true
              )

              for (let i = 0; i < sliderRangeInterval.length; i++) {
                this.timeOptions.data.push(sliderRangeInterval[i])
              }
              this.timeOptions.value[0] = this.shortlandTimeFormat(this.FotoMe.Albums[queryId].AlbumBeginningTime)
              this.timeOptions.value[1] = this.shortlandTimeFormat(this.FotoMe.Albums[queryId].AlbumEndingTime)
              this.timeOptions.data[0] = this.shortlandTimeFormat(this.FotoMe.Albums[queryId].AlbumBeginningTime)
              this.$refs.timeSlider.setValue([this.timeOptions.value[0], this.timeOptions.value[1]])
              this.$refs.timeSlider.refresh()
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
      let self = this
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
            this.FotoMe = JSON.parse(result)
            if (this.FotoMe.IsGalleryOn == 1) {
              this.FotoMe.Albums.forEach((album) => {
                if (album.AlbumId === this.$route.query.id) {
                  this.loadedAPI = album.AlbumPhotosList
                  console.log(this.loadedAPI)
                  this.albumName = album.AlbumName
                  this.loadedAPI = this.sortPhotos(this.loadedAPI)
                  for (let i = 0; i < this.loadedAPI.length; i++) {
                    let tObj = {
                      src: this.loadedAPI[i].PhotoURL,
                      w: this.loadedAPI[i].w,
                      h: this.loadedAPI[i].h
                    }
                    this.photoSwipeImages.push(tObj)
                  }
                  console.log(this.photoSwipeImages)
                }
              })

              let queryId = Number(this.$route.query.id)
              let sliderRangeInterval = this.createRangeInterval(this.stfToSeconds(this.shortlandTimeFormat(this.FotoMe
                  .Albums[
                    queryId].AlbumBeginningTime)),
                this.stfToSeconds(this.shortlandTimeFormat(this.FotoMe.Albums[queryId].AlbumEndingTime)), 100, true
              )

              for (let i = 0; i < sliderRangeInterval.length; i++) {
                this.timeOptions.data.push(sliderRangeInterval[i])
              }
              this.timeOptions.value[0] = this.shortlandTimeFormat(this.FotoMe.Albums[queryId].AlbumBeginningTime)
              this.timeOptions.value[1] = this.shortlandTimeFormat(this.FotoMe.Albums[queryId].AlbumEndingTime)
              this.timeOptions.data[0] = this.shortlandTimeFormat(this.FotoMe.Albums[queryId].AlbumBeginningTime)
              this.$refs.timeSlider.setValue([this.timeOptions.value[0], this.timeOptions.value[1]])
              this.$refs.timeSlider.refresh()
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
    mounted() {
      let self = this
      if (localStorage.isGrid) self.isGrid = JSON.parse(localStorage.isGrid)

      if (self.isGrid) {
        self.lineGap = 203
        self.grow = [1, 1, 1]
      } else {
        self.lineGap = 610
        self.grow = [1]
      }

      self.iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)

    },
    watch: {
      isGrid(value) {
        localStorage.isGrid = value
      }
    }

  }

</script>

<style scoped>
  .dots-spinner {
    margin: 40px auto 40px;
    width: 70px;
    text-align: center;
  }

  .dots-spinner>div {
    width: 18px;
    height: 18px;
    background-color: #2ba687;

    border-radius: 100%;
    display: inline-block;
    -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  }

  .dots-spinner .bounce1 {
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }

  .dots-spinner .bounce2 {
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }

  @-webkit-keyframes sk-bouncedelay {

    0%,
    80%,
    100% {
      -webkit-transform: scale(0)
    }

    40% {
      -webkit-transform: scale(1.0)
    }
  }

  @keyframes sk-bouncedelay {

    0%,
    80%,
    100% {
      -webkit-transform: scale(0);
      transform: scale(0);
    }

    40% {
      -webkit-transform: scale(1.0);
      transform: scale(1.0);
    }
  }

  .desc {
    position: fixed;
    top: 45px;
    left: 0;
    right: 0;
    margin: auto;
    width: 100%;
    min-height: 63px;
    background: rgba(0, 0, 0, 0.5);
    padding-top: 23px;
    padding-right: 15px;
    padding-left: 50px;

  }

  .desc p {
    color: #fff;
    font-size: 16px;
    font-family: proxima-nova-bold;
  }

  .desc_save {
    position: absolute;
    left: 15px;
    top: 15px;
    width: 28px;
    height: 28px;
    background: url('~@/assets/images/save_icon.svg') no-repeat;
    background-size: 28px;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translate3d(0, -45px, 0);
    }

    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }

    to {
      opacity: 0;
      transform: translate3d(0, -45px, 0);
    }
  }

  .fade-enter-active {
    animation: fadeIn 0.45s ease-in;
  }

  .fade-leave-active {
    animation: fadeOut 0.45s ease-in;
  }

  .image-item {
    width: calc(100% - 10px);
    height: calc(100% - 10px);
    background: #E2E5E9;
    margin: 5px;
    border-radius: 3px;
  }

  .image-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 3px;
    cursor: pointer;
  }

  .image-item span {
    position: absolute;
    bottom: 5px;
    left: 5px;
    height: 35px;
    color: #fff;
    font-size: 16px;
    line-height: 35px;
    font-family: proxima-nova-bold;
    text-transform: uppercase;
    background: #4bcb99 url('~@/assets/images/save_icon.svg') 13px 50% no-repeat;
    background-size: 18px;
    padding: 0 12px 0 41px;
    cursor: pointer;
  }

  .image-item span::after {
    content: '';
    position: absolute;
    right: -18px;
    bottom: 0;
    border: 12px solid transparent;
    border-bottom: 23px solid #4bcb99;
    border-left: 6px solid #4bcb99;
  }

  .image-item-move {
    transition: all .5s cubic-bezier(.55, 0, .1, 1);
    -webkit-transition: all .5s cubic-bezier(.55, 0, .1, 1);
  }

  .filterLabel {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.9);
    font-family: proxima-nova-regular;
    font-size: 10vmin;
    text-align: center;
    color: #4bcb99;
  }

  .filterLabel p {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }

</style>
