import { combineReducers } from 'redux'
import TotalResultsReducer from './TotalResultsReducer'
import CountriesReducer from './CountriesReducer'

export default combineReducers({
  totals: TotalResultsReducer,
  countriesData: CountriesReducer,
})
