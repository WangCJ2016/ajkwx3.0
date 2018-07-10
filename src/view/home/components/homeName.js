import React from 'react'
import styles from '../home.css'

function HomeName(props) {
  return (
    <div className={styles.home_name}>
      <h2 className={styles.home_title}>{props.name}<span style={{fontWeight: 200,marginLeft: '5px'}}>房间</span></h2>
      <p className={styles.home_title_welcome}>WELCOME!</p>
    </div>
  )
}

export default HomeName