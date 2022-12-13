import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles.module.scss'

export default function MsgSend(props: any) {
  return (
    <>
      <div className={styles.line}>
        <div className={styles.key}>creator</div>
        <div className={styles.val}>{props.message?.creator}</div>
      </div>
      <div className={styles.line}>
        <div className={styles.key}>Val Address</div>
        <div className={styles.val}>{props.message?.valAddress}</div>
      </div>
      <div className={styles.line}>
        <div className={styles.key}>Val Pubkey</div>
        <div className={styles.val}>{props.message?.valPubkey}</div>
      </div>
      <div className={styles.line}>
        <div className={styles.key}>description</div>
        <div className={styles.val}>{props.message?.description}</div>
      </div>
    </>
  )
}
