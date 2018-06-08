import React from 'react'
import styles from '../home.css'

export default function LockBtn(props) {
  return (
    <div className={styles.center_btn}>
      <div className={styles.btn_wrap}>
        <img src={require('../../../assets/imgs/home/lock.png')} alt=""/>
        <span>门锁</span>
      </div>
    </div>
  )
}