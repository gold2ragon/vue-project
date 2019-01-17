import Vue from 'vue'
import Router from 'vue-router'
import PhotoList from '@/components/PhotoList'
import SplashScreen from '@/components/SplashScreen'
import MainScreen from '@/components/MainScreen'
import ErrorScreen from '@/components/ErrorScreen'
import AlbumScreen from '@/components/AlbumScreen'
import AlbumListScreen from '@/components/AlbumListScreen'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: '/gallery/',
  routes: [{
    path: '/:name',
    component: SplashScreen,
    children: [{
        path: 'album',
        name: 'album',
        component: AlbumScreen
      },
      {
        path: 'albumlist',
        name: 'albumlist',
        component: AlbumListScreen
      },
      {
        path: 'photolist',
        name: 'photolist',
        component: PhotoList
      },
      {
        path: '*',
        name: '404',
        component: ErrorScreen
      },
      {
        path: 'main',
        name: 'main',
        component: MainScreen
      },
    ]
  }]
})
