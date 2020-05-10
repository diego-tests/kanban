import {
  TOGGLE_SHOW_COLORS,
  TOGGLE_SHOW_REFS,
  SET_IS_DRAGGING,
} from './_mutationTypes'


export default  {
  state: ()=> ({
    showColors: true,
    showRefs: true,
    isDragging: false,
  }),

  mutations: {
    [TOGGLE_SHOW_COLORS](state) {
      state.showColors = !state.showColors
    },
    [TOGGLE_SHOW_REFS](state) {
      state.showRefs = !state.showRefs
    },
    [SET_IS_DRAGGING](state, isDragging) {
      state.isDragging = isDragging
    },
  },
}