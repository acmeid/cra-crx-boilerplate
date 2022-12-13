import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles.module.scss'

export default function MsgSend(props: any) {
  return (
    <>
      <div className={styles.line}>
        <div className={styles.key}>from_address</div>
        <div className={styles.val}>{props.message?.from_address}</div>
      </div>
      <div className={styles.line}>
        <div className={styles.key}>to_address</div>
        <div className={styles.val}>{props.message?.to_address}</div>
      </div>
      <div className={styles.line}>
        <div className={styles.key}>amount</div>
        <div className={styles.val}>{props.message?.amount}</div>
      </div>
      <div className={styles.line}>
        <div className={styles.key}>end_time</div>
        <div className={styles.val}>{props.message?.end_time}</div>
      </div>
      <div className={styles.line}>
        <div className={styles.key}>delayed</div>
        <div className={styles.val}>{props.message?.delayed}</div>
      </div>
    </>
  )
}
