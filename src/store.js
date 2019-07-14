import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: false,
    fetch_user: false,
  },
  mutations: {
    set_user(state, user) {
      state.user = user
      state.fetch_user = true
    }
  }
})