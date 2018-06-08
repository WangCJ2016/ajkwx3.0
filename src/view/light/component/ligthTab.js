import React from 'react'
import styles from '../light.css'
 
export default function LightTab(props) {
  const arr = ['卧室','走廊','卫生间','其他']
  return (
    <ul className={styles.tabs}>
      {
        arr.map((type,index) => {
          return <li 
            key={type} 
            onClick={()=>props.middelRoundClick(type)}
            className={ props.type === type?styles.type_active:''}>{type}</li>
        })
      }
    </ul>
  )
}