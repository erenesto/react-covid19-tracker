import {
  FETCH_ALL_COUNTRIES,
  FETCH_COUNTRY_TIMELINE,
  FETCH_COUNTRY_TOTALS,
  CLEAR_COMPARE_COUNTRY,
} from '../actions/types'

const cardTotals = [
  {
    title: 'Total Cases',
    number: 0,
    color: 'total-color',
    info: 'Total COVID19 cases',
    country: '',
  },
  {
    title: 'Total Recovered',
    number: 0,
    color: 'recovered-color',
    info: 'Total recovered COVID19 cases',
    country: '',
  },
  {
    title: 'Total Deaths',
    number: 0,
    color: 'death-color',
    info: 'Total death COVID19 cases',
    country: '',
  },
]

const initialState = {
  countries: [],
  countryCodes: [],
  country: {
    info: {},
    totals: cardTotals,
    sixtyDayTimeline: [],
    sevenDaysMAvg: [],
    threeDaysMAvgMortalityRate: [],
  },
  comparisonCountry: {
    info: {},
    totals: cardTotals,
    sixtyDayTimeline: [],
    sevenDaysMAvg: [],
    threeDaysMAvgMortalityRate: [],
  },
  compare: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_COUNTRIES: {
      const countries = Object.values(action.payload)

      const countryCodes = countries.map((country) => {
        return {
          code: country.code,
          title: country.title,
        }
      })

      return { ...state, countries, countryCodes }
    }

    case FETCH_COUNTRY_TIMELINE: {
      const {
        forCompare,
        lastSixtyDays,
        sevenDaysMAvg,
        threeDaysMAvgMortalityRate,
        info,
      } = action.payload

      if (forCompare) {
        return {
          ...state,
          comparisonCountry: {
            ...state.comparisonCountry,
            sixtyDayTimeline: [...lastSixtyDays],
            sevenDaysMAvg,
            threeDaysMAvgMortalityRate,
            info,
          },
        }
      }
      if (!forCompare) {
        return {
          ...state,
          country: {
            ...state.country,
            sixtyDayTimeline: [...lastSixtyDays],
            sevenDaysMAvg,
            threeDaysMAvgMortalityRate,
            info,
          },
        }
      }
      return state
    }
    case FETCH_COUNTRY_TOTALS:
      {
        const { country, forCompare } = action.payload

        if (forCompare) {
          return {
            ...state,
            comparisonCountry: {
              ...state.comparisonCountry,
              totals: [
                {
                  ...state.comparisonCountry.totals[0],
                  number: country.total_cases,
                  info: `Total COVID19 cases for ${country.info.title || ''}`,
                },
                {
                  ...state.comparisonCountry.totals[1],
                  number: country.total_recovered,
                  info: `Total COVID19 recovered for ${country.info.title || ''}`,
                },
                {
                  ...state.comparisonCountry.totals[2],
                  number: country.total_deaths,
                  info: `Total COVID19 death for ${country.info.title || ''}`,
                },
              ],
            },
            compare: forCompare,
          }
        }
        if (!forCompare) {
          return {
            ...state,
            country: {
              ...state.country,
              totals: [
                {
                  ...state.country.totals[0],
                  number: country.total_cases,
                  info: `Total COVID19 cases for ${country.info.title || ''}`,
                },
                {
                  ...state.country.totals[1],
                  number: country.total_recovered,
                  info: `Total COVID19 recovered for ${country.info.title || ''}`,
                },
                {
                  ...state.country.totals[2],
                  number: country.total_deaths,
                  info: `Total COVID19 death for ${country.info.title || ''}`,
                },
              ],
            },
          }
        }
      }
      return state
    case CLEAR_COMPARE_COUNTRY:
      return {
        ...state,
        country: initialState.country,
        comparisonCountry: initialState.comparisonCountry,
        compare: false,
      }

    default:
      return state
  }
}
