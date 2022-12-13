import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles.module.scss'

export default function MsgMultiSend(props: any) {
  return (
    <>
      <div className={styles.line}>
        <div className={styles.key}>From Address</div>
        <div className={styles.val}>
          <Link to={{ pathname: '/validatorDetail', search: `?a=1` }}>
            <span className={styles.highlight}>{props.message?.from_address}</span>
          </Link>
        </div>
      </div>
      <div className={styles.line}>
        <div className={styles.key}>To Address</div>
        <div className={styles.val}>
          <Link to={{ pathname: '/validatorDetail', search: `?a=1` }}>
            <span className={styles.highlight}>{props.message?.to_address}</span>
          </Link>
        </div>
      </div>
    </>
  )
}
