import Vue from 'vue'
import App from './App'
import { Button } from 'mint-ui'
import router from './router'
import store from './store'
import 'swiper/css/swiper.css'
import 'mint-ui/lib/style.css'
import './mock/mockServer'

Vue.component(Button.name, Button)

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  render: h => h(App),
  router, // 使用上vue-router
  store // 使用上store
})
