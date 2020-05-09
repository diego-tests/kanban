import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import DisplayOptions from './DisplayOptions.vue'
import {
  TOGGLE_SHOW_COLORS,
  TOGGLE_SHOW_REFS,
} from '../../../store/_mutationTypes'
import { mockMutations } from '../../../testMocks'
const localVue = createLocalVue()

localVue.use(Vuex)

describe('DisplayOptions.vue', () => {

  it('Displays 2 buttons: one for colors, one for references', () => {
    const mutations = mockMutations
    const state = {
      ui: {
        showColors: true,
        showRefs: true,

      },
    }
    const store = new Vuex.Store({ mutations, state })
    const displayOptions = shallowMount(DisplayOptions, { store, localVue })

    const color = displayOptions.find('button[data-testid="color"]')
    const references = displayOptions.find('button[data-testid="references"]')


    expect(color.exists()).toBe(true)
    expect(references.exists()).toBe(true)
  }) 
  
  it('color button dispatches toggle mutation for color', () => {
    const mutations = mockMutations
    const state = {
      ui: {
        showColors: true,
        showRefs: true,

      },
    }
    const store = new Vuex.Store({ mutations, state })
    const displayOptions = shallowMount(DisplayOptions, { store, localVue })

    const color = displayOptions.find('button[data-testid="color"]')
    
    color.trigger('click')
    
    const references = displayOptions.find('button[data-testid="references"]')
    
    references.trigger('click')

    expect(mutations[TOGGLE_SHOW_COLORS]).toHaveBeenCalled()
    expect(mutations[TOGGLE_SHOW_REFS]).toHaveBeenCalled()
    // expect(references.exists()).toBeTruthy
  }) 
  
})