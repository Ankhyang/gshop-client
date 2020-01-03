import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'swiper/css/swiper.css'

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  render: h => h(App),
  router, // 使用上vue-router
  store // 使用上store
})
