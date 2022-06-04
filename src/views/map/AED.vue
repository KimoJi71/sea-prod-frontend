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
          <l-marker 
            :lat-lng="[item.Lat, item.Lon]" 
            v-for="item in AEDData" 
            :key="item.id"
          >
            <!-- 標記點樣式判斷 -->
            <l-icon
              :icon-url="icon.type"
              :icon-size="icon.iconSize"
              :icon-anchor="icon.iconAnchor"
              :popup-anchor="icon.popupAnchor"
            />
            <!-- 彈出視窗 -->
            <l-popup>
              <h3>{{item.Location_name}}</h3>
              <p>地址：{{item.Location_address}}</p>
              <p>
                平日營業時間：
                {{item.Weekday_time ? `${item.Weekday_time.split('~')[0].slice(0, -3)} ~ ${item.Weekday_time.split('~')[1].slice(0, -3)}` : ''}}
              </p>
              <p>
                假日營業時間：
                {{item.Holiday_time ? `${item.Holiday_time.split('~')[0].slice(0, -3)} ~ ${item.Holiday_time.split('~')[1].slice(0, -3)}` : ''}}
              </p>
            </l-popup>
          </l-marker>
        </l-map>
      </v-col>
    </v-row>

    <Loading />
  </v-container>
</template>

<script>
import Loading from "@/components/Loading.vue";
import { mapMutations } from "vuex";

import AED from '../../assets/icon_AED_4x.png';

export default {
  name: "AED",
  components: {
    Loading,
  },
  data() {
    return {
      AEDData: [],
      
      zoom: 8,
      center: [23.97565, 120.9738819],
      url: "https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png",
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`,
      options: {
        zoomControl: false
      },
      icon: {
        type: AED,
        iconSize: [36, 36],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      }
    };
  },
  methods: {
    ...mapMutations({
      setLoadingStatus: "setLoadingStatus",
      setLoadingMsg: "setLoadingMsg",
    }),
  },
  async mounted() {
    try {
      this.setLoadingStatus(null, { root: true });
      this.setLoadingMsg("資料載入中...", { root: true });
      const res = await this.$api.map.getAED();
      this.AEDData = res.search_result;
      this.setLoadingStatus(null, { root: true });
      this.setLoadingMsg("", { root: true });
    } catch (err) {
      console.log(err);
    }
  },
};
</script>

<style>
.title {
  text-align: center;
}
</style>
