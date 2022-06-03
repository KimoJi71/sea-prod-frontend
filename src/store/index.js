import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loadingStatus: false,
    loadingMsg: "",
  },
  mutations: {
    setLoadingStatus(state) {
      state.loadingStatus = !state.loadingStatus;
    },
    setLoadingMsg(state, loadingMsg) {
      state.loadingMsg = loadingMsg;
    },
  },
  actions: {
  },
  modules: {
  }
});
