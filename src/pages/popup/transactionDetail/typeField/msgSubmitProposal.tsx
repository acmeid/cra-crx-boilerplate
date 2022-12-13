import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles.module.scss'

export default function MsgSend(props: any) {
  return (
    <>
      <div className={styles.line}>
        <div className={styles.key}>content</div>
        <div className={styles.val}>{props.message?.content}</div>
      </div>
      <div className={styles.line}>
        <div className={styles.key}>initial_deposit</div>
        <div className={styles.val}>{props.message?.initial_deposit}</div>
      </div>
      <div className={styles.line}>
        <div className={styles.key}>proposer</div>
        <div className={styles.val}>{props.message?.proposer}</div>
      </div>
    </>
  )
}
