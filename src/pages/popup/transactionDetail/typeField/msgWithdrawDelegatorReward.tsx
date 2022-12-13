import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles.module.scss'

export default function MsgSend(props: any) {
  return (
    <>
      <div className={styles.line}>
        <div className={styles.key}>delegator_address</div>
        <div className={styles.val}>{props.message?.delegator_address}</div>
      </div>
      <div className={styles.line}>
        <div className={styles.key}>validator_address</div>
        <div className={styles.val}>{props.message?.validator_address}</div>
      </div>
    </>
  )
}
