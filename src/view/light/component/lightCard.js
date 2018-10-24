import React from 'react'
import styles from '../light.css'
import { Switch } from 'antd-mobile'
import classNames from 'classnames'
import { hashHistory } from "react-router"
import CSSModules from 'react-css-modules'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../../actions/light-actions'


@connect(
  state => ({lightStore:state.toObject().lightStore,idStore:state.toObject().idStore}),
  dispatch => ({
    lightActions: bindActionCreators(actions, dispatch),
  })
)
@CSSModules(styles, { allowMultiple: true })
class LightCard extends React.Component {
  lightRender=() => {
    if(this.props.lights.length === 0) {
      return <div styleName="blank_wrap">
         <img styleName='blank_img' src={require('../../../assets/imgs/light/nolight.png')} alt=""/>
      <span>无此类型的灯</span>
      </div>
      
    } else {
      return this.props.lights.map(light => {
        const status = light.status
        const stylename = classNames({
          lights:true,
          ['lights_'+status]:true,
          [light.name+'_'+status]:true
        })
        return (
          <div styleName='light_wrap'  key={light.id}>
                  <div className={stylename} 
                     onClick={this.lightsClick.bind(this, light.id, status, light.name, light.deviceId)}>
                    <div styleName="light_img"></div>
                    <p styleName='light_p'>{light.name.replace(this.props.lightStore.middleRoundStatus, '')}</p>
                  </div>
               </div>
        )
      })
    }
  }
  lightsClick = (wayId, status, name, deviceId) => {
    const { lights } = this.props
    if (name.indexOf('可调灯带') > -1) {
      hashHistory.push(`light/dengdai?deviceId=${deviceId}`)
      return
    }
    if (name.indexOf('可调阅读灯') > -1) {
      hashHistory.push(`light/readLight?deviceId=${deviceId}`)
      return
    }
    
    lights.forEach((light, index) => {
      if (light.id === wayId) {
        this.props.lightActions.lightsClick(wayId, status, index)
      }
    })
  }
  render() {
    return (
      <div className={styles.light_card}>
        <div styleName='ligths_wrap'>
          {this.lightRender()}
        </div>
        {
          this.props.type === '卫生间' && this.props.lights.length >= 0?
          <div className={styles.switch_toggle}>
            <div>全关</div>
            <Switch checked={this.props.switchStatus} onChange={this.props.switchChange}></Switch>
            <div>全开</div>
          </div>:null
        }
        
    </div>
    )
  }
}

export default LightCard
