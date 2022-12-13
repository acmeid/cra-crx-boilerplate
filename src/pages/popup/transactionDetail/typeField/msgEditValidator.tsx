import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import dataState from '../../../store/reducers/data'
import { setDigit } from '@/utils/tools'
import styles from '../styles.module.scss'

export default function MsgSend(props: any) {
  return (
    <>
      <div className={styles.line}>
        <div className={styles.key}>description</div>
        <div className={styles.val}>{props.message?.description}</div>
      </div>
      <div className={styles.line}>
        <div className={styles.key}>validator_address</div>
        <div className={styles.val}>{props.message?.validator_address}</div>
      </div>
      <div className={styles.line}>
        <div className={styles.key}>commission_rate</div>
        <div className={styles.val}>{props.message?.commission_rate}</div>
      </div>
      <div className={styles.line}>
        <div className={styles.key}>min_self_delegation</div>
        <div className={styles.val}>{props.message?.min_self_delegation}</div>
      </div>
    </>
  )
}
