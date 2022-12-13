import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles.module.scss'

export default function MsgSubmitEvidence(props: any) {
  return (
    <>
      <div className={styles.line}>
        <div className={styles.key}>Submitter</div>
        <div className={styles.val}>{props.message?.submitter}</div>
      </div>
      <div className={styles.line}>
        <div className={styles.key}>Submitter</div>
        <div className={styles.val}>{props.message?.submitter}</div>
      </div>
    </>
  )
}
