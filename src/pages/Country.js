/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchCountryTimeline,
  fetchCountryTotals,
  clearComparingCountry,
} from '../redux/actions'
import Cards from '../components/Cards/Cards'
import ChartWrapper from '../components/ChartWrapper/ChartWrapper'
import BarChart from '../components/BarChart/BarChart'
import { dateFormat } from '../utils'
import LineChart from '../components/LineChart/LineChart'
import styles from './Country.module.css'
import SimpleModal from '../components/SimpleModal/SimpleModal'
import CountrySelectors from '../components/CountrySelectors/CountrySelectors'

const Country = ({ match }) => {
  const { code } = match.params

  const [openModal, setOpenModal] = useState(false)

  const [comparison, setComparison] = useState(false)

  const dispatch = useDispatch()
  const {
    countriesData: { countries, country, comparisonCountry, compare },
  } = useSelector((state) => state)

  const {
    totals,
    sixtyDayTimeline,
    info,
    sevenDaysMAvg,
    threeDaysMAvgMortalityRate,
  } = country

  useEffect(() => {}, [totals, info])

  useEffect(() => {
    dispatch(fetchCountryTimeline(code))
  }, [])

  useEffect(() => {
    if (!countries.length) {
      dispatch(fetchCountryTotals(code, countries))
    } else {
      dispatch(fetchCountryTotals(code, countries))
    }
  }, [])

  useEffect(() => {
    setComparison(compare)
  }, [compare])

  useEffect(() => {}, [])

  const handleOnCompare = (countryCode) => {
    dispatch(fetchCountryTotals(countryCode, countries, true))
    dispatch(fetchCountryTimeline(countryCode, true))
    setOpenModal(false)
  }

  const sixtyDaysData = {
    labels: sixtyDayTimeline.map((day) => dateFormat(day.date)),
    datasets: [
      {
        label: 'Total Deaths',
        backgroundColor: 'rgba(211, 49, 49,1)',
        borderColor: 'rgba(211, 49, 49,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(211, 49, 49,0.4)',
        hoverBorderColor: 'rgba(211, 49, 49,1)',
        data: sixtyDayTimeline.map((day) => day.total_deaths),
      },
      {
        label: 'Total Cases',
        backgroundColor: 'rgba(48, 151, 248,1)',
        borderColor: 'rgba(48, 151, 248,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(48, 151, 248,0.4)',
        hoverBorderColor: 'rgba(48, 151, 248,1)',
        data: sixtyDayTimeline.map((day) => day.total_cases),
      },
    ],
  }

  const sixtyDaysDataComparingCountry = {
    labels: comparisonCountry.sixtyDayTimeline.map((day) => dateFormat(day.date)),
    datasets: [
      {
        label: 'Total Deaths',
        backgroundColor: 'rgba(211, 49, 49,1)',
        borderColor: 'rgba(211, 49, 49,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(211, 49, 49,0.4)',
        hoverBorderColor: 'rgba(211, 49, 49,1)',
        data: comparisonCountry.sixtyDayTimeline.map((day) => day.total_deaths),
      },
      {
        label: 'Total Cases',
        backgroundColor: 'rgba(48, 151, 248,1)',
        borderColor: 'rgba(48, 151, 248,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(48, 151, 248,0.4)',
        hoverBorderColor: 'rgba(48, 151, 248,1)',
        data: comparisonCountry.sixtyDayTimeline.map((day) => day.total_cases),
      },
    ],
  }

  const sevenDaysMAvgData = () => {
    if (comparison) {
      return {
        labels: sixtyDayTimeline.map((day) => dateFormat(day.date)),
        datasets: [
          {
            data: comparisonCountry.sevenDaysMAvg,
            label: `${comparisonCountry.info.title} Daily Cases`,
            borderColor: 'rgba(240, 200, 0, 1)',
            backgroundColor: 'rgba(240, 200, 0, .0)',
          },
          {
            data: sevenDaysMAvg,
            label: `${info.title} Daily Cases`,
            borderColor: 'rgba(240, 100, 0, 1)',
            backgroundColor: 'rgba(240, 100, 0, .0)',
          },
        ],
      }
    }

    return {
      labels: sixtyDayTimeline.map((day) => dateFormat(day.date)),
      datasets: [
        {
          data: sevenDaysMAvg,
          label: 'Daily Cases',
          borderColor: 'rgba(240, 100, 0, 1)',
          backgroundColor: 'rgba(240, 100, 0, .0)',
        },
      ],
    }
  }

  const threeDaysMortalityMAvgData = () => {
    if (compare) {
      return {
        labels: sixtyDayTimeline.map((day) => dateFormat(day.date)),
        datasets: [
          {
            data: comparisonCountry.threeDaysMAvgMortalityRate,
            label: `${comparisonCountry.info.title} Mortality Rate (%)`,
            borderColor: 'rgba(80, 10, 179, 1)',
            backgroundColor: 'rgba(80, 10, 179, .4)',
          },
          {
            data: threeDaysMAvgMortalityRate,
            label: `${info.title} Mortality Rate (%)`,
            borderColor: 'rgba(280, 10, 179, 1)',
            backgroundColor: 'rgba(280, 10, 179, .4)',
          },
        ],
      }
    }
    return {
      labels: sixtyDayTimeline.map((day) => dateFormat(day.date)),
      datasets: [
        {
          data: threeDaysMAvgMortalityRate,
          label: 'Mortality Rate (%)',
          borderColor: 'rgba(280, 10, 179, 1)',
          backgroundColor: 'rgba(280, 10, 179, .4)',
        },
      ],
    }
  }

  const handleOpen = () => {
    setOpenModal(true)
  }

  const handleClose = () => {
    setOpenModal(false)
  }

  return (
    <>
      <Link
        className={styles.backBtn}
        to="/"
        onClick={() => dispatch(clearComparingCountry())}
      >
        Back to home
      </Link>
      <h1>Country Results</h1>
      {!comparison && (
        <div className={styles.buttonWrapper}>
          <Button variant="outlined" color="primary" onClick={handleOpen}>
            Compare with Other Country
          </Button>
        </div>
      )}
      <SimpleModal
        handleClose={handleClose}
        openModal={openModal}
        countryName={country.info.title}
      >
        <CountrySelectors handleOnCompare={handleOnCompare} />
      </SimpleModal>

      <Cards
        results={totals}
        comparison={comparison}
        comparisonCountryTotals={comparisonCountry.totals}
      />
      <ChartWrapper title="60 Days General Info" subtitle={info.title}>
        <BarChart chartData={sixtyDaysData} />
      </ChartWrapper>
      {comparison && (
        <ChartWrapper
          title="60 Days General Info"
          subtitle={comparisonCountry.info.title}
        >
          <BarChart chartData={sixtyDaysDataComparingCountry} />
        </ChartWrapper>
      )}

      {!comparison ? (
        <ChartWrapper
          title="7 Days Moving Average of Daily Cases"
          subtitle={info.title}
        >
          <LineChart chartData={sevenDaysMAvgData()} />
        </ChartWrapper>
      ) : (
        <ChartWrapper
          title="7 Days Moving Average of Daily Cases"
          subtitle={`${info.title} & ${comparisonCountry.info.title}`}
        >
          <LineChart chartData={sevenDaysMAvgData()} />
        </ChartWrapper>
      )}
      {!comparison ? (
        <ChartWrapper
          title="3 Days Moving Average of Mortality Rate"
          subtitle={info.title}
        >
          <LineChart chartData={threeDaysMortalityMAvgData()} />
        </ChartWrapper>
      ) : (
        <ChartWrapper
          title="3 Days Moving Average of Mortality Rate"
          subtitle={`${info.title} & ${comparisonCountry.info.title}`}
        >
          <LineChart chartData={threeDaysMortalityMAvgData()} />
        </ChartWrapper>
      )}
    </>
  )
}

export default Country
