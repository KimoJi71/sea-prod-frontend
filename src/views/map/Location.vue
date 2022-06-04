<template>
  <v-container>
    <v-row align="center">
      <v-col cols="12">
        <div class="title">
          <h2>全台水域地點</h2>
        </div>
      </v-col>
      <v-col cols="12">
        <v-sheet
          elevation="2"
          class="py-3 px-6"
          rounded="xl"
        >
          <v-chip-group
            v-model="type"
            mandatory
            active-class="primary"
          >
            <v-chip
              v-for="tag in tags"
              :key="tag"
              :value="tag"
            >
              {{tag}}
            </v-chip>
          </v-chip-group>
        </v-sheet>
      </v-col>
      <v-col v-show="type !== '沿海海面'">
        <div class="text-overline" style="display: flex; alignItem: center; float: right">
          <img :src="markRed" width="32" height="32">
          危險水域
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-if="type !== '沿海海面'">
        <l-map
          ref="location-map"
          :zoom="zoom"
          :center="center"
          :options="options"
          style="height: 48vh; borderRadius: 20px"
        >
          <l-tile-layer :url="url" :attribution="attribution" />

          <!-- 水域地點 -->
          <l-marker
            :lat-lng="[item.Lat, item.Lon]" 
            v-for="item in locationData" 
            :key="item.id"
          >
            <l-icon
              :icon-url="dangerLocations[type].includes(item.Observation_site) ? icon.type.red : icon.type.black"
              :icon-size="icon.iconSize"
              :icon-anchor="icon.iconAnchor"
              :popup-anchor="icon.popupAnchor"
            />
            <l-popup>
              <h3>{{item.Observation_site}}</h3>
              <p>溫度：{{item.temperature}}</p>
              <p>體感溫度：{{item.body_temperature}}</p>
              <p>相對濕度：{{item.relative_humidity}}</p>
              <p>降雨機率：{{item.Chance_of_rain}}</p>
              <p>最大風速：{{item.Maximum_wind_speed}}</p>
              <p>天氣現象：{{item.Weather_phenomenon}}</p>
              <p>舒適度指數：{{item.Maximum_comfort_index}}</p>
              <hr>
              <p>日出日落時間：{{item.Sunrise}} / {{item.Sundown}}</p>
            </l-popup>
          </l-marker>
        </l-map>
        <div class="text-body-2 mt-5">
          資料時間：{{locationData[0] ? $moment(locationData[0].Instant_time).subtract(8, "hours").format("YYYY-MM-DD HH:mm"): ''}}
        </div>
      </v-col>

      <v-col v-else>
        <l-map
          ref="location-map"
          :zoom="zoom"
          :center="center"
          :options="options"
          style="height: 65vh; borderRadius: 20px"
        >
          <l-tile-layer :url="url" :attribution="attribution" />

          <!-- 水域地點 -->
          <l-marker
            :lat-lng="[item.Lat, item.Lon]" 
            v-for="item in seaData" 
            :key="item.id"
          >
            <l-icon
              :icon-url="icon.type.sea"
              :icon-size="icon.iconSize"
              :icon-anchor="icon.iconAnchor"
              :popup-anchor="icon.popupAnchor"
            />
            <l-popup>
              <h3>{{item.Observation_site}}</h3>
              <p>當日浪況：{{item.Wave_conditions}}</p>
              <p>天氣現象：{{item.Weather_phenomeno}}</p>
              <hr>
              <p>日出日落時間：{{item.Sunrise}} / {{item.Sundown}}</p>
            </l-popup>
          </l-marker>
        </l-map>
      </v-col>
    </v-row>
    
    <Loading />
  </v-container>
</template>

<script>
import dangerLocations from "../../assets/constant/dangerLocations";
import Loading from "@/components/Loading.vue";
import { mapMutations } from "vuex";

import MarkBlack from "../../assets/icon_mark_black_4x.png";
import MarkRed from "../../assets/icon_mark_red_4x.png";
import Sea from "../../assets/icon_sea_4x.png";

export default {
  name: "Location",
  components: {
    Loading,
  },
  data() {
    return {
      tags: [
        "海水浴場",
        "浮潛",
        "港口",
        "海釣",
        "衝浪",
        "娛樂漁業",
        "沿海海面"
      ],
      type: "海水浴場",
      locationData: [],
      seaData: [],
      dangerLocations,
      
      zoom: 8,
      center: [23.97565, 120.9738819],
      url: "https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png",
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`,
      options: {
        zoomControl: false
      },
      icon: {
        type: {
          black: MarkBlack,
          red: MarkRed,
          sea: Sea,
        },
        iconSize: [48, 48],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      },
      markBlack: MarkBlack,
      markRed: MarkRed,
    };
  },
  methods: {
    async getLocations(type) {
      try {
        this.setLoadingStatus(null, { root: true });
        this.setLoadingMsg("資料載入中...", { root: true });
        const res = await this.$api.map.getLocations(type);
        this.locationData = res.search_result;
        this.setLoadingStatus(null, { root: true });
        this.setLoadingMsg("", { root: true });
      } catch (err) {
        console.log(err);
      }
    },
    async getSeaLocations() {
      try {
        this.setLoadingStatus(null, { root: true });
        this.setLoadingMsg("資料載入中...", { root: true });
        const res = await this.$api.map.getSeaLocations();
        this.seaData = res.search_result;
        this.setLoadingStatus(null, { root: true });
        this.setLoadingMsg("", { root: true });
      } catch (err) {
        console.log(err);
      }
    },
    ...mapMutations({
      setLoadingStatus: "setLoadingStatus",
      setLoadingMsg: "setLoadingMsg",
    }),
  },
  watch: {
    type(val) {
      if (val !== "沿海海面") this.getLocations(val);
      else this.getSeaLocations();
    }
  },
  async mounted() {
    try {
      this.setLoadingStatus(null, { root: true });
      this.setLoadingMsg("資料載入中...", { root: true });
      const res = await this.$api.map.getLocations("海水浴場");
      this.locationData = res.search_result;
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
