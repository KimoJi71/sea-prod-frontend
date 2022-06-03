<template>
  <v-container>
    <v-row align="center">
      <v-col>
        <div class="title">
          <h2>藍色公路</h2>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <div class="title">
          <p class="primary--text" style="fontSize: 20px">請選擇航線</p>
        </div>
        <div class="ele">
          <v-select
            v-model="route"
            :items="blueRoad"
            label="請選擇"
            outlined
            dense
            rounded
          ></v-select>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <div class="title">
          <p class="primary--text" style="fontSize: 20px">請選擇小航線</p>
        </div>
        <div class="ele">
          <v-select
            v-model="route_code"
            :items="blueRoadRoute[route]"
            label="請選擇"
            outlined
            dense
            rounded
          ></v-select>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <div class="title">
          <p class="primary--text" style="fontSize: 20px">請選擇出發時間</p>
        </div>
        <div class="ele">
          <v-select
            v-model="datetime"
            :items="dateSelection"
            label="請選擇"
            outlined
            dense
            rounded
          ></v-select>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div class="ele">
          <v-btn rounded color="primary" :disabled="!datetime" @click="search()">
            開始查詢&gt;&gt;
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { blueRoad, blueRoadRoute } from "../../assets/constant/blueroad";

export default {
  name: "BlueRoadSearch",
  data() {
    return {
      blueRoad,
      blueRoadRoute,
      route: null,
      route_code: null,
      dateSelection: [],
      datetime: null
    };
  },
  methods: {
    search() {
      localStorage.setItem("route", this.route);
      localStorage.setItem("route_code", this.route_code);
      localStorage.setItem("datetime", this.datetime);
      this.$router.push({name: "BlueRoadResult"});
    },
  },
  watch: {
    route(val) {
      this.route_code = blueRoadRoute[val][0];
    },
  },
  mounted() {
    for (let i = 0; i < 48; i++) {
      this.dateSelection.push(`${this.$moment().add(i, "hours").format("YYYY/MM/DD HH:00:00")}`);
    }
  },
};
</script>

<style>
.title {
  text-align: center;
}
.ele {
  display: flex;
  justify-content: center;
}
</style>