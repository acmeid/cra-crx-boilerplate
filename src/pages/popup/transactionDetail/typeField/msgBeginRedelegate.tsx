import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import dataState from '../../../store/reducers/data'
import { setDigit } from '@/utils/tools'
import styles from '../styles.module.scss'

export default function MsgSend(props: any) {
  return (
    <>
      <div className={styles.line}>
        <div className={styles.key}>delegator_address</div>
        <div className={styles.val}>{props.message?.delegator_address}</div>
      </div>
      <div className={styles.line}>
        <div className={styles.key}>validator_src_address</div>
        <div className={styles.val}>{props.message?.validator_src_address}</div>
      </div>
      <div className={styles.line}>
        <div className={styles.key}>validator_dst_address</div>
        <div className={styles.val}>{props.message?.validator_dst_address}</div>
      </div>
      <div className={styles.line}>
        <div className={styles.key}>amount</div>
        <div className={styles.val}>{props.message?.amount}</div>
      </div>
    </>
  )
}
