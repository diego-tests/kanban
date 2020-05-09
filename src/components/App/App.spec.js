import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import App from './App.vue'
import AppStages from './AppStages/AppStages.vue'
import { mockActions } from '../../testMocks'
import {FETCH_APP_DATA} from '../../store/actionTypes'

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
  
  it('Displays stages', () => {
    const appWrapper = shallowMount(App, { store, localVue })
    expect(appWrapper.contains(AppStages)).toBeTruthy()
  }) 
})
