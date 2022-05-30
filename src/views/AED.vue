<template>
  <v-container>
    <v-row align="center">
      <v-col>
        <div class="title">
          <h2>AED 地點</h2>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <!-- 初始化地圖設定 -->
        <l-map
          ref="AED-map"
          :zoom="zoom"
          :center="center"
          :options="options"
          style="height: 75vh; borderRadius: 20px"
        >
          <!-- 載入圖資 -->
          <l-tile-layer :url="url" :attribution="attribution" />

          <!-- 創建標記點 -->
          <l-marker :lat-lng="item.local" v-for="item in data" :key="item.id">
            <!-- 標記點樣式判斷 -->
            <l-icon
              :icon-url="icon.type"
              :icon-size="icon.iconSize"
              :icon-anchor="icon.iconAnchor"
              :popup-anchor="icon.popupAnchor"
            />
            <!-- 彈出視窗 -->
            <l-popup>
              <h3>野柳地質公園</h3>
              <p>地址：新北市萬里區野柳里港東路167-1號</p>
              <p>平日營業時間：8:00 ~ 17:00</p>
              <p>假日營業時間：8:00 ~ 17:00</p>
            </l-popup>
          </l-marker>
        </l-map>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AED from '../assets/icon_AED_4x.png';

export default {
  name: "AED",
  data() {
    return {
      // 模擬資料
      data: [
        { id: 1, name: "夢時代購物中心", local: [23.595153, 120.306923] },
        { id: 2, name: "漢神百貨", local: [24.61942, 121.66386] },
        { id: 3, name: "漢神巨蛋", local: [22.469603, 121.302288] },
        { id: 4, name: "大統百貨", local: [22.630748, 120.318033] }
      ],
      
      zoom: 8,
      center: [23.97565, 120.9738819],
      url: "https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png",
      attribution: `&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors`,
      options: {
        zoomControl: false
      },
      icon: {
        type: AED,
        iconSize: [48, 48],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      }
    };
  },
  mounted() {
  }
};
</script>

<style>
.title {
  text-align: center;
}
</style>
