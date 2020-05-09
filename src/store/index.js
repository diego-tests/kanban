import Vue from 'vue'
import Vuex from 'vuex'
import ui from './ui'
import api from './api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: ()=>({
  }),
  modules: { ui, api },
})
