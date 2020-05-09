import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import App from './App.vue'
import AppStages from './AppStages/AppStages.vue'
import DisplayOptions from './DisplayOptions/DisplayOptions.vue'
import { mockActions, mockInitialdata } from '../../testMocks'
import { FETCH_APP_DATA } from '../../store/_actionTypes'

const localVue = createLocalVue()
let store, actions;

localVue.use(Vuex)


beforeAll(()=>{
  actions = { ...mockActions }
  store = new Vuex.Store({ actions })
})

describe('App.vue', () => {

  it('Load stages and matter cards from the server', () => {
    shallowMount(App, { store, localVue },
    )
    expect(actions[FETCH_APP_DATA]).toBeCalled()
  }) 
  
  it('Displays stages when data is available', () => {
    let appWrapper = shallowMount(App, { store, 
      localVue,
      computed: {
        stagesData: ()=> null,
      },
    })
    expect(appWrapper.contains(AppStages)).toBeFalsy()


    appWrapper = shallowMount(App, { store, 
      localVue,
      computed: {
        stagesData: ()=> mockInitialdata.stages,
      },
    })

    expect(appWrapper.contains(AppStages)).toBeTruthy()
  }) 
  
  it('Shows display options', () => {
    let appWrapper = shallowMount(App, { store, 
      localVue,
      computed: {
        stagesData: ()=> null,
      },
    })
    expect(appWrapper.contains(DisplayOptions)).toBeTruthy()

  }) 
})
