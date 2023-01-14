import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles.module.scss'

export default function MsgSend(props: any) {
  return (
    <>
      <div className={styles.line}>
        <div className={styles.key}>Creator</div>
        <div className={styles.val}>{props.message?.creator}</div>
      </div>
      <div className={styles.line}>
        <div className={styles.key}>Delegator Address</div>
        <div className={styles.val}>{props.message?.delegatorAddress}</div>
      </div>
      <div className={styles.line}>
        <div className={styles.key}>Amount</div>
        <div className={styles.val}>{typeof props.message?.amount === 'string' ? props.message?.amount : props.message?.amount?.amount}</div>
      </div>
    </>
  )
}
