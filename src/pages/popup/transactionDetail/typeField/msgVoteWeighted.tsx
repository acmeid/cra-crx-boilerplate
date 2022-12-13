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
        <div className={styles.key}>voter</div>
        <div className={styles.val}>{props.message?.voter}</div>
      </div>
      <div className={styles.line}>
        <div className={styles.key}>options</div>
        <div className={styles.val}>{props.message?.options}</div>
      </div>
    </>
  )
}
