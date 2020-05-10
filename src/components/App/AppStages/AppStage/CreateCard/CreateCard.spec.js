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

  it('dispatches Card creation action and hides the creation interface when clicking create button', async () => {
    const createCard = mount(CreateCard, {
      store, localVue, propsData,
    })
    
    createCard.find('button[data-testid="create"]').trigger('click')
    await localVue.nextTick()
    createCard.find('input[data-testid="title"]').setValue('title')
    createCard.find('input[data-testid="reference"]').setValue(1)

    let form = createCard.find('form[data-testid="create"]')
    
    form.trigger('submit')
    await flushPromises()
    
    expect(actions[CREATE_CARD]).toBeCalled()

    form = createCard.find('form[data-testid="create"]')

    expect(form.exists()).toBeFalsy()

  }) 
  
  
  
})