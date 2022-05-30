<template>
  <v-container>
    <v-row align="center">
      <v-col cols="12">
        <div class="title">
          <h2>全台水域地點</h2>
        </div>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-list-item>
            <v-list-item-content>
              <v-chip-group
                active-class="primary white--text"
                column
              >
                <v-chip>海水浴場</v-chip>
                <v-chip>浮潛</v-chip>
                <v-chip>港口</v-chip>
                <v-chip>海釣</v-chip>
                <v-chip>衝浪</v-chip>
                <v-chip>娛樂漁業</v-chip>
              </v-chip-group>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col>
        <div class="text-overline" style="display: flex; alignItem: center; float: right">
          <img :src="markRed" width="32" height="32">
          危險水域
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <!-- 初始化地圖設定 -->
        <l-map
          ref="location-map"
          :zoom="zoom"
          :center="center"
          :options="options"
          style="height: 50vh; borderRadius: 20px"
        >
          <!-- 載入圖資 -->
          <l-tile-layer :url="url" :attribution="attribution" />

          <!-- 創建標記點 -->
          <l-marker :lat-lng="[item.Lat, item.Lon]" v-for="item in locationData" :key="item.id">
            <!-- 標記點樣式判斷 -->
            <l-icon
              :icon-url="icon.type.black"
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
import dangerLocations from "../../assets/constant/dangerLocations";

import MarkBlack from '../../assets/icon_mark_black_4x.png';
import MarkRed from '../../assets/icon_mark_red_4x.png';

export default {
  name: "AED",
  data() {
    return {
      locationData: [],
      dangerLocations,
      
      zoom: 8,
      center: [23.97565, 120.9738819],
      url: "https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png",
      attribution: `&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors`,
      options: {
        zoomControl: false
      },
      icon: {
        type: {
          black: MarkBlack,
          red: MarkRed,
        },
        iconSize: [48, 48],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      },
      markBlack: MarkBlack,
      markRed: MarkRed,
    };
  },
  async mounted() {
    try {
      const res = await this.$api.map.getLocations('海水浴場');
      this.locationData = res.search_result;
    } catch (err) {
      console.log(err);
    }
  }
};
</script>

<style>
.title {
  text-align: center;
}
.v-card {
  border-radius: 20px !important;
}
</style>
