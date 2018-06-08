import React from 'react'
import CSSModules from 'react-css-modules'
import classNames from 'classnames'

import { hashHistory } from 'react-router' 

import styles from './light.css'
import {quadrant} from '../../utlis'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../actions/light-actions'
import { config  } from '../../utlis'

@connect(
  state => ({lightStore:state.toObject().lightStore,idStore:state.toObject().idStore}),
  dispatch => ({
    lightActions: bindActionCreators(actions, dispatch),
  })
)
@CSSModules(styles, { allowMultiple: true })
class LargeRound extends React.PureComponent {
  constructor(props) {
    super(props)
    this.currentAngle = 0
    this.raduisX = 0
    this.raduisY = 0
  }
  
  componentDidMount(){
    const fontSize = window.innerWidth/7.5
    this.raduisY = fontSize * 8.98
    this.raduisX = fontSize * 5.8
    this.websocket = new WebSocket(`ws://${config.api.websocket}/stServlet.st?serverId=` + this.props.serveId) 
    this.websocket.onopen = () => {
      console.log('websocket已链接')
    }
    this.websocket.onmessage = (event) => {
      
      console.log(event.data)
      let lights = this.props.lights
      const lightNow = event.data.split('.WAY.')
      const changelihts = lights.map((light, index) => {
        if(light.id === lightNow[0]) {
          return {...light, status: lightNow[1]}
        }else {
          return light
        }
      })
      this.props.getLightsWays(changelihts)
     }
  }
  
  componentWillUnmount(){
    this.websocket.close()
  }
  touchstart(e){
    e.stopPropagation() 
    e.preventDefault()
    const pageX = e.changedTouches[0].pageX
    const pageY = e.changedTouches[0].pageY
    const to =((pageX-this.raduisX)/(pageY-this.raduisY))
    const whichquadrant = quadrant(pageX,this.raduisX,pageY,this.raduisY)
    
    if (whichquadrant === 3) {
       this.currentAngle = Math.atan(to)/( 2 * Math.PI ) * 360 
    } 
    if(whichquadrant === 4){
       this.currentAngle = Math.atan(to)/( 2 * Math.PI ) * 360 + 180
    }
    if(whichquadrant === 2){
      this.currentAngle = Math.atan(to)/( 2 * Math.PI ) * 360 
    }
    if(whichquadrant === 1){
      this.currentAngle = Math.atan(to)/( 2 * Math.PI ) * 360 +180
    }
    
  }
  
  touchemove(e){
    e.stopPropagation() 
    e.preventDefault()
    const pageX = e.changedTouches[0].pageX
    const pageY = e.changedTouches[0].pageY

    //判断第几象限
    const whichquadrant = quadrant(pageX,this.raduisX,pageY,this.raduisY)
    const to =((pageX-this.raduisX)/(pageY-this.raduisY))
    let moveAngle
    if (whichquadrant === 3) {
       moveAngle = Math.atan(to)/( 2 * Math.PI ) * 360 
    } 
    if(whichquadrant === 4){
       moveAngle = Math.atan(to)/( 2 * Math.PI ) * 360 + 180
    }
    if(whichquadrant === 2){
      moveAngle = Math.atan(to)/( 2 * Math.PI ) * 360 
    }
    if(whichquadrant === 1){
      moveAngle = Math.atan(to)/( 2 * Math.PI ) * 360 +180
    }
    this.props.lightActions.largeRoundRotate(this.props.lightStore.large_round_rotate + moveAngle - this.currentAngle)
   
      this.currentAngle = moveAngle
    
  }
  touchEnd(e){
    // e.stopPropagation() 
    e.preventDefault()
  }
  lightsRender(){
    const { lights } = this.props
    return lights
    .filter((light) => light.name&&light.name.indexOf(this.props.middleType) > -1)
    .map((light,index) => {
      const rotate = -90 + (30*Math.round(index/2))*Math.pow(-1,index+1)
      const large_rotateZ = this.props.lightStore.large_round_rotate
      const status = light.status
      const stylename = classNames({
        lights:true,
        ['lights_'+status]:true,
        [light.name+'_'+status]:true
      })
      return (
         <div styleName='light_wrap' style={{transform:`rotateZ(${rotate}deg)`,'WebkitTransform':`rotateZ(${rotate}deg)`}} key={light.id}>
            <div className={stylename} style={{transform:`rotateZ(${large_rotateZ-rotate}deg)`,'WebkitTransform':`rotateZ(${large_rotateZ-rotate}deg)`}}
            onClick={this.lightsClick.bind(this, light.id, status, light.name, light.deviceId)}>
              <div className="light_img"></div>
              <p>{light.name.replace(this.props.middleType, '')}</p>
            </div>
         </div>
      )
    })
  }
  lightsClick(wayId, status, name, deviceId) {
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
        this.props.lightsClick(wayId, status, index)
      }
    })
  }
  render(){
    const {large_round_rotate} = this.props.lightStore
    const large_rotateZ = -large_round_rotate
    return(
      <div styleName="large_round" style={{transform:`rotateZ(${large_rotateZ}deg)`,'WebkitTransform':`rotateZ(${large_rotateZ}deg)`}} 
      onTouchStart={this.touchstart.bind(this)}
      onTouchMove={this.touchemove.bind(this)}
      onTouchEnd={this.touchEnd.bind(this)}> 
            {this.props.lights ? this.lightsRender():null}
      </div>
    )
  }
}

export default LargeRound