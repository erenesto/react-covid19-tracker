import React from 'react'
import TTable from '../TTable/TTable'
import { sortByTotalCases } from '../../utils'

const CountriesTable = ({ countries }) => {
  const sortedDataByCases = [...countries].sort(sortByTotalCases)

  const tableData = {
    rows: [...sortedDataByCases],
    columns: [
      { id: 'title', label: 'Country', minWidth: 170, link: true },
      {
        id: 'total_cases',
        label: 'Total Cases',
        minWidth: 170,
        format: (value) => value.toLocaleString(),
        color: 'rgb(47, 151, 248)',
      },
      {
        id: 'total_deaths',
        label: 'Total Deaths',
        minWidth: 170,
        format: (value) => value.toLocaleString(),
        color: 'rgb(211, 47, 47)',
      },
      {
        id: 'total_recovered',
        label: 'Total Recovered',
        minWidth: 170,
        format: (value) => value.toLocaleString(),
        color: 'rgb(0, 200, 83)',
      },
      {
        id: 'total_active_cases',
        label: 'Total Active Cases',
        minWidth: 100,
        format: (value) => value.toLocaleString(),
      },
      {
        id: 'total_new_cases_today',
        label: 'Total New Cases Today',
        minWidth: 100,
        format: (value) => value.toLocaleString(),
      },
      {
        id: 'total_new_deaths_today',
        label: 'Total New Deaths Today',
        minWidth: 100,
        format: (value) => value.toLocaleString(),
      },
      {
        id: 'total_serious_cases',
        label: 'Total Serious Cases',
        minWidth: 100,
        format: (value) => value.toLocaleString(),
      },
    ],
  }

  return (
    <section>
      <h2>General Stats of Countries</h2>
      <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
        Click the country name to see details
      </p>
      <TTable tableData={tableData} />
    </section>
  )
}

export default CountriesTable
