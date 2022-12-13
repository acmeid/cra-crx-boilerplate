import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles.module.scss'

export default function MsgSend(props: any) {
  return (
    <>
      <div className={styles.line}>
        <div className={styles.key}>Account</div>
        <div className={styles.val}>{props.message?.account}</div>
      </div>
      <div className={styles.line}>
        <div className={styles.key}>AgAmount</div>
        <div className={styles.val}>{props.message?.agAmount}</div>
      </div>
      {/* <div className={styles.line}>
        <div className={styles.key}>RegionId</div>
        <div className={styles.val}>{props.message?.regionId}</div>
      </div>
      <div className={styles.line}>
        <div className={styles.key}>Role</div>
        <div className={styles.val}>{props.message?.role}</div>
      </div> */}
    </>
  )
}
