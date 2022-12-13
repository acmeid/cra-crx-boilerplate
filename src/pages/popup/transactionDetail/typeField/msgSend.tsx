import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import dataState from '../../../store/reducers/data'
import { cutText, setDigit } from '@/utils/tools'
import styles from '../styles.module.scss'

export default function MsgSend(props: any) {
  return (
    <>
      <div className={styles.line}>
        <div className={styles.key}>From Address</div>
        <div className={styles.val}>
          {/* <Link to={{ pathname: '/account', search: `?address=${props.message?.from_address}` }}> */}
          <span className={styles.highlight}>{cutText(props.message?.from_address)}</span>
          {/* </Link> */}
        </div>
      </div>
      <div className={styles.line}>
        <div className={styles.key}>To Address</div>
        <div className={styles.val}>
          {/* <Link to={{ pathname: '/account', search: `?address=${props.message?.to_address}` }}> */}
          <span className={styles.highlight}>{cutText(props.message?.to_address)}</span>
          {/* </Link> */}
        </div>
      </div>
      <div className={styles.line}>
        <div className={styles.key}>Amount</div>
        <div className={styles.val}>
          {setDigit(props.message?.['amount']?.[0]?.['amount'] || '0', 6)}
          <span className={styles.highlight}> SRC</span>
        </div>
      </div>
    </>
  )
}
