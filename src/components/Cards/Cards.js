/* eslint-disable react/no-array-index-key */
import React from 'react'
import { Grid, Card, CardContent } from '@material-ui/core'
import styles from './Cards.module.css'

const Cards = ({ results, comparison, comparisonCountryTotals }) => {
  if (comparison) {
    return (
      <Grid container spacing={2} justify="center">
        <Grid container item spacing={4} xs={6}>
          {results &&
            results.map((card, i) => (
              <Grid item xs={12} key={i + Math.random()}>
                <Card style={{ backgroundColor: `var(--${card.color})` }}>
                  <CardContent className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{card.title}</h3>
                    <p className={styles.cardNumber}>
                      {card.number ? card.number.toLocaleString() : 0}
                    </p>
                    <p className={styles.cardInfo}>{`${card.info} ${
                      card.country ? card.country : ''
                    }`}</p>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
        <Grid container item spacing={4} xs={6}>
          {comparisonCountryTotals &&
            comparisonCountryTotals.map((card, i) => (
              <Grid item xs={12} key={i + Math.random()}>
                <Card style={{ backgroundColor: `var(--${card.color})` }}>
                  <CardContent className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{card.title}</h3>
                    <p className={styles.cardNumber}>
                      {card.number ? card.number.toLocaleString() : 0}
                    </p>
                    <p className={styles.cardInfo}>{`${card.info} ${
                      card.country ? card.country : ''
                    }`}</p>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Grid>
    )
  }

  return (
    <Grid container spacing={2} justify="center">
      {results &&
        results.map((card, i) => (
          <Grid item xs={12} md={4} key={i + Math.random()}>
            <Card style={{ backgroundColor: `var(--${card.color})` }}>
              <CardContent className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardNumber}>
                  {card.number ? card.number.toLocaleString() : 0}
                </p>
                <p className={styles.cardInfo}>{`${card.info} ${
                  card.country ? card.country : ''
                }`}</p>
              </CardContent>
            </Card>
          </Grid>
        ))}
    </Grid>
  )
}

export default Cards
