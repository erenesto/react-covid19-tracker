/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Cards from '../components/Cards/Cards'
import CountriesTable from '../components/CountriesTable/CountriesTable'

import {
  fetchAllCountries,
  fetchTotalResults,
  clearComparingCountry,
} from '../redux/actions'

const Home = () => {
  const dispatch = useDispatch()

  const {
    countriesData: { countries, country },
    totals,
  } = useSelector((state) => state)

  const fetchDatas = () => {
    dispatch(fetchTotalResults())
    dispatch(fetchAllCountries())
  }

  useEffect(() => {
    fetchDatas()
    if (country) {
      dispatch(clearComparingCountry())
    }
  }, [])

  return (
    <>
      <h1>Covid 19 Tracker</h1>
      <Cards results={totals} />
      <CountriesTable countries={countries} />
    </>
  )
}

export default Home
