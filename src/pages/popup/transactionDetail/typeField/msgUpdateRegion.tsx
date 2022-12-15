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
        <div className={styles.key}>Region Key</div>
        <div className={styles.val}>{props.message?.regionKey}</div>
      </div>
      <div className={styles.line}>
        <div className={styles.key}>Region Name</div>
        <div className={styles.val}>{props.message?.regionName}</div>
      </div>
      <div className={styles.line}>
        <div className={styles.key}>Commission Power Limit</div>
        <div className={styles.val}>{props.message?.commissionPowerLimit}</div>
      </div>
      <div className={styles.line}>
        <div className={styles.key}>Delegators Limit</div>
        <div className={styles.val}>{props.message?.delegatorsLimit}</div>
      </div>
    </>
  )
}