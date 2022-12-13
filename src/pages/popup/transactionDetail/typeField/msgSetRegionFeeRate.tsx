import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles.module.scss'

export default function MsgSend(props: any) {
  return (
    <>
      <div className={styles.line}>
        <div className={styles.key}>RegionAdmin</div>
        <div className={styles.val}>{props.message?.regionAdmin}</div>
      </div>
      <div className={styles.line}>
        <div className={styles.key}>RegionId</div>
        <div className={styles.val}>{props.message?.regionId}</div>
      </div>
      <div className={styles.line}>
        <div className={styles.key}>FeeRate</div>
        <div className={styles.val}>{props.message?.feeRate}</div>
      </div>
    </>
  )
}
