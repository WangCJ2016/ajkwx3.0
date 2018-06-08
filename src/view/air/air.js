import React from 'react'
import CSSModules from 'react-css-modules'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import styles from './air.css'
import AirOne from './air-one'
import * as airActions from '../../actions/air-actions'
import SlidePot from '../../components/slidePot/slide-pot'
import SwipeType from '../../components/swipeTypeHoc/SwipeType'

@connect(
  state => ({airState:state.toObject().airStore}),
  dispatch => ({
    airActions: bindActionCreators(airActions, dispatch),
  })
)
@SwipeType
@CSSModules(styles, { allowMultiple: true })
class Air extends React.PureComponent {
  constructor() {
    super()
    this.count = 0 
    this.countActive = 0
  }
  
  componentDidMount(){
    this.props.airActions.initialAirCondition() 
    this.props.componentDidMount()
    const { airs } = this.props.airState
    if (airs.length > 0) {
      document.title = Object.keys(airs[this.countActive])[0].replace(/[0-9$]/g, '')
    }
  }
  componentWillUnmount() {
    this.props.componentWillUnmount()
  }
  componentDidUpdate() {
    const { airs } = this.props.airState
    if (airs.length > 0) {
      document.title = airs[this.countActive].name.replace(/[0-9$]/g, '')
    }   
  }
  render(){
    const {airs,deviceType} = this.props.airState
    const wrapWidth = airs.length*100 + '%'
    const airWidth = 1/airs.length *100 + '%'
    let translateX = 0
    if(this.props.state.count - this.count === 1){
      if(this.countActive<airs.length-1){
        this.countActive = this.countActive + 1
      }else{
        this.countActive = airs.length - 1
      }
      translateX = -this.countActive*this.props.state.winWidth
      this.count = this.props.state.count
    }
    if(this.props.state.count - this.count === -1){
      if(this.countActive>0){
        this.countActive = this.countActive - 1
      }else{
        this.countActive = 0
      }
      translateX = -this.countActive*this.props.state.winWidth
      this.count = this.props.state.count
    }
    if(this.props.state.count - this.count === 0){
      translateX = -this.countActive*this.props.state.winWidth
    }
    return(
     
      <div styleName='air_bg'>
        <SlidePot num={airs.length} activeIndex={this.countActive} />
        <div styleName="airwrap clearfix" style={{width:wrapWidth,transform:`translateX(${translateX}px)`,WebkitTransform:`translateX(${translateX}px)`}} 
        onTouchStart={this.props.touchstart} onTouchMove={this.props.touchmove} onTouchEnd={this.props.touchend} onTouchCancel={this.props.touchcancel}>
        {
          airs.length?airs.map((air,index) => <AirOne width={airWidth} key={index} deviceType={deviceType} air={air} actions={this.props.airActions}/>):null
        }
        </div>
      </div>
      
    )
  }
}

export default Air