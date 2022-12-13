import { cutText } from '@/utils/tools'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles.module.scss'

export default function MsgSend(props: any) {
  return (
    <>
      <div className={styles.line}>
        <div className={styles.key}>Creator</div>
        <div className={styles.val}>{cutText(props.message?.creator)}</div>
      </div>
      <div className={styles.line}>
        <div className={styles.key}>Account</div>
        <div className={styles.val}>{cutText(props.message?.creator)}</div>
      </div>
      <div className={styles.line}>
        <div className={styles.key}>RegionId</div>
        <div className={styles.val}>{props.message?.regionId}</div>
      </div>
      <div className={styles.line}>
        <div className={styles.key}>Role</div>
        <div className={styles.val}>{props.message?.role}</div>
      </div>
    </>
  )
}
