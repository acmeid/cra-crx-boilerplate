import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles.module.scss'

export default function MsgSend(props: any) {
  return (
    <>
      <div className={styles.line}>
        <div className={styles.key}>proposal_id</div>
        <div className={styles.val}>{props.message?.proposal_id}</div>
      </div>
      <div className={styles.line}>
        <div className={styles.key}>depositor</div>
        <div className={styles.val}>{props.message?.depositor}</div>
      </div>
      <div className={styles.line}>
        <div className={styles.key}>amount</div>
        <div className={styles.val}>{props.message?.amount}</div>
      </div>
    </>
  )
}
