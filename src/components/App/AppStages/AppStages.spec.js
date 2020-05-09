import { shallowMount } from '@vue/test-utils'
import AppStages from './AppStages.vue'
import AppStage from './AppStage/AppStage'
import {  mockInitialdata } from '../../../testMocks'

describe('AppStages.vue', () => {

  it('Loads one AppStage instance per stage', () => {
    const appStages = shallowMount(AppStages, {
      propsData: {
        stages: mockInitialdata.stages,
      },
    })

    const appStage = appStages.findAll(AppStage)

    expect(appStage.length).toBe(mockInitialdata.stages.length)
  }) 
  
})