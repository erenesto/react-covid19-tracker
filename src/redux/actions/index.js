/* eslint-disable no-underscore-dangle */
import _ from 'lodash'
import api from '../../api'
import {
  FETCH_TOTALS,
  FETCH_ALL_COUNTRIES,
  FETCH_COUNTRY_TIMELINE,
  FETCH_COUNTRY_TOTALS,
  CLEAR_COMPARE_COUNTRY,
} from './types'

import { lastSixty, movingAverage, cleanServerResponseError } from '../../utils'

const _fetchTotalResults = _.memoize(async (dispatch) => {
  const response = await api.get('/free-api', {
    params: {
      global: 'stats',
    },
  })

  const cleanResponse = cleanServerResponseError(response.data)

  dispatch({
    type: FETCH_TOTALS,
    payload: cleanResponse.results[0],
  })
})
export const fetchTotalResults = () => (dispatch) => _fetchTotalResults(dispatch)

const _fetchAllCountries = _.memoize(async (dispatch) => {
  const response = await api.get('/free-api', {
    params: {
      countryTotals: 'ALL',
    },
  })

  const cleanResponse = cleanServerResponseError(response.data)

  dispatch({
    type: FETCH_ALL_COUNTRIES,
    payload: cleanResponse.countryitems[0],
  })
})
export const fetchAllCountries = () => (dispatch) => _fetchAllCountries(dispatch)

export const fetchCountryTimeline = (code, forCompare) => async (dispatch) => {
  const response = await api.get('/free-api', {
    params: {
      countryTimeline: code,
    },
  })
  const cleanResponse = cleanServerResponseError(response.data)

  const timeline = cleanResponse.timelineitems[0]

  const withDate = Object.keys(timeline)
    .filter((item) => item !== 'stat')
    .map((c) => {
      return { ...timeline[c], date: c }
    })

  const lastSixtyDays = lastSixty(withDate)
  const cases = lastSixtyDays.map((d) => d.new_daily_cases)
  const deathsAvg = lastSixtyDays.map((d) => d.total_deaths / d.total_cases)

  const sevenDaysMAvg = movingAverage(7, cases)
  const threeDaysMAvgMortalityRate = movingAverage(3, deathsAvg)

  dispatch({
    type: FETCH_COUNTRY_TIMELINE,
    payload: {
      lastSixtyDays,
      sevenDaysMAvg,
      threeDaysMAvgMortalityRate,
      forCompare,
      info: cleanResponse.countrytimelinedata[0].info,
    },
  })
}

export const fetchCountryTotals = (code, countries, forCompare) => async (
  dispatch,
) => {
  if (countries.length === 0) {
    const response = await api.get('/free-api', {
      params: {
        countryTotal: code,
      },
    })

    const cleanResponse = cleanServerResponseError(response.data)

    dispatch({
      type: FETCH_COUNTRY_TOTALS,
      payload: {
        country: cleanResponse.countrydata[0],
        forCompare,
      },
    })
  } else {
    const country = countries.find((c) => c.code === code)
    const countryWithTitle = { ...country, info: { title: country.title } }

    dispatch({
      type: FETCH_COUNTRY_TOTALS,
      payload: {
        country: countryWithTitle,
        forCompare,
      },
    })
  }
}

export const clearComparingCountry = () => {
  return {
    type: CLEAR_COMPARE_COUNTRY,
  }
}
