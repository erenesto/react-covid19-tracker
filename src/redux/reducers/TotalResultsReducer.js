import { FETCH_TOTALS } from '../actions/types'

const initialState = [
  {
    title: 'Total Cases',
    number: 0,
    color: 'total-color',
    info: 'Total COVID19 cases',
  },
  {
    title: 'Total Recovered',
    number: 0,
    color: 'recovered-color',
    info: 'Total recovered COVID19 cases',
  },
  {
    title: 'Total Deaths',
    number: 0,
    color: 'death-color',
    info: 'Total death COVID19 cases',
  },
]

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TOTALS:
      return [
        {
          ...state[0],
          number: action.payload.total_cases,
        },
        {
          ...state[1],
          number: action.payload.total_recovered,
        },
        {
          ...state[2],
          number: action.payload.total_deaths,
        },
      ]
    default:
      return state
  }
}
