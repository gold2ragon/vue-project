<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {}
    },
    mounted() {}
  }

</script>

<style>
  @font-face {
    font-family: 'proxima-nova-light';
    src:
      url('~@/assets/fonts/proxima-nova-light.woff') format('woff'),
      url('~@/assets/fonts/proxima-nova-light.ttf') format('truetype'),
      url('~@/assets/fonts/proxima-nova-light.svg#proxima-nova-light') format('svg');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'proxima-nova-regular';
    src:
      url('~@/assets/fonts/proxima-nova-regular.woff') format('woff'),
      url('~@/assets/fonts/proxima-nova-regular.ttf') format('truetype'),
      url('~@/assets/fonts/proxima-nova-regular.svg#proxima-nova-light') format('svg');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'proxima-nova-bold';
    src:
      url('~@/assets/fonts/proxima-nova-bold.woff') format('woff'),
      url('~@/assets/fonts/proxima-nova-bold.ttf') format('truetype'),
      url('~@/assets/fonts/proxima-nova-bold.svg#proxima-nova-light') format('svg');
    font-weight: normal;
    font-style: normal;
  }

  * {
    padding: 0;
    box-sizing: border-box;
    margin: 0
  }

  html {
    min-height: 100%;
    height: 100%;
  }

  body {
    min-width: 320px;
    min-height: 100%;
    height: 100%;
    color: #141414;
    font-size: 0;
    line-height: 1;

    font-family: 'proxima-nova-regular', sans-serif;
    background: #fafafa;
  }

  a {
    color: #268ee6;
    text-decoration: none;
    cursor: pointer;
  }

  a:hover {
    color: #2a2378;
  }

  li {
    list-style: none
  }

  :focus {
    outline: none;
  }

  img {
    border: 0;
  }

  h1 {
    font-family: proxima-nova-bold;
    text-transform: uppercase;
  }

  /* Header */

  #header {
    position: fixed;
    z-index: 99;
    width: 100%;
    height: 45px;
    background: #32bf9c;
    background: linear-gradient(45deg, #32bf9c 0%, #69da94 100%);
    box-shadow: 3px -3px 24px 0px rgba(0, 0, 0, 0.05);
  }

  #header a {
    position: absolute;
    height: 100%;
    color: #fff;
    font-size: 16px;
    line-height: 47px;
    text-transform: uppercase;
    font-family: proxima-nova-bold;
  }

  #header .back {
    left: 0;
    z-index: 99;
    width: 50%;
    text-align: left;
    padding: 0 0 0 15px;
  }

  #header .logo {
    left: 50%;
    z-index: 999;
    transform: translateX(-50%);
    width: 40px;
    background: url('~@/assets/images/header_logo.svg') 50% no-repeat;
    background-size: contain;
  }

  #header .save {
    right: 0;
    z-index: 99;
    width: 50%;
    text-align: right;
    padding: 0 15px 0 0;
  }

  #header span {
    display: inline-block;
    height: 100%;
    vertical-align: top;
    margin: 0 10px 0 0;
  }

  #header .back span {
    width: 7px;
    background: url('~@/assets/images/header_back.svg') 0 50% no-repeat;
    background-size: 7px 12px;
  }

  #header .save span {
    width: 18px;
    background: url('~@/assets/images/header_save.svg') 0 50% no-repeat;
    background-size: 18px;
  }

  /* Main screen */



  #content {
    width: 100%;
    max-width: 640px;
    min-height: 100%;
    padding: 45px 0 0 0;
    overflow: hidden;
    margin: 0 auto;
  }

  .wrap {
    padding: 0 15px;
  }

  .search {
    position: relative;
    min-height: 87px;
    background: #fff;
    border-radius: 4px;
    padding: 23px 130px 23px 20px;
    box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.13);
    margin: 0 0 20px 0;
  }

  .search p {
    color: #343434;
    font-size: 14px;
    font-family: proxima-nova-bold;
    margin: 0 0 13px 0;
  }

  .search .point {
    display: inline-block;
    color: #33bf9c;
    font-size: 12px;
    line-height: 15px;
    font-family: proxima-nova-regular;
    background: url('~@/assets/images/search_point.svg') 0 no-repeat;
    background-size: 11px 15px;
    padding: 0 0 0 19px;
  }

  .search .button {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 110px;
    color: #fff;
    font-size: 16px;
    font-family: proxima-nova-bold;
    text-transform: uppercase;
    text-align: center;
    background: #32bf9c;
    background: linear-gradient(315deg, #32bf9c 0%, #69da94 100%);
    border-radius: 0 4px 4px 0;
  }

  .search .button span {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
  }

  .view {
    position: relative;
    margin: 0 0 38px 0;
  }

  .view h3 {
    float: left;
    color: #343434;
    font-size: 14px;
    font-family: proxima-nova-bold;
  }

  .view p {
    float: right;
    color: #343434;
    font-size: 12px;
    font-family: proxima-nova-light;
    margin: 2px 0 0 0;
  }

  .view ul {
    display: inline-block;
    width: 100%;
    white-space: nowrap;
    overflow-y: hidden;
    margin: 15px 0 0 0;
  }

  .view li {
    display: inline-block;
    vertical-align: top;
    margin: 0 15px 0 0;
  }

  .view a {
    display: inline-block;
    width: 97px;
    border-radius: 3px;
    overflow: hidden;
  }

  .view a img {
    width: 100%;
  }

  /* Photolist */

  .photolist #content,
  .photolist_list #content {
    padding: 75px 0 150px 0;
  }

  .photolist h1,
  .photolist_list h1 {
    position: relative;
    color: #333;
    font-size: 28px;
    padding: 0 79px 0 0;
    margin: 0 0 25px 0;
  }

  .photolist .grid,
  .photolist_list .grid {
    position: absolute;
    top: 5px;
    right: 47px;
    width: 17px;
    height: 17px;
  }

  .photolist .grid {
    background: url('~@/assets/images/active_grid_icon.svg') no-repeat;
    background-size: 17px;
  }

  .photolist_list .grid {
    background: url('~@/assets/images/grid_icon.svg') no-repeat;
    background-size: 17px;
  }

  .photolist .list,
  .photolist_list .list {
    position: absolute;
    top: 5px;
    right: 0;
    width: 17px;
    height: 17px;
  }

  .photolist .list {
    background: url('~@/assets/images/list_icon.svg') no-repeat;
    background-size: 17px;
  }

  .photolist_list .list {
    background: url('~@/assets/images/active_list_icon.svg') no-repeat;
    background-size: 17px;
  }

  .photolist ul {

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 0 -5px;
  }

  .photolist li {
    list-style: none;
    display: inline-block;
    width: calc(100% / 3);
    height: 200px;
    text-align: center;
    padding: 5px;
  }

  .photolist_list li {
    position: relative;
    display: inline-block;
    width: 100%;
    margin: 0 0 15px 0;
  }

  .photolist_list li span {
    position: absolute;
    bottom: 0;
    left: 0;
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

  .photolist_list li span::after {
    content: '';
    position: absolute;
    right: -18px;
    bottom: 0;
    border: 12px solid transparent;
    border-bottom: 23px solid #4bcb99;
    border-left: 6px solid #4bcb99;
  }

  .photolist li a,
  .photolist_list li a {
    display: block;
    height: 100%;
    border-radius: 3px;
    overflow: hidden;
  }

  .photolist li img {
    width: 100%;
    height: 100%;
    /*Scale down will take the necessary specified space that is 100px x 100px without stretching the image*/
    object-fit: contain;
    transition: all .2s ease-in-out;
  }

  .photolist li img:hover {
    opacity: 0.85;
  }

  .photolist_list li img {
    width: 100%;
  }

  .filter {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    min-height: 60px;
    background: #fafafa;
    box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 0.42);
  }

  .filter .time_link {
    display: block;
    height: 60px;
    color: #333;
    font-size: 16px;
    line-height: 60px;
    font-family: proxima-nova-bold;
    text-transform: uppercase;
    text-align: center;
    user-select: none;
  }

  .filter .timer {
    display: inline-block;
    width: 18px;
    height: 60px;
    vertical-align: middle;
    background: url('~@/assets/images/timer_icon.svg') 50% no-repeat;
    background-size: 18px;
    margin: -2px 6px 0 0;
  }

  .filter .arrow {
    transform: rotate(180deg);
    display: inline-block;
    width: 13px;
    height: 60px;
    vertical-align: middle;
    background: url('~@/assets/images/filter_arrow.svg') 50% no-repeat;
    background-size: 13px 8px;
    margin: -4px 0 0 4px;
  }

  .open_filter .arrow {
    transform: rotate(0deg);
  }

  .filter .time_block {
    /*display: none;*/
    display: block;
    width: 268px;
    max-height: 0px;
    overflow: hidden;
    margin: 2px auto 26px auto;
    transition: all .3s ease;
  }

  .open_filter .time_block {
    display: block;
    max-height: 500px;
  }

  .time_block .line {
    position: relative;
    height: 5px;
    background: #d7d7d7;
    border-radius: 5px;
    cursor: pointer;
    margin: 8px 0 16px 0;
  }

  .time_block .green_line {
    height: 100%;
    background: #43c899;
    border-radius: 5px;
    margin: 0 auto;
  }

  .time_block .point {
    position: absolute;
    width: 21px;
    height: 21px;
    background: #2ba687;
    border: 2px solid #ebebeb;
    border-radius: 21px;
    margin-top: -8px;
  }

  .time_block p {
    color: #333;
    font-size: 16px;
    font-family: proxima-nova-regular;
    text-transform: uppercase;
  }

  .time_block .start {
    float: left;
  }

  .time_block .end {
    float: right;
  }

  /* Save view */

  .save_view {
    background: #000;
  }

  .save_view #content {
    position: relative;
  }

  .save_view .desc {
    position: fixed;
    top: 45px;
    width: 100%;
    min-height: 63px;
    background: rgba(0, 0, 0, 0.5);
    padding: 15px 58px 15px 15px;
  }

  .save_view .desc p {
    color: #fff;
    font-size: 16px;
    font-family: proxima-nova-bold;
  }

  .save_view .desc_save {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 28px;
    height: 28px;
    background: url('~@/assets/images/save_icon.svg') no-repeat;
    background-size: 28px;
  }

  .save_view .capture img {
    width: 100%;
  }

  /* Single view */

  .single_view {
    background: #000;
  }

  .single_view #content {
    display: table;
    max-width: 100%;
  }

  .single_view .capture {
    display: table-cell;
    vertical-align: middle;
  }

  .single_view .capture img {
    width: 100%;
  }


  /* Phone input */

  .phone_input {
    text-align: center;
  }

  .phone_input #content {
    padding: 140px 0 0 0;
  }

  .phone_input h1 {
    color: #333;
    font-size: 28px;
    margin: 0 0 20px 0;
  }

  .phone_input p {
    color: #010302;
    font-size: 16px;
    font-family: proxima-nova-regular;
    margin: 0 0 30px 0;
  }

  .phone_input input {
    width: 100%;
    height: 50px;
    text-align: center;
    border: 0;
    border-radius: 4px;
  }

  .phone_input input[type="number"] {
    color: #bebebe;
    font-size: 16px;
    line-height: 50px;
    font-family: proxima-nova-regular;
    text-align: center;
    box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.13);
    margin: 0 0 30px 0;
  }

  .phone_input ::placeholder {
    color: #bebebe;
    opacity: 1;
  }

  .phone_input input[type="button"] {
    color: #fff;
    font-size: 16px;
    line-height: 50px;
    font-family: proxima-nova-bold;
    text-transform: uppercase;
    background: linear-gradient(315deg, #32bf9c 0%, #69da94 100%);
    cursor: pointer;
  }

  .phone_input .bottom {
    position: absolute;
    right: 0;
    bottom: 20px;
    left: 0;
  }

  .phone_input .bottom p {
    color: #010302;
    font-size: 12px;
    font-family: proxima-nova-regular;
    margin: 0 0 20px 0;
  }

  .phone_input .bottom a {
    color: #010302;
    font-size: 12px;
    font-family: proxima-nova-regular;
    border-bottom: 1px solid #d0d0d0;
  }

  /* Ipad input */

  .ipad_input {
    text-align: center;
  }

  .ipad_input #content {
    padding: 45px 0 0 0;
  }

  .ipad_input .logo_block {
    display: inline-block;
    width: 172px;
    padding: 0 0 10px 0;
    border-bottom: 1px solid #e1e1e1;
    margin: 0 0 15px 0;
  }

  .ipad_input .logo {
    display: inline-block;
    width: 54px;
    height: 63px;
    background: url('~@/assets/images/main_screen_logo.svg') no-repeat;
    background-size: contain;
    margin: 0 0 10px 0;
  }

  .ipad_input .logo_block p {
    width: 320px;
    color: #010302;
    font-size: 12px;
    font-family: proxima-nova-light;
    margin: 0 -74px;
  }

  .ipad_input p {
    color: #010302;
    font-size: 12px;
    font-family: proxima-nova-regular;
    margin: 0 0 25px 0;
  }

  .ipad_input input {
    width: 100%;
    height: 50px;
    text-align: center;
    border: 0;
    border-radius: 4px;
  }

  .ipad_input input[type="number"] {
    color: #bebebe;
    font-size: 16px;
    line-height: 50px;
    font-family: proxima-nova-regular;
    text-align: center;
    box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.13);
    margin: 0 0 25px 0;
  }

  .ipad_input input[type="button"] {
    color: #fff;
    font-size: 16px;
    line-height: 50px;
    font-family: proxima-nova-bold;
    text-transform: uppercase;
    background: linear-gradient(28deg, #32bf9c 0%, #69da94 100%);
    cursor: pointer;
  }

  .keyboard {
    text-align: right;
    margin: 0 -7px 16px -7px;
  }

  .keyboard div {
    display: inline-block;
    width: 33.33%;
    vertical-align: top;
    padding: 0 7px 14px 7px;
  }

  .keyboard a {
    display: block;
    height: 40px;
    color: #fff;
    font-size: 18px;
    line-height: 40px;
    font-family: proxima-nova-bold;
    text-align: center;
    background: linear-gradient(28deg, #32bf9c 0%, #69da94 100%);
    border-radius: 4px;
  }

  .keyboard .clear a {
    background: #ebebeb url('~@/assets/images/clear_icon.svg') 50% no-repeat;
    background-size: 22px 17px;
  }

  /* RTL Header */

  .rtl #header .back {
    right: 0;
    left: auto;
    text-align: right;
    padding: 0 15px 0 0;
  }

  .rtl #header .save {
    direction: ltr;
    right: auto;
    left: 0;
    text-align: left;
    padding: 0 0 0 15px;
  }

  .rtl #header .back span {
    transform: rotate(180deg);
    margin: 0 0 0 10px;
  }

  /* RTL Photo album */

  .rtl .search {
    padding: 23px 20px 23px 130px;
  }

  .rtl .search .button {
    right: auto;
    left: 0;
    border-radius: 4px 0 0 4px;
  }

  .rtl .view h3 {
    float: right;
  }

  .rtl .view p {
    float: left;
  }

  .rtl .view li {
    margin: 0 0 0 15px;
  }

  /* RTL Photolist */

  .rtl .photolist h1,
  .rtl .photolist_list h1 {
    padding: 0 0 0 79px;
  }

  .rtl .photolist .grid,
  .rtl .photolist_list .grid {
    right: auto;
    left: 47px;
  }

  .rtl .photolist .list,
  .rtl .photolist_list .list {
    right: auto;
    left: 0;
  }

  .rtl .filter .timer {
    margin: -2px 0 0 6px;
  }

  .rtl .filter .arrow {
    margin: -4px 4px 0 0;
  }

  .rtl .time_block .start {
    float: left;
    direction: ltr;
  }

  .rtl .time_block .end {
    float: right;
    direction: ltr;
  }


  /* RTL Save view */

  .rtl .save_view .desc {
    padding: 15px 15px 15px 58px;
  }

  .rtl .save_view .desc_save {
    right: auto;
    left: 15px;
  }

  /* RTL Select album */

  .rtl .select_album h2 {
    background: url('~@/assets/images/select_album_icon.svg') 100% 0 no-repeat;
    background-size: 25px;
    padding: 0 38px 0 0;
  }

  .rtl .select_album p {
    padding: 0 38px 0 0;
  }

  @media screen and (max-width: 640px) {
    .view {
      margin: 0 -15px 38px -15px;
    }

    .view h3,
    .view p {
      padding: 0 15px;
    }

    .view li {
      display: inline-block;
      margin: 0 0 0 15px;
    }

  }

  .pswp {
    display: none;
    position: absolute;
    width: 100%;
    height: calc(100% - 45px);
    left: 0;
    top: 45px;
    overflow: hidden;
    -ms-touch-action: none;
    touch-action: none;
    z-index: 1500;
    -webkit-text-size-adjust: 100%;
    -webkit-backface-visibility: hidden;
    outline: none;
  }

  .pswp * {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .pswp img {
    max-width: none;
  }

  .pswp--animate_opacity {
    opacity: 0.001;
    will-change: opacity;
    -webkit-transition: opacity 333ms cubic-bezier(0.4, 0, 0.22, 1);
    transition: opacity 333ms cubic-bezier(0.4, 0, 0.22, 1);
  }

  .pswp--open {
    display: block;
  }

  .pswp--zoom-allowed .pswp__img {
    cursor: -webkit-zoom-in;
    cursor: -moz-zoom-in;
    cursor: zoom-in;
  }

  .pswp--zoomed-in .pswp__img {
    cursor: -webkit-grab;
    cursor: -moz-grab;
    cursor: grab;
  }

  .pswp--dragging .pswp__img {
    cursor: -webkit-grabbing;
    cursor: -moz-grabbing;
    cursor: grabbing;
  }

  .pswp__bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-backface-visibility: hidden;
    will-change: opacity;
  }

  .pswp__scroll-wrap {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .pswp__container,
  .pswp__zoom-wrap {
    -ms-touch-action: none;
    touch-action: none;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }

  .pswp__container,
  .pswp__img {
    -webkit-touch-callout: default;
    -webkit-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
    user-select: text;
    -webkit-tap-highlight-color: transparent;
  }

  .pswp__zoom-wrap {
    position: absolute;
    width: 100%;
    -webkit-transform-origin: left top;
    -ms-transform-origin: left top;
    transform-origin: left top;
    -webkit-transition: -webkit-transform 333ms cubic-bezier(0.4, 0, 0.22, 1);
    transition: transform 333ms cubic-bezier(0.4, 0, 0.22, 1);
  }

  .pswp__bg {
    will-change: opacity;
    -webkit-transition: opacity 333ms cubic-bezier(0.4, 0, 0.22, 1);
    transition: opacity 333ms cubic-bezier(0.4, 0, 0.22, 1);
  }

  .pswp--animated-in .pswp__bg,
  .pswp--animated-in .pswp__zoom-wrap {
    -webkit-transition: none;
    transition: none;
  }

  .pswp__container,
  .pswp__zoom-wrap {
    -webkit-backface-visibility: hidden;
  }

  .pswp__item {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: hidden;
  }

  .pswp__img {
    position: absolute;
    width: auto;
    height: auto;
    top: 0;
    left: 0;
  }

  .pswp__img--placeholder {
    -webkit-backface-visibility: hidden;
  }

  .pswp__img--placeholder--blank {
    background: #222;
  }

  .pswp--ie .pswp__img {
    width: 100% !important;
    height: auto !important;
    left: 0;
    top: 0;
  }

  .pswp__error-msg {
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    text-align: center;
    font-size: 14px;
    line-height: 16px;
    margin-top: -8px;
    color: #CCC;
  }

  .pswp__error-msg a {
    color: #CCC;
    text-decoration: underline;
  }

</style>
