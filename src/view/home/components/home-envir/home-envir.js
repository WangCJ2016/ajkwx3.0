import React from 'react'

import styles from '../../home.css'

export default function HomeEnvir(props) {
  return (
    <div className={styles.home_envir_play}>
          <p>温度：{props.temp}</p>
          <p>湿度：{props.hum}</p>
          <p>PM：{props.pm}</p>
      </div>
  )
}