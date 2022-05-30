<template>
  <v-container>
    <v-row align="center">
      <v-col>
        <div class="title">
          <h2>全台水質監測</h2>
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
          style="height: 75vh; borderRadius: 20px"
        >
          <!-- 載入圖資 -->
          <l-tile-layer :url="url" :attribution="attribution" />

          <!-- 創建標記點 -->
          <l-circle-marker 
            :lat-lng="item.local" 
            :radius="circle.radius"
            :color="circle.color"
            :fillColor="circle.fillColor"
            :fillOpacity="circle.fillOpacity"
            v-for="item in data" 
            :key="item.id"
          >
            <!-- 彈出視窗 -->
            <l-popup>
              <h3>野柳地質公園</h3>
              <p>地址：新北市萬里區野柳里港東路167-1號</p>
              <p>平日營業時間：8:00 ~ 17:00</p>
              <p>假日營業時間：8:00 ~ 17:00</p>
            </l-popup>
          </l-circle-marker>
        </l-map>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
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
      url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`,
      options: {
        zoomControl: false
      },
      circle: {
        radius: 15,
        stroke: false,
        color: 'none',
        fillColor: '#e91e3a',
        fillOpacity: 0.6,
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
