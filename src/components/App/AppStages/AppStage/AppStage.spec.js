import { shallowMount } from '@vue/test-utils'
import AppStage from './AppStage.vue'
import StageCard from './StageCard/StageCard'
import {  mockInitialdata } from '../../../../testMocks'

describe('AppStage.vue', () => {

  it('Loads one StageCard instance per stage', () => {
    const stage = mockInitialdata.stages[0]
    const appStage = shallowMount(AppStage, {
      propsData: {
        stage,
      },
    })

    const card = appStage.findAll(StageCard)

    expect(card.length).toBe(stage.cards.length)
  }) 
  
})