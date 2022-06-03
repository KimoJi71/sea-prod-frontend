<template>
  <div class="text-center">
    <!-- 全局 loading 特效  -->
    <v-overlay :value="loadingStatus" color="white" opacity="1" z-index="9990">
      <v-progress-circular
        indeterminate
        color="primary"
        size="90"
        class="mr-3 mb-5"
      />
      <p class="primary--text text-center pb-5">{{ loadingMsg }}</p>
    </v-overlay>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      loadingStatus: (state) => state.loadingStatus,
      loadingMsg: (state) => state.loadingMsg,
    }),
  },
};
</script>