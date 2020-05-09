import { shallowMount } from '@vue/test-utils'
import AppStage from './AppStage.vue'
import StageCard from './StageCard/StageCard'
import CreateCard from './CreateCard/CreateCard'
import {  mockInitialdata } from '../../../../testMocks'

describe('AppStage.vue', () => {

  it('Shows one StageCard instance per stage', () => {
    const stage = mockInitialdata.stages[0]
    const appStage = shallowMount(AppStage, {
      propsData: {
        stage,
      },
    })

    const card = appStage.findAll(StageCard)

    expect(card.length).toBe(stage.cards.length)
  }) 
  
  it('Displays a `Create card` component', () => {
    const stage = mockInitialdata.stages[0]
    const appStage = shallowMount(AppStage, {
      propsData: {
        stage,
      },
    })

    const card = appStage.find(CreateCard)

    expect(card.exists()).toBe(true)
  }) 
  
})