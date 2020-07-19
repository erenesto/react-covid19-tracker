/* eslint-disable no-shadow */
/* eslint-disable no-plusplus */

export const dateFormat = (dateToFormat) => {
  const date = new Date(dateToFormat)
  const dateTimeFormat = new Intl.DateTimeFormat('en', {
    year: '2-digit',
    month: 'short',
    day: '2-digit',
  })
  const [
    { value: month },
    ,
    { value: day },
    ,
    { value: year },
  ] = dateTimeFormat.formatToParts(date)

  return `${day}/${month}/${year}`
}

export const sortByTotalCases = (a, b) => {
  if (a.total_cases > b.total_cases) {
    return -1
  }
  if (a.total_cases < b.total_cases) {
    return 1
  }
  return 0
}

export const lastSixty = (arr) => {
  const days = 60
  const sixtyDays = arr.slice(-days)
  return sixtyDays
}

export const movingAverage = (range, arr) => {
  if (!Array.isArray(arr)) {
    throw TypeError('expected first argument to be an array')
  }

  const sum = (arr) => {
    let len = arr.length
    let num = 0

    while (len--) {
      num += Number(arr[len])
    }
    return num
  }

  const avg = (arr, idx, range) => sum(arr.slice(idx - range, idx)) / range

  const toFixed = (n) => n.toFixed(2)

  const fn = toFixed
  const num = range || arr.length
  const res = Array(num - 1).fill(0)
  const len = arr.length + 1

  let idx = num - 1
  while (++idx < len) {
    res.push(+fn(avg(arr, idx, num)))
  }
  return res
}

export const cleanServerResponseError = (res) => {
  if (typeof res === 'string') {
    return JSON.parse(res.substring(res.indexOf('{')))
  }

  return res
}
