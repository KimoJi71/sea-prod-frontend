<template>
  <v-container>
    <v-row align="center">
      <v-col>
        <div class="title">
          <h2>查詢結果</h2>
        </div>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col>
        <div class="ele">
          <p class="primary--text" style="fontSize: 16px">{{route}} {{route_code}}</p>
        </div>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col>
        <LineChartGenerator
          :chart-options="chartOptions"
          :chart-data="chartData"
          :chart-id="chartId"
          :dataset-id-key="datasetIdKey"
          :plugins="plugins"
          :css-classes="cssClasses"
          :styles="styles"
          :width="width"
          :height="height"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { Line as LineChartGenerator } from "vue-chartjs/legacy";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
);

export default {
  name: "BlueRoadResult",
  components: {
    LineChartGenerator,
  },
  props: {
    chartId: {
      type: String,
      default: "line-chart"
    },
    datasetIdKey: {
      type: String,
      default: "label"
    },
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: "",
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      route: null,
      route_code: null,
      chartData: {
        labels: [],
        datasets: [
          {
            label: "浪高",
            backgroundColor: "#6E93BA",
            data: []
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
    };
  },
  async mounted() {
    this.route = localStorage.getItem("route");
    this.route_code = localStorage.getItem("route_code");
    const datetime = localStorage.getItem("datetime");
    try {
      const res = await this.$api.blueroad.getBlueRoadResult(this.route, this.route_code, datetime);
      this.chartData.labels = res.search_result.map(item => this.$moment(item.Instant_time).format("MM/DD HH:mm"));
      this.chartData.datasets[0].data = res.search_result.map(item => item.Wave_height);
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
.ele {
  display: flex;
  justify-content: center;
}
</style>