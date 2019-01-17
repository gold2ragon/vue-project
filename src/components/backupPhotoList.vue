<template>
  <div class="rtl" v-bind:class="{ photolist: isGrid, photolist_list: !isGrid}">
    <div id="header" style="z-index:10000;">
      <a class="back" @click="routeBack"><span></span>אחורה</a>
      <a class="logo"></a>
      <!-- @click="downloadImage" :href="photoswipe.currItem.src" -->
      <a v-if="!iOS && singleView" :href="photoswipe.currItem.src" class="save" download><span></span>שמור</a>
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
          קבלת פנים
          <a class="grid" @click="isGrid = true"></a>
          <a class="list" @click="isGrid = false"></a>
        </h1>
        <transition-group tag="ul" appear>
          <li v-for="(item, index) in images" :key="item.PhotoURL + index">
            <a v-if="isGrid">
              <img v-lazy="item.PhotoURL" :alt="item.PhotoTime" @click="openGallery(item.index)">
            </a>
            <a v-else :href="item.PhotoURL" download>
              <span>שמור</span>
              <img v-lazy="item.PhotoURL" :alt="item.PhotoTime">
            </a>
          </li>
        </transition-group>
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
        <div class="filter" v-bind:class="{ open_filter: openFilter }">
          <a class="time_link" @click="openFilter = !openFilter">
            <span class="timer" dir="ltr"></span>
            סנן לפי זמן
            <span class="arrow"></span>
          </a>
          <div class="time_block" v-if="openFilter">
            <vue-slider ref="timeSlider" v-model="timeOptions.value" v-bind="timeOptions" @callback="filterPhotos"></vue-slider>
            <p class="start">{{timeOptions.value[0]}}</p>
            <p class="end">{{timeOptions.value[1]}}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- very experimental -->
    <!-- Root element of PhotoSwipe. Must have class pswp. -->
    <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">

      <!-- Background of PhotoSwipe. 
         It's a separate element as animating opacity is faster than rgba(). -->
      <div class="pswp__bg"></div>

      <!-- Slides wrapper with overflow:hidden. -->
      <div class="pswp__scroll-wrap">

        <!-- Container that holds slides. 
            PhotoSwipe keeps only 3 of them in the DOM to save memory.
            Don't modify these 3 pswp__item elements, data is added later on. -->
        <div class="pswp__container">
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
        </div>
      </div>

    </div>

    <!-- very experimental -->
  </div>
</template>

<script>
  import vueSlider from 'vue-slider-component'
  import PhotoSwipe from 'photoswipe'
  import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default'
  import InfiniteLoading from 'vue-infinite-loading'
  import FotoMe from '../assets/FotoMe.json'

  export default {
    name: 'PhotoList',
    props: ['album'],
    data() {
      return {
        loadedAPI: [],
        images: [],
        photoSwipeImages: [],
        openFilter: true,
        singleView: false,
        photoswipe: null,
        isGrid: true,
        iOS: true,
        iOSDownload: false,
        infiniteId: 0,
        timeOptions: {
          data: [""],
          value: ["", ""],
          eventType: 'auto',
          width: '100%',
          height: 5,
          dotSize: 21,
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
      // a computed getter
      showMessage: function () {
        console.log(this.iOSDownload)
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
      InfiniteLoading
    },
    methods: {
      routeBack() {
        let self = this
        if (self.singleView) {
          self.singleView = false
          self.photoswipe.close()
          self.iOSDownload = false
        } else {
          self.$router.push({
            name: 'AlbumListScreen'
          })
        }
      },
      downloadImage() {
        let self = this
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
          imagesArr = FotoMe.Albums[0].AlbumPhotosList,
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
    created() {
      let self = this
      FotoMe.Albums.forEach(function (album) {
        if (album.AlbumId === self.$route.query.id) {
          self.loadedAPI = album.AlbumPhotosList
          self.loadedAPI = self.sortPhotos(self.loadedAPI)
          for (let i = 0; i < self.loadedAPI.length; i++) {
            let tObj = {
              src: self.loadedAPI[i].PhotoURL,
              w: self.loadedAPI[i].w,
              h: self.loadedAPI[i].h
            }
            self.photoSwipeImages.push(tObj)
          }
        }
      })
    },
    mounted() {
      let sliderRangeInterval = this.createRangeInterval(this.stfToSeconds(this.shortlandTimeFormat(FotoMe.Albums[0].AlbumBeginningTime)),
        this.stfToSeconds(this.shortlandTimeFormat(FotoMe.Albums[0].AlbumEndingTime)), 100, true)

      for (let i = 0; i < sliderRangeInterval.length; i++) {
        this.timeOptions.data.push(sliderRangeInterval[i])
      }

      this.timeOptions.value[0] = this.shortlandTimeFormat(FotoMe.Albums[0].AlbumBeginningTime)
      this.timeOptions.value[1] = this.shortlandTimeFormat(FotoMe.Albums[0].AlbumEndingTime)
      this.timeOptions.data[0] = this.shortlandTimeFormat(FotoMe.Albums[0].AlbumBeginningTime)

      if (localStorage.isGrid) this.isGrid = JSON.parse(localStorage.isGrid)

      //this.iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)

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

  img[lazy=loading] {
    width: 100%;
    height: 100%;
    background-color: grey;
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

</style>
