import {
  TOGGLE_SHOW_COLORS,
  TOGGLE_SHOW_REFS,
} from './_mutationTypes'


export default  {
  state: ()=> ({
    showColors: true,
    showRefs: true,
  }),

  mutations: {
    [TOGGLE_SHOW_COLORS](state) {
      state.showColors = !state.showColors
    },
    [TOGGLE_SHOW_REFS](state) {
      state.showRefs = !state.showRefs
    },
  },
}