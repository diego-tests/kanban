import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { FETCH_APP_DATA } from './actionTypes'
import { SET_INITIAL_DATA } from './mutationTypes'

Vue.use(Vuex)

export default new Vuex.Store({
  state: ()=>({
    initialData: null,
  }),
  mutations: {
    [SET_INITIAL_DATA](state, data) {
      state.initialData = data
    },
  },
  actions: {
    async [FETCH_APP_DATA]({ commit }) {
      let data

      try {
        data = (await axios(`${process.env.VUE_APP_API_ENDPOINT}/data.json`))?.data
      } catch (err) {
        console.error(err)
      }
      
      commit(SET_INITIAL_DATA, data)
    },
  },
  modules: {
  },
})
