/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { FormControl, NativeSelect, InputLabel, Button } from '@material-ui/core'
import { fetchAllCountries } from '../../redux/actions'

import styles from './CountrySelectors.module.css'

const CountrySelector = ({ handleOnCompare }) => {
  const [disabled, setDisabled] = useState(true)
  const dispatch = useDispatch()
  const {
    countriesData: { countryCodes },
  } = useSelector((state) => state)

  const [comparingCountryCode, setComparingCountryCode] = useState('')

  useEffect(() => {
    if (!countryCodes.length) {
      dispatch(fetchAllCountries())
    }
  }, [])

  const handleChange = (e) => {
    setComparingCountryCode(e.target.value)
    setDisabled(false)
  }

  return (
    <form>
      <div className={styles.selectorsWrapper}>
        <FormControl>
          <InputLabel id="firstCountry">Compare with</InputLabel>
          <NativeSelect
            onChange={(e) => handleChange(e)}
            id="comparisonCountry"
            labelid="comparisonCountry"
            name="comparisonCountry"
            value={comparingCountryCode}
          >
            <>
              <option aria-label="None" value="" />
              {countryCodes.map((c, i) => (
                <option key={`second-${c.code + i}`} value={c.code}>
                  {c.title}
                </option>
              ))}
            </>
          </NativeSelect>
        </FormControl>
      </div>
      <Button
        onClick={() => handleOnCompare(comparingCountryCode)}
        className={styles.compareButton}
        variant="contained"
        color="primary"
        disabled={disabled}
      >
        Compare
      </Button>
    </form>
  )
}

export default CountrySelector
