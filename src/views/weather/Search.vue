<template>
  <v-container>
    <v-row align="center">
      <v-col>
        <div class="title">
          <h2>氣象及海象查詢</h2>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <div class="title">
          <p class="primary--text" style="fontSize: 20px">請選擇類型</p>
        </div>
        <div class="ele">
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
              {{ tag }}
            </v-chip>
          </v-chip-group>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <div class="title">
          <p class="primary--text" style="fontSize: 20px">請選擇地點</p>
        </div>
        <div class="ele">
          <v-select
            v-model="location"
            :items="locations[type]"
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
          <v-btn rounded color="primary" :disabled="!location" @click="search()">
            開始查詢&gt;&gt;
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import locations from "../../assets/constant/locations";

export default {
  name: "Search",
  data() {
    return {
      tags: [
        "海水浴場",
        "浮潛",
        "港口",
        "海釣",
        "衝浪",
        "娛樂漁業",
      ],
      type: "海水浴場",
      locations,
      location: null,
    };
  },
  methods: {
    search() {
      localStorage.setItem("type", this.type);
      localStorage.setItem("location", this.location);
      this.$router.push({name: "Result"});
    },
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