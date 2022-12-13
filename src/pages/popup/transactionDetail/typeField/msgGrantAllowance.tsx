import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles.module.scss'

export default function MsgSend(props: any) {
  return (
    <>
      <div className={styles.line}>
        <div className={styles.key}>granter</div>
        <div className={styles.val}>{props.message?.granter}</div>
      </div>
      <div className={styles.line}>
        <div className={styles.key}>grantee</div>
        <div className={styles.val}>{props.message?.grantee}</div>
      </div>
      <div className={styles.line}>
        <div className={styles.key}>allowance</div>
        <div className={styles.val}>{props.message?.allowance}</div>
      </div>
    </>
  )
}
