import axios from 'axios'
import { 
  FETCH_APP_DATA,
  CHANGE_STAGE_CARDS_ORDER,
  CREATE_CARD, 
  ADD_NEW_CARD,
  GET_STAGE_INDEX_BY_ID,
  UPDATE_CARD,
} from './_actionTypes'
import { 
  SET_INITIAL_DATA,
  SET_STAGE_CARDS_ORDER,
  SET_LAST_DRAGGED_CARD,
} from './_mutationTypes'


export default  {
  state: ()=>({
    stagesData: null,
    lastDraggedCard: null,
  }),
  mutations: {
    [SET_INITIAL_DATA](state, data) {
      state.stagesData = data
    },
    [SET_STAGE_CARDS_ORDER](state, { stageIndex, cards }) {
    
      const updatedStagesData = [...state.stagesData]
    
      updatedStagesData[stageIndex].cards = cards.map((card, idx)=> ({ ...card, order: idx }))
    
      state.stagesData = updatedStagesData
    },
    [SET_LAST_DRAGGED_CARD](state, card) {
      state.lastDraggedCard = card
    },
  },
  actions: {
    async [FETCH_APP_DATA]({ commit }) {
      let data
    
      try {
        data = (await axios(`${process.env.VUE_APP_API_ENDPOINT}/data.json`))?.data?.stages
      } catch (err) {
        console.error(err)
      }
          
      commit(SET_INITIAL_DATA, data)
    },
    [GET_STAGE_INDEX_BY_ID]({ state }, stageId) {
      return state.stagesData.findIndex((item=> item.id === stageId))
    },
    async [CHANGE_STAGE_CARDS_ORDER]({ dispatch, commit }, { stageId, cards }) {

      const stageIndex = await dispatch(GET_STAGE_INDEX_BY_ID, stageId)
      commit(SET_STAGE_CARDS_ORDER, { stageIndex, cards })
      
    },
    
    /* eslint-disable no-unreachable */
    async [UPDATE_CARD]({ commit }, { stageId, card }) {

      commit(SET_LAST_DRAGGED_CARD, null)

      return
      // if we had a backend...
      axios.put(`${process.env.VUE_APP_API_ENDPOINT}/cards/${card.id}`, { stageId, order: card.order })
      /* eslint-disable-next-line no-unused-vars */
        .then(res=> {
          // TODO: discuss response with backend
        })
        .catch(err=> console.error(err))
    },
    
    [CREATE_CARD]({ dispatch }, { stageId, card }) {
      const newCard = { ...card, id: `TEMP_ID${new Date().getTime()}` }
      dispatch(ADD_NEW_CARD, { stageId, newCard })
        
    },
    
    async [ADD_NEW_CARD]({ dispatch, state, commit }, { stageId, newCard }) {
      const stageIndex = await dispatch(GET_STAGE_INDEX_BY_ID, stageId)
        
      const updatedCards = [newCard, ...state.stagesData[stageIndex].cards]
        
      commit(SET_STAGE_CARDS_ORDER, { stageIndex, cards: updatedCards })
        
      const payload = {
        stageId,
        order: 0,
        title: newCard.title,
        reference: newCard.reference,
        color: newCard.color,
      }
      return 
      // if we had a backend...
      axios.post(`${process.env.VUE_APP_API_ENDPOINT}/cards`, payload)
      /* eslint-disable-next-line no-unused-vars */
        .then((res)=> {
          // update card id here
        })
        /* eslint-enable no-unreachable */
    },
  },
}