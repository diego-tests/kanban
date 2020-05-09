import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import flushPromises from 'flush-promises'
import CreateCard from './CreateCard.vue'
import { mockActions  } from '../../../../../testMocks'
import { CREATE_CARD } from '../../../../../store/_actionTypes'


const localVue = createLocalVue()
let store, actions, propsData;

localVue.use(Vuex)


beforeAll(()=>{
  actions = { ...mockActions }
  store = new Vuex.Store({ actions })
  propsData= {stageId: 'unique id'}
})


describe('CreateCard.vue', () => {

  it('dispatches Card creation action when clicking create button', async () => {
    const createCard = mount(CreateCard, {
      store, localVue, propsData,
      data() {
        return {
          isCreating: true,
        }
      },
    })
    createCard.find('input[data-testid="title"]').setValue('title')
    createCard.find('input[data-testid="reference"]').setValue(1)

    const form = createCard.find('form[data-testid="create"]')
    
    form.trigger('submit')
    await flushPromises()
    expect(actions[CREATE_CARD]).toBeCalled()

  }) 
  
  
})