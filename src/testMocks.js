import { FETCH_APP_DATA, CREATE_CARD } from './store/_actionTypes' 
import { TOGGLE_SHOW_COLORS, TOGGLE_SHOW_REFS } from './store/_mutationTypes' 
import data from '../public/data.json'

export const mockActions = {
  [FETCH_APP_DATA]: jest.fn(),
  [CREATE_CARD]: jest.fn(),
}

export const mockMutations = {
  [TOGGLE_SHOW_REFS]: jest.fn(),
  [TOGGLE_SHOW_COLORS]: jest.fn(),
}

export const mockInitialdata = data