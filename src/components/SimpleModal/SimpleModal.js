import React from 'react'
import { Modal } from '@material-ui/core'
import styles from './SimpleModal.module.css'

const SimpleModal = ({ openModal, handleClose, countryName, children }) => {
  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className={styles.simpleModal}>
        <h2 id="simple-modal-title">
          Select a country for compare with {countryName}
        </h2>
        {children}
      </div>
    </Modal>
  )
}

export default SimpleModal
