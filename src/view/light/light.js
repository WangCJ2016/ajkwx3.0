import React from 'react'
import CSSModules from 'react-css-modules'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


import styles from './light.css'
import * as actions from '../../actions/light-actions'
import LightTab from './component/ligthTab'
import LightCard from './component/lightCard'
import { config } from '../../utlis' 


@connect(
  state => ({lightStore:state.toObject().lightStore,idStore:state.toObject().idStore}),
  dispatch => ({
    lightActions: bindActionCreators(actions, dispatch),
  })
)
@CSSModules(styles, { allowMultiple: true })
class Light extends React.PureComponent {
  constructor(props) {
    
    super(props)
    this.state = {
    modelActiveIndex:-1,
    switchStatus: false
    //largeRoundShouldReset: false
    } 
  }
  componentDidMount(){
    document.title = '灯'
    this.props.lightActions.initialLights({serverId: this.props.location.query.serveId})
    this.props.lightActions.yuedudeng()
   
    this.websocket = new WebSocket(`ws://${config.api.websocket}/stServlet.st?serverId=` + this.props.location.query.serveId) 
    this.websocket.onopen = () => {
      console.log('websocket已链接')
    }
    this.websocket.onmessage = (event) => {
      let lights = this.props.lightStore.lights
      const lightNow = event.data.split('.WAY.')
      const changelihts = lights.map((light, index) => {
        if(light.id === lightNow[0]) {
          return {...light, status: lightNow[1]}
        }else {
          return light
        }
      })
      this.props.lightActions.getLightsWays(changelihts)
     }

     
  }
  
  componentWillReceiveProps(nextProps) {
    this.changeToiletSwitchStatus(nextProps) 
  }

 // 改变卫生间全开全关状态 
  changeToiletSwitchStatus = (nextProps) => {
    const {lights,middleRoundStatus} = nextProps.lightStore
   if(middleRoundStatus === '卫生间') {
    let allOn = true
      lights
      .filter((light) => light.name&&light.name.indexOf(middleRoundStatus) > -1)
      .forEach(light => {
        if(light.status === 'OFF') {
          allOn = false
        }
      })
      this.setState({
        switchStatus: allOn
      })
    } 
  }

  middelRoundClick = (type) => {
    this.props.lightActions.changeMiddleStatus(type)
  }
  lightSelector = () => {
    const {lights,middleRoundStatus} = this.props.lightStore
    return lights
    .filter((light) => light.name&&light.name.indexOf(middleRoundStatus) > -1)
  }
  switchChange = (e) =>  {
    this.setState({
      switchStatus: !this.state.switchStatus
    })
    const {lights,middleRoundStatus} = this.props.lightStore
     lights
    .filter((light) => light.name&&light.name.indexOf(middleRoundStatus) > -1)
    .forEach(light => {
      this.props.lightActions.lightsClick(light.id, e?'OFF':'ON')
    })
  }
  render() {
    const { middleRoundStatus} = this.props.lightStore
    return (
      <div styleName='light_bg' >
        <LightTab 
          type={middleRoundStatus}
          middelRoundClick={this.middelRoundClick}
        />
        <LightCard 
          type={middleRoundStatus}
          lights={this.lightSelector()}
          switchChange={this.switchChange}
          switchStatus={this.state.switchStatus}
        />
      </div>
   )
  }
}

export default Light