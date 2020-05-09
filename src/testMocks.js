import { FETCH_APP_DATA } from './store/_actionTypes' 
import data from '../public/data.json'

export const mockActions = {
  [FETCH_APP_DATA]: jest.fn(),
}

export const mockInitialdata = data