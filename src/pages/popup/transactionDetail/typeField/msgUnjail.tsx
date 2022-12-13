import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles.module.scss'

export default function MsgUnjail(props: any) {
  return (
    <>
      <div className={styles.line}>
        <div className={styles.key}>validator_addr</div>
        <div className={styles.val}>{props.message?.validator_addr}</div>
      </div>
    </>
  )
}
