import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import moment from "moment";

// 載入 vue2-leaflet，依照自己需要載入組件
import { LMap, LTileLayer, LMarker, LCircleMarker, LPopup, LIcon } from "vue2-leaflet";
// 載入 css
import "leaflet/dist/leaflet.css";

// 啟用載入的各組件
Vue.component("l-map", LMap);
Vue.component("l-tile-layer", LTileLayer);
Vue.component("l-marker", LMarker);
Vue.component("l-circle-marker", LCircleMarker);
Vue.component("l-popup", LPopup);
Vue.component("l-icon", LIcon);

// 設定預設 icon
import { Icon } from "leaflet";
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

Vue.config.productionTip = false;
Vue.prototype.$moment = moment;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
