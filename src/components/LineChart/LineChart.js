import React from 'react'
import { Line } from 'react-chartjs-2'

const LineChart = ({ chartData, opt }) => {
  return chartData && <Line data={chartData} options={opt} />
}

export default LineChart
