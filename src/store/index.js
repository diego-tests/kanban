import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { 
  FETCH_APP_DATA,
  CHANGE_STAGE_CARDS_ORDER, 
} from './_actionTypes'
import { 
  SET_INITIAL_DATA,
  SET_STAGE_CARDS_ORDER,
} from './_mutationTypes'

Vue.use(Vuex)

export default new Vuex.Store({
  state: ()=>({
    stagesData: null,
  }),
  mutations: {
    [SET_INITIAL_DATA](state, data) {
      state.stagesData = data
    },
    [SET_STAGE_CARDS_ORDER](state, { stageId, cards }) {
      state.stagesData = stageId
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
    async [CHANGE_STAGE_CARDS_ORDER]({ commit }, { stageId, cards }) {
      let data

      try {
        data = (await axios(`${process.env.VUE_APP_API_ENDPOINT}/data.json`))?.data
      } catch (err) {
        console.error(err)
      }
      
      commit(SET_INITIAL_DATA, data)
    },
  },
})
