import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles.module.scss'

export default function MsgSend(props: any) {
  return (
    <>
      <div className={styles.line}>
        <div className={styles.key}>Account</div>
        <div className={styles.val}>{props.message?.account}</div>
      </div>
      <div className={styles.line}>
        <div className={styles.key}>Denom</div>
        <div className={styles.val}>{props.message?.denom}</div>
      </div>
      <div className={styles.line}>
        <div className={styles.key}>Amount</div>
        <div className={styles.val}>{props.message?.amount}</div>
      </div>
      <div className={styles.line}>
        <div className={styles.key}>Period</div>
        <div className={styles.val}>{props.message?.period}</div>
      </div>
    </>
  )
}
