import React from 'react'
import styles from './ChartWrapper.module.css'

const ChartWrapper = ({ children, title, subtitle }) => {
  return (
    <section>
      <div className={styles.title}>
        <h2>{title}</h2>
        {subtitle && <h2>{subtitle}</h2>}
      </div>
      <div className={styles.chartWrapper}>{children}</div>
    </section>
  )
}

export default ChartWrapper
