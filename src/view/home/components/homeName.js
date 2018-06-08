import React from 'react'
import styles from '../home.css'

function HomeName(props) {
  return (
    <div className={styles.home_name}>
      <h2 className={styles.home_title}><strong>501</strong>房间</h2>
      <p className={styles.home_title_welcome}>WELCOME!</p>
    </div>
  )
}

export default HomeName