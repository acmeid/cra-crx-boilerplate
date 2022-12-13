import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles.module.scss'

export default function MsgSend(props: any) {
  return (
    <>
      <div className={styles.line}>
        <div className={styles.key}>sender</div>
        <div className={styles.val}>{props.message?.sender}</div>
      </div>
      <div className={styles.line}>
        <div className={styles.key}>invariant_module_name</div>
        <div className={styles.val}>{props.message?.invariant_module_name}</div>
      </div>
      <div className={styles.line}>
        <div className={styles.key}>invariant_route</div>
        <div className={styles.val}>{props.message?.invariant_route}</div>
      </div>
    </>
  )
}
