<template>
  <v-container>
    <v-row align="center">
      <v-col>
        <div class="title">
          <h2>歷史人潮分析</h2>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <div class="title">
          <p class="primary--text" style="fontSize: 20px">請選擇縣市</p>
        </div>
        <div class="ele">
          <v-select
            v-model="selected"
            :items="city"
            item-text="tw"
            item-value="en"
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
          <p class="primary--text" style="fontSize: 20px">請選擇時段</p>
        </div>
        <div class="ele">
          <v-chip-group
            v-model="crowdType"
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
      <v-col v-if="resultImg">
        <div class="ele">
          <img 
            :src="resultImg" 
            alt="chart result"
            style="width: 90%"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import city from "../../assets/constant/city";

const getResultImg = (cityName, imgType) => require(`@/assets/crowd/${cityName}/${cityName}_${imgType}.png`);

export default {
  name: "CrowdSearch",
  data() {
    return {
      tags: [
        "平日早上",
        "平日下午",
        "平日晚上",
        "假日早上",
        "假日下午",
        "假日晚上",
      ],
      crowdType: "平日早上",
      city,
      selected: null,
      imgType: "",
      resultImg: null,
    };
  },
  methods: {
    getChartImg() {
      if (this.crowdType === "平日早上") this.imgType = "Weekday_morning";
      if (this.crowdType === "平日下午") this.imgType = "Weekday_afternoon";
      if (this.crowdType === "平日晚上") this.imgType = "Weekday_night";
      if (this.crowdType === "假日早上") this.imgType = "Holiday_morning";
      if (this.crowdType === "假日下午") this.imgType = "Holiday_afternoon";
      if (this.crowdType === "假日晚上") this.imgType = "Holiday_night";

      this.resultImg = getResultImg(this.selected, this.imgType);
    },
  },
  watch: {
    selected() {
      this.getChartImg();
    },
    crowdType() {
      this.getChartImg();
    },
  },
}
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