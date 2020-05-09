import axios from 'axios'
import { 
  FETCH_APP_DATA,
  CHANGE_STAGE_CARDS_ORDER,
  CREATE_CARD, 
  ADD_NEW_CARD,
} from './_actionTypes'
import { 
  SET_INITIAL_DATA,
  SET_LAST_FRONT_UPDATE,
  SET_STAGE_CARDS_ORDER,
} from './_mutationTypes'
  
export default  {
  state: ()=>({
    stagesData: null,
    lastFrontUpdate: new Date(),
  }),
  mutations: {
    [SET_INITIAL_DATA](state, data) {
      state.stagesData = data
    },
    [SET_LAST_FRONT_UPDATE](state, date) {
      state.lastFrontUpdate = date
    },
    [SET_STAGE_CARDS_ORDER](state, { stageId, cards }) {
      const updatedStageIndex = state.stagesData.findIndex((item=> item.id === stageId))
    
      if (updatedStageIndex === -1) {
        return console.error('Stage not found')
      }
    
      const updatedStagesData = [...state.stagesData]
    
      updatedStagesData[updatedStageIndex].cards = cards.map((card, idx)=> ({ ...card, order: idx }))
    
      state.stagesData = updatedStagesData
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
    async [CHANGE_STAGE_CARDS_ORDER]({ commit, state }, { stageId, cards }) {
      commit(SET_STAGE_CARDS_ORDER, { stageId, cards })
      const timeStamp = new Date().getTime
      commit(SET_LAST_FRONT_UPDATE, timeStamp)
    
      return
      //if we had a backend...
      /* eslint-disable no-unreachable */
      axios.put(`${process.env.VUE_APP_API_ENDPOINT}/cards/:id`, { stageId, order: cards })
        .then(res=> {
          if (timeStamp !== state.lastFrontUpdate) {
            //another update has been made meanwhile, we wil let that one handle the store update
            return
          }
          //here we asume the backend sends a new stages array
          commit(SET_INITIAL_DATA, res?.data?.stages)
        })
        .catch(err=> console.error(err))
      /* eslint-enable no-unreachable */
    },
    [CREATE_CARD]({ dispatch }, { stageId, card }) {
      console.log(stageId)
      console.log(card)
      const newCard = { ...card, id: `TEMP_ID${new Date().getTime()}` }
      dispatch(ADD_NEW_CARD, { stageId, newCard })
    },
    [ADD_NEW_CARD]({ dispatch, state }, { stageId, newCard }) {
      const updatedStageIndex = state.stagesData.findIndex((item=> item.id === stageId))
    
      if (updatedStageIndex === -1) {
        return console.error('Stage not found')
      }
      
      const updatedCards = [newCard, ...state.stagesData[updatedStageIndex].cards]

      dispatch(CHANGE_STAGE_CARDS_ORDER, { stageId, cards: updatedCards })
    },
  },
}