/* eslint-disable no-tabs */
/* eslint-disable indent */
import Vue from "vue";
import App from "./App";
import { Button } from "mint-ui";
import router from "./router";
import store from "./store";
import "swiper/css/swiper.css";
import "mint-ui/lib/style.css";
import "./mock/mockServer";
import loading from "./common/images/loading.gif";
import VueLazyload from "vue-lazyload";
import "./filter";

Vue.component(Button.name, Button);
Vue.use(VueLazyload, {
  loading
});
// eslint-disable-next-line no-new
new Vue({
  el: "#app",
  render: h => h(App),
  router, // 使用上vue-router
  store // 使用上store
});
