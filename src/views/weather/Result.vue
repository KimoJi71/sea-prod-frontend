<template>
  <v-container>
    <v-row align="center">
      <v-col cols="12">
        <div class="title">
          <h2>查詢結果</h2>
        </div>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col cols="12">
        <div class="ele">
          <v-chip-group
            v-model="dateType"
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
    
    <!-- 單純查詢的畫面 -->
    <v-row align="center" v-if="dateType !== '推薦日期'">
      <v-col>
        <v-card>
          <v-card-title>
            <v-spacer /><v-spacer /><v-spacer />
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              outlined
              dense
              rounded
              hide-details
            >
              <template v-slot:append>
                <img :src="searchIcon" alt="search" width="24">
              </template>
            </v-text-field>
          </v-card-title>
          <v-data-table
            fixed-header
            :headers="headers"
            :items="results"
            :search="search"
            :loading="loading"
            height="350"
            v-if="dateType !== '未來一週'"
          ></v-data-table>
          <v-data-table
            fixed-header
            :headers="headersOneWeek"
            :items="results"
            :search="search"
            :loading="loading"
            height="350"
            v-else
          ></v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <!-- 推薦的畫面 -->
    <v-row align="center" v-else>
      <v-col v-if="recommendData.status === 'success'">
        <v-row align="center">
          <v-col cols="12">
            <v-card>
              <v-card-title>
                推薦1：
              </v-card-title>
              <v-card-text>
                {{$moment(recommendData.search_result[0]["Recommended _time1"]).subtract(8, "hours").format("YYYY-MM-DD HH:mm:ss")}}
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card>
              <v-card-title>
                推薦2：
              </v-card-title>
              <v-card-text>
                {{$moment(recommendData.search_result[0]["Recommended _time2"]).subtract(8, "hours").format("YYYY-MM-DD HH:mm:ss")}}
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card>
              <v-card-title>
                推薦3：
              </v-card-title>
              <v-card-text>
                {{$moment(recommendData.search_result[0]["Recommended _time3"]).subtract(8, "hours").format("YYYY-MM-DD HH:mm:ss")}}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col v-else>
        <div class="title">
          <p class="error--text" style="fontSize: 16px">因為氣象及海象不佳，因此無法推薦您適合前往水域的日期。</p>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import searchIcon from "../../assets/icon_search_2x.png";

export default {
  name: "Result",
  data() {
    return {
      results: [],
      dateType: "當天",
      tags: ["當天", "未來三天", "未來一週", "推薦日期"],
      search: '',
      searchIcon,
      headers: [
        {
          text: "類型",
          value: "type",
        },
        {
          text: "地點",
          value: "location",
        },
        {
          text: "時間",
          sortable: true,
          value: "Instant_time",
        },
        {
          text: "溫度",
          sortable: true,
          value: "temperature",
        },
        {
          text: "體感溫度",
          sortable: true,
          value: "body_temperature",
        },
        {
          text: "相對濕度",
          sortable: true,
          value: "relative_humidity",
        },
        {
          text: "降雨機率",
          sortable: true,
          value: "Chance_of_rain",
        },
        {
          text: "最大風速",
          sortable: true,
          value: "Maximum_wind_speed",
        },
        {
          text: "天氣現象",
          sortable: true,
          value: "Weather_phenomenon",
        },
        {
          text: "舒適度指數",
          sortable: true,
          value: "Maximum_comfort_index",
        },
      ],
      headersOneWeek: [
        {
          text: "類型",
          value: "type",
        },
        {
          text: "地點",
          value: "location",
        },
        {
          text: "時間",
          sortable: true,
          value: "Instant_time",
        },
        {
          text: "平均溫度",
          sortable: true,
          value: "Average_temperature",
        },
        {
          text: "平均相對濕度",
          sortable: true,
          value: "Average_relative_humidity",
        },
        {
          text: "最低溫度",
          sortable: true,
          value: "Minimum_temperature",
        },
        {
          text: "最高溫度",
          sortable: true,
          value: "Maximum_temperature",
        },
        {
          text: "降雨機率",
          sortable: true,
          value: "Chance_of_rain",
        },
        {
          text: "最大風速",
          sortable: true,
          value: "Maximum_wind_speed",
        },
        {
          text: "天氣現象",
          sortable: true,
          value: "Weather_phenomenon",
        },
        {
          text: "舒適度指數",
          sortable: true,
          value: "Maximum_comfort_index",
        },
      ],
      loading: false,

      // 推薦的資料
      recommendData: {},
    };
  },
  methods: {
    async getData(dateType) {
      const type = localStorage.getItem("type");
      const location = localStorage.getItem("location");
      try {
        this.loading = true;
        this.results = [];
        let res = [];
        if (dateType === "當天") {
          res = await this.$api.search.getToday(location, type);
        } else if (dateType === "未來三天") {
          res = await this.$api.search.getThreeDay(location, type);
        }
        const newDatas = res.search_result.map(item => {
          item.Instant_time = this.$moment(item.Instant_time).subtract(8, "hours").format("YYYY-MM-DD HH:mm:ss");
          item.type = type;
          item.location = location;
          return item;
        });
        this.results = newDatas;
        this.loading = false;
      } catch (err) {
        console.log(err);
      }
    },
    async getDataOneWeek() {
      const type = localStorage.getItem("type");
      const location = localStorage.getItem("location");
      try {
        this.loading = true;
        this.results = [];
        const res = await this.$api.search.getOneWeek(location, type);
        const newDatas = res.search_result.map(item => {
          item.Instant_time = this.$moment(item.Instant_time).subtract(8, "hours").format("YYYY-MM-DD HH:mm:ss");
          item.type = type;
          item.location = location;
          return item;
        });
        this.results = newDatas;
        this.loading = false;
      } catch (err) {
        console.log(err);
      }
    },
    async getRecommend() {
      const type = localStorage.getItem("type");
      const location = localStorage.getItem("location");
      try {
        const res = await this.$api.recommend.getRecommend(location, type);
        this.recommendData = res;
      } catch (err) {
        console.log(err);
      }
    },
  },
  watch: {
    dateType(val) {
      if (val !== "推薦日期" && val !== "未來一週") this.getData(val);
      else if (val === "未來一週") this.getDataOneWeek();
      else this.getRecommend();
    },
  },
  mounted() {
    this.getData("當天");
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