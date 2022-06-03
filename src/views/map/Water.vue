<template>
  <v-container>
    <v-row align="center">
      <v-col cols="12">
        <div class="title">
          <h2>全台水質監測</h2>
        </div>
      </v-col>
      <v-col>
        <div class="text-overline" style="display: flex; alignItem: center; float: right">
          <img :src="redDot" width="32" height="32">
          水質超標
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <!-- 初始化地圖設定 -->
        <l-map
          ref="location-map"
          :zoom="zoom"
          :center="center"
          :options="options"
          style="height: 60vh; borderRadius: 20px"
        >
          <!-- 載入圖資 -->
          <l-tile-layer :url="url" :attribution="attribution" />

          <!-- 創建標記點 -->
          <l-circle-marker 
            :lat-lng="[item.Lat, item.Lon]" 
            :radius="item.Exceeded_items ? redCircle.radius: blueCircle.radius"
            :color="item.Exceeded_items ? redCircle.color: blueCircle.color"
            :fillColor="item.Exceeded_items ? redCircle.fillColor: blueCircle.fillColor"
            :fillOpacity="item.Exceeded_items ? redCircle.fillOpacity: blueCircle.fillOpacity"
            v-for="item in waterQualityData" 
            :key="item.id"
          >
            <!-- 彈出視窗 -->
            <l-popup>
              <h3>{{item.Observation_site}}</h3>
              <p>水質達成率：{{item.Achievement_rate}}</p>
              <p>水質超標項目：{{item.Exceeded_items ? item.Exceeded_items : '無'}}</p>
            </l-popup>
          </l-circle-marker>
        </l-map>
      </v-col>
      <v-col>
        <div class="text-body-2">
          資料時間：{{waterQualityData[0] ? waterQualityData[0].Data_time: ''}}
        </div>
      </v-col>
    </v-row>

    <Loading />
  </v-container>
</template>

<script>
import Loading from "@/components/Loading.vue";
import { mapMutations } from "vuex";

import redDot from "../../assets/icon_dot_red_4x.png";

export default {
  name: "Water",
  components: {
    Loading,
  },
  data() {
    return {
      waterQualityData: [],
      redDot,
      
      zoom: 8,
      center: [23.97565, 120.9738819],
      url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`,
      options: {
        zoomControl: false
      },
      blueCircle: {
        radius: 10,
        stroke: false,
        color: 'none',
        fillColor: '#1ea9e9',
        fillOpacity: 0.6,
      },
      redCircle: {
        radius: 15,
        stroke: false,
        color: 'none',
        fillColor: '#e91e3a',
        fillOpacity: 0.6,
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
      const res = await this.$api.map.getWaterQuality();
      this.waterQualityData = res.search_result;
      this.setLoadingStatus(null, { root: true });
      this.setLoadingMsg("", { root: true });
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
</style>
